import { Cliente } from './../../models/cliente.model';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { Producto } from './../../models/producto.model';
import { Provedor } from './../../models/provedor.model';
import { BusqoService } from './../../services/busqo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-generar-cotizacion',
  templateUrl: './generar-cotizacion.component.html',
  styles: [
  ]
})
export class GenerarCotizacionComponent implements OnInit {

  public crearCotizacionForm: FormGroup;
  public proveedores: Provedor[] = [];
  public productos: Producto[] = [];
  public enabledFields = [
    'cedula',
    'producto',
    'proveedor',
    'valor_Cotizacion'
  ];

  constructor(private busqoService: BusqoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<GenerarCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.crearCotizacionForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.getProductos();
    this.getProveedores();
    this.crearFormulario();
  }

  crearFormulario() {
    this.crearCotizacionForm = this.fb.group({
      cedula: [{ value: '', disabled: false }, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      celular: [{ value: '', disabled: true }, Validators.required],
      placa: [{ value: '', disabled: true }, Validators.required],
      producto: [{ value: '', disabled: false }, Validators.required],
      proveedor: [{ value: '', disabled: false }, Validators.required],
      valor_Cotizacion: [{ value: '', disabled: false }, Validators.required]
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  findCliente(event: any) {

    if (!this.crearCotizacionForm.controls['cedula'].pristine) {
      this.spinner.show();
      this.busqoService.getClienteByCedula(event.target.value).subscribe(result => {
        this.toastr.success('Cliente encontrado');
        this.crearCotizacionForm.patchValue({
          nombre: result.nombre,
          apellido: result.apellido,
          email: result.email,
          celular: result.celular,
          placa: result.placa
        });

        for (let field in this.crearCotizacionForm.controls) {
          let index = this.enabledFields.indexOf(field);
          if (index < 0 && !this.crearCotizacionForm.controls[field].disabled) {
            this.crearCotizacionForm.controls[field].disable();
          }
        }
        this.spinner.hide();
      }, error => {
        this.toastr.error('Cliente no encontrado', 'Error');
        for (let field in this.crearCotizacionForm.controls) {
          let index = this.enabledFields.indexOf(field);
          if (index < 0 && this.crearCotizacionForm.controls[field].disabled) {
            this.crearCotizacionForm.controls[field].enable();
          }
        }
        this.spinner.hide();
      })
    }
  }

  getProductos() {
    this.busqoService.getProductos().subscribe(result => {
      this.productos = result;
    }, error => {
      this.toastr.error('Error al obtener productos', 'Error');
    })
  }

  getProveedores() {
    this.busqoService.getProvedores().subscribe(result => {
      this.proveedores = result;
    }, error => {
      this.toastr.error('Error al obtener proveedores', 'Error');
    });
  }


  cancel() {
    this.dialogRef.close();
  }

  generarCotizacion() {
    let cotizacion = this.crearCotizacionForm.getRawValue() as Cotizacion;

    let cliente: Cliente = {
      id: 0,
      nombre: cotizacion.nombre,
      apellido: cotizacion.apellido,
      email: cotizacion.email,
      celular: cotizacion.celular,
      cedula: cotizacion.cedula,
      placa: cotizacion.placa
    }

    let cotizacionInfo = {
      cliente: cliente,
      productoId: cotizacion.producto,
      proveedorId: cotizacion.proveedor,
      valorCotizacion: cotizacion.valor_Cotizacion
    }

    this.spinner.show();
    this.busqoService.addCotizacion(cotizacionInfo).subscribe(result => {
      this.spinner.hide();
      this.toastr.success('Cotizacion generada');
      this.dialogRef.close();
    }, error => {
      this.spinner.hide();
      this.toastr.error('Error al generar cotizacion', 'Error');
      this.dialogRef.close();
    })
  }

}
