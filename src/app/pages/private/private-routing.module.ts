import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'deck-list', loadChildren: './deck-list/deck-list.module#DeckListPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },
  { path: 'my-archive', loadChildren: './my-archive/my-archive.module#MyArchivePageModule' },
  { path: 'account-settings', loadChildren: './account-settings/account-settings.module#AccountSettingsPageModule' },
  { path: 'deck-detail/:id', loadChildren: './deck-detail/deck-detail.module#DeckDetailPageModule' },
  { path: 'deck-detail/:deckId/card-detail/:cardId', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' },
  { path: 'card-detail/:cardId', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
