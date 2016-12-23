class AppController {
    constructor(UserSrv, $state) {
        'ngInject';
        this.$state = $state;
        this.navOpened = false;
    }
    $onInit() {
        
    }

    toggleNav(){
        this.navOpened = !this.navOpened;
    }

    userModified({ user }) {
    }
}

AppController.$inject = ['$state'];

export default AppController;

