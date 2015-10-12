var app = angular.module('AutomationApp', [
    'ui.grid'
]);

app.controller('AutoCtrl', ['$scope', 'receiptService', 'imageService', function($scope, receiptService, imageService) {
    $scope.appName = "Automation App";
    $scope.ngGridOptions = {};
    $scope.start = function() {
        receiptService.getReceipts().then(
            function(data) {
                $scope.ngGridOptions.data = data;
            },
            function(err) {
                console.log(err);
            }
        );
    }
    $scope.getImage = function() {
        imageService.convertToBase64('download.png').then(
            function(data) {
                console.log('Success: ' + data);
            },
            function(err) {
                console.log('Err: ' + err);
            }
        );
    };
}]);

app.service('receiptService', ['$http', '$q', function($http, $q) {
    this.getReceipts = function() {
        var deferred = $q.defer();
        $http.get('/data/100.json').then(
            function(data) {
                deferred.resolve(data.data);
            },
            function(err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };
}]);

app.service('imageService', ['$q', function($q) {
    this.convertToBase64 = function(url) {
        var deferred = $q.defer();
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL();
            deferred.resolve(dataURL);
            canvas = null; 
        };
        img.src = url;
        return deferred.promise;
    };
}]);
