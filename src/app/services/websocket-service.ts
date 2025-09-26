import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Trade } from '../models/trade-model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws?: WebSocket;
  private subscribed = new Set<string>();
  private limit = 3;

  private tradesSubject = new BehaviorSubject<Trade[]>([]);
  public trades$: Observable<Trade[]> = this.tradesSubject.asObservable();

  public lastTrade$: Observable<Trade | null> = this.trades$.pipe(
    map((trades) => (trades.length > 0 ? trades[0] : null))
  );

  connect(apiKey: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    this.ws.onopen = () => {
      console.log('Finnhub WS open (Observable)');
      this.subscribed.forEach((sym) =>
        this._send({ type: 'subscribe', symbol: sym })
      );
    };

    this.ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (
          msg.type === 'trade' &&
          Array.isArray(msg.data) &&
          msg.data.length > 0
        ) {
          const trade = msg.data[0];
          const current = this.tradesSubject.getValue();
          this.tradesSubject.next([trade, ...current].slice(0, this.limit));
        }
      } catch (e) {
        console.warn('WS parse error', e);
      }
    };

    this.ws.onclose = () => console.warn('Finnhub WS closed');
    this.ws.onerror = (err) => console.error('Finnhub WS error', err);
  }

  private _send(obj: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  subscribeSymbol(symbol: string) {
    this.subscribed.add(symbol);
    this._send({ type: 'subscribe', symbol });
  }

  disconnect() {
    this.subscribed.clear();
    try {
      this.ws?.close();
    } catch {}
    this.ws = undefined;
    this.tradesSubject.next([]);
  }
}
