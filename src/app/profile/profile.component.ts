import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: User;

  items: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.userProfile = JSON.parse(localStorage.getItem('user'));
  }

}
