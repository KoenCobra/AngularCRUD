import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.userId = value['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  public userId!: number;
  userDetail!: User;

  fetchUserDetails(userId: number) {
    this.api.GetRegisteredUser(userId).subscribe(res => {
      this.userDetail = res;
    });
  }
}
