import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataPacienteProvider } from '../../providers/data-paciente/data-paciente';
import { WelcomePage } from '../welcome/welcome';
import { ModalController } from 'ionic-angular';
import { DetalleExpedientePage } from '../../pages/detalle-expediente/detalle-expediente';
/**
 * Generated class for the RechumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rechum',
  templateUrl: 'rechum.html',
})
export class RechumPage {
  areas: any;
  segmentsPerRow : number;
  rows: any;
  fotos: any;
  pacientes: any;
  selectedPaciente: any;
  PacienteFound:boolean = false;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataPaciente: DataPacienteProvider,
    public modalCtrl: ModalController) {
      this.dataPaciente.getListPacientes()
      .subscribe((response)=> {
        //console.log(response);
        this.pacientes=response;
      
      /*#######  Borrar ########## */
      this.selectedPaciente = {};
        this.selectedPaciente = this.pacientes.find(paciente => paciente.id_paciente === '351');
        console.log(this.selectedPaciente);
        if(this.selectedPaciente !== undefined) {
          this.PacienteFound = true;
          this.fotos=this.selectedPaciente.rec_hum_exp; //agregar

        } else {
          this.PacienteFound = false;
          this.toast.show('Paciente no Encontrado', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }



      /*#######  Borrar ########## */
      
      }, (error) => {

        console.log('datos del error');
        console.log(error);
        this.toast.show(error, '5000', 'center').subscribe(
          toast => {
          console.log(toast);
        });
      });
    }

    scan() {
      this.selectedPaciente = {};
      this.barcodeScanner.scan().then((barcodeData) => {
        this.selectedPaciente = this.pacientes.find(paciente => paciente.id_paciente === barcodeData.text);
        console.log(this.selectedPaciente);
        if(this.selectedPaciente !== undefined) {
          this.PacienteFound = true;
        } else {
          this.PacienteFound = false;
          this.toast.show('Paciente no Encontrado', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      }, (err) => {
        console.log(err);
        this.toast.show(err, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
      console.log(this.PacienteFound);
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechumPage');
  }

  openModal(foto1,desc) {
    console.log(foto1);
    let obj = {paciente: this.selectedPaciente,foto_id: foto1,descripcion:desc};
    let myModal = this.modalCtrl.create(DetalleExpedientePage,obj);
    myModal.present();
  }

  regresar(){
    console.log("regresar de RH");
    this.navCtrl.setRoot(WelcomePage);
  }
}
