class HeaderController {

    constructor(UserSrv, $state) {
    }
    
    $onInit() {
       
    }

    toggleNav(){
        this.open = !this.open;
        this.onChangeNav();  
    }

    /// ToDo: Ojo como se pasa el arg
    userModified({ user }) { 
       
    }  
} 

HeaderController.$inject = [];

export default HeaderController;
