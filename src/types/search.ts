interface SearchCoinItem {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

interface SearchExchangeItem {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

interface SearchCategoryItem {
  id: number;
  name: string;
}

interface SearchNftItem {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

export interface SearchResult {
  coins: SearchCoinItem[];
  exchanges: SearchExchangeItem[];
  categories: SearchCategoryItem[];
  nfts: SearchNftItem[];
}
