import angular from 'angular';

import bkSearchCard from './search-card.component';
import SearchCardService from './search-card.service';

const SearchCardModule = angular
  .module('searchCard', [])
  .component('bkSearchCard', bkSearchCard)
  .service('SearchCardService', SearchCardService)
  .name

export default SearchCardModule;
