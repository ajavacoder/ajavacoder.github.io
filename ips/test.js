QUnit.test("A + B + C = 180", function (assert) {
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
    var expr = "A + B + C = 180";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "A,+,B,+,C,=,180", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(((A+B)+C)=180)", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(C=(180-(A+B)))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(A=((180-C)-B))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(B=((180-C)-A))", "3 : " + actual3[2]);

});

QUnit.test("p = (a + b + c)/2", function (assert) {
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
    var expr = "p = (a + b + c)/2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "p,=,(,a,+,b,+,c,),/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(p=(((a+b)+c)/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(p=(((a+b)+c)/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=((p*2)-(a+b)))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(a=(((p*2)-c)-b))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(b=(((p*2)-c)-a))", "4 : " + actual3[3]);
    
});

QUnit.test("a^2 = b^2 + c^2 - 2*b*c*cos(A)", function (assert) {
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
    var expr = "a^2 = b^2 + c^2 - 2*b*c*cos(A)";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "a,^,2,=,b,^,2,+,c,^,2,-,2,*,b,*,c,*,cos,(,A,)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((a^2)=(((b^2)+(c^2))-(((2*b)*c)*(cos(A)))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(a=(sqrt((((b^2)+(c^2))-(((2*b)*c)*(cos(A)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(A=(acos(((((b^2)+(c^2))-(a^2))/((2*b)*c)))))", "4 : " + actual3[1]);
    
});

QUnit.test("c^2 = b^2 + a^2 - 2*b*a*cos(C)", function (assert) {
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
    var expr = "c^2 = b^2 + a^2 - 2*b*a*cos(C)";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "c,^,2,=,b,^,2,+,a,^,2,-,2,*,b,*,a,*,cos,(,C,)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((c^2)=(((b^2)+(a^2))-(((2*b)*a)*(cos(C)))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(c=(sqrt((((b^2)+(a^2))-(((2*b)*a)*(cos(C)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(C=(acos(((((b^2)+(a^2))-(c^2))/((2*b)*a)))))", "4 : " + actual3[1]);
    
});

QUnit.test("b^2 = a^2 + c^2 - 2*a*c*cos(B)", function (assert) {
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
    var expr = "b^2 = a^2 + c^2 - 2*a*c*cos(B)";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "b,^,2,=,a,^,2,+,c,^,2,-,2,*,a,*,c,*,cos,(,B,)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((b^2)=(((a^2)+(c^2))-(((2*a)*c)*(cos(B)))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(b=(sqrt((((a^2)+(c^2))-(((2*a)*c)*(cos(B)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(B=(acos(((((a^2)+(c^2))-(b^2))/((2*a)*c)))))", "4 : " + actual3[1]);
    
});

QUnit.test("a/sin(A) = 2*R", function (assert) {
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
    var expr = "a/sin(A) = 2*R";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "a,/,sin,(,A,),=,2,*,R", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((a/(sin(A)))=(2*R))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(a=((2*R)*(sin(A))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(R=((a/(sin(A)))/2))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(A=(asin((a/(2*R)))))", "3 : " + actual3[2]);

});

QUnit.test("b/sin(B) = 2*R", function (assert) {
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
    var expr = "b/sin(B) = 2*R";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "b,/,sin,(,B,),=,2,*,R", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((b/(sin(B)))=(2*R))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(b=((2*R)*(sin(B))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(R=((b/(sin(B)))/2))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(B=(asin((b/(2*R)))))", "3 : " + actual3[2]);

});

QUnit.test("c/sin(C) = 2*R", function (assert) {
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
    var expr = "c/sin(C) = 2*R";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "c,/,sin,(,C,),=,2,*,R", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((c/(sin(C)))=(2*R))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(c=((2*R)*(sin(C))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(R=((c/(sin(C)))/2))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(C=(asin((c/(2*R)))))", "3 : " + actual3[2]);

});

QUnit.test("S = a * ha / 2", function (assert) {
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
    var expr = "S = a * ha / 2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,a,*,ha,/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=((a*ha)/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=((a*ha)/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(a=((S*2)/ha))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(ha=((S*2)/a))", "3 : " + actual3[2]);

});

QUnit.test("S = b * hb / 2", function (assert) {
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
    var expr = "S = b * hb / 2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,b,*,hb,/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=((b*hb)/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=((b*hb)/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(b=((S*2)/hb))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(hb=((S*2)/b))", "3 : " + actual3[2]);

});

QUnit.test("S = c * hc / 2", function (assert) {
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
    var expr = "S = c * hc / 2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,c,*,hc,/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=((c*hc)/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=((c*hc)/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=((S*2)/hc))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(hc=((S*2)/c))", "3 : " + actual3[2]);

});

QUnit.test("S = a*b*sin(C)/2", function (assert) {
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
    var expr = "S = a*b*sin(C)/2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,a,*,b,*,sin,(,C,),/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(((a*b)*(sin(C)))/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(((a*b)*(sin(C)))/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(a=(((S*2)/(sin(C)))/b))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(C=(asin(((S*2)/(a*b)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(b=(((S*2)/(sin(C)))/a))", "4 : " + actual3[3]);
    
});

QUnit.test("S = a*c*sin(B)/2", function (assert) {
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
    var expr = "S = a*c*sin(B)/2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,a,*,c,*,sin,(,B,),/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(((a*c)*(sin(B)))/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(((a*c)*(sin(B)))/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(a=(((S*2)/(sin(B)))/c))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(B=(asin(((S*2)/(a*c)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(c=(((S*2)/(sin(B)))/a))", "4 : " + actual3[3]);
    
});

QUnit.test("S = c*b*sin(A)/2", function (assert) {
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
    var expr = "S = c*b*sin(A)/2";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,c,*,b,*,sin,(,A,),/,2", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(((c*b)*(sin(A)))/2))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(((c*b)*(sin(A)))/2))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=(((S*2)/(sin(A)))/b))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(A=(asin(((S*2)/(c*b)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(b=(((S*2)/(sin(A)))/c))", "4 : " + actual3[3]);
    
});

QUnit.test("S = a*b*c/(4*R)", function (assert) {
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
    var expr = "S = a*b*c/(4*R)";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,a,*,b,*,c,/,(,4,*,R,)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(((a*b)*c)/(4*R)))", "Parse: " + actual2);
    assert.equal( actual3.length, "5", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(((a*b)*c)/(4*R)))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=((S*(4*R))/(a*b)))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(a=(((S*(4*R))/c)/b))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(b=(((S*(4*R))/c)/a))", "4 : " + actual3[3]);
    assert.equal( actual3[4].toString(), "(R=((((a*b)*c)/S)/4))", "5 : " + actual3[4]);
    
});

QUnit.test("S = p * r", function (assert) {
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
    var expr = "S = p * r";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,p,*,r", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(p*r))", "Parse: " + actual2);
    assert.equal( actual3.length, "3", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(p*r))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(p=(S/r))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(r=(S/p))", "3 : " + actual3[2]);

});

QUnit.test("S = sqrt(p*(p-a)*(p-b)*(p-c))", function (assert) {
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
    var expr = "S = sqrt(p*(p-a)*(p-b)*(p-c))";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "S,=,sqrt,(,p,*,(,p,-,a,),*,(,p,-,b,),*,(,p,-,c,),)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(S=(sqrt((((p*(p-a))*(p-b))*(p-c)))))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(S=(sqrt((((p*(p-a))*(p-b))*(p-c)))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=(p-((S^2)/((p*(p-a))*(p-b)))))", "3 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(b=(p-(((S^2)/(p-c))/(p*(p-a)))))", "4 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(a=(p-((((S^2)/(p-c))/(p-b))/p)))", "5 : " + actual3[3]);
    
});

QUnit.test("ma^2 = (2*(b^2 + c^2) - a^2)/4", function (assert) {
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
    var expr = "ma^2 = (2*(b^2 + c^2) - a^2)/4";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "ma,^,2,=,(,2,*,(,b,^,2,+,c,^,2,),-,a,^,2,),/,4", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((ma^2)=(((2*((b^2)+(c^2)))-(a^2))/4))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(ma=(sqrt((((2*((b^2)+(c^2)))-(a^2))/4))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(a=(sqrt(((2*((b^2)+(c^2)))-((ma^2)*4)))))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(b=(sqrt((((((ma^2)*4)+(a^2))/2)-(c^2)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(c=(sqrt((((((ma^2)*4)+(a^2))/2)-(b^2)))))", "4 : " + actual3[3]);
    
});

QUnit.test("mb^2 = (2*(a^2 + c^2) - b^2)/4", function (assert) {
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
    var expr = "mb^2 = (2*(a^2 + c^2) - b^2)/4";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "mb,^,2,=,(,2,*,(,a,^,2,+,c,^,2,),-,b,^,2,),/,4", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((mb^2)=(((2*((a^2)+(c^2)))-(b^2))/4))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(mb=(sqrt((((2*((a^2)+(c^2)))-(b^2))/4))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(b=(sqrt(((2*((a^2)+(c^2)))-((mb^2)*4)))))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(a=(sqrt((((((mb^2)*4)+(b^2))/2)-(c^2)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(c=(sqrt((((((mb^2)*4)+(b^2))/2)-(a^2)))))", "4 : " + actual3[3]);
    
});

QUnit.test("mc^2 = (2*(b^2 + a^2) - c^2)/4", function (assert) {
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
    var expr = "mc^2 = (2*(b^2 + a^2) - c^2)/4";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "mc,^,2,=,(,2,*,(,b,^,2,+,a,^,2,),-,c,^,2,),/,4", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "((mc^2)=(((2*((b^2)+(a^2)))-(c^2))/4))", "Parse: " + actual2);
    assert.equal( actual3.length, "4", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(mc=(sqrt((((2*((b^2)+(a^2)))-(c^2))/4))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=(sqrt(((2*((b^2)+(a^2)))-((mc^2)*4)))))", "2 : " + actual3[1]);
    assert.equal( actual3[2].toString(), "(b=(sqrt((((((mc^2)*4)+(c^2))/2)-(a^2)))))", "3 : " + actual3[2]);
    assert.equal( actual3[3].toString(), "(a=(sqrt((((((mc^2)*4)+(c^2))/2)-(b^2)))))", "4 : " + actual3[3]);
    
});

QUnit.test("la = sqrt(b*c*(1-(a^2)/((b+c)^2)))", function (assert) {
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
    var expr = "la = sqrt(b*c*(1-(a^2)/((b+c)^2)))";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "la,=,sqrt,(,b,*,c,*,(,1,-,(,a,^,2,),/,(,(,b,+,c,),^,2,),),)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(la=(sqrt(((b*c)*(1-((a^2)/((b+c)^2)))))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(la=(sqrt(((b*c)*(1-((a^2)/((b+c)^2)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(a=(sqrt(((1-((la^2)/(b*c)))*((b+c)^2)))))", "4 : " + actual3[1]);
    
});

QUnit.test("lb = sqrt(a*c*(1-(b^2)/((a+c)^2)))", function (assert) {
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
    var expr = "lb = sqrt(a*c*(1-(b^2)/((a+c)^2)))";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "lb,=,sqrt,(,a,*,c,*,(,1,-,(,b,^,2,),/,(,(,a,+,c,),^,2,),),)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(lb=(sqrt(((a*c)*(1-((b^2)/((a+c)^2)))))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(lb=(sqrt(((a*c)*(1-((b^2)/((a+c)^2)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(b=(sqrt(((1-((lb^2)/(a*c)))*((a+c)^2)))))", "4 : " + actual3[1]);
    
});

QUnit.test("lc = sqrt(b*a*(1-(c^2)/((b+a)^2)))", function (assert) {
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
    var expr = "lc = sqrt(b*a*(1-(c^2)/((b+a)^2)))";
    var actual1 = tokenize(expr);
    var actual2 = parseParenthese(actual1);
    var actual3 = transformbymodel(actual2, options);
    
    assert.equal( actual1.toString(), "lc,=,sqrt,(,b,*,a,*,(,1,-,(,c,^,2,),/,(,(,b,+,a,),^,2,),),)", "Tokenize: " + actual1);
    assert.equal( actual2.toString(), "(lc=(sqrt(((b*a)*(1-((c^2)/((b+a)^2)))))))", "Parse: " + actual2);
    assert.equal( actual3.length, "2", "Length: " + actual3.length);
    assert.equal( actual3[0].toString(), "(lc=(sqrt(((b*a)*(1-((c^2)/((b+a)^2)))))))", "1 : " + actual3[0]);
    assert.equal( actual3[1].toString(), "(c=(sqrt(((1-((lc^2)/(b*a)))*((b+a)^2)))))", "4 : " + actual3[1]);
    
});