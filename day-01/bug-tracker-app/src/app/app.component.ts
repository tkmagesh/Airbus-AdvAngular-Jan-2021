import { Component } from '@angular/core';
import { registerEndPoint } from './utils/registerEndPoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@registerEndPoint()
export class AppComponent {
  title = 'bug-tracker-app';
}
