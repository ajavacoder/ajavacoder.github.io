var Triangle = {
    rules : {
        "PI = 3.141592653589793" : true,
        "A + B + C = 180" : true,
        "p = (a + b + c)/2": true,
        "P = 2*p": true,
        "a^2 = b^2 + c^2 - 2*b*c*cos(A/180*PI)" : true,
        "c^2 = b^2 + a^2 - 2*b*a*cos(C/180*PI)" : true,
        "b^2 = a^2 + c^2 - 2*a*c*cos(B/180*PI)" : true,
        "a/sin(A/180*PI) = 2*R" : true,
        "b/sin(B/180*PI) = 2*R" : true,
        "c/sin(C/180*PI) = 2*R" : true,
        "S = a * ha / 2" : true,
        "S = b * hb / 2" : true,
        "S = c * hc / 2" : true,
        "S = a*b*sin(C/180*PI)/2" : true,
        "S = a*c*sin(B/180*PI)/2" : true,
        "S = c*b*sin(A/180*PI)/2" : true,
        "S = a*b*c/(4*R)" : true,
        "S = p * r" : true,
        "S = sqrt(p*(p-a)*(p-b)*(p-c))" : true,
        "ma^2 = (2*(b^2 + c^2) - a^2)/4" : true,
        "mb^2 = (2*(a^2 + c^2) - b^2)/4" : true,
        "mc^2 = (2*(b^2 + a^2) - c^2)/4" : true,
        "la = sqrt(b*c*(1-(a^2)/((b+c)^2)))" : true,
        "lb = sqrt(a*c*(1-(b^2)/((a+c)^2)))" : true,
        "lc = sqrt(b*a*(1-(c^2)/((b+a)^2)))" : true
    }
};
var Expression = {
    rules : {
        "a = b => b = a" : true,

        "a = b + c => a = c + b" : true,
        "a = b * c => a = c * b" : true,

        "a = b + (c + d) => a = (b + c) + d" : true,
        "a = b - (c + d) => a = (b - c) - d" : true,
        "a = b - (c - d) => a = (b - c) + d" : true,

        "a = b + c => a - c  = b" : true,
        "a = b - c => a + c  = b" : true,
        "a = b * c => a / c  = b" : true,
        "a = b / c => a * c  = b" : true,

        "a = sqrt(b) => a^2 = b" : true,
        "a^2 = b => a = sqrt(b)" : true,
        "a^3 = b => a = cbrt(b)" : true,

        "sin(b) = a => b = asin(a)" : true,
        "asin(b) = a => b = sin(a)" : true,
        "cos(b) = a => b = acos(a)" : true,
        "acos(b) = a => b = cos(a)" : true,
        "tan(b) = a => b = atan(a)" : true,
        "atan(b) = a => b = tan(a)" : true,        
        "sinh(b) = a => b = asinh(a)" : true,
        "asinh(b) = a => b = sinh(a)" : true,
        "cosh(b) = a => b = acosh(a)" : true,
        "acosh(b) = a => b = cosh(a)" : true,
        "tanh(b) = a => b = atanh(a)" : true,
        "atanh(b) = a => b = tanh(a)" : true,
        "log(b) = a => b = exp(a)" : true,
        "exp(b) = a => b = log(a)" : true
    }
}

var Set = {
    union : function() {
        var result = [];
        for (var i = 0;i<arguments.length;i++) {
            for (var j = 0; j<arguments[i].length;j++) {
                if (result.indexOf(arguments[i][j]) == -1) {
                    result.push(arguments[i][j]);
                }
            }
        }
        return result;
    },
    intersect : function() {
        var result = [],
            A = arguments[0] || [];
        for (var i = 0; i<A.length;i++) {
            var exist = true;
            for (var j = 1; j<arguments.length;j++) {
                if (arguments[j].indexOf(A[i]) == -1) {
                    exist = false;
                    break;
                }
            }
            if (exist) result.push(A[i]);
        }
        return result;
    },
    minus : function() {
        var result = [],
            A = arguments[0] || [];
        for (var i = 0; i<A.length;i++) {
            var exist = false;
            for (var j = 1; j<arguments.length;j++) {
                if (arguments[j].indexOf(A[i]) > -1) {
                    exist = true;
                    break;
                }
            }
            if (!exist) result.push(A[i]);
        }
        return result;
    },
    subset : function() {
        var result = true;
        if (arguments.length == 2) {
            for (var i = 0;i<arguments[1].length;i++) {
                if (arguments[0].indexOf(arguments[1][i]) == -1) {
                    result = false;
                    break;
                }
            }
        } else result = false;
        return result;
    },
    symmdiff : function() {
        var result = arguments[0] || [],
            index = 1;
        while (index < arguments.length) {
            result = this.minus(this.union(result, arguments[index]), this.intersect(result, arguments[index]));
            index++;
        }
        return result;
    },
    clone : function(original) {
        return original.slice();
    },
    equal : function(arr1, arr2) {
        if (!arr1 || !arr2) return false;
        else {
            if (arr1.length != arr2.length) return false;
            else {
                var tmp1 = arr1.sort();
                var tmp2 = arr2.sort();
                for (var i in arr1) {
                    if (tmp1[i] != tmp2[i]) return false;
                }
            }
        }
        return true;
    },
    extend : function(obj1, obj2) {
        var result = new Object();
        for (var attrname in obj1) {
            result[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            if (!result[attrname]) result[attrname] = obj2[attrname];
        }
        return result;
    }
}

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

function simplereason(hypos, goals, model, reasonOptions) {
    var options = reasonOptions || {};
    var debug = options.debug || false;
    var printfunc =options.printfunc || function(s) { console.log(s); };

    if (debug) {
        print("Hypos: " + hypos);
        print("Goals: " + goals);
    }
    
    var known = {};

    var rules = [];
    var options = {
        debug : false,
        printfunc : print,
        stop : true,
        filterfunc : function(tk, filtervar) {
            return !tk.leftObj.oper
                && !tk.leftObj.rightObj  
                && !Set.subset(tk.rightObj.symbols,tk.leftObj.symbols)
                && filtervar.resultSymbols.indexOf(tk.leftObj.leftObj) == -1;
        },
        afterfilterfunc : function(tk, filtervar) {
            filtervar.resultSymbols.push(tk.leftObj.leftObj);
        },
        filtervar : {resultSymbols : []}
    };
    for (var i in hypos) {
        rules = Set.union(rules, transformbycode(parseParenthese(tokenize(hypos[i])),options));
    }

    for (var i of Object.keys(model.rules)) {
        if (model.rules[i]) rules = Set.union(rules, transformbycode(parseParenthese(tokenize(i)), options));
    }



    if (debug) { print(rules.join("\n")); }

    var hasChange = true;
    while (hasChange && !Set.subset(Object.keys(known),goals)) {
        var before = Object.keys(known).length;

        for (var i in rules) {
            evaluate(rules[i], known);
        }

        if (Object.keys(known).length == before) hasChange = false;
    }

    var result;
    if (Set.subset(Object.keys(known),goals)) {
        if (debug) printfunc("Solved.");
        var result = {};
        var solution = [];
        for (var g of goals) {
            var subsolution = [];
            var stack = [];
            stack.push(g);
            while (stack.length != 0) {
                var attrname = stack.pop();
                subsolution.unshift(attrname);
                for (var symbol of known[attrname].symbols) {
                    if (subsolution.indexOf(symbol) == -1) stack.push(symbol);
                }
            }
            for (var attrname of subsolution) {
                if (solution.indexOf(attrname) == -1) solution.push(attrname);
            }
        }
        for (var attrname of solution) {
            if (known[attrname].symbols.length != 0) result[attrname] = known[attrname];
        }

    } else {
        if (debug) {
            printfunc("Cannot solved.");
            printfunc(JSON.stringify(known));
        }
    }
    return result;
}