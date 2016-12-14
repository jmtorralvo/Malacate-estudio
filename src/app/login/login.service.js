/* jshint esversion:6 */
class LoginService {
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }

    login(params) {
        return this.$http.post('http://localhost:8889/login', params)
        .then( (response) =>response.data , (error) => error)
    }
}

LoginService.$inject = ['$http', '$q'];

export default LoginService;
