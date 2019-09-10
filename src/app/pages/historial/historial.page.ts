import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor(public navCtrl: NavController,
              public _tarea: TareasService,
              public router: Router) { }

  ngOnInit() {
    this._tarea.getTareas();
  }

  obtTareras() {
  }

}
