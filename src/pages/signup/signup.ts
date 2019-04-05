import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController) {
  }

  //    All navigation fro the signup page.
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
   