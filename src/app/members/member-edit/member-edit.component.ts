import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Member } from 'src/app/shared/clases/positives';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  public identifier: any;
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

  /*public memberData: Member = {
    id: '',
    nombre: '',
    genero: '',
    activo: '',
    email: '',
    Direccion: '',
    Poblacion: '',
    telefono: ''
  };*/

  // public memberData: Member;

  constructor(private api: ApiService, private routeInp: ActivatedRoute, private routeOut: Router ) { }

  ngOnInit() {
    this.identifier = '';
    this.routeInp.params.subscribe(myParams => this.identifier = myParams['id']);
    /*
    this.api.getMember$(this.identifier).subscribe(e => {this.member = e;
      this.memberData = Object.assign({}, this.member);
    });
    this.memberData = Object.assign({}, this.member);
    */
  }

  /*
  editMember() {
    this.member = Object.assign({}, this.memberData);
    this.api.editMember$(this.member).subscribe(response => {
     //
     this.routeOut.navigate(['/member', this.member.id]);
    },
    (err) => {console.log(err); });
  }
  */
}
