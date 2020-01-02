import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardFilter } from 'src/app/classes/card-filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  readonly colors = ['white', 'blue', 'green', 'red', 'black'];
  readonly types = ['creature', 'planeswalker', 'instant', 'sorcery', 'enchantment', 'artifact', 'land'];
  readonly rarities = ['common', 'uncommon', 'rare', 'mythic'];
  readonly cmcs = ['0', '1', '2', '3', '4', '5', '6', '7+'];
  @Input() cardFilter: CardFilter;
  constructor(private modalController: ModalController) { }

  public applyFilter() {
    this.modalController.dismiss({
      'cardFilter' : this.cardFilter
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

  public resetFilter() {
    this.cardFilter = new CardFilter();
  }
}