import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {

  loading : boolean = false;
  id! :number;
  //mascota!:Mascota
  mascota$!: Observable<Mascota>
  routeSubs!: Subscription


  constructor(private mascotaService:MascotaService, private aRoute :ActivatedRoute){
  }
  
  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubs = this.aRoute.params.subscribe(data => {
      this.id = data['id']
    })

    this.mascota$ = this.mascotaService.getMascotasById(this.id);
  }
}
