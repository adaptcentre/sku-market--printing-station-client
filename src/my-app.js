import { route } from 'aurelia';

@route({
  routes: [
    { path: '', redirectTo: 'welcome' },
    { id: 'welcome', path: 'welcome', component: import('./resources/routes/welcome'), title: 'Welcome' },
    { id: 'printing', path: 'printing', component: import('./resources/routes/printing'), title: 'Printing' }
  ]
})


export class MyApp {

}
