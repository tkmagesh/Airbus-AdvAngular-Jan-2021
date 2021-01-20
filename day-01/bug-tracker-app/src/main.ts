import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import endPoints from './app/utils/registerEndPoint';

import Math from './app/utils/math';
const math = new Math(100);

console.log(endPoints);

/*const math2 = new Math(200); */

/* 

console.log(math.add(100,200));
console.log(math.subtract(100,200));
 */
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  /* 
    Employees - 'http://serverApi.com/employees'
    Customers - 'http://serverApi.com/customers'
    Products - 'http://serverApi.com/products'
   */

