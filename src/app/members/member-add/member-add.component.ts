import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
// import { Member } from 'src/app/shared/clases/positives';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  // public member: Member;

  public placeholder = {
    nombre: 'Teclea tu nombre y apellidos',
    genero: 'M|H',
    activo: '...',
    email: 'Teclea tu email',
    Direccion: 'Dirección',
    Poblacion: 'Poblacion',
    telefono: 'Teléfono'
  };

  /*
  public memberData: Member = {
    id: this.uniqueID(),
    nombre: '',
    genero: '',
    activo: '',
    email: '',
    Direccion: '',
    Poblacion: '',
    telefono: ''
  };
  */

  constructor(private api: ApiService, private routeOut: Router ) { }

  private uniqueID() { const thisMS: number = Date.now();
    const shake = Math.random();
    let unique: string = Math.pow(thisMS, shake).toString();
    unique = unique.toString().replace('.', thisMS.toString());
    return unique; }

  ngOnInit() {
  }

  /*
  addMember() {
    this.member = Object.assign({}, this.memberData);
    this.api.addMember$(this.member).subscribe(response => {
      const id = response['id'];
      this.routeOut.navigate(['/member', id]);
    },
    (err) => {console.log(err); });
  }
  */
}
