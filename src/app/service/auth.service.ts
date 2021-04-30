import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { UserRegister } from '../interfaces/user-register';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    url: string = 'https://lighted-14685.nodechef.com/auth'; 

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return new Promise((resolve, rejects) => {
            this.http.post(this.url + '/login', { email: email, password: password }).subscribe((data: any) => {
                (!data.token) ? rejects(data.message): resolve(data);
              
            });
        });
    }

    register(user: UserRegister) {
        return new Promise((resolve, rejects) => {
            this.http.post(this.url + '/register', user).subscribe((data: any) => {
                (!data.token) ? rejects(data.message): resolve(data);
                

            });
        });
    }


    // getProfile() {
    //     return this.http.get(this.url + '/profil');
    // }

    // getProfile() {
    //     return this.http.get(this.url + '/profil');
    // }
        
    
}