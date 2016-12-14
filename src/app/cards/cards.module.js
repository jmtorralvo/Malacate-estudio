require("./cards.module.scss");

import uiRouter from 'angular-ui-router';

import CardsRoutesConfig from './cards.routes.js';
import SearchCardModule from './search-card/search-card.module';
import CardsListComponent from './cards-list.component';
import CardComponent from './single-card/card.component';
import CardsService from './cards.service';


const CardModule = angular
  .module('cards', [SearchCardModule, uiRouter])
  .config(CardsRoutesConfig)
  .component('bkCard', CardComponent)
  .component('bkCardsList', CardsListComponent)
  .service('CardsService', CardsService)
  .name;


export default CardModule;
