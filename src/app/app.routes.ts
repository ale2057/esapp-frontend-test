import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { HistoryComponent } from './components/history-component/history-component';
import { TransferPanelComponent } from './components/transfer-panel-component/transfer-panel-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'transfer', component: TransferPanelComponent },
];
