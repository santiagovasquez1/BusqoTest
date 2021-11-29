import { Producto } from './producto.model';
import { Provedor } from './provedor.model';
import { Cliente } from './cliente.model';

export interface Cotizacion {
    id: number;
    valor_Cotizacion: number;
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    cedula: number;
    placa: string;
    producto:string;
    proveedor:string;
}