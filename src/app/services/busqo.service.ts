import { Cotizacion } from './../models/cotizacion.model';
import { Provedor } from './../models/provedor.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class BusqoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    const url = `${environment.base_url}/ConsultarProductos`;
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.productos as Producto[];
      }));
  }

  getProvedores(): Observable<Provedor[]> {
    const url = `${environment.base_url}/ConsultarProveedores`;
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.proveedores as Provedor[];
      }));
  }

  getClienteByCedula(cedula: number): Observable<Cliente> {
    const url = `${environment.base_url}/ConsultarClientePorCedula/${cedula}`;
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.cliente as Cliente;
      }));
  }

  addCotizacion(cotizacionInfo: any): Observable<any> {
    const url = `${environment.base_url}/CrearCotizacion`;
    return this.http.post(url, cotizacionInfo);
  }

  getCotizaciones(): Observable<Cotizacion[]> {
    const url = `${environment.base_url}/ConsultarCotizaciones`;
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.cotizaciones as Cotizacion[];
      }));
  }
}
