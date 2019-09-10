import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { map, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { LoginService } from './login.service';
import { URL_SERVICIOS } from 'src/config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  observacion: string;
  lugar: string;
  descp: string;
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage,
              private _us: LoginService ) { }


  guardarTarea(obs, lugar, des){
      const data = {
        des,
        lugar,
        obs
      };
      const url = `${ URL_SERVICIOS }/tareas/realizar_tarea/${ this._us.token }/${ this._us.id_usuario }`;
      console.log(url);
      console.log(data);
      this.http.post( url, data ).pipe(map(async (resp: any) => {
        console.log(resp.error);
        if (resp.error) {
          const alert = await this.alertController.create({
           header: 'Error al Iniciar',
           message: resp.mensaje,
           buttons: ['OK']
           });
          await alert.present();
       } else {

        const alert = await this.alertController.create({
          header: 'Tarea realizada!',
          message: resp.mensaje,
          buttons: ['OK']
          });
        await alert.present();
       }
      }));

  }

}
