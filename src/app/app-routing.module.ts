import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'deck-list',
    loadChildren: './deck-list/deck-list.module#DeckListPageModule'
  },
  {
    path: 'scanner',
    loadChildren: './scanner/scanner.module#ScannerPageModule'
  },
  {
    path: 'my-archive',
    loadChildren: './my-archive/my-archive.module#MyArchivePageModule'
  },
  {
    path: 'account-settings',
    loadChildren:
      './account-settings/account-settings.module#AccountSettingsPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
