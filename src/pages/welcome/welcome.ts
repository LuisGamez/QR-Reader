import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RechumPage } from '../rechum/rechum';
import { SegindPage } from '../segind/segind';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  showHC(){
    console.log("cambia a home");
    this.navCtrl.setRoot(HomePage);
  }

  showRH(){
    console.log("cambia a RH");
    this.navCtrl.setRoot(RechumPage);
  }

  showSI(){
    console.log("cambia a SI");
    this.navCtrl.setRoot(SegindPage);
  }
}
