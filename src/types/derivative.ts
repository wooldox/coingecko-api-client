import { PaginationParams } from '.';

export interface DerivativeParams {
  include_tickers?: 'unexpired' | 'all';
}

export interface Derivative {
  market: string;
  symbol: string;
  index_id: string;
  price: string;
  price_percentage_change_24h: number;
  contract_type: string;
  index: number;
  basis: number;
  spread: number;
  funding_rate: number;
  open_interest: number;
  volume_24h: number;
  last_traded_at: number;
  expired_at: string | null;
}

export interface DerivativeExchangeParams extends PaginationParams {
  order?:
    | 'name_asc'
    | 'name_desc'
    | 'open_interest_btc_asc'
    | 'open_interest_btc_desc'
    | 'trade_volume_24h_btc_asc'
    | 'trade_volume_24h_btc_desc';
}

export interface DerivativeExchange {
  name: string;
  id: string;
  open_interest_btc: number;
  trade_volume_24h_btc: string;
  number_of_perpetual_pairs: number;
  number_of_futures_pairs: number;
  image: string;
  year_established: number;
  country: string;
  description: string;
  url: string;
}

export interface DerivativeExchangeByIdParams extends DerivativeParams {
  id: string;
}

export type DerivativeExchangeById = Omit<DerivativeExchange, 'id'>;
