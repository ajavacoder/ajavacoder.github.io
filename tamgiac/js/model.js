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