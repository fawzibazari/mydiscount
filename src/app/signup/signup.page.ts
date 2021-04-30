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
  user: UserRegister = {first_name: '', last_name: '',gender: '', email: '',password: '',  number: '',  };

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
      this.isErrorPhone = (regex.test(this.user.number.trim())) ? false : true;
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

}
