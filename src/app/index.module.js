/* global malarkey:false, moment:false, THREE:false , TweenMax:false  */
import { config } from './index.config';
import { createStore ,combineReducers } from 'redux';
import ngRedux from 'ng-redux';
import * as chance from 'chance';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController,DigitalMeterDirective } from './soohuk/main.controller'
import { random } from './soohuk/reducers';

angular.module('tood', ['ngAnimate','facebook','ngRedux', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'toastr','ngAnimate','anim-in-out'])
  .constant('moment', moment)
//  .constant('THREE',THREE)
  .constant('createStore',createStore)
  .constant('TweenMax', TweenMax)
  .constant('chance',chance)
  .config(config)
  .config(routerConfig)
  .config(($ngReduxProvider,FacebookProvider)=>{
    'ngInject';
    //Config redux
    let fb_id_test = "1051893558178674";
    let fb_id = "686718618137000"
    FacebookProvider.init(fb_id);
    let reducers = combineReducers({random});
    $ngReduxProvider.createStoreWith(reducers,[],[
       window.devToolsExtension ? window.devToolsExtension() : f => f
    ])

  })
  .run(runBlock)
  .directive('dateMeter', DigitalMeterDirective)
  .controller('MainController', MainController)
