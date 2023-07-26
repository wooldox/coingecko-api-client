import { ImageData, Precision, Locale, PaginationParams } from '.';

export interface CoinsListParams {
  include_platform?: boolean;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  platform?: string;
}

export interface MarketParams extends PaginationParams {
  vs_currency: string;
  ids?: string[];
  category?: string;
  order?: 'market_cap_asc' | 'market_cap_desc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc';
  sparkline?: boolean;
  price_change_percentage?: string[];
  locale?: Locale;
  precision?: Precision;
}

export interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number;
  last_updated: string;
}

export interface CoinByIdParams {
  id: string;
  localization?: boolean;
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
}

export interface CoinVerbose {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string;
  platforms: Record<string, string>;
  detail_platforms: Record<string, { decimal_place: number; contract_address: string }>;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: string | string[];
  additional_notices: string[];
  localization?: Record<Locale, string>;
  description: Record<Locale, string>;
  links: CoinLinks;
  image: ImageData;
  country_origin: string;
  genesis_date: string;
  contract_address: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: InterestStats;
  status_updates: string[];
  last_updated: string;
  tickers: Ticker[];
}

export interface TickerParams {
  id: string;
  exchange_ids?: string[];
  include_exchange_logo?: boolean;
  page?: number;
  order?: 'trust_score_desc' | 'trust_score_asc' | 'volume_desc';
  depth?: boolean;
}

export interface Ticker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: Record<string, number>;
  converted_volume: Record<string, number>;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string;
  coin_id: string;
  target_coin_id?: string;
}

export interface CoinHistory {
  id: string;
  symbol: string;
  name: string;
  localization?: Record<Locale, string>;
  image: ImageData;
  market_data: Pick<MarketData, 'current_price' | 'total_volume' | 'market_cap'>;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: InterestStats;
}

export interface CoinHistoryParams {
  id: string;
  date: Date | number;
  localization?: boolean;
}

export interface MarketChartParams {
  id: string;
  vs_currency: string;
  days: number | 'max';
  interval?: 'daily';
  precision?: Precision;
}

export interface MarketChartRangeParams extends Omit<MarketChartParams, 'days' | 'interval'> {
  from: number;
  to: number;
}

export interface MarketChartFromContractParams extends Omit<MarketChartParams, 'interval'> {
  contract_address: string;
}

export interface MarketChartRangeFromContractParams extends MarketChartRangeParams {
  contract_address: string;
}

export interface MarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CoinOhlcParams extends Omit<MarketChartParams, 'days' | 'interval'> {
  days: 1 | 7 | 14 | 30 | 90 | 180 | 365 | 'max';
}

export type CoinOhlc = [number, number, number, number, number][];

interface CommunityData {
  facebook_likes: number;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: number;
}

interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: {
    additions: number;
    deletions: number;
  };
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

interface InterestStats {
  alexa_rank: number;
  bing_matches: number;
}

interface MarketData {
  current_price: Record<string, number>;
  total_value_locked: number;
  mcap_to_tvl_ratio: number;
  fdv_to_tvl_ratio: number;
  roi: number;
  ath: Record<string, number>;
  ath_change_percentage: Record<string, number>;
  ath_date: Record<string, string>;
  atl: Record<string, number>;
  atl_change_percentage: Record<string, number>;
  atl_date: Record<string, string>;
  market_cap: Record<string, number>;
  market_cap_rank: number;
  fully_diluted_valuation: Record<string, number>;
  total_volume: Record<string, number>;
  high_24h: Record<string, number>;
  low_24h: Record<string, number>;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: Record<string, number>;
  price_change_percentage_1h_in_currency: Record<string, number>;
  price_change_percentage_24h_in_currency: Record<string, number>;
  price_change_percentage_7d_in_currency: Record<string, number>;
  price_change_percentage_14d_in_currency: Record<string, number>;
  price_change_percentage_30d_in_currency: Record<string, number>;
  price_change_percentage_60d_in_currency: Record<string, number>;
  price_change_percentage_200d_in_currency: Record<string, number>;
  price_change_percentage_1y_in_currency: Record<string, number>;
  market_cap_change_24h_in_currency: Record<string, number>;
  market_cap_change_percentage_24h_in_currency: Record<string, number>;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  sparkline_7d: { price: number[] };
  last_updated: string;
}

interface CoinLinks {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: string;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}
