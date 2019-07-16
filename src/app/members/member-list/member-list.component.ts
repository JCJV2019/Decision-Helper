import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Positive } from 'src/app/shared/clases/positives';
import { Negative } from 'src/app/shared/clases/negatives';

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
  public question: string = '';
  public puntos: number;
  public valorPuntos: any;
  public resultado: string = '';
  public puntuacionP: number = 0;
  public puntuacionN: number = 0;
  public inputQuestion = false;
  public messagePlace: string = '';
  public semaforo: number = 2;

  public itemPData: Positive = {
    id: '',
    desc: '',
    point: 0,
    question: '',
  };

  public itemNData: Negative = {
    id: '',
    desc: '',
    point: 0,
    question: '',
  };

  public itemP: Positive = {
    id: '',
    desc: '',
    point: 0,
    question: '',
  };

  public itemN: Negative = {
    id: this.uniqueID(),
    desc: '',
    point: 0,
    question: '',
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

  newQuestion() {
    this.descripcion = '';
    this.question = '';
    this.puntos = 0;
    this.valorPuntos = 0;
    this.resultado = '';
    this.puntuacionP = 0;
    this.puntuacionN = 0;
    this.inputQuestion = false;

    for (let item of this.itemsPositivos) {
      this.deletePositivo(item.id);
    }
    for (let item of this.itemsNegativos) {
      this.deleteNegativo(item.id);
    }
    this.itemsPositivos = [];
    this.itemsNegativos = [];
    this.routeOut.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.routeOut.navigate(['/member-list']));
  }

  mirarQuestion() {
    if (this.question !== '' || this.question == undefined) {
      this.inputQuestion = true;
    }
  }

  getItemsPositivos() {
    this.api.getItemsPositivos$().subscribe(serv => {
      this.itemsPositivos = serv;

      if (this.itemsPositivos.length > 0) {
        this.question = this.itemsPositivos[0].question;
        this.mirarQuestion();
      }

    });
  }

  getItemsNegativos() {
    this.api.getItemsNegativos$().subscribe(serv => {
      this.itemsNegativos = serv;

      if (this.itemsNegativos.length > 0) {
        this.question = this.itemsNegativos[0].question;
        this.mirarQuestion();
      }

    });
  }

  private uniqueID() {
    const thisMS: number = Date.now();
    const shake = Math.random();
    let unique: string = Math.pow(thisMS, shake).toString();
    unique = unique.toString().replace('.', thisMS.toString());
    return unique;
  }

  addPositivo() {
    if (this.verificarConcepto()) {
      this.itemP.id = this.uniqueID();
      this.itemP.desc = this.descripcion;
      this.itemP.point = this.puntos;
      this.itemP.question = this.question;
      this.itemPData = Object.assign({}, this.itemP);
      this.api.addPositivo$(this.itemPData).subscribe(response => {
        // const id = response['id'];
        this.getItemsPositivos();
        this.routeOut.navigate(['/member-list']);
      },
        (err) => { console.log(err); });
      this.descripcion = '';
      this.puntos = null;
    }
  }

  addNegativo() {
    if (this.verificarConcepto()) {
      this.itemN.id = this.uniqueID();
      this.itemN.desc = this.descripcion;
      this.itemN.point = this.puntos;
      this.itemN.question = this.question;
      this.itemNData = Object.assign({}, this.itemN);
      this.api.addNegativo$(this.itemNData).subscribe(response => {
        // const id = response['id'];
        this.getItemsNegativos();
        this.routeOut.navigate(['/member-list']);
      },
        (err) => { console.log(err); });
      this.descripcion = '';
      this.puntos = null;
    }
  }

  verificarConcepto() {
    if (this.descripcion == '' || this.descripcion == undefined || this.puntos == undefined) {
      this.messagePlace = 'todos los campos son obligatorios';
      return false;
    } else {
      this.messagePlace = '';
      return true;
    }
  }

  editPositivo(item) {
    if ( this.verificarPuntuacion(item.point) ) {
      this.itemPData.id = item.id;
      this.itemPData.desc = item.desc;
      this.itemPData.question = this.question;
      this.itemPData.point = item.point;
      this.api.editPositivo$(this.itemPData).subscribe(response => {
        // this.routeOut.navigate(['/member-list']);
        this.getItemsPositivos();
      },
        (err) => { console.log(err); });
    }
  }

  editNegativo(item) {
    if ( this.verificarPuntuacion(item.point) ) {
      this.itemNData.id = item.id;
      this.itemNData.desc = item.desc;
      this.itemNData.point = item.point;
      this.itemNData.question = this.question;
      this.api.editNegativo$(this.itemNData).subscribe(response => {
        // this.routeOut.navigate(['/member-list']);
        this.getItemsNegativos();
      },
        (err) => { console.log(err); });
    }
  }

  verificarPuntuacion(valorS: string) {
    let valor = parseInt(valorS, 10);
    if (valor >= 1 && valor <= 4) {
      return true;
    } else {
      console.log(valor);
      return false;
    }

  }

  deletePositivo(id) {
    this.api.deletePositivo$(id).subscribe(data => {
      this.data = data;
      // this.routeOut.navigate(['/member-list']);
      this.getItemsPositivos();
    });
  }

  deleteNegativo(id) {
    this.api.deleteNegativo$(id).subscribe(data => {
      this.data = data;
      // this.routeOut.navigate(['/member-list']);
      this.getItemsNegativos();
    });
  }

  consejo() {
    let sumaP = 0;
    let sumaN = 0;
    for (let item of this.itemsPositivos) {
      sumaP += parseInt(item.point, 10);
    }
    for (let item of this.itemsNegativos) {
      sumaN += parseInt(item.point, 10);
    }

    const mediaP = sumaP / this.itemsPositivos.length;
    const mediaN = sumaN / this.itemsNegativos.length;
    this.puntuacionP = parseFloat(((mediaP / (sumaP + sumaN)) * 100).toFixed(2));
    this.puntuacionN = parseFloat(((mediaN / (sumaP + sumaN)) * 100).toFixed(2));

    /*
    if ( this.puntuacionP === NaN ) { this.puntuacionP = 0; }
    if ( this.puntuacionN === NaN ) { this.puntuacionN = 0; }
    */

    const diferencia = this.puntuacionP - this.puntuacionN;
    if (Math.abs(diferencia) > 1) {
      if (diferencia > 0 ) { this.semaforo = 3; } else { this.semaforo = 1; }
    } else {
      this.semaforo = 2;
    }


  }
}
