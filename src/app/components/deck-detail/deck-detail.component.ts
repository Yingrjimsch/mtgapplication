import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {
  @Input() collectionId: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    
  }

  public closeDeckDetail() {
    this.modalController.dismiss();
  }
}
