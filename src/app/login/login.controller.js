/* jshint esversion:6 */

class Login {
    constructor(LoginSrv, UserSrv, EventEmitter, $state, $http) {
        this.user = '';
        this.pass = '';

        this.LoginSrv = LoginSrv;
        this.UserSrv = UserSrv;
        this.EventEmitter = EventEmitter;

        if(this.UserSrv.getUser()){
            $state.go('cards.list');
        }
    }

    login(params) {
        this.LoginSrv.login({
            user: this.user,
            pass: this.pass
        })
        .then((resp)=>{
            if(resp.user.id){
                this.UserSrv.setUser(resp.user);
                this.onUserModified(
                    //This wrapper emulated event comunication in ng2
                 this.EventEmitter({
                   user: resp.user
                 })
                );
            }
        })
        .catch((err) => {
          throw err;
        });
    }
}

Login.$inject = ['LoginSrv', 'UserSrv', 'EventEmitter', '$state', '$http'];

export default Login;
