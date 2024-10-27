export type Precision =
  | 'full'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18';

export type Locale =
  | 'ar'
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fi'
  | 'fr'
  | 'he'
  | 'hi'
  | 'hr'
  | 'hu'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'lt'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sv'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh'
  | 'zh-tw';

type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH ? ACC : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
  START_ARR extends number[],
  END extends number,
  ACC extends number = never,
> = START_ARR['length'] extends END
  ? ACC | END
  : NumericRange<[...START_ARR, 1], END, ACC | START_ARR['length']>;

export interface PaginationParams {
  per_page?: NumericRange<CreateArrayWithLengthX<1>, 250>;
  page?: number;
}

export interface ImageData {
  thumb: string;
  small: string;
  large: string;
}

export interface AssetPlatform {
  id: string;
  chain_identifier: string;
  name: string;
  shortname: string;
}

export enum CoinGeckoApiType {
  DEMO = 'DEMO',
  PRO = 'PRO',
}

export * from './category';
export * from './coin';
export * from './contract';
export * from './company';
export * from './exchange';
export * from './derivative';
export * from './global';
export * from './nft';
export * from './platform';
export * from './price';
export * from './rate';
export * from './search';
export * from './status';
export * from './trending';
