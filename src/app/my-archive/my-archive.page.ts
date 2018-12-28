import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {

  public items = [1, 2, 3, 4];
  constructor(public plt: Platform) { }

  ngOnInit() {
  }

}
