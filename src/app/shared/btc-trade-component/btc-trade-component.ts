import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../services/websocket-service';
import { environment } from '../../../environments/environment.development';
import { Trade } from '../../models/trade-model';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-btc-trade-component',
  imports: [CommonModule, TranslateDirective],
  templateUrl: './btc-trade-component.html',
  styleUrl: './btc-trade-component.scss',
})
export class BtcTradeComponent implements OnInit, OnDestroy {
  trades: Trade[] = [];
  trades$!: Observable<Trade[]>;
  lastTrade$!: Observable<Trade | null>;

  constructor(private wbsocketSerivce: WebsocketService) {}

  ngOnInit(): void {
    this.wbsocketSerivce.connect(environment.btc_API_KEY);
    this.wbsocketSerivce.subscribeSymbol('BINANCE:BTCUSDT');
    this.trades$ = this.wbsocketSerivce.trades$;
    this.lastTrade$ = this.wbsocketSerivce.lastTrade$;
  }

  ngOnDestroy(): void {
    this.wbsocketSerivce.disconnect();
  }
}
