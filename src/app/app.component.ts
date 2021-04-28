import { Component, OnInit } from '@angular/core';
import { UtilService } from './util.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { menuController } from '@ionic/core';
@Component({
  
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;


  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
  ) {
    this.initializeApp();
  }

    initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    menuController.toggle();
  }
}
  

