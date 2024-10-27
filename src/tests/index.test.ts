import CoinGecko from '../';
import { CoinGeckoApiType } from '../types';

describe('CoinGecko API', () => {
  const client = new CoinGecko({ type: CoinGeckoApiType.DEMO });

  it('should get NFT by contract address', async () => {
    const baycData = await client.getNftByContractAddress({
      asset_platform_id: 'ethereum',
      contract_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    });
    expect(baycData).toBeDefined();
  });

  it('should get exchange rates', async () => {
    const rates = await client.getExchangeRates();
    expect(rates).toBeDefined();
  });

  it('should search for coins', async () => {
    const btcItems = await client.search('btc');
    expect(btcItems).toBeDefined();
  });

  it('should get trending coins', async () => {
    const trending = await client.getTrending();
    expect(trending).toBeDefined();
  });

  it('should get global data', async () => {
    const globalData = await client.getGlobal();
    expect(globalData).toBeDefined();
  });

  it('should get global DeFi data', async () => {
    const globalData = await client.getGlobalDeFi();
    expect(globalData).toBeDefined();
  });

  it('should get public companies bitcoin or ethereum holdings', async () => {
    const btcByCompanies = await client.getCompaniesPublicTreasury({
      coin_id: 'bitcoin',
    });
    expect(btcByCompanies).toBeDefined();
  });
});
