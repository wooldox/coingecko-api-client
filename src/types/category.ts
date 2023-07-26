export interface CoinCategoryParams {
  order?:
    | 'market_cap_asc'
    | 'market_cap_desc'
    | 'name_desc'
    | 'name_asc'
    | 'market_cap_change_24h_desc'
    | 'market_cap_change_24h_asc';
}

export interface CoinCategoryListItem {
  category_id: string;
  name: string;
}

export interface CoinCategory {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins: string[];
  volume_24h: number;
  updated_at: string;
}
