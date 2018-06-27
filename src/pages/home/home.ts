import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { ModalController } from 'ionic-angular';
import { DataPacienteProvider } from '../../providers/data-paciente/data-paciente';
import { DetalleExpedientePage } from '../../pages/detalle-expediente/detalle-expediente';
import { WelcomePage } from '../welcome/welcome';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  areas: any;
  segmentsPerRow : number;
  rows: any;
  fotos: any;
  array_audio=[];
  array_esp=[];
  array_hc=[];
  array_lab=[];
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

/*##########3 borrar #############*/

        this.selectedPaciente = {};
        this.selectedPaciente = this.pacientes.find(paciente => paciente.id_paciente === '351');
        
        console.log(this.selectedPaciente);
        
        if(this.selectedPaciente !== undefined) {
          this.PacienteFound = true;
          this.fotos=this.selectedPaciente.fotos_exp;
          console.log(this.fotos);

          for(var i = 0; i < this.fotos.length; ++i){
            switch (this.fotos[i].area_foto){
              case 'Audiometría':
                this.array_audio.push(this.fotos[i]);
                break;
              case 'Espirometría':
                this.array_esp.push(this.fotos[i]);
                break;
              case 'Historia Clinica':
                this.array_hc.push(this.fotos[i]);
                break;
              case 'Laboratorio':
                this.array_lab.push(this.fotos[i]);
                break;
              case 'Rayos':
                this.array_rayos.push(this.fotos[i]);
                break;
            }   
          }

          this.areas = [
            {name: 'todos',desc:'Todos',cant:this.fotos.length},
            {name: 'audio',desc:'Audiometría',cant:this.array_audio.length},
            {name: 'espiro',desc:'Espirometría',cant:this.array_esp.length},
            {name: 'hc',desc:'Hist Clinica',cant:this.array_hc.length},
            {name: 'lab',desc:'Laboratorio',cant:this.array_lab.length},
            {name: 'rayos',desc:'Rayos X',cant:this.array_rayos.length}
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


/*##########3 borrar #############*/


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
          this.fotos=this.selectedPaciente.fotos_exp;
          console.log(this.fotos);

          for(var i = 0; i < this.fotos.length; ++i){
            switch (this.fotos[i].area_foto){
              case 'Audiometría':
                this.array_audio.push(this.fotos[i]);
                break;
              case 'Espirometría':
                this.array_esp.push(this.fotos[i]);
                break;
              case 'Historia Clinica':
                this.array_hc.push(this.fotos[i]);
                break;
              case 'Laboratorio':
                this.array_lab.push(this.fotos[i]);
                break;
              case 'Rayos':
                this.array_rayos.push(this.fotos[i]);
                break;
            }   
          }

          this.areas = [
            {name: 'todos',desc:'Todos',cant:this.fotos.length},
            {name: 'audio',desc:'Audiometría',cant:this.array_audio.length},
            {name: 'espiro',desc:'Espirometría',cant:this.array_esp.length},
            {name: 'hc',desc:'Hist Clinica',cant:this.array_hc.length},
            {name: 'lab',desc:'Laboratorio',cant:this.array_lab.length},
            {name: 'rayos',desc:'Rayos X',cant:this.array_rayos.length}
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
      console.log("regresar de home");
      this.navCtrl.setRoot(WelcomePage);
    }

  }
