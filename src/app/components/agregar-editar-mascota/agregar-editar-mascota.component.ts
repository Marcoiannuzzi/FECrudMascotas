import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit{
  loading:boolean = false;
  form : FormGroup;

  constructor(private fb: FormBuilder, private mascotaService: MascotaService, private _snackBar: MatSnackBar, private router: Router){ 
    this.form = this.fb.group({
      nombre:['', Validators.required],
      raza:['', Validators.required],
      color:['', Validators.required],
      edad:['', Validators.required],
      peso:['', Validators.required],
    });
  }
  ngOnInit(): void {
  }


  agregarMascota(){
    const mascota : Mascota = {
      nombre : this.form.get('nombre')?.value,
      raza : this.form.get('raza')?.value,
      color : this.form.get('color')?.value,
      edad : this.form.get('edad')?.value,
      peso : this.form.get('peso')?.value
    }

    this.mascotaService.addMascota(mascota).subscribe((data) => {
    });
    this.router.navigate(['/listadoMascotas']);
    this.mensajeExito()
  }


  mensajeExito(){
    setTimeout(() => {
      this._snackBar.open('La mascota fue creada con exito', '',{duration:2500});
    },1000)

  }
}
