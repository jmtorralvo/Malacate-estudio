class AppController {

    constructor(UserSrv, $state) {
        this.$state = $state;
        this.navOpened = false;
    }
    $onInit() {
    }

    toggleNav(){
        this.navOpened = !this.navOpened;
    }

    foo(){
        alert('foo');
    }

    userModified({ user }) {
    }
}

AppController.$inject = ['$state'];

export default AppController;
