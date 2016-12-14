/* jshint esversion:6 */

class CardsListController {
    constructor(CardsService, UserSrv) {
        this.title = 'Grandes inventores de la historia';
        this.UserSrv = UserSrv;
        this.user = this.UserSrv.getUser();
        this.noResults = true;
        this.myCustomFilter;


        CardsService.getAllInventors()
            .then((response) => {
              debugger;
                this.inventors = response.inventors;
            }, (error) => {
                console.log('error', error);
            });
    }

    cardChanged(card) {
        console.log('function called from card function "toggleSelection" ', card);
        console.log('this.title', this.title);
    }
}

CardsListController.$inject = ['CardsService', 'UserSrv'];

export default CardsListController;
