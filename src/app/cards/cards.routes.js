/* jshint esversion:6 */

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cards.list', {
            url: '/list',
            views: {
                "cardsView@cards": {
                    component: 'bkCardsList'
                }
            }
        })
        .state('cards.details', {
            url: '/card-details/:id',
            abstract: true,
            params: {
                id: '',
                card: {}
            },
            resolve: {
                card: ($stateParams, CardsService, $q) => {
                    return CardsService.getAllInventorsById($stateParams.id)
                        .then((value) => {
                            return value;
                        });
                }
            },
            views: {
                'cardsView@cards': {
                    //template: '<h1>detail</h1><div ui-view="detailView"></div>'
                    templateUrl: './app/cards/card-details/card-details.html'
                }
            }
        })
        .state('cards.details.info', {
            url: '/info',
            views: {
                'detailView@cards.details': {
                    templateUrl: './app/cards/card-details/card-details-info.html',
                    controller: function(card) {
                        // Because parent state is abstract, we can receive resolve object from there in this controller and modify it.
                        card.edit = false;
                    }
                }
            }
        })
        .state('cards.details.edit', {
            url: '/edit',
            views: {
                'detailView@cards.details': {
                    templateUrl: './app/cards/card-details/card-details-edit.html',
                    controller: function(card) {
                        // Because parent state is abstract, we can receive resolve object from there in this controller and modify it.
                        card.edit = true;
                    }
                }
            }
        });
}

export default config;
