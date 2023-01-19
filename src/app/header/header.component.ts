import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  openHelp = false;

  help(bool:boolean) {
    this.openHelp = bool;
  }
}
