function firstMatch(tokens, regex) {
    var result = {position: -1,value: null};
    for (var i = 0; i < tokens.length; i++) {
        if (regex.test(tokens[i].oper)) {
            result.position = i;
            result.value = tokens[i];
            break;
        }
    }
    return result;
}

function lastMatch(tokens, regex) {
    var result = {position: -1,value: null};
    for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i].oper == "string" && regex.test(tokens[i].oper)) {
            result.position = i;
            result.value = tokens[i];
        }
    }
    return result;
}

function Token(leftObj, rightObj, oper, info) {
    this.leftObj = leftObj;
    this.rightObj = rightObj;
    this.oper = oper;
    this.info = info;
    this.symbols = [];
}

Token.prototype.toString = function() {
    if (!this.oper && this.leftObj && this.rightObj)
        return "(" + this.leftObj + "(" + this.rightObj + "))";
    else
        return (this.info.level != 0 ? "(" : "") + (this.leftObj || "") + (this.oper || "") + (this.rightObj || "") + (this.info.level != 0 ? ")" : "");
}

function tokenize(expr) {
    var result = [], 
    pos = 0, 
    length = expr.length;
    while (pos < length) {
        if (expr[pos] == " ") {
            pos++;
            continue;
        }
        if (/[\+\-\*\/=\(\)\^,]/.test(expr[pos])) {
            var info = {level: 0,position: pos}, 
            token = new Token(null, null, expr[pos], info);
            result.push(token);
            pos++;
            continue;
        }
        if (/[a-z|A-Z]/.test(expr[pos])) {
            var variable = "";
            while (/[a-zA-Z0-9]/.test(expr[pos]) && pos < length) {
                variable += expr[pos];
                pos++;
            }
            var info = {level: 0,position: pos}, 
            token = new Token(variable, null, null, info);
            token.symbols.push(variable);
            result.push(token);
            continue;
        }
        if (/[0-9]/.test(expr[pos])) {
            var variable = "";
            while (/[0-9\.]/.test(expr[pos]) && pos < length) {
                variable += expr[pos];
                pos++;
            }
            var info = {level: 0,position: pos}, 
            token = new Token(variable, null, null, info);
            result.push(token);
            continue;
        } else {
            throw "Parse error at " + pos + " [" + expr[pos] + "]";
        }
    }
    return result;
}

function parse(tokens) {
    if (tokens.length == 1)
        return tokens[0];
    else if (tokens.length == 2) {
        var info = {level: 1,position: tokens[0].info.position};
        var token = new Token(tokens[0], tokens[1], null, info);
        token.symbols = Set.clone(tokens[1].symbols);
        return token;
    } else {
        var pos = lastMatch(tokens, /^[=]$/);
        if (pos.position > -1) {
            var left = parse(tokens.slice(0, pos.position));
            var right = parse(tokens.slice(pos.position + 1, tokens.length));
            var info = {level: 1,position: pos.position};
            var token = new Token(left, right, tokens[pos.position], info);
            token.symbols = Set.union(left.symbols,right.symbols);
            return token;
        }
        pos = lastMatch(tokens, /^[\+\-]$/);
        if (pos.position > -1) {
            var left = parse(tokens.slice(0, pos.position));
            var right = parse(tokens.slice(pos.position + 1, tokens.length));
            var info = {level: 1,position: pos.position};
            var token = new Token(left, right, tokens[pos.position], info);
            token.symbols = Set.union(left.symbols,right.symbols);
            return token;
        }
        pos = lastMatch(tokens, /^[\*\/]$/);
        if (pos.position > -1) {
            var left = parse(tokens.slice(0, pos.position));
            var right = parse(tokens.slice(pos.position + 1, tokens.length));
            var info = {level: 1,position: pos.position};
            var token = new Token(left, right, tokens[pos.position], info);
            token.symbols = Set.union(left.symbols,right.symbols);
            return token;
        }
        pos = firstMatch(tokens, /^[\^]$/);
        if (pos.position > -1) {
            var left = parse(tokens.slice(0, pos.position));
            var right = parse(tokens.slice(pos.position + 1, tokens.length));
            var info = {level: 1,position: pos.position};
            var token = new Token(left, right, tokens[pos.position], info);
            token.symbols = Set.union(left.symbols,right.symbols);
            return token;
        } 
        else {
            var err = tokens.map(function(n) {
                return n.toString();
            }).join(" ");
            throw "Syntax error: (" + err + ")";
        }
    }
}

function parseParenthese(tokens) {
    var stack = [];
    var index = 0;
    while (index < tokens.length) {
        if (tokens[index].oper != ")") {
            stack.push(tokens[index]);
        } 
        else {
            var tmp = [];
            while (stack.length > 0) {
                var token = stack.pop();
                if (token.oper != "(")
                    tmp.unshift(token);
                else {
                    stack.push(parse(tmp));
                    break;
                }
            }
        }
        index++;
    }
    return parse(stack);
}

Math["-"] = function(x) {
    return -x;
};
Math["+"] = function(x) {
    return x;
};

function evaluate(token, known) {
    if (!token.oper) {
        if (!token.rightObj) {
            if (known[token.leftObj])
                return known[token.leftObj].value;
            else {
                try {
                    if (token.leftObj.indexOf(".") > -1)
                        return parseFloat(token.leftObj);
                    else
                        return parseInt(token.leftObj);
                } catch (e) {
                    throw token.leftObj + " " + e;
                }
            }
        } else {
            if (Math.hasOwnProperty(token.leftObj)) {
                return Math[token.leftObj](evaluate(token.rightObj, known));
            } else {
                throw "(" + token.leftObj + ") is not a function.";
            }
        }
    } else {
        switch (token.oper.oper) {
            case "+":
                return evaluate(token.leftObj, known) + evaluate(token.rightObj, known);
            case "-":
                return evaluate(token.leftObj, known) - evaluate(token.rightObj, known);
            case "*":
                return evaluate(token.leftObj, known) * evaluate(token.rightObj, known);
            case "/":
                return evaluate(token.leftObj, known) / evaluate(token.rightObj, known);
            case "^":
                return Math.pow(evaluate(token.leftObj, known), evaluate(token.rightObj, known));
            case "=":
                {
                    if (token.leftObj.info.level == 0 && token.leftObj.symbols.length == 1) {
                        if (!known[token.leftObj]) {
                            var rhs = evaluate(token.rightObj, known);
                            if (rhs) {
                                known[token.leftObj.leftObj] = {};
                                known[token.leftObj.leftObj].value = rhs;
                                known[token.leftObj.leftObj].symbols = token.rightObj.symbols;
                                known[token.leftObj.leftObj].formula = token;
                                //print(token.leftObj.leftObj + " = " + rhs);
                                return true;
                            } else
                                return false;
                        }
                    }
                    return evaluate(token.leftObj, known) == evaluate(token.rightObj, known);
                }
        }
    }
}

function transformbycode(token, transformOptions) {
    var options = transformOptions || {};
    var debug = options.debug || false;
    var stopwhenexpected = options.stop && true;
    var expectedSymbols = options.symbols || token.symbols.slice();
    var printfunc = options.printfunc || function(s) { console.log(s); };
    
    var tree = [token];
    var treeString = [token.toString()];
    var queue = [token];
    var result = [];
    var resultSymbols = [];

    if (!token.leftObj.oper && resultSymbols.indexOf(token.leftObj.leftObj) == -1) {
        result.push(token);
        resultSymbols.push(token.leftObj.leftObj);
    }
    
    var info = {level: 0,position: 0};
    var info1 = {level: 1,position: 0};
    var tokenminus = new Token(null, null, '-', info);
    var tokenplus = new Token(null, null, '+', info);
    var tokenmulti = new Token(null, null, '*', info);
    var tokendivide = new Token(null, null, '/', info);
    var tokenpower = new Token(null, null, '^', info);    
    var tokenzero = new Token("0", null, null, info);
    var tokenone = new Token("1", null, null, info);

    var funcmap = {
        'sin' : 'asin',
        'asin' : 'sin',
        'cos' : 'acos',
        'acos' : 'cos',
        'tan' : 'atan',
        'atan' : 'tan',
        'sinh' : 'asinh',
        'asinh' : 'sinh',
        'cosh' : 'acosh',
        'acosh' : 'cosh',
        'tanh' : 'atanh',
        'atanh' : 'tanh',
        'log' : 'exp',
        'exp' : 'log',

    };
    
    if (debug) printfunc("Start transform: " + token);
    while (queue.length != 0) {
        var tmp = queue.shift();

        //rule 1: a = b <=> b = a
        if (tmp.oper.oper === '=') {
            var newtoken = new Token(tmp.rightObj, tmp.leftObj, tmp.oper, tmp.info);
            newtoken.symbols = Set.clone(tmp.symbols);
            newtoken.source = (token.source?token.source:token);
            if (treeString.indexOf(newtoken.toString()) == -1) {
                if (debug) printfunc(newtoken + " <=rule1= " + tmp);
                tree.push(newtoken);
                treeString.push(newtoken.toString());
                queue.push(newtoken);

                if (!newtoken.leftObj.oper
                    && !Set.subset(newtoken.rightObj.symbols,newtoken.leftObj.symbols) 
                    && resultSymbols.indexOf(newtoken.leftObj.leftObj) == -1
                    && expectedSymbols.indexOf(newtoken.leftObj.leftObj) != -1) {
                    result.push(newtoken);
                    resultSymbols.push(newtoken.leftObj.leftObj);
                    if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                        if (debug) printfunc("Stop transform when find enough symbols.");
                        return result;
                    }
                }
            }
        
        }

        /* DANGEROUS !!!
            //rule 2: a = b <=> a - b = 0
            if (tmp.oper.oper === '=') {
                if (tmp.rightObj.leftObj != 0 && tmp.leftObj.leftObj != 0) {
                    var lhsnewtoken = new Token(tmp.leftObj,tmp.rightObj,tokenminus,info1);
                    var newtoken = new Token(lhsnewtoken,tokenzero,tmp.oper,info1);
                                        
                    if (treeString.indexOf(newtoken.toString()) == -1) {
                        print(newtoken);
                        tree.push(newtoken);
                        treeString.push(newtoken.toString());
                        queue.push(newtoken);
                    }
                }
            }

            //rule 3: a = b <=> a / b = 1
            if (tmp.oper.oper === '=') {
                if (tmp.rightObj.leftObj != 0
                 && tmp.rightObj.leftObj != 1 
                 && tmp.leftObj.leftObj != 0) {
                    var lhsnewtoken = new Token(tmp.leftObj,tmp.rightObj,tokenminus,info1);
                    var newtoken = new Token(lhsnewtoken,tokenone,tmp.oper,info1);
                                        
                    if (treeString.indexOf(newtoken.toString()) == -1) {
                        print(newtoken);
                        tree.push(newtoken);
                        treeString.push(newtoken.toString());
                        queue.push(newtoken);
                    }
                }
            }
            */

        //rule 4: a = b + c <=> a = c + b
        if (tmp.oper.oper === '=') {
            if (tmp.rightObj.oper && /[\+\*]/.test(tmp.rightObj.oper.oper)) {
                var rhsnewtoken = new Token(tmp.rightObj.rightObj, tmp.rightObj.leftObj, tmp.rightObj.oper, tmp.rightObj.info);
                rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                var newtoken = new Token(tmp.leftObj, rhsnewtoken, tmp.oper, tmp.info);
                newtoken.symbols = Set.clone(tmp.symbols);
                newtoken.source = (token.source?token.source:token);
                if (treeString.indexOf(newtoken.toString()) == -1) {
                    if (debug) printfunc(newtoken + " <=rule4= " + tmp);
                    tree.push(newtoken);
                    treeString.push(newtoken.toString());
                    queue.push(newtoken);

                    if (!newtoken.leftObj.oper
                        && !Set.subset(newtoken.rightObj.symbols,newtoken.leftObj.symbols) 
                        && resultSymbols.indexOf(newtoken.leftObj.leftObj) == -1
                        && expectedSymbols.indexOf(newtoken.leftObj.leftObj) != -1) {
                        result.push(newtoken);
                        resultSymbols.push(newtoken.leftObj.leftObj);
                        if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                            if (debug) printfunc("Stop transform when find enough symbols.");
                            return result;
                        }
                    }
                }
            }
        }

        //rule 5: a = b + (c + d) <=> a = (b + c) + d
        if (tmp.oper.oper === '=') {
            if (tmp.rightObj.oper && /[\+\-]/.test(tmp.rightObj.oper.oper)) {
                if (tmp.rightObj.rightObj.oper && /[\+\-]/.test(tmp.rightObj.rightObj.oper.oper)) {
                    var lhsrhsnewtoken = new Token(tmp.rightObj.leftObj, tmp.rightObj.rightObj.leftObj, tmp.rightObj.oper, tmp.rightObj.info);
                    var rhsnewtoken;
                    if (/[\-]/.test(tmp.rightObj.oper.oper)) {
                        if (/[\-]/.test(tmp.rightObj.rightObj.oper.oper)) {
                            rhsnewtoken = new Token(lhsrhsnewtoken, tmp.rightObj.rightObj.rightObj, tokenplus, tmp.rightObj.rightObj.info);
                        } else {
                            rhsnewtoken = new Token(lhsrhsnewtoken, tmp.rightObj.rightObj.rightObj, tokenminus, tmp.rightObj.rightObj.info);
                        }
                    } else {
                        rhsnewtoken = new Token(lhsrhsnewtoken, tmp.rightObj.rightObj.rightObj, tmp.rightObj.rightObj.oper, tmp.rightObj.rightObj.info);
                    }
                    rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                    var newtoken = new Token(tmp.leftObj, rhsnewtoken, tmp.oper, tmp.info);
                    newtoken.symbols = Set.clone(tmp.symbols);
                    newtoken.source = (token.source?token.source:token);
                    if (treeString.indexOf(newtoken.toString()) == -1) {
                        if (debug) printfunc(newtoken + " <=rule5= " + tmp);
                        tree.push(newtoken);
                        treeString.push(newtoken.toString());
                        queue.push(newtoken);

                        if (!newtoken.leftObj.oper 
                            && !Set.subset(newtoken.rightObj.symbols,newtoken.leftObj.symbols)
                            && resultSymbols.indexOf(newtoken.leftObj.leftObj) == -1
                            && expectedSymbols.indexOf(newtoken.leftObj.leftObj) != -1) {
                            result.push(newtoken);
                            resultSymbols.push(newtoken.leftObj.leftObj);
                            if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                                if (debug) printfunc("Stop transform when find enough symbols.");
                                return result;
                            }
                        }
                    }
                }
            }
        }

        //rule 6: a = b ? c <=> a ? c = b
        if (tmp.oper.oper === '=') {
            if (tmp.rightObj.oper && /[\+\-\*\/\^]/.test(tmp.rightObj.oper.oper)) {
                var lhsnewtoken = null, newtoken = null,
                    lhsnewtoken1 = null, newtoken1 = null;
                switch (tmp.rightObj.oper.oper) {
                    case '+':
                        lhsnewtoken = new Token(tmp.leftObj, tmp.rightObj.rightObj, tokenminus, info1);
                        break;
                    case '-':
                        lhsnewtoken = new Token(tmp.leftObj, tmp.rightObj.rightObj, tokenplus, info1);
                        break;
                    case '*':
                        lhsnewtoken = new Token(tmp.leftObj, tmp.rightObj.rightObj, tokendivide, info1);
                        break;
                    case '/':
                        lhsnewtoken = new Token(tmp.leftObj, tmp.rightObj.rightObj, tokenmulti, info1);
                        break;
                    case '^': {
                        //a = b ^ c <=> a ^ (1/c) = b
                        if (tmp.rightObj.rightObj.leftObj == '2') {
                            var tokensqrt = new Token('sqrt',null,null,info);
                            lhsnewtoken = new Token(tokensqrt,tmp.leftObj,null,info1);
                        } else if (tmp.rightObj.rightObj.leftObj == '3') {
                            var tokencbrt = new Token('cbrt',null,null,info);
                            lhsnewtoken = new Token(tokencbrt,tmp.leftObj,null,info1);
                        } else {
                            if (tmp.rightObj.rightObj.oper && tmp.rightObj.rightObj.oper.oper == '/') {
                                if (tmp.rightObj.rightObj.leftObj.leftObj == '1') {
                                    var tokenrevert = tmp.rightObj.rightObj.rightObj;
                                    lhsnewtoken = new Token(tmp.leftObj, tokenrevert, tokenpower,info1);
                                } else {
                                    var tokenrevert = new Token(tmp.rightObj.rightObj.rightObj,tmp.rightObj.rightObj.leftObj, tokendivide,info1);
                                    lhsnewtoken = new Token(tmp.leftObj, tokenrevert, tokenpower,info1);
                                }

                            } else {
                                var tokenonedivide = new Token(tokenone, tmp.rightObj.rightObj, tokendivide, info1);
                                lhsnewtoken = new Token(tmp.leftObj, tokenonedivide, tokenpower,info1);
                            }
                        }

                        //a = b ^ c <=> log(a)/log(b) = c
                        /*
                        var tokenlog = new Token('log',null,null,info);
                        var tokenloga = new Token(tokenlog, tmp.leftObj,null,info1);
                        var tokenlogb = new Token(tokenlog, tmp.rightObj.leftObj,null,info1);
                        lhsnewtoken1 = new Token(tokenloga,tokenlogb,tokendivide,info1);
                        */
                        break;
                    }
                }
                if (lhsnewtoken) {
                    lhsnewtoken.symbols = Set.union(tmp.leftObj.symbols,tmp.rightObj.rightObj.symbols);
                    newtoken = new Token(lhsnewtoken, tmp.rightObj.leftObj, tmp.oper, info1);
                    newtoken.symbols = Set.clone(tmp.symbols);
                    newtoken.source = (token.source?token.source:token);
                    //newtoken = new Token(tmp.rightObj.leftObj, lhsnewtoken, tmp.oper, info1);
                }
                if (newtoken && treeString.indexOf(newtoken.toString()) == -1) {
                    if (debug) printfunc(newtoken + " <=rule6= " + tmp);
                    tree.push(newtoken);
                    treeString.push(newtoken.toString());
                    queue.push(newtoken);

                    if (!newtoken.leftObj.oper 
                        && !Set.subset(newtoken.rightObj.symbols,newtoken.leftObj.symbols)
                        && resultSymbols.indexOf(newtoken.leftObj.leftObj) == -1
                        && expectedSymbols.indexOf(newtoken.leftObj.leftObj) != -1) {
                        result.push(newtoken);
                        resultSymbols.push(newtoken.leftObj.leftObj);
                        if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                            if (debug) printfunc("Stop transform when find enough symbols.");
                            return result;
                        }
                    }
                }

                //for a = b ^ c <=> log(a)/log(b) = c
                if (lhsnewtoken1) {
                    lhsnewtoken1.symbols = Set.union(tmp.leftObj.symbols,tmp.rightObj.leftObj.symbols);
                    newtoken1 = new Token(lhsnewtoken1, tmp.rightObj.rightObj, tmp.oper, info1);
                    newtoken1.symbols = Set.clone(tmp.symbols);
                    newtoken1.source = (token.source?token.source:token);
                }
                if (newtoken1 && treeString.indexOf(newtoken1.toString()) == -1) {
                    if (debug) printfunc(newtoken1 + " <=rule6= " + tmp);
                    tree.push(newtoken1);
                    treeString.push(newtoken1.toString());
                    queue.push(newtoken1);

                    if (!newtoken1.leftObj.oper 
                        && !Set.subset(newtoken1.rightObj.symbols,newtoken1.leftObj.symbols)
                        && resultSymbols.indexOf(newtoken1.leftObj.leftObj) == -1
                        && expectedSymbols.indexOf(newtoken1.leftObj.leftObj) != -1) {
                        result.push(newtoken1);
                        resultSymbols.push(newtoken1.leftObj.leftObj);
                        if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                            if (debug) printfunc("Stop transform when find enough symbols.");
                            return result;
                        }
                    }
                }
            }
        }

        //rule 8: f(a) = b <=> a = f-1(b)
        if (tmp.oper.oper === '=') {
            if (!tmp.leftObj.oper && tmp.leftObj.leftObj && tmp.leftObj.rightObj) {
                var newtoken;
                switch (tmp.leftObj.leftObj.leftObj) {
                    case 'sqrt': {
                        var tokentwo = new Token("2", null, null, info);
                        var tokenpower = new Token(null, null, '^', info);
                        var rhsnewtoken = new Token(tmp.rightObj, tokentwo, tokenpower, info1);
                        newtoken = new Token(tmp.leftObj.rightObj,rhsnewtoken,tmp.oper,tmp.info);
                        rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                        newtoken.symbols = Set.clone(tmp.symbols);
                        newtoken.source = (token.source?token.source:token);
                        break;
                    }
                    case 'cbrt': {
                        var tokenthree = new Token("3", null, null, info);
                        var tokenpower = new Token(null, null, '^', info);
                        var rhsnewtoken = new Token(tmp.rightObj, tokenthree, tokenpower, info1);
                        newtoken = new Token(tmp.leftObj.rightObj,rhsnewtoken,tmp.oper,tmp.info);
                        rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                        newtoken.symbols = Set.clone(tmp.symbols);
                        newtoken.source = (token.source?token.source:token);
                        break;
                    }
                    case 'log2': {
                        var tokentwo = new Token("2", null, null, info);
                        
                        var rhsnewtoken = new Token(tokentwo, tmp.rightObj, tokenpower, info1);
                        newtoken = new Token(tmp.leftObj.rightObj,rhsnewtoken,tmp.oper,tmp.info);
                        rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                        newtoken.symbols = Set.clone(tmp.symbols);
                        newtoken.source = (token.source?token.source:token);
                        break;
                    }
                    case 'log10': {
                        var tokenten = new Token("10", null, null, info);
                        var tokenpower = new Token(null, null, '^', info);
                        var rhsnewtoken = new Token(tokenten, tmp.rightObj, tokenpower, info1);
                        newtoken = new Token(tmp.leftObj.rightObj,rhsnewtoken,tmp.oper,tmp.info);
                        rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                        newtoken.symbols = Set.clone(tmp.symbols);
                        newtoken.source = (token.source?token.source:token);
                        break;
                    }
                    default: {
                        if (funcmap[tmp.leftObj.leftObj.leftObj]) {
                            var tokenf1 = new Token(funcmap[tmp.leftObj.leftObj.leftObj], null, null, info);
                            var rhsnewtoken = new Token(tokenf1, tmp.rightObj, null, info1);
                            newtoken = new Token(tmp.leftObj.rightObj,rhsnewtoken,tmp.oper,tmp.info);
                            rhsnewtoken.symbols = Set.clone(tmp.rightObj.symbols);
                            newtoken.symbols = Set.clone(tmp.symbols);
                            newtoken.source = (token.source?token.source:token);
                            break;
                        }
                    }
                }
                if (newtoken && treeString.indexOf(newtoken.toString()) == -1) {
                    if (debug) printfunc(newtoken + " <=rule8= " + tmp);
                    tree.push(newtoken);
                    treeString.push(newtoken.toString());
                    queue.push(newtoken);

                    if (!newtoken.leftObj.oper 
                        && !Set.subset(newtoken.rightObj.symbols,newtoken.leftObj.symbols)
                        && resultSymbols.indexOf(newtoken.leftObj.leftObj) == -1
                        && expectedSymbols.indexOf(newtoken.leftObj.leftObj) != -1) {
                        result.push(newtoken);
                        resultSymbols.push(newtoken.leftObj.leftObj);
                        if (stopwhenexpected && Set.equal(resultSymbols, expectedSymbols)) {
                            if (debug) printfunc("Stop transform when find enough symbols.");
                            return result;
                        }
                    }
                }
            }
        }
    }
    if (debug) printfunc("Stop transform when cannot transform anymore.");
    return result;
}

function mapToken(mask, maplist) {
    if (mask.leftObj.leftObj && !mask.leftObj.rightObj && !mask.leftObj.oper) {
        if (maplist[mask.leftObj]) {
            mask.leftObj = maplist[mask.leftObj.toString()];
        }
    } else {
        mapToken(mask.leftObj, maplist);
    }

    if (mask.rightObj.leftObj && !mask.rightObj.rightObj && !mask.rightObj.oper) {
        if (maplist[mask.rightObj]) {
            mask.rightObj = maplist[mask.rightObj.toString()];
        }
    } else {
        mapToken(mask.rightObj, maplist);
    }
    mask.symbols = Set.union(mask.leftObj.symbols, mask.rightObj.symbols);
}
function isSimilar(mask, token) {
    if (!mask.oper) {
        if (mask.rightObj) {
            if (mask.leftObj.toString() != token.leftObj.toString()) {
                return {similar : false};
            } else {
                return isSimilar(mask.rightObj, token.rightObj);
            }
        } else {
            if (mask.symbols.length == 0 && mask.leftObj.toString() != token.toString()) {
                return {similar : false};
            }
            var result = {};
            result["similar"] = true;
            result["mapping"] = new Object();
            result["mapping"][mask.leftObj.toString()] = token;
            return result;
        }
        
    } else {
        if (!token.oper || mask.oper.oper != token.oper.oper) return { similar : false };
        else {
            var simleft = isSimilar(mask.leftObj, token.leftObj);
            var simright = isSimilar(mask.rightObj, token.rightObj);
            if  (simleft.similar && simright.similar) {
                var result = new Object();
                result.similar = true;
                result.mapping = Set.extend(simleft.mapping, simright.mapping);
                return result;
            } else {
                return {similar : false};
            }
        }
    }
}
/*

*/
function transformbymodel(token, transformOptions) {
    var options = transformOptions || {};
    var debug = options.debug || false;
    var stopwhenexpected = options.stop && true;
    var expectedSymbols = options.symbols || token.symbols.slice();
    
    var printfunc = options.printfunc || function(s) { console.log(s); };
    var filterfunc = options.filterfunc || function(t) { return true; };
    var filtervar = options.filtervar || {};
    filtervar.resultSymbols = [];
    var afterfilterfunc = options.afterfilterfunc || {};
    
    var tree = [token];
    var treeString = [token.toString()];
    var queue = [token];
    var result = [];
    var resultSymbols = [];

    if (filterfunc(token,filtervar)) {
        result.push(token);
        afterfilterfunc(token, filtervar);
    }

    if (debug) printfunc("Start transform: " + token);
    while (queue.length != 0) {
        var tmp = queue.shift();
        for (var rule in Expression.rules) {
            if (!Expression.rules[rule]) continue;
            var part = rule.split("=>");
            var left = parseParenthese(tokenize(part[0]));
            var sim = isSimilar(left, tmp);
            if (sim && sim.similar) {
                var right = parseParenthese(tokenize(part[1]));
                mapToken(right, sim.mapping);

                if (right && treeString.indexOf(right.toString()) == -1) {
                    tree.push(right);
                    treeString.push(right.toString());
                    queue.push(right);
                    
                    if (filterfunc(right,filtervar)) {
                        result.push(right);
                        afterfilterfunc(right, filtervar);
                    }
                }
            }
        }
    }
    return result;
}