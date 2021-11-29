import { ConsultarCotizacionesComponent } from './consultar-cotizaciones/consultar-cotizaciones.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            {
                path: "",
                component: HomeComponent,
                data: {
                    title: "Home"
                }
            },{
                path:"consultarCotizaciones",
                component:ConsultarCotizacionesComponent,
                data:{
                    title:"Consultar Cotizaciones"
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }