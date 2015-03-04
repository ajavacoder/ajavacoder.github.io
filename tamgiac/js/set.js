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