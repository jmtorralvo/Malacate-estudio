/* jshint esversion:6 */
class CardController {
    constructor() {
        this.ngModel.selected = this.ngModel.selected ? this.ngModel.selected : false;
    }

    toggleSelection(model) {
        model.selected = !model.selected;
        this.onChangeCard(model);
    }
}

export default CardController;
