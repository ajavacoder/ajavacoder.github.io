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