
# CoinGecko API Client

A TypeScript client for the [CoinGecko](https://www.coingecko.com/en/api) API.

## Installation
```shell
npm install coingecko-api-client
```

## Quick Start
```javascript
import CoinGecko from 'coingecko-api-client';

const client = new CoinGecko();

const bitcoinPrice = await client.getPriceById({
  ids: ['bitcoin'], 
  vs_currencies: ['usd']
});

console.log(bitcoinPrice);
```

## Options
The following optional parameters can be passed when creating an instance:
```javascript
import axios from 'axios';

// apiKey  (optional) - CoinGecko Pro API key
// timeout (optional) - request timeout in milliseconds
// client  (optional) - existing Axios instance to use for requests
const client = new CoinGecko('aF8cd17B90A', 3000, axios.create());

const bitcoinPrice = await client.getPriceById({
  ids: ['bitcoin'], 
  vs_currencies: ['usd']
});

console.log(bitcoinPrice);
```

## API

The following CoinGecko API endpoints are supported:

-   `getApiStatus`  - Check API server status
-   `getPriceById`  - Get current price of coins
-   `getPriceByContractAddress`  - Get current price of tokens by contract address
-   `getSupportedVsCurrencies`  - Get list of supported vs currencies
-   `getCoinList`  - List all supported coins
-   `getCoinMarkets`  - Get current market data for coins
-   `getCoinById`  - Get current data for coin
-   `getCoinTickers`  - Get coin tickers
-   `getCoinHistory`  - Get historical data for coin
-   `getCoinMarketChart`  - Get historical market data for coin
-   `getCoinMarketChartRange`  - Get historical market data for coin within a date range
-   `getCoinOhlc`  - Get OHLC data for coin
-   `getContractInfo`  - Get coin info from contract address
-   `getContractMarketChart`  - Get historical market data for contract address
-   `getContractMarketChartRange`  - Get historical data for contract address within a date range
-   `getAssetPlatforms`  - List asset platforms
-   `getCoinCategoriesList`  - List coin categories
-   `getCoinCategories`  - List coin categories with market data
-   `getExchanges`  - List exchanges
-   `getExchangesList`  - List exchange ids
-   `getExchangesById`  - Get exchange volume and tickers
-   `getExchangeTickers`  - Get exchange tickers
-   `getExchangeVolumeChart`  - Get exchange volume chart
-   `getDerivatives`  - List derivative tickers
-   `getDerivativesExchanges`  - List derivative exchanges
-   `getDerivativesExchangeById`  - Get derivative exchange data
-   `getDerivativesExchangesList`  - List derivative exchange ids
-   `getNftsList`  - List NFT collections
-   `getNftById`  - Get NFT collection data
-   `getNftByContractAddress`  - Get NFT collection data by contract address
-   `getExchangeRates`  - Get BTC-to-currency exchange rates
-   `search`  - Search for coins
-   `getTrending`  - Get trending searches
-   `getGlobal`  - Get cryptocurrency global data
-   `getGlobalDeFi`  - Get top DeFi coins
-   `getCompaniesPublicTreasury`  - Get public companies crypto holdings

See the [API docs](https://www.coingecko.com/en/api/documentation) for more details on parameters and usage.

## License

MIT