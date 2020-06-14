import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/classes/card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/dbservices/card.service';
import { DeckService } from 'src/app/services/dbservices/deck.service';
import { UserService } from 'src/app/services/dbservices/user.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  deckId: string;
  card: Card;

  constructor(private route: ActivatedRoute, private deckService: DeckService, private cardService: CardService, private userService: UserService) {
    route.params.subscribe(p => {
      this.deckId = p.deckId
      if (this.deckId) {
        cardService.getCardById(deckService.getDeckById(p.deckId), p.cardId).then(c => this.card = (c.data() as Card));
      } else {
        cardService.getCardById(userService.getUserDoc(), p.cardId).then(c => this.card = (c.data() as Card));
      }
    })
  }

  ngOnInit() {
  }

}
