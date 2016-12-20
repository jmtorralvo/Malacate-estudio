class NavigationController {
    constructor(UserSrv, $state, $scope) {
        this.scope = $scope;
    } 
    $onInit() {
       console.log(this);
       console.log(this.open);
       console.log('NavigationController5'); 
    }

}

NavigationController.$inject = [];

export default NavigationController;
