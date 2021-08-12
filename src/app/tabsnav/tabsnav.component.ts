import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';


@Component({
  selector: 'app-tabsnav',
  templateUrl: './tabsnav.component.html',
  styleUrls: ['./tabsnav.component.css']
})
export class TabsnavComponent implements OnInit {
  @ViewChild('tabs') tabRef: IonTabs;

  constructor() { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.tabRef.select('home');
  }

}
