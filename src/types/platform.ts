export interface AssetPlatform {
  id: string;
  chain_identifier: string;
  name: string;
  shortname: string;
}

export interface AssetPlatformParams {
  filter?: 'nft';
}
