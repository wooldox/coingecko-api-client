interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

interface TrendingNFT {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
}

export interface Trending {
  coins: TrendingCoin[];
  nfts: TrendingNFT[];
}
