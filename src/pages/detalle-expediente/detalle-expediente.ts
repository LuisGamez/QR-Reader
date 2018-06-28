import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the DetalleExpedientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-expediente',
  templateUrl: 'detalle-expediente.html',
})
export class DetalleExpedientePage {
  paciente: string = this.navParams.get('paciente');
  id_foto: string = this.navParams.get('foto_id');
  descripcion: string = this.navParams.get('descripcion');
  showControls: boolean = true;
  scale: number = 1;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleExpedientePage');
    console.log(this.id_foto);
    console.log(this.paciente);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  afterZoomIn (event) {
    console.log('After ZoomIn Event: ', event);
  }

  afterZoomOut (event) {
    console.log('After ZoomOut Event: ', event);
  }

}
