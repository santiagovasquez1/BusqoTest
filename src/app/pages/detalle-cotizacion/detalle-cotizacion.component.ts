import { Cotizacion } from 'src/app/models/cotizacion.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styles: [
  ]
})
export class DetalleCotizacionComponent implements OnInit {

  public detalleCotizacionForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DetalleCotizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cotizacion,
    private fb: FormBuilder) {
    this.detalleCotizacionForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.detalleCotizacionForm = this.fb.group({
      cedula: [{ value: '' || this.data.cedula, disabled: true }, Validators.required],
      nombre: [{ value: '' || this.data.nombre, disabled: true }, Validators.required],
      apellido: [{ value: '' || this.data.apellido, disabled: true }, Validators.required],
      email: [{ value: '' || this.data.email, disabled: true }, [Validators.required, Validators.email]],
      celular: [{ value: '' || this.data.celular, disabled: true }, Validators.required],
      placa: [{ value: '' || this.data.placa, disabled: true }, Validators.required],
      producto: [{ value: '' || this.data.producto, disabled: true }, Validators.required],
      proveedor: [{ value: '' || this.data.proveedor, disabled: true }, Validators.required],
      valor_Cotizacion: [{ value: '' || this.data.valor_Cotizacion, disabled: true }, Validators.required]
    });
  }

  aceptar() {
    this.dialogRef.close();
  }
}
