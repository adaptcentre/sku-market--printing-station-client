import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

import 'bootstrap-icons/font/bootstrap-icons.css'
import Aurelia, { RouterConfiguration } from 'aurelia'
import { MyApp } from './my-app'

  
Aurelia
  .register(RouterConfiguration.customize())
  .app(MyApp)
  .start()