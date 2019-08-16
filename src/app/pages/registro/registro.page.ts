import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registro = {
    desc: '',
    lugar: ''
  };
  constructor() { }
  
  ngOnInit() {
  }
  onSubmit(){
    console.log('Form SUbmit');
  }

}
