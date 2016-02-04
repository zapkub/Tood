/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { ToodMainController } from './tood/main.controller';

angular.module('toodApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'toastr'])
  .constant('moment', moment)
  .constant('TweenMax', TweenMax)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('ToodMainController', ToodMainController)
