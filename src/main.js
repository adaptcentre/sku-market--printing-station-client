import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css'
import Aurelia from 'aurelia';
import { MyApp } from './my-app';

Aurelia
  .app(MyApp)
  .start();
