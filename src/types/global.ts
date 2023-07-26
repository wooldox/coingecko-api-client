export interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface GlobalDeFiData {
  data: {
    defi_market_cap: string;
    eth_market_cap: string;
    defi_to_eth_ratio: string;
    trading_volume_24h: string;
    defi_dominance: string;
    top_coin_name: string;
    top_coin_defi_dominance: number;
  };
}
