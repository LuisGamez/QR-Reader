import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
/*
  Generated class for the DataPacienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataPacienteProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataPacienteProvider Provider');
  }

  getListPacientes(){
    return this.http.get('assets/data/pacientes.json');
  }

}
