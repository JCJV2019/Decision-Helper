import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
// import { Member } from 'src/app/shared/clases/positives';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  public identifier: any;
  // public member: Member;

  constructor(private api: ApiService,
     private routeInp: ActivatedRoute
     ) { }

  ngOnInit() {
    this.routeInp.params.subscribe(myParams => this.identifier = myParams['id']);
    // this.api.getMember$(this.identifier).subscribe(e => this.member = e);
  }

}
