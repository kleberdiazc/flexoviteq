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
  tareas: any[] = [];
  constructor(private http: HttpClient,
              public alertController: AlertController,
              public platform: Platform,
              private storage: Storage,
              private _us: LoginService
              ) { }


  guardarTarea(obs, lugar, des){
      const pdata = {
        des,
        lugar,
        obs
      };
      const url = `${ URL_SERVICIOS }/tareas/realizar_tarea/${ this._us.token }/${ this._us.id_usuario }`;
      console.log(url);
      console.log(pdata);
      this.http.post(url, pdata)
      .subscribe( async (data: any) => {
        if(data.error === true ) {
          const alert = await this.alertController.create({
            header: 'Error al Iniciar',
            message: data.mensaje,
            buttons: ['OK']
            });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error al Iniciar',
            message: data.mensaje,
            buttons: ['OK']
            });
          await alert.present();
        }
       }, error => {
        console.log(error);
      });
  }

  getTareas() {
    const url = `${ URL_SERVICIOS }/tareas/obtener_tareas/${ this._us.token }/${ this._us.id_usuario }`;
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.tareas = response.productos;
    });
  }
}
