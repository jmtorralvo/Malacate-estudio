class HeaderController {

    constructor(UserSrv, $state) {
        /*this.$state = $state;
        this.UserSrv = UserSrv;*/
        this.open = false;
    }
    $onInit() {
       
    }

    toggleNav(){
        this.open = !this.open;

    }

    /// ToDo: Ojo como se pasa el arg
    userModified({ user }) {
       
    }
}

HeaderController.$inject = [];

export default HeaderController;
