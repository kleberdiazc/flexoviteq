import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registro = {
    desc: '',
    lugar: '',
    obs:''
  };
  constructor(public navCtrl: NavController,
              public _tarea: TareasService,
              public router: Router) { }
  
  ngOnInit() {
  }
  onSubmit(){
    console.log('Form SUbmit');
    console.log(this.registro);
    this._tarea.guardarTarea(this.registro.obs, this.registro.lugar, this.registro.desc);
  }

}
