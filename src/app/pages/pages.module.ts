import { AngularMaterialModule } from './../angular-material.module';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarCotizacionComponent } from './generar-cotizacion/generar-cotizacion.component';
import { ConsultarCotizacionesComponent } from './consultar-cotizaciones/consultar-cotizaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    GenerarCotizacionComponent,
    ConsultarCotizacionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [
    PagesComponent,
    GenerarCotizacionComponent,
    ConsultarCotizacionesComponent
  ]
})
export class PagesModule { }
