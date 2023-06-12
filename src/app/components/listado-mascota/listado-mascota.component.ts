import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';


const listMascotas: Mascota[] = [
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Rocco', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13},
  {nombre:'Ciro', edad:3, raza:'Golden', color:'Dorado', peso: 13}
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements AfterViewInit{
  displayedColumns: string[] = ['Nombre', 'Edad', 'Raza', 'Color', 'Peso', 'Acciones'];
  dataSource = new MatTableDataSource<Mascota>(listMascotas);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor (private _snackBar: MatSnackBar){
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por pag."
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(){
    this.loading = true
    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('La mascota fue eliminada con exito', '',{duration:2500});
    },3000)

  }
}
