/* jshint esversion:6 */
class CardsService {
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }

    // getAllInventors() {
    //     var def = this.$q.defer();
    //     this.$http.get("http://localhost:8889/getAllInventors")
    //         .success(function(data) {
    //             def.resolve(data);
    //         })
    //         .error(function(error) {
    //             def.reject("Failed to load inventor list");
    //         });
    //     return def.promise;
    // }
    getAllInventors() {
        return this.$http.get("http://localhost:8889/getAllInventors")
        .then( (response) =>response.data , (error) => error)
    }

    getAllInventorsById(id) {
        var def = this.$q.defer();
        this.$http.get("http://localhost:8889/getAllInventors")
            .success(function(data) {
                def.resolve(data.inventors[parseInt(id)]);
            })
            .error(function(error) {
                def.reject("Failed to load inventor list");
            });
        return def.promise;
     }
}

CardsService.$inject = ['$http', '$q'];

export default CardsService;
