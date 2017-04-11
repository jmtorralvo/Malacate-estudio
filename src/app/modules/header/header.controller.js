/*import Parallux from 'parallux';*/

class HeaderController {
    constructor() {
    'ngInject';
    }
    
    $onInit() {
       //new Parallux(document.querySelector('#logo'));
       /* var elems = document.querySelectorAll('.parallux-container');
        for (var i = 0, l = elems.length; i < l; i++) {
            new Parallux(elems[i]);
        }*/
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
