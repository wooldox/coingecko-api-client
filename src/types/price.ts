import { Precision } from '.';

interface PriceParams {
  vs_currencies: string[];
  include_market_cap?: boolean;
  include_24hr_vol?: boolean;
  include_24hr_change?: boolean;
  include_last_updated_at?: boolean;
  precision?: Precision;
}

export interface PriceByIdParams extends PriceParams {
  ids: string[];
}

export interface PriceByContract extends PriceParams {
  id: string;
  contract_addresses: string[];
}

export type Price = Record<string, Record<string, number>>;
