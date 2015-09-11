angular.module('app', ['cgNotify']);

angular.module('app').controller('DemoCtrl',function($scope,notify){

    $scope.msg = 1;
    $scope.template = '';

    $scope.positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    $scope.orients = [];
    
    $scope.position = $scope.positions[0];
    $scope.orient = $scope.orients[0];

    $scope.duration = 3000;

    $scope.demo = function(){
        notify({
            message: $scope.msg++,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            orient : $scope.orient,
            duration: $scope.duration
        });
    };
    $scope.$watch('position', function(newValue, oldValue) {
        if (newValue) {
            var orients = newValue.split('-');
            $scope.orients = ["from" + orients[0], "from" + orients[1]];
            $scope.orient = $scope.orients[0];
        }
    });

    $scope.closeAll = function(){
        notify.closeAll();
    };

    $scope.demoMessageTemplate = function(){

        var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. '+
        'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

        notify({
            messageTemplate: messageTemplate,
            classes: $scope.classes,
            scope:$scope,
            templateUrl: $scope.template,
            position: $scope.position,
            orient: $scope.orient
        });       

    };

    $scope.clickedLink = function(){
        notify('You clicked a link!');
    };

});