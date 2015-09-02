var app = angular.module('GreatApp',[]);

app.controller('GreatCtrl',['$rootScope', '$scope', function($rootScope, $scope) {
    var pdfObj = null;
    $scope.currentpage = 1;
    $scope.ratio = 1;
    $scope.load = function() {
        PDFJS.getDocument('test.pdf')
        .then(function(pdf) {
            pdfObj = pdf;
            $scope.display($scope.currentpage);
        }).catch(function(err) {
            console.log("Error: " + err.message);
        });
    };
    $scope.next = function() {
        if (pdfObj) {
            $scope.currentpage = ($scope.currentpage + 1 > pdfObj.pdfInfo.numPages
                ? $scope.currentpage
                : $scope.currentpage + 1);
        }
    };
    $scope.prev = function() {
        if (pdfObj) {
            $scope.currentpage = ($scope.currentpage - 1 < 1 
                ? $scope.currentpage
                : $scope.currentpage - 1);
        }
    };
    $scope.last = function() {
        if (pdfObj) {
            $scope.currentpage = pdfObj.pdfInfo.numPages;
        }
    };    
    $scope.first = function() {
        if (pdfObj) {
            $scope.currentpage = 1;
        }
    };
    $scope.zoomin = function() {
        if (pdfObj) {
            $scope.ratio = $scope.ratio + 0.1 > 1.5
                ? $scope.ratio
                : $scope.ratio + 0.1;
        }
    };
    $scope.zoomout = function() {
        if (pdfObj) {
            $scope.ratio = $scope.ratio + 0.1 < 0.75
                ? $scope.ratio
                : $scope.ratio - 0.1;
        }
    };
    
    $scope.display = function(pageId) {
        pdfObj.getPage(pageId).then(function(page) {
            var scale = $scope.ratio;
            var viewport = page.getViewport(scale);

            var canvas = document.getElementById('viewer');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
            console.log("Display page: " + pageId);
        }).catch(function(err) {
            console.log("Error: " + err.message);
        });
    };
    $scope.$watch('currentpage', function(newValue, oldValue) {
        if (pdfObj && (newValue !== oldValue)) $scope.display(newValue);
    });
    $scope.$watch('ratio', function(newValue, oldValue) {
        if (pdfObj && (newValue !== oldValue)) $scope.display($scope.currentpage);
    });
}]);