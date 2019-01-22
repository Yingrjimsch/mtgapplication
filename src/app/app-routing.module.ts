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
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'deck-list',
    loadChildren: './pages//deck-list/deck-list.module#DeckListPageModule'
  },
  {
    path: 'scanner',
    loadChildren: './pages//scanner/scanner.module#ScannerPageModule'
  },
  {
    path: 'my-archive',
    loadChildren: './pages//my-archive/my-archive.module#MyArchivePageModule'
  },
  {
    path: 'account-settings',
    loadChildren: './pages//account-settings/account-settings.module#AccountSettingsPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
