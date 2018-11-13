import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CFP';
  static API_URL="http://localhost:8081";
  //static API_URL="http://18.228.199.95:8081";
}
