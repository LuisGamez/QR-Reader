import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleExpedientePage } from './detalle-expediente';

@NgModule({
  declarations: [
    DetalleExpedientePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleExpedientePage),
  ],
})
export class DetalleExpedientePageModule {}
