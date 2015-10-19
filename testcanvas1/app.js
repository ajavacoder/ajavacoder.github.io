var app = angular.module("GreatApp",[
    
]);

app.controller("GreatCtrl", ['$scope', '$interval', function($scope, $interval) {
    $scope.image = document.getElementById("image");
    $scope.canvas = document.getElementById("canvas");

    $scope.minScale = 1;
    $scope.startTransform = {
        scale : 1,
        rotate : 0,
        translate : {
            x : $scope.canvas.width/2,
            y : $scope.canvas.height/2
        }
    };
    $scope.targetTransform = {
        scale : 1,
        rotate : 0,
        translate : {
            x : $scope.canvas.width/2,
            y : $scope.canvas.height/2
        }
    };
    $scope.currentTransform = {};
    $scope.FRAME_PER_ACTION = 24;
    $scope.frame = 0;
    $scope.doDrawImage = function() {
        if ($scope.frame <= $scope.FRAME_PER_ACTION) {
            $scope.currentTransform = {
                scale : $scope.startTransform.scale + ($scope.targetTransform.scale - $scope.startTransform.scale)*$scope.frame/$scope.FRAME_PER_ACTION,
                rotate : $scope.targetTransform.rotate,
                translate : {
                    x : $scope.startTransform.translate.x + ($scope.targetTransform.translate.x - $scope.startTransform.translate.x)*$scope.frame/$scope.FRAME_PER_ACTION,
                    y : $scope.startTransform.translate.y + ($scope.targetTransform.translate.y - $scope.startTransform.translate.y)*$scope.frame/$scope.FRAME_PER_ACTION
                }
            };
            $scope.drawImage($scope.currentTransform);
            $scope.frame++;
        } else if ($scope.frame == $scope.FRAME_PER_ACTION + 1) {
            $scope.startTransform = angular.copy($scope.targetTransform);
            $scope.frame++;
        } else if ($scope.frame == 0) {
            $scope.startTransform = angular.copy($scope.currentTransform);
            $scope.frame++;
        }        
    }
    $scope.drawImage = function(transform) {
        var context = $scope.canvas.getContext('2d');
        context.clearRect(0,0,$scope.canvas.width, $scope.canvas.height);
        context.save();
        context.translate(transform.translate.x, transform.translate.y);
        context.scale(transform.scale, transform.scale);
        context.rotate(transform.rotate*Math.PI/180);

        context.drawImage($scope.image, $scope.image.width / -2, $scope.image.height / -2, $scope.image.width, $scope.image.height);
        context.restore();
    };
    $interval($scope.doDrawImage, 10, 0, false);

    $scope.onload = function() {
        $(window).trigger("resize");
    };
    window.onload = function() {
        $(window).trigger("resize");
    }
    window.onresize = function() {
        if (window.innerWidth > 990) {
            $scope.canvas.width = window.innerWidth*6/12 - 120;
        } else {
            $scope.canvas.width = window.innerWidth - 48;
        }        
        
        $scope.minScale = $scope.targetTransform.scale = Math.min($scope.canvas.width/$scope.image.width, $scope.canvas.height/$scope.image.height);
        $scope.targetTransform.translate = {
            x : $scope.canvas.width/2,
            y : $scope.canvas.height/2
        };
        $scope.frame = 0;
    };
    /*
    $(document).on('keydown', function(event){
        event.preventDefault();
        var keyCode = event.which || event.keyCode || 0;
        switch (keyCode) {
            case 39: $scope.targetTransform.translate.x += 20; break;
            case 38: $scope.targetTransform.translate.y -= 20; break;
            case 37: $scope.targetTransform.translate.x -= 20; break;
            case 40: $scope.targetTransform.translate.y += 20; break;
        };
        $scope.frame = 0;
        window.requestAnimationFrame($scope.doDrawImage);
    });
    */
    $($scope.canvas).on('mousewheel', function(event) {
        event.preventDefault();
        console.log(event.deltaY);
        var newScale = $scope.targetTransform.scale;
        if (event.deltaY > 0) {
            newScale = newScale * 1.2;
        } else if (event.deltaY < 0){
            newScale = newScale / 1.2;
        } else return;
        var minScale = $scope.minScale.toString();
        minScale = minScale.substring(0, minScale.length - 2);
        if (newScale >= minScale && newScale < 8) {            
            $scope.targetTransform.translate.x -= (event.offsetX - $scope.targetTransform.translate.x)*(newScale - $scope.targetTransform.scale)/$scope.targetTransform.scale;
            $scope.targetTransform.translate.y -= (event.offsetY - $scope.targetTransform.translate.y)*(newScale - $scope.targetTransform.scale)/$scope.targetTransform.scale;
            $scope.targetTransform.scale = newScale;
            $scope.frame = 0;
            window.requestAnimationFrame($scope.doDrawImage);
            //$scope.doDrawImage();
        };      
    });
    $scope.image.src = "walmart.jpg";
}]);