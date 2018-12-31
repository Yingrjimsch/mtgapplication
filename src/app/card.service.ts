import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor() {}

  getMyCards() {
    return [
      new Card(
        'Maximize Velocity',
        '452861',
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=452861&type=card'
      ),
      new Card(
        'Archangel Avacyn',
        '439314',
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439314&type=card'
      ),
      new Card(
        'Optical Optimizer',
        '439586',
        'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439586&type=card'
      )
    ];
  }
}
