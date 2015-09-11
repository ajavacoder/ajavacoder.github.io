var http = require('http');
var fs = require('fs');
var data_config = '{\
    "additionalConfigs" : { \
        "showRefundLink" : true, \
        "showContactUsLink" : true, \
        "helpUrl" : "helpUrl", \
        "termsOfUseUrl" : "termsOfUseUrl", \
        "privacyPolicyUrl" : "privacyPolicyUrl", \
        "showPoweredBy" : "showPoweredBy", \
        "refundLink" : "refundLink", \
        "contactUrl" : "contactUrl", \
        "websiteUrl" : "websiteUrl", \
        "facebookUrl" : "facebookUrl", \
        "twitterUrl" : "twitterUrl", \
        "googlePlusUrl" : "googlePlusUrl" \
    }\
}';
var data_config_huu = '{ \
    "additionalConfigs" : { \
        "showRefundLink" : true, \
        "showContactUsLink" : true, \
        "helpUrl" : "helpUrl", \
        "termsOfUseUrl" : "termsOfUseUrl", \
        "privacyPolicyUrl" : "privacyPolicyUrl", \
        "showPoweredBy" : "showPoweredBy", \
        "refundLink" : "refundLink", \
        "contactUrl" : "contactUrl", \
        "websiteUrl" : "websiteUrl", \
        "facebookUrl" : "facebookUrl", \
        "twitterUrl" : "twitterUrl", \
        "googlePlusUrl" : "googlePlusUrl" \
    }, \
    "userId" : "userId", \
    "grantedAuthorities" : [{ "authority" : "ROLE_PREPAID_USER1"}], \
    "contactName" : "Huu Nguyen", \
    "contactPhoneNumber" : 123456, \
    "orderId" : "orderId", \
    "patientId" : "patientId", \
    "patientName" : "Lam Nguyen", \
    "patientAddress" : { \
        "addressLine1" : "addressLine1", \
        "city" : "city", \
        "zipCode" : "12345" \
    }, \
    "paymentConfigs" : { \
        "pciWebserviceUrl" : "pciWebserviceUrl", \
        "minimumTransactionAmount" : 50, \
        "securityCodeRequired" : true, \
        "firstNameRequired" : true, \
        "lastNameRequired" : true, \
        "billingAddressRequired" : true, \
        "postalCodeRequired" : true, \
        "idVerificationRequired" : true \
    } \
}';
var data_paymentlist = '[{ \
        "accessionId" : "accessionId_1", \
        "dateOfService" : "1/1/2015", \
        "balanceDueAmount" : 100 \
    },\
    {\
        "accessionId" : "accessionId_2", \
        "dateOfService" : "1/1/2014", \
        "balanceDueAmount" : 200 \
    }]';
var data_sequencenumber = '100';
var data_login = 'OK';
var server = http.createServer(function (req, res) {
    var mapdata = {
        'patientportal/config/huu' : data_config_huu,
        'patientportal/config' : data_config,
        'util/principal' : data_config_huu,
        'paymentList/huu/accession/all/patientId' : data_paymentlist,
        'util/nextSequence' : data_sequencenumber,
        'login' : 'OK',
        'pciWebserviceUrl' : '{ "success" : true, "message" : "Transaction successful." }'
    };
    var str = req.url == '/' ? '/index.html' : req.url;
    var url = str.indexOf('?') > -1 ?str.replace(str.slice(str.indexOf('?') - str.length),'').slice(1):str.slice(1);
    var exists = fs.existsSync(url);
    if (exists) {
        var ext = url.slice(url.lastIndexOf(".")+1);
        switch (ext) {
            case 'html': res.writeHead(200, {'Content-Type': 'text/html'}); break;
            case 'css': res.writeHead(200, {'Content-Type': 'text/css'}); break;
            case 'js': res.writeHead(200, {'Content-Type': 'text/javascript'}); break;
            case 'jpg': res.writeHead(200, {'Content-Type': 'image/jpeg'}); break;
            case 'gif': res.writeHead(200, {'Content-Type': 'image/gif'}); break;
            case 'png': res.writeHead(200, {'Content-Type': 'image/png'}); break;
            default: res.writeHead(200, {'Content-Type': 'text/plain'});
        }
        console.log(">>>> " + url);
        fs.readFile(url, function (err, data) {
            if (err) {
                console.log(err);
            };
            res.end(data);
        });
    } else {
        switch (url) {
            case 'logout' : {
                res.writeHead(200, {'Content-Type': 'text/plain', 
                                    //'Set-Cookie' : 'orgAlias=deleted'
                                   });
                res.end('Bye');
                break;
            }
            case 'login' : {
                res.writeHead(200, {'Content-Type': 'text/plain', 
                                    //'Set-Cookie' : 'orgAlias="huu"'
                                   });
                res.end('OK');
            }
            default: {
                if (mapdata[url]) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(mapdata[url]);
                } else {
                    res.writeHead(404);
                    res.end('NOT FOUND\n');
                }
            }
        }
    }
    if (mapdata[url]) {
        console.log(req.method + " " + url + " -> mapdata");
    } else {
        console.log(req.method + " " + url + (exists ?"":" [fail]"));
    }
});
server.listen(8080, '127.0.0.1');
server.on('error', function(err) {
    console.log(err);
});
console.log('Server running at http://127.0.0.1:8080/');