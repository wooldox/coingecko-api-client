import { ImageData, PaginationParams } from '.';

export interface NftListParams extends PaginationParams {
  asset_platform_id?: string;
  order?:
    | 'h24_volume_native_asc'
    | 'h24_volume_native_desc'
    | 'floor_price_native_asc'
    | 'floor_price_native_desc'
    | 'market_cap_native_asc'
    | 'market_cap_native_desc'
    | 'market_cap_usd_asc'
    | 'market_cap_usd_desc';
}

export interface NftListItem {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

interface NftValues {
  native_currency: number;
  usd: number;
}

interface NftLinks {
  homepage: string;
  twitter: string;
  discord: string;
}

export interface NftByIdParams {
  id: string;
}

export interface NftByContractParams {
  asset_platform_id: string;
  contract_address: string;
}

export interface NftItem {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: Partial<ImageData>;
  description: string;
  native_currency: string;
  native_currency_symbol: string;
  floor_price: NftValues;
  market_cap: NftValues;
  volume_24h: NftValues;
  floor_price_in_usd_24h_percentage_change: number;
  floor_price_24h_percentage_change: NftValues;
  market_cap_24h_percentage_change: NftValues;
  volume_24h_percentage_change: NftValues;
  number_of_unique_addresses: 53;
  number_of_unique_addresses_24h_percentage_change: number;
  volume_in_usd_24h_percentage_change: number;
  total_supply: number;
  links: NftLinks;
  floor_price_7d_percentage_change: NftValues;
  floor_price_14d_percentage_change: NftValues;
  floor_price_30d_percentage_change: NftValues;
  floor_price_60d_percentage_change: NftValues;
  floor_price_1y_percentage_change: NftValues;
  explorers: { name: string; link: string }[];
}
