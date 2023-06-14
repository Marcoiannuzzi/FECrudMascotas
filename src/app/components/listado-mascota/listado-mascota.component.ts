import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['Nombre', 'Edad', 'Raza', 'Color', 'Peso', 'Acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor (private _snackBar: MatSnackBar, private mascotaService: MascotaService){
    
  }
  ngOnInit(): void {
    this.obtenerMascotas()
  }

  obtenerMascotas(){
    this.loading = true;
    this.mascotaService.getMascotas().subscribe({
      next:(data)=>{
        this.dataSource.data = data;
        this.loading = false;
      }, 
      error: (e) => this.loading = false,
      complete: () => console.info("Complete")
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por pag."
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(id:number){
    this.loading = true
    this.mascotaService.deleteMascota(id).subscribe(()=>{
     this.mensajeExito();
     this.loading = false;
     this.obtenerMascotas()
    });
   }
  
   mensajeExito(){
    setTimeout(() => {
      this._snackBar.open('La mascota fue eliminada con exito', '',{duration:2500});
    },1000)

  }
}
