import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardFilter } from 'src/app/classes/card-filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  readonly colors = ['white', 'blue', 'green', 'red', 'black'];
  readonly cardTypes = ['creature', 'planeswalker', 'instant', 'sorcery', 'enchantment', 'artifact', 'land'];
  readonly rarities = ['common', 'uncommon', 'rare', 'mythic'];
  readonly manaCosts = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  public cardFilter = new CardFilter();
  constructor(private modalController: ModalController) { }

  public applyFilter() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {
  }

  selectFilter(list, value: string) {
    list.includes(value) ? this.deleteFilter(list, list.indexOf(value)) : list.push(value);
  }

  deleteFilter(list, value: string) {
    list.splice(value, 1)
  }
}