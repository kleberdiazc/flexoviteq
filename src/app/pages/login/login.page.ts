import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  contrasena:string = '';
  constructor(public navCtrl: NavController,
              public _login: LoginService,
              public router: Router) { }

  ngOnInit() {
  }
  ingresar(){
    this._login.ingresar(this.correo, this.contrasena)
              .subscribe(() => {
                console.log('OK');
                this.router.navigate(['/home']);
              });
  }
}
