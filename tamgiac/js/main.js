$(document).ready(function() {
    var initHypothese = 'A = 10, B = 20',
        initGoals = 'C',
        initExpression = 'S = a*b*c/(4*R)';
        
    $('input[name="expr"]').val(initExpression);

    $("#inputContainer" ).accordion({ active: 1});
    $('#outputContainer').accordion();
    $("button").button();
    
    $('#startEvaluate').hide();

    $('#startReason').on('click', function(e) {
        print('clear');
        solveTriangle();
    });

    $('#startParsing').on('click', function(e) {
        print('clear');
        parseExpression();
    });

    $('#startEvaluate').on('click', function(e) {
        print('clear');
        evaluateExpression();
    });
    
    $('#startTransform').on('click', function(e) {
        print('clear');
        transformExpression();
    });
});

function print() {
    if (arguments && arguments[0] === 'clear') $('#output').val("");
    else {
        for (var i = 0;i<arguments.length;i++) {
            $('#output').val($('#output').val() + arguments[i] + '\n');
        }
    }
}

function solveTriangle() {
    var hypos = Set.minus($('input[name="hypo"]').val().replace(/[ ]/g,"").split(","),[""]);
    var goals = Set.minus($('input[name="goal"]').val().split(/[ ,]/),[""]);

    var result = simplereason(hypos, goals, Triangle, {debug: false, printfunc : print});
    if (result) print(Object.keys(result).map(function(n) { 
        var str = "*  ";
        if (result[n].formula.source) str += result[n].formula.source + "\n     => ";
        str += result[n].formula + "\n     => ";
        str+= n + " = " + result[n].value;
        return str;
    }).join("\n"));
    else print("Cannot solved.");
}

function parseExpression() {
    var expr = $('input[name="expr"]').val();
    var known = {a: 5, b:6, c: 8, d:4, PI:Math.PI};

    var result = tokenize(expr);
    var result1 = parseParenthese(result);

    print(result);
    print(result1);
}

function evaluateExpression() {
    var expr = $('input[name="expr"]').val();
    var known = {a: 5, b:6, c: 8, d:4, PI:Math.PI};

    var result = tokenize(expr);
    var result1 = parseParenthese(result);
    var result2 = evaluate(result1, known);

    print(result);
    print(result1);
    print(result2);
}

function transformExpression() {
    var expr = $('input[name="expr"]').val();
    resolve(expr);
}

function resolve(expr) {
    var token = parseParenthese(tokenize(expr));
    if (!token.oper || token.oper.oper != "=") {
        print(token + " is not an equation.");
        return;
    }
    var options = {
        debug : true,
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
    var results = transformbymodel(token, options);
    if (results && results.length != 0) {
        print("-----");
        for (var i in results) {
            print(results[i]);
        }
    } else {
        print("Cannot solve: " + token);
    }
}

