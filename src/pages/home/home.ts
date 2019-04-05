import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  private afs: AngularFirestore 

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, db: AngularFirestore, private menu: MenuController) {

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

   //   Simple home, only does login
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage); 
  }goToWelcome(params){
    if (!params) params = {};
    this.navCtrl.push(WelcomePage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage); 
  }
}
