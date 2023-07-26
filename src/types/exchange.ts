import { Ticker, TickerParams } from './coin';

export interface Exchange {
  id: string;
  name: string;
  year_established: number;
  country: string;
  description: string;
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export interface ExchangeListItem {
  id: string;
  name: string;
}

export interface ExchangeByIdParams {
  id: string;
}

export interface ExchangeVerbose extends Omit<Exchange, 'id'> {
  facebook_url: string;
  reddit_url: string;
  telegram_url: string;
  slack_url: string;
  other_url_1: string;
  other_url_2: string;
  twitter_handle: string;
  centralized: boolean;
  public_notice: string;
  alert_notice: string;
  tickers: Ticker[];
}

export interface ExchangeTickerParams extends Omit<TickerParams, 'exchange_ids'> {
  coin_ids?: string[];
}

export interface ExchangeTicker {
  // CHECK IF THIS IS USED AT ALL (MIGHT NEED TO REPLACE TICKETS ABOVE)
  name: string;
  tickers: Ticker[];
}

export interface ExchangeVolumeChartParams {
  id: string;
  days: 1 | 7 | 14 | 30 | 90 | 180 | 365;
}

export type ExchangeVolumeChart = [number, number][];
