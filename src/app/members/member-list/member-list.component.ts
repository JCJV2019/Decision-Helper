import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Positive } from 'src/app/shared/clases/positives';
import { Negative } from 'src/app/shared/clases/negatives';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public itemsPositivos$: Observable<any>;
  public itemsNegativos$: Observable<any>;
  public itemsPositivos: any;
  public itemsNegativos: any;
  public data: any;
  public descripcion: string = '';
  public puntos: number;
  public valorPuntos: any;
  public resultado: string = '';
  public puntuacionP: number = 0;
  public puntuacionN: number = 0;

  public itemPData: Positive = {
    id: '',
    desc: '',
    point: 0
  };

  public itemNData: Negative = {
    id: '',
    desc: '',
    point: 0
  };

  public itemP: Positive = {
    id: this.uniqueID(),
    desc: '',
    point: 0
  };

  public itemN: Negative = {
    id: this.uniqueID(),
    desc: '',
    point: 0
  };

  constructor(private api: ApiService, private routeOut: Router) {
    this.valorPuntos = {
      O1: {
        label: '1',
        value: '1',
        name: 'valorPuntos'
      },
      O2: {
        label: '2',
        value: '2',
        name: 'valorPuntos'
      },
      O3: {
        label: '3',
        value: '3',
        name: 'valorPuntos'
      },
      O4: {
        label: '4',
        value: '4',
        name: 'valorPuntos'
      }
    };

  }

  ngOnInit() {
    this.itemsPositivos = [];
    this.itemsNegativos = [];
    this.getItemsPositivos();
    this.getItemsNegativos();
  }

  getItemsPositivos() {
    this.api.getItemsPositivos$().subscribe(serv => this.itemsPositivos = serv);
  }

  getItemsNegativos() {
    this.api.getItemsNegativos$().subscribe(serv => this.itemsNegativos = serv);
  }

  private uniqueID() {
    const thisMS: number = Date.now();
    const shake = Math.random();
    let unique: string = Math.pow(thisMS, shake).toString();
    unique = unique.toString().replace('.', thisMS.toString());
    return unique;
  }

  addPositivo() {
    this.itemP.desc = this.descripcion;
    this.itemP.point = this.puntos;
    this.itemPData = Object.assign({}, this.itemP);
    this.api.addPositivo$(this.itemPData).subscribe(response => {
      // const id = response['id'];
      this.getItemsPositivos();
      this.routeOut.navigate(['/member-list']);
    },
      (err) => { console.log(err); });
  }

  addNegativo() {
    this.itemN.desc = this.descripcion;
    this.itemN.point = this.puntos;
    this.itemNData = Object.assign({}, this.itemN);
    this.api.addNegativo$(this.itemNData).subscribe(response => {
      // const id = response['id'];
      this.getItemsNegativos();
      this.routeOut.navigate(['/member-list']);
    },
      (err) => { console.log(err); });
  }

  editPositivo(item) {
    this.itemPData.id = item.id;
    this.itemPData.desc = item.desc;
    this.itemPData.point = item.point;
    this.api.editPositivo$(this.itemPData).subscribe(response => {
     // this.routeOut.navigate(['/member-list']);
     this.getItemsPositivos();
    },
    (err) => {console.log(err); });
  }

  editNegativo(item) {
    this.itemNData.id = item.id;
    this.itemNData.desc = item.desc;
    this.itemNData.point = item.point;
    this.api.editNegativo$(this.itemNData).subscribe(response => {
     // this.routeOut.navigate(['/member-list']);
     this.getItemsNegativos();
    },
    (err) => {console.log(err); });
  }

  deletePositivo(id){
    this.api.deletePositivo$(id).subscribe(data => {
      this.data = data;
      // this.routeOut.navigate(['/member-list']);
      this.getItemsPositivos();
    });
  }

  deleteNegativo(id){
    this.api.deleteNegativo$(id).subscribe(data => {
      this.data = data;
      // this.routeOut.navigate(['/member-list']);
      this.getItemsNegativos();
    });
  }

  consejo() {
    let sumaP = 0;
    let sumaN = 0;
    for ( let item of this.itemsPositivos ) {
      sumaP += parseInt(item.point, 10);
    }
    for ( let item of this.itemsNegativos ) {
      sumaN += parseInt(item.point, 10);
    }
    const mediaP = sumaP / this.itemsPositivos.length;
    const mediaN = sumaN / this.itemsNegativos.length;
    this.puntuacionP = (mediaP / (sumaP + sumaN)) * 100;
    this.puntuacionN = (mediaN / (sumaP + sumaN)) * 100;

  }
}
