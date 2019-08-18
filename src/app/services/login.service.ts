import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { map, filter } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string;
  id_usuario:string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage) { }

  ingresar(correo: string, contrasena: string){
    // tslint:disable-next-line:prefer-const
    let data = {
      correo,
      contrasena
    };
    console.log(correo, contrasena);
    return this.http.post('http://www.flexoviteq.com.ec/rest/index.php/login', data).pipe(map(async (resp: any) => {
      if (resp.error) {
         const alert = await this.alertController.create({
          header: 'Error al Iniciar',
          message: resp.mensaje,
          buttons: ['OK']
          });
         await alert.present();
      } else {
        this.token  = resp.token;
        this.id_usuario  = resp.id_usuario;
        // guardar
        this.guardar_Storage();
      }
    }));

  }

  private guardar_Storage() {
    if(this.platform.is('cordova'))  {
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else{
      if(this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id_usuario', this.id_usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
      }

    }
  }

  private cargarStorage() {
    let promesa = new Promise(( resolve ,reject)=>{
      if(this.platform.is('cordova')) {
        this.storage.ready()
                    .then( () => {
                      this.storage.get('token')
                                  .then(token => {
                                   if (token) {
                                     this.token = token;
                                   }
                                  });
                      this.storage.get('id_usuario')
                                  .then(id_usuario => {
                                   if (id_usuario) {
                                     this.id_usuario = id_usuario;
                                   }
                                   resolve();
                                  });
                    });
     } else {
       if (localStorage.getItem('token')) {
         this.token = localStorage.getItem('token');
         this.token = localStorage.getItem('id_usuario');
       }
       resolve();
       return promesa;
     }
    });

  }
  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_Storage();
  }

}
