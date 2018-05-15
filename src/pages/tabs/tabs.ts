import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = 'NotificationsPage';
  tab3Root = 'UsersListPage';
  tab4Root = 'ProfilePage';
  tab5Root = '';


  constructor() {

  }
}
