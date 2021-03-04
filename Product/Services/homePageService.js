
//productApp.service('homepageservice', function ($http, $q)
ProductApp.service('homePageService', function($http, $q){
    var urlBase = '/api/product/getproductDetails'
    this.getProducts = function () {

        var deferred = $q.defer();
        $http.get(urlBase).success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).error(function (data, status, headers, config) {
            //deferred.reject('Error retrieving products: ' + angular.serverErrorMsg(data));
            deferred.reject(data);
        });

        return deferred.promise;
    };
});