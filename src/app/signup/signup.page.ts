import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../service/auth.service';
import { UserRegister } from '../interfaces/user-register';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isErrorMail: boolean = true;
  isErrorPhone: boolean = true;
  user: UserRegister = { avatar: '', prenom: '', nom: '', email: '', dateNaiss: '',telephone: '', password: '', confirm_password: '', adresse: '', zipcode: '', ville: '',pays: '1'};
  isPrenom: boolean;
  isNom: boolean = false;
  isDateNaiss: boolean;
  isPassword: boolean;
  isRePass: boolean;
  isAdresse: boolean;
  isCodePostale: boolean;
  isVille: boolean;
  constructor(
      private router: Router,
      // private camera: Camera,
      private auth: AuthService,
      private toast: ToastController,
      private loading: LoadingController
  ) {}

  ngOnInit() {}
    checkEmail() {
      const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
      this.isErrorMail = (regex.test(this.user.email.trim())) ? false : true;
  
    }
    checkPhone() {
      const regex = new RegExp(/^((\+)33|0|0033)[1-9](\d{2}){4}$/g);
      this.isErrorPhone = (regex.test(this.user.telephone.trim())) ? false : true;
  }

  async register() {
      const load = await this.loading.create({
          message: 'Please wait...',
      });
      await load.present();
      // this.user.first_name = this.user.email.split('@')[0];
      this.auth.register(this.user).then(async(data) => {
          console.log(data);
          await this.loading.dismiss();
          this.router.navigate(['/login']);
      }).catch(async(err) => {
          console.log(err);
          const toast = await this.toast.create({
              message: err,
              duration: 2000
          });
          toast.present();
          await this.loading.dismiss();
      })
  }
  check_info(content: string){
    if(content == "nom"){
        if(this.user.nom.length > 0){
            this.isNom = false
        } else {
            this.isNom = true
        }
    }

    if(content == "prenom"){
        if(this.user.prenom.length > 0){
            this.isPrenom = false
        } else {
            this.isPrenom = true
        }
    }

    if(content == "dateNaiss"){
        if(this.user.dateNaiss.toString() == ""){
            this.isDateNaiss = true
        } else {
            this.isDateNaiss = false
        }
    }

    if(content == "mdp"){
        if(this.user.password.length > 5){
            this.isPassword = false
        } else {
            this.isPassword = true
        }
    }

    if(content == "remdp"){
        if(this.user.confirm_password == this.user.password){
            this.isRePass = false
        } else {
            this.isRePass = true
        }
    }

    if(content == "remdp"){
        if(this.user.confirm_password == this.user.password){
            this.isRePass = false
        } else {
            this.isRePass = true
        }
    }

    if(content == "adresse"){
        if(this.user.adresse.length > 0){
            this.isAdresse = false
        } else {
            this.isAdresse = true
        }
    }

    if(content == "cp"){
        if(this.user.zipcode != null){
            this.isCodePostale = false
        } else {
            this.isCodePostale = true
        }
    }

    if(content == "ville"){
        if(this.user.ville.length > 0){
            this.isVille = false
        } else {
            this.isVille = true
        }
    }
}

}
