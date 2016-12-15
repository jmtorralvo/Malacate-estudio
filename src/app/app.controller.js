class AppController {

    constructor(UserSrv, $state) {
        this.$state = $state;
    }
    $onInit() {
    }

    userModified({ user }) {
    }
}

AppController.$inject = ['$state'];

export default AppController;
