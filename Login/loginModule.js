
var loginApp = angular.module('loginApp', ['ui.bootstrap']);

// Custom directive to handle auto-complete form by browser
loginApp.directive('autofillable', function ($timeout) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            scope.check = function () {
                var val = elm[0].value;
                if (ctrl.$viewValue !== val) {
                    ctrl.$setViewValue(val);
                }
                $timeout(scope.check, 300);
            };
            scope.check();
        }
    };
});

// this controller for the login form
function loginController($scope, $http) {

    // for button login
    $scope.loginUser = function (user) {
        $scope.loading = true;
        // if return url is not empty, by default, the user will be redirected to their default page
        $http.put('/api/auth', user).success(function (data, status, headers, config) {

            window.location = '../Product/index.html';
        }).error(function (data, status, headers, config) {
            var errorMsg = data.Message || data.ExceptionMessage || 'An error occurred when trying to login. HTTP status = ' + status;
            createLoginAlert(errorMsg, 'danger');
            $scope.loading = false;
        });
    }

    // close alert manually
    $scope.closeLoginAlert = function (index) {
        $scope.loginAlert.splice(index, 1);
    }

    // create alert with auto close in 5s
    var alertTimer;
    function createLoginAlert(text, type) {
        clearTimeout(alertTimer);

        $scope.loginAlert = [];
        $scope.loginAlert.push({ type: type, msg: text });
        alertTimer = setTimeout(function () {
            $scope.loginAlert.splice(0, 1);
        }, 5000);
    }
};