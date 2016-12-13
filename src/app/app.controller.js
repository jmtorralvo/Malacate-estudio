class AppController {

    constructor(UserSrv, $state) {
        this.$state = $state;
        this.UserSrv = UserSrv;
    }
    $onInit() {
        this.user = this.UserSrv.getUser();
    }

    userModified({ user }) {
        this.user = user;
        this.$state.go('cards.list');
    }
}

AppController.$inject = ['UserSrv', '$state'];

export default AppController;
