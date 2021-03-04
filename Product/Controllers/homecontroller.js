//homeController.js
var ProductApp = angular.module('ProductApp', ['ngRoute', 'ngSanitize', 'ui', 'ui.bootstrap', 'ui.keypress', 'infinite-scroll']);

//ProductApp.controller("homecontroller",
//    function ($scope, $rootScope, homePageService) {
function homecontroller($scope, $rootScope, homePageService) {
    $scope.reportAlert = [];
        var displayedCols = ['Product Id', 'Product Name', 'Description', 'UnitPrice', 'Maximum Quantity'];
        $scope.tableHead = [
            { display: 'Product Id', name: displayedCols[0], width:"5%"},
            { display: 'Product Name', name: displayedCols[1], width: "15%", cssClass: 'large-screen'},
            { display: 'Description', name: displayedCols[2], width: "20%", cssClass: 'large-screen'},
            { display: 'Unit Price', name: displayedCols[3], width: "15%", cssClass: 'large-screen'},
            { display: 'Maximum Quantity', name: displayedCols[4], width: "5%"}
        ];

        // show more tasks by extend the limit count
        $scope.showMoreData = function () {
            $scope.limitCount += 20;
        }


        $scope.displayedCols = displayedCols;
        $scope.user = $rootScope.userName;
        $scope.Loading = true;
        homePageService.getProducts().then
            (function (list) {
                $scope.productList = list;
                displayProducts(list);
                $scope.productlists = angular.copy(productList);
               
                // check if there are no data
                if ($scope.productList.length < 1) {
                    $scope.reportAlert.push({ type: 'info', msg: 'There are no listed products' });
                }
            }, function (reason) {
                    $scope.loading = false;
                    $scope.reportAlert.push({ type: 'danger', msg: reason });
            });


        // Prepare report list to display
        function displayProducts(list) {
            // Reset alert
            $scope.reportAlert = [];

            // All reports
            $scope.productList = angular.copy(list);
            // Limit displayed reports
            reports.splice($scope.dataPerLoad, list.length - $scope.dataPerLoad);

            // This will be used for filtering reports
            $scope.dataList = list;
            // This will contain the reports that have been filtered
            $scope.filteredproducts = list;

            if (!list.length) {
                $scope.showWarnMessage = true;
                showNoReportsMessage();
            }

            // set search query from previous state (if any)
            if (querykey)
                $scope.query = querykey;
        }

        // Show a message for no reports
        function showNoReportsMessage() {
        var noReportMsg = ($scope.showWarnMessage)? 'There are no reports that can be run' : '';
            $scope.reportAlert = [{ type: 'info', msg: noReportMsg }];
        }


    };