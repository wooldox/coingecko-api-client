import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';
import { format, fromUnixTime } from 'date-fns';
import {
  CoinGeckoApiType,
  AssetPlatform,
  AssetPlatformParams,
  Coin,
  CoinByIdParams,
  CoinCategory,
  CoinCategoryListItem,
  CoinCategoryParams,
  CoinHistory,
  CoinHistoryParams,
  CoinOhlc,
  CoinOhlcParams,
  CoinVerbose,
  CoinsListParams,
  CompaniesData,
  CompanyDataParams,
  ContractInfoParams,
  Derivative,
  DerivativeExchange,
  DerivativeExchangeById,
  DerivativeExchangeByIdParams,
  DerivativeExchangeParams,
  DerivativeParams,
  Exchange,
  ExchangeByIdParams,
  ExchangeListItem,
  ExchangeRate,
  ExchangeTicker,
  ExchangeTickerParams,
  ExchangeVerbose,
  ExchangeVolumeChart,
  ExchangeVolumeChartParams,
  GlobalData,
  GlobalDeFiData,
  Market,
  MarketChart,
  MarketChartFromContractParams,
  MarketChartParams,
  MarketChartRangeFromContractParams,
  MarketChartRangeParams,
  MarketParams,
  NftByContractParams,
  NftByIdParams,
  NftItem,
  NftListItem,
  NftListParams,
  PaginationParams,
  Price,
  PriceByContract,
  PriceByIdParams,
  SearchResult,
  Status,
  Ticker,
  TickerParams,
  Trending,
} from './types';

class CoinGecko {
  private static readonly V3_URL = 'https://api.coingecko.com/api/v3';
  private static readonly PRO_V3_URL = 'https://pro-api.coingecko.com/api/v3';
  private baseUrl: string;
  private apiType: CoinGeckoApiType;
  private apiKey: string | undefined;
  private client: AxiosInstance;
  private timeout: number;

  constructor({
    apiKey,
    type,
    timeout,
    client,
  }: {
    apiKey?: string;
    type: CoinGeckoApiType;
    timeout?: number;
    client?: AxiosInstance;
  }) {
    this.baseUrl = type === CoinGeckoApiType.PRO ? CoinGecko.PRO_V3_URL : CoinGecko.V3_URL;
    this.apiKey = apiKey;
    this.apiType = type;
    this.timeout = timeout ?? 30000;
    this.client = client ?? axios.create({ timeout: this.timeout });
  }

  /**
   * Creates a network request using Axios to the specified API endpoint with optional parameters
   *
   * @template T The expected type of the response data
   * @param {string} endpoint The API endpoint to which the request will be made
   * @param {AxiosRequestConfig['params']} params Optional parameters to be sent with the request
   * @returns {Promise<T>} A Promise that resolves to the response data of type T
   * @throws {Error} If there is an error during the network request or if the server returns an error
   */
  private createRequest = async <T>(
    endpoint: string,
    params: AxiosRequestConfig['params'],
  ): Promise<T> => {
    const apiHeader = this.apiType === CoinGeckoApiType.PRO ? 'x-cg-pro-api-key' : 'x-cg-demo-api-key';
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.baseUrl}/${endpoint}`,
      params: { ...params, [apiHeader]: this.apiKey },
    };

    try {
      const { data } = await this.client(config);
      return data;
    } catch (e) {
      let error = e as string;
      if (e instanceof Error) error = e.message;
      if (isAxiosError(e)) error = e.response?.data.status;
      throw error;
    }
  };

  /**
   * Check API server status
   * @returns `active` or `inactive`
   *
   * @example
   * const client = new CoinGecko()
   * const apiStatus = client.getApiStatus();
   * console.log(apiStatus)
   */
  public getApiStatus = async (): Promise<{ status: string }> => {
    const status = await this.createRequest<Status>('ping', {});
    return {
      status: status.gecko_says.includes('the Moon!') ? 'active' : 'inactive',
    };
  };

  /**
   * Get the current price of any cryptocurrencies in any other supported currencies that you need.
   *
   * @param {PriceByIdParams} params Parameters for the request
   * @param {string[]} params.ids List of coin ids
   * @param {string[]} params.vs_currencies List of vs_currencies (@see getSupportedVsCurrencies)
   * @param {boolean} [params.include_market_cap] `true`/`false` to include market_cap, default: `false`
   * @param {boolean} [params.include_24hr_vol] `true`/`false` to include 24hr_vol, default: `false`
   * @param {boolean} [params.include_24hr_change] `true`/`false` to include 24hr_change, default: `false`
   * @param {boolean} [params.include_last_updated_at] `true`/`false` to include last_updated_at of price, default: `false`
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const price = await client.getPriceById({
   *   ids: ['ethereum'],
   *   vs_currencies: ['usd'],
   *   include_market_cap: true,
   *   include_24hr_vol: false,
   *   precision: 'full'
   * });
   */
  public getPriceById = async (params: PriceByIdParams): Promise<Price> => {
    const { ids, vs_currencies } = params;

    return await this.createRequest<Price>('simple/price', {
      ...params,
      ids: ids.join(','),
      vs_currencies: vs_currencies.join(','),
    });
  };

  /**
   * Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
   *
   * @param {PriceByContract} params Parameters for the request
   * @param {string} params.id The id of the platform issuing tokens (@see getAssetPlatforms for list of options)
   * @param {string[]} params.contract_addresses List of contract_addresses
   * @param {string[]} params.vs_currencies List of vs_currencies (@see getSupportedVsCurrencies)
   * @param {boolean} [params.include_market_cap] `true`/`false` to include market_cap, default: `false`
   * @param {boolean} [params.include_24hr_vol] `true`/`false` to include 24hr_vol, default: `false`
   * @param {boolean} [params.include_24hr_change] `true`/`false` to include 24hr_change, default: `false`
   * @param {boolean} [params.include_last_updated_at] `true`/`false` to include last_updated_at of price, default: `false`
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const price = await client.getPriceByContractAddress({
   *   id: 'ethereum',
   *   contract_addresses: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
   *   vs_currencies: ['usd'],
   *   include_market_cap: true,
   *   include_24hr_vol: false,
   *   precision: 'full'
   * });
   */
  public getPriceByContractAddress = async (params: PriceByContract): Promise<Price> => {
    const { id, contract_addresses, vs_currencies } = params;

    return await this.createRequest<Price>(`simple/token_price/${id}`, {
      ...params,
      contract_addresses: contract_addresses.join(','),
      vs_currencies: vs_currencies.join(','),
    });
  };

  /**
   * Get list of supported_vs_currencies
   *
   * @example
   * const client = new CoinGecko()
   * const vsCurrencies = await client.getSupportedVsCurrencies();
   * console.log(vsCurrencies)
   */
  public getSupportedVsCurrencies = async (): Promise<string[]> => {
    return await this.createRequest<string[]>('simple/supported_vs_currencies', {});
  };

  /**
   * List all supported coins id, name and symbol (no pagination required)
   *
   * @param {CoinsListParams} params Parameters for the request
   * @param {string} [params.include_platform] Flag to include platform contract addresses (eg. 0x.... for Ethereum based tokens).
   *
   * @example
   * const client = new CoinGecko()
   * const coins = await client.getCoinList({
   *   include_platform: false
   * });
   */
  public getCoinList = async (params: CoinsListParams = {}): Promise<Coin[]> => {
    return await this.createRequest<Coin[]>('coins/list', params);
  };

  /**
   * Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
   *
   * @param {MarketParams} params Parameters for the request
   * @param {string} params.vs_currency The target currency of market data (usd, eur, jpy, etc.)
   * @param {string[]} [params.ids] List of coin ids
   * @param {string} [params.category] Filter by coin category. Refer to /coin/categories/list
   * @param {string} [params.order] Sort results by field.
   * @param {boolean} [params.sparkline] Include sparkline 7 days data
   * @param {string} [params.price_change_percentage] List of price change percentages, e.g. `['1h','24h','7d']`
   * @param {string} [params.locale] Visit the CoinGecko documentation for a full list of supported locales
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   * @param {number} [params.per_page] Total results per page, value between `1` and `250`, default: `100`
   * @param {number} [params.page] Page through results
   *
   * @example
   * const client = new CoinGecko()
   * const coins = await client.getCoinMarkets({
   *   vs_currency: 'usd',
   *   ids: ['bitcoin', 'ethereum'],
   *   order: 'market_cap_desc',
   *   per_page: 100,
   *   price_change_percentage: ['1h', '24h', '7d'],
   *   locale: 'hr',
   * });
   */
  public getCoinMarkets = async (params: MarketParams): Promise<Market[]> => {
    return await this.createRequest<Market[]>('coins/markets', {
      ...params,
      ids: params.ids?.join(','),
      price_change_percentage: params.price_change_percentage?.join(','),
    });
  };

  /**
   * Get current data (name, price, market, exchange tickers) for a coin.
   *
   * @param {MarketParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {boolean} [params.localization] Include all localized languages in response, default: `true`
   * @param {boolean} [params.tickers] Include tickers data, default: `true`
   * @param {boolean} [params.market_data] Include market data, default: `true`
   * @param {boolean} [params.community_data] Include community data, default: `true`
   * @param {boolean} [params.developer_data] Include developer data, default: `true`
   * @param {boolean} [params.sparkline] Include sparkline data, default: `true`
   *
   * @example
   * const client = new CoinGecko()
   * const coin = await client.getCoinById({
   *   id: 'bitcoin',
   *   tickers: false
   * });
   */
  public getCoinById = async (params: CoinByIdParams): Promise<CoinVerbose> => {
    return await this.createRequest<CoinVerbose>(`coins/${params.id}`, params);
  };

  /**
   * Get coin tickers (paginated to 100 items).
   *
   * @param {TickerParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {string[]} [params.exchange_ids] Filter results by exchange_ids (ref: v3/exchanges/list)
   * @param {boolean} [params.include_exchange_logo] Flag indicating whether to include exchange logos in the response.
   * @param {number} [params.page] The page number for paginated results.
   * @param {string} [params.order] The order in which to sort the results. Possible values: 'trust_score_desc', 'trust_score_asc', or 'volume_desc'.
   * @param {boolean} [params.depth] Flag indicating whether to include 2% of the orderbook depth
   *
   * @example
   * const client = new CoinGecko()
   * const tickers = await client.getCoinTickers({
   *   id: 'bitcoin',
   *   exchange_ids: ['binance'],
   *   order: 'trust_score_desc'
   * });
   */
  public getCoinTickers = async (params: TickerParams): Promise<Ticker[]> => {
    return await this.createRequest<Ticker[]>(`coins/${params.id}/tickers`, {
      ...params,
      exchange_ids: params.exchange_ids?.join(','),
    });
  };

  /**
   * Get historical data (price, market cap, 24hr volume, etc.) at a given date for a coin.
   *
   * @param {CoinHistoryParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {Date | number} params.date The date of data snapshot
   * @param {boolean} [params.localization] Set to `false` to exclude localized languages in response
   *
   * @example
   * const client = new CoinGecko()
   * const history = await client.getCoinHistory({
   *   id: 'bitcoin',
   *   date: new Date('2021-01-01'),
   *   localization: false,
   * });
   */
  public getCoinHistory = async (params: CoinHistoryParams): Promise<CoinHistory> => {
    const unixDate = params.date instanceof Date ? params.date.getTime() / 1000 : params.date;
    const date = format(fromUnixTime(unixDate), 'dd-MM-yyyy');
    return await this.createRequest<CoinHistory>(`coins/${params.id}/history`, {
      ...params,
      date,
    });
  };

  /**
   * Get historical market data include price, market cap, and 24h volume (granularity auto)
   *
   * @param {MarketChartParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {string} params.vs_currency The target currency of market data
   * @param {number | 'max'} params.days Data up to number of days ago (eg. `1`,`14`,`30`,`max`)
   * @param {'daily'} [params.interval] Data interval. Possible value: `daily`
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const chart = await client.getCoinMarketChart({
   *   id: 'bitcoin',
   *   vs_currency: 'usd'
   *   days: 14
   * });
   */
  public getCoinMarketChart = async (params: MarketChartParams): Promise<MarketChart> => {
    return await this.createRequest<MarketChart>(`coins/${params.id}/market_chart`, params);
  };

  /**
   * Get historical market data include price, market cap, and 24h volume within a range of a timestamp (granularity auto)
   *
   * @param {MarketChartRangeParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {string} params.vs_currency The target currency of market data
   * @param {number} params.from From date in unix timestamp
   * @param {number} params.to To date in unix timestamp
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const chartRange = await client.getCoinMarketChartRange({
   *   id: 'bitcoin',
   *   vs_currency: 'usd'
   *   from: 1618716149,
   *   to: 1618716149
   * });
   */
  public getCoinMarketChartRange = async (params: MarketChartRangeParams): Promise<MarketChart> => {
    return await this.createRequest<MarketChart>(`coins/${params.id}/market_chart/range`, params);
  };

  /**
   * Candle's body - data granularity is automatic (cannot be adjusted for public API users)
   *
   * @param {CoinOhlcParams} params Parameters for the request
   * @param {string} params.id The ID of the coin, e.g. `bitcoin`
   * @param {string} params.vs_currency The target currency of market data
   * @param {number | 'max'} params.days Data up to number of days ago (eg. `1`,`7`,`14`,`30`,`90`,`180`,`365`,`max`)
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const coinOhlc = await client.getCoinOhlc({
   *   id: 'bitcoin',
   *   vs_currency: 'usd'
   *   days: 14
   * });
   */
  public getCoinOhlc = async (params: CoinOhlcParams): Promise<CoinOhlc> => {
    return await this.createRequest<CoinOhlc>(`coins/${params.id}/ohlc`, params);
  };

  /**
   * Get coin info from contract address
   *
   * @param {ContractInfoParams} params Parameters for the request
   * @param {string} params.id Asset platform (@see getAssetPlatforms)
   * @param {string} params.contract_address Token's contract address
   *
   * @example
   * const client = new CoinGecko()
   * const contractInfo = await client.getContractInfo({
   *   id: 'ethereum',
   *   contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
   * });
   */
  public getContractInfo = async (params: ContractInfoParams): Promise<CoinVerbose> => {
    return await this.createRequest<CoinVerbose>(
      `coins/${params.id}/contract/${params.contract_address}`,
      params,
    );
  };

  /**
   * Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
   *
   * @param {MarketChartFromContractParams} params Parameters for the request
   * @param {string} params.id The asset platform id (@see getAssetPlatforms)
   * @param {string} params.contract_address Token's contract address
   * @param {string} params.vs_currency The target currency of market data, e.g. `usd`
   * @param {number | 'max'} params.days Data up to number of days ago (eg. `1`,`14`,`30`,`max`)
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const chart = await client.getContractMarketChart({
   *   id: 'ethereum',
   *   contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
   *   vs_currency: 'usd',
   *   days: 14
   * });
   */
  public getContractMarketChart = async (
    params: MarketChartFromContractParams,
  ): Promise<MarketChart> => {
    return await this.createRequest<MarketChart>(
      `coins/${params.id}/contract/${params.contract_address}/market_chart`,
      params,
    );
  };

  /**
   * Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) from a contract address
   *
   * @param {MarketChartRangeFromContractParams} params Parameters for the request
   * @param {string} params.id The asset platform id (@see getAssetPlatforms)
   * @param {string} params.contract_address Token's contract address
   * @param {string} params.vs_currency The target currency of market data, e.g. `usd`
   * @param {number} params.from From date in unix timestamp
   * @param {number} params.to To date in unix timestamp
   * @param {Precision} [params.precision] `full` or any value between 0 - 18 to specify decimal place for currency price value
   *
   * @example
   * const client = new CoinGecko()
   * const chartRange = await client.getContractMarketChartRange({
   *   id: 'ethereum',
   *   contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
   *   vs_currency: 'usd',
   *   from: 1618716149,
   *   to: 1618716149
   * });
   */
  public getContractMarketChartRange = async (
    params: MarketChartRangeFromContractParams,
  ): Promise<MarketChart> => {
    return await this.createRequest<MarketChart>(
      `coins/${params.id}/contract/${params.contract_address}/market_chart/range`,
      params,
    );
  };

  /**
   * List all asset platforms
   *
   * @param {AssetPlatformParams} params Parameters for the request
   * @param {string} [params.filter] Apply relevant filters to the results. Valid values: `nft`
   *
   * @example
   * const client = new CoinGecko()
   * const platforms = await client.getAssetPlatforms();
   */
  public getAssetPlatforms = async (params: AssetPlatformParams = {}): Promise<AssetPlatform[]> => {
    return await this.createRequest<AssetPlatform[]>('asset_platforms', params);
  };

  /**
   * List all categories
   *
   * @example
   * const client = new CoinGecko()
   * const categories = await client.getCoinCategoriesList();
   */
  public getCoinCategoriesList = async (): Promise<CoinCategoryListItem[]> => {
    return await this.createRequest<CoinCategoryListItem[]>('coins/categories/list', {});
  };

  /**
   * List all categories with market data
   *
   * @param {CoinCategoryParams} params Parameters for the request
   * @param {string} [params.order] Valid values: `market_cap_desc`, `market_cap_asc`, `name_desc`, `name_asc`, `market_cap_change_24h_desc`, `market_cap_change_24h_asc`
   *
   * @example
   * const client = new CoinGecko()
   * const categories = await client.getCoinCategories();
   */
  public getCoinCategories = async (params: CoinCategoryParams = {}): Promise<CoinCategory[]> => {
    return await this.createRequest<CoinCategory[]>('coins/categories', params);
  };

  /**
   * List all exchanges
   *
   * @param {PaginationParams} params Parameters for the request
   * @param {number} [params.per_page] Total results per page, value between `1` and `250`, default: `100`
   * @param {number} [params.page] Page through results
   *
   * @example
   * const client = new CoinGecko()
   * const exchanges = await client.getExchanges({
   *   per_page: 250,
   *   page: 1,
   * });
   */
  public getExchanges = async (params: PaginationParams): Promise<Exchange[]> => {
    return await this.createRequest<Exchange[]>(`exchanges`, params);
  };

  /**
   * List all markets ids
   *
   * @example
   * const client = new CoinGecko()
   * const marketIds = await client.getExchangesList();
   */
  public getExchangesList = async (): Promise<ExchangeListItem[]> => {
    return await this.createRequest<ExchangeListItem[]>(`exchanges/list`, {});
  };

  /**
   * Get exchange volume in BTC and tickers
   *
   * @param {ExchangeByIdParams} params Parameters for the request
   * @param {string} params.id The exchange id (@see getExchangesList)
   *
   * @example
   * const client = new CoinGecko()
   * const exchange = await client.getExchangesById({
   *   id: 'binance',
   * });
   */
  public getExchangesById = async (params: ExchangeByIdParams): Promise<ExchangeVerbose> => {
    return await this.createRequest<ExchangeVerbose>(`exchanges/${params.id}`, {});
  };

  /**
   * Get exchange tickers (paginated)
   *
   * @param {ExchangeTickerParams} params Parameters for the request
   * @param {string} params.id The exchange id (@see getExchangesList)
   * @param {string[]} [params.coin_ids] Filter results by coin ids (@see getCoinList)
   * @param {boolean} [params.include_exchange_logo] Flag indicating whether to include exchange logos in the response
   * @param {number} [params.page] The page number for paginated results
   * @param {string} [params.order] The order in which to sort the results. Possible values: 'trust_score_desc', 'trust_score_asc', or 'volume_desc'
   * @param {boolean} [params.depth] Flag indicating whether to include 2% of the orderbook depth
   *
   * @example
   * const client = new CoinGecko()
   * const tickers = await client.getExchangeTickers({
   *   id: 'binance',
   *   coin_ids: ['bitcoin', 'ethereum'],
   *   order: 'trust_score_desc'
   * });
   */
  public getExchangeTickers = async (params: ExchangeTickerParams): Promise<ExchangeTicker[]> => {
    return await this.createRequest<ExchangeTicker[]>(`exchanges/${params.id}/tickers`, {
      ...params,
      coin_ids: params.coin_ids?.join(','),
    });
  };

  /**
   * Get volume chart data (in BTC) for a given exchange
   *
   * @param {ExchangeVolumeChartParams} params Parameters for the request
   * @param {string} params.id The exchange id (@see getExchangesList)
   * @param {number} params.days Data up to number of days ago (eg. `1`,`7`,`14`,`30`,`90`,`180`,`365`)
   *
   * @example
   * const client = new CoinGecko()
   * const chart = await client.getExchangeVolumeChart({
   *   id: 'binance',
   *   days: 14
   * });
   */
  public getExchangeVolumeChart = async (
    params: ExchangeVolumeChartParams,
  ): Promise<ExchangeVolumeChart> => {
    return await this.createRequest<ExchangeVolumeChart>(
      `exchanges/${params.id}/volume_chart`,
      params,
    );
  };

  /**
   * List all derivative tickers
   *
   * @param {DerivativeParams} params Parameters for the request
   * @param {string} [params.include_tickers] Set `unexpired` to show unexpired tickers, `all` for all tickers, default: `unexpired`
   *
   * @example
   * const client = new CoinGecko()
   * const derivativeTickers = await client.getDerivatives({
   *   include_tickers: 'all',
   * });
   */
  public getDerivatives = async (params: DerivativeParams = {}): Promise<Derivative[]> => {
    return await this.createRequest<Derivative[]>(`derivatives`, params);
  };

  /**
   * List all derivative exchanges
   *
   * @param {DerivativeExchangeParams} params Parameters for the request
   * @param {string} [params.order] Valid values: `name_asc`, `name_desc`, `open_interest_btc_asc`, `open_interest_btc_desc`, `trade_volume_24h_btc_asc`, `trade_volume_24h_btc_desc`
   * @param {number} [params.per_page] Total results per page, value between `1` and `250`, default: `100`
   * @param {number} [params.page] Page through results
   *
   * @example
   * const client = new CoinGecko()
   * const derivativeExchanges = await client.getDerivativesExchanges({
   *   order: 'trade_volume_24h_btc_desc',
   * });
   */
  public getDerivativesExchanges = async (
    params: DerivativeExchangeParams = {},
  ): Promise<DerivativeExchange[]> => {
    return await this.createRequest<DerivativeExchange[]>(`derivatives/exchanges`, params);
  };

  /**
   * Show derivative exchange data
   *
   * @param {DerivativeExchangeByIdParams} params Parameters for the request
   * @param {string} params.id The exchange id (@see getExchangesList)
   * @param {string} [params.include_tickers] Set `unexpired` to show unexpired tickers, `all` for all tickers, default: `unexpired`
   *
   * @example
   * const client = new CoinGecko()
   * const derivative = await client.getDerivativesExchangeById({
   *   id: 'bitmex',
   * });
   */
  public getDerivativesExchangeById = async (
    params: DerivativeExchangeByIdParams,
  ): Promise<DerivativeExchangeById> => {
    return await this.createRequest<DerivativeExchangeById>(
      `derivatives/exchanges/${params.id}`,
      params,
    );
  };

  /**
   * List all derivative exchanges name and identifier
   *
   * @example
   * const client = new CoinGecko()
   * const derivativeExchanges = await client.getDerivativesExchangesList();
   */
  public getDerivativesExchangesList = async (): Promise<ExchangeListItem[]> => {
    return await this.createRequest<ExchangeListItem[]>(`derivatives/exchanges/list`, {});
  };

  /**
   * Use this to obtain all the NFT ids in order to make API calls, paginated to 100 items.
   *
   * @param {NftListParams} params Parameters for the request
   * @param {string} [params.order] Valid values: `h24_volume_native_asc`,`h24_volume_native_desc`,`floor_price_native_asc`,`floor_price_native_desc`,`market_cap_native_asc`,`market_cap_native_desc`,`market_cap_usd_asc`,`market_cap_usd_desc`
   * @param {string} [params.asset_platform_id] The id of the platform issuing tokens (@see getAssetPlatforms for list of options)
   * @param {number} [params.per_page] Total results per page, value between `1` and `250`, default: `100`
   * @param {number} [params.page] Page through results
   *
   * @example
   * const client = new CoinGecko()
   * const nfts = await client.getNftsList({
   *   order: 'h24_volume_native_asc',
   *   asset_platform_id: 'ethereum',
   * });
   */
  public getNftsList = async (params: NftListParams = {}): Promise<NftListItem[]> => {
    return await this.createRequest<NftListItem[]>(`nfts/list`, params);
  };

  /**
   * Get current data (name, floor, volume, etc.) for an NFT collection
   *
   * @param {NftByIdParams} params Parameters for the request
   * @param {string} params.id The nft collection id (@see getNftsList)
   *
   * @example
   * const client = new CoinGecko()
   * const nft = await client.getNftById({
   *   id: 'bored-ape-yacht-club',
   * });
   */
  public getNftById = async (params: NftByIdParams): Promise<NftItem> => {
    return await this.createRequest<NftItem>(`nfts/${params.id}`, {});
  };

  /**
   * Get current data (name, floor, volume, etc.) for an NFT collection (no support for Solana & Art Block, use getNftById instead)
   *
   * @param {NftByContractParams} params Parameters for the request
   * @param {string} params.asset_platform_id The id of the platform issuing tokens (@see getAssetPlatforms and use the `nft` filter)
   * @param {string} params.contract_address The collection contract address
   *
   * @example
   * const client = new CoinGecko()
   * const baycData = await client.getNftByContractAddress({
   *   asset_platform_id: 'ethereum',
   *   contract_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
   * });
   */
  public getNftByContractAddress = async (params: NftByContractParams): Promise<NftItem> => {
    return await this.createRequest<NftItem>(
      `nfts/${params.asset_platform_id}/contract/${params.contract_address}`,
      {},
    );
  };

  /**
   * Get BTC-to-Currency exchange rates
   *
   * @example
   * const client = new CoinGecko()
   * const rates = await client.getExchangeRates();
   */
  public getExchangeRates = async (): Promise<{ rates: Record<string, ExchangeRate> }> => {
    return await this.createRequest<{ rates: Record<string, ExchangeRate> }>(`exchange_rates`, {});
  };

  /**
   * Search for coins, categories and markets listed on CoinGecko ordered by largest market cap first
   *
   * @param {string} query The search string
   *
   * @example
   * const client = new CoinGecko()
   * const btcItems = await client.search('btc');
   */
  public search = async (query: string): Promise<SearchResult> => {
    return await this.createRequest<SearchResult>('search', { query });
  };

  /**
   * Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (ordered by most popular)
   *
   * @example
   * const client = new CoinGecko()
   * const trending = await client.getTrending();
   */
  public getTrending = async (): Promise<Trending> => {
    return await this.createRequest<Trending>(`search/trending`, {});
  };

  /**
   * Get cryptocurrency global data (updates every 10 minutes)
   *
   * @example
   * const client = new CoinGecko()
   * const globalData = await client.getGlobal();
   */
  public getGlobal = async (): Promise<GlobalData> => {
    return await this.createRequest<GlobalData>(`global`, {});
  };

  /**
   * Get the top 100 cryptocurrencies and global DeFi data (updates every 60 minutes)
   *
   * @example
   * const client = new CoinGecko()
   * const globalData = await client.getGlobalDeFi();
   */
  public getGlobalDeFi = async (): Promise<GlobalDeFiData> => {
    return await this.createRequest<GlobalDeFiData>(`global/decentralized_finance_defi`, {});
  };

  /**
   * Get public companies bitcoin or ethereum holdings
   *
   * @param {CompanyDataParams} params Parameters for the request
   * @param {string} params.id Coin id (`bitcoin` or `ethereum`)
   *
   * @example
   * const client = new CoinGecko()
   * const btcByCompanies = await client.getCompaniesPublicTreasury({
   *   coin_id: 'bitcoin',
   * });
   */
  public getCompaniesPublicTreasury = async (params: CompanyDataParams): Promise<CompaniesData> => {
    return await this.createRequest<CompaniesData>(
      `companies/public_treasury/${params.coin_id}`,
      {},
    );
  };
}

export default CoinGecko;
