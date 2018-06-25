import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { ModalController } from 'ionic-angular';
import { DataPacienteProvider } from '../../providers/data-paciente/data-paciente';
import { DetalleExpedientePage } from '../../pages/detalle-expediente/detalle-expediente';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-segind',
  templateUrl: 'segind.html',
})
export class SegindPage {
  areas: any;
  segmentsPerRow : number;
  rows: any;
  fotos: any;
  array_sec2=[];
  array_sec3=[];
  array_rayos =[];
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
      }, (error) => {

        console.log('datos del error');
        console.log(error);
        this.toast.show(error, '5000', 'center').subscribe(
          toast => {
          console.log(toast);
        });
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SegindPage');
  }

  scan() {
    this.selectedPaciente = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedPaciente = this.pacientes.find(paciente => paciente.id_paciente === barcodeData.text);
      console.log(this.selectedPaciente);
      if(this.selectedPaciente !== undefined) {
        this.PacienteFound = true;
        this.fotos=this.selectedPaciente.seg_ind_exp;
        console.log(this.fotos);

        for(var i = 0; i < this.fotos.length; ++i){
          switch (this.fotos[i].area_foto){
            case 'Rayos':
              this.array_rayos.push(this.fotos[i]);
              break;
            case 'Sec_2':
              this.array_sec2.push(this.fotos[i]);
              break;
            case 'Sec_3':
              this.array_sec3.push(this.fotos[i]);
              break;
          }   
        }

        this.areas = [
          {name: 'todos',desc:'Todos',cant:this.fotos.length},
          {name: 'rayos',desc:'Rayos X',cant:this.array_rayos.length},
          {name: 'sec2',desc:'Seccion_2',cant:this.array_sec2.length},
          {name: 'sec3',desc:'Seccion_3',cant:this.array_sec3.length},
        ]
        this.segmentsPerRow = 2;
        this.rows = Array.from(Array(Math.ceil(this.areas.length / this.segmentsPerRow)).keys());
        
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

  openModal(foto1,desc) {
    console.log(foto1);
    let obj = {paciente: this.selectedPaciente,foto_id: foto1,descripcion:desc};
    let myModal = this.modalCtrl.create(DetalleExpedientePage,obj);
    myModal.present();
  }

  regresar(){
    console.log("regresar de SegInd");
    this.navCtrl.setRoot(WelcomePage);
  }

}
