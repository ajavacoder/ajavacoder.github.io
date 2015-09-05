var app = angular.module('GreatApp',[]);

app.controller('GreatCtrl',['$rootScope', '$scope', function($rootScope, $scope) {
    var tiffObj = null;
    var len = 0;
    var viewer = $('#viewer');
    Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});
    $scope.currentpage = 1;
    $scope.ratio = 1;
    $scope.load = function() {        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'multipage.tiff');
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
        var buffer = xhr.response;
        tiffObj = new Tiff({buffer: buffer});
        len = tiffObj.countDirectory();
        $scope.display($scope.currentpage);
      };
      xhr.send();
    };
    $scope.next = function() {
        if (tiffObj) {
            $scope.currentpage = ($scope.currentpage + 1 > len
                ? $scope.currentpage
                : $scope.currentpage + 1);
        }
    };
    $scope.prev = function() {
        if (tiffObj) {
            $scope.currentpage = ($scope.currentpage - 1 < 1 
                ? $scope.currentpage
                : $scope.currentpage - 1);
        }
    };
    $scope.last = function() {
        if (tiffObj) {
            $scope.currentpage = len;
        }
    };    
    $scope.first = function() {
        if (tiffObj) {
            $scope.currentpage = 1;
        }
    };
    $scope.zoomin = function() {
        if (tiffObj) {
            $scope.ratio = $scope.ratio + 0.1 > 1.5
                ? $scope.ratio
                : $scope.ratio + 0.1;
        }
    };
    $scope.zoomout = function() {
        if (tiffObj) {
            $scope.ratio = $scope.ratio + 0.1 < 0.75
                ? $scope.ratio
                : $scope.ratio - 0.1;
        }
    };
    
    $scope.display = function(pageId) {
        tiffObj.setDirectory(pageId);
        var canvas = tiffObj.toCanvas();
        viewer.empty();
        viewer.append(canvas);
        console.log("Display page: " + pageId);
    };
    $scope.$watch('currentpage', function(newValue, oldValue) {
        if (tiffObj && (newValue !== oldValue)) $scope.display(newValue);
    });
    $scope.$watch('ratio', function(newValue, oldValue) {
        if (tiffObj && (newValue !== oldValue)) $scope.display($scope.currentpage);
    });
}]);