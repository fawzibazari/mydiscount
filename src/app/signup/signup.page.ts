import { Component, OnInit } from '@angular/core';

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
  user: UserRegister = { avatar: '', first_name: '', last_name: '', email: '', phone: '', password: '', confirm_password: '' };

  constructor(
      private router: Router,
      private camera: Camera,
      private auth: AuthService,
      private toast: ToastController,
      private loading: LoadingController
  ) {}

  ngOnInit() {
    
  }

}
