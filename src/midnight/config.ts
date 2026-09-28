export type MidnightNetwork = 'preprod' | 'preview';

export interface NetworkConfig {
  id: MidnightNetwork;
  name: string;
  badgeLabel: string;
  contractAddress: string;
  bech32mAddress: string;
  deployerAddress: string;
  indexerUrl: string;
  indexerWS: string;
  nodeUrl: string;
  nodeWS: string;
  faucetUrl: string;
  explorerContractUrl: string;
  explorerBaseUrl: string;
  activeCircuits: string[];
}

export const NETWORKS: Record<MidnightNetwork, NetworkConfig> = {
  preprod: {
    id: 'preprod',
    name: 'Midnight Preprod',
    badgeLabel: 'Preprod Testnet',
    contractAddress: 'd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
    bech32mAddress: 'mn_addr_preprod1d5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7',
    deployerAddress: 'mn_addr_preprod1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j',
    indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    indexerWS: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
    nodeUrl: 'https://rpc.preprod.midnight.network',
    nodeWS: 'wss://rpc.preprod.midnight.network',
    faucetUrl: 'https://midnight-tmnight-preprod.nethermind.dev/',
    explorerContractUrl:
      'https://midnight-preprod.subscan.io/contract/0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
    explorerBaseUrl: 'https://midnight-preprod.subscan.io',
    activeCircuits: ['depositPool', 'registerMerchant', 'revokeMerchant', 'redeemGrant'],
  },
  preview: {
    id: 'preview',
    name: 'Midnight Preview',
    badgeLabel: 'Preview Testnet',
    contractAddress: 'd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
    bech32mAddress: 'mn_addr_preview1d5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7',
    deployerAddress: 'mn_addr_preview1cas900z8s709cja2k93a27lnz8z6l2cvfwxerwtlfzqt6fv3p3vqcx4d4j',
    indexerUrl: 'https://indexer.preview.midnight.network/api/v4/graphql',
    indexerWS: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
    nodeUrl: 'https://rpc.preview.midnight.network',
    nodeWS: 'wss://rpc.preview.midnight.network',
    faucetUrl: 'https://midnight-tmnight-preview.nethermind.dev/',
    explorerContractUrl:
      'https://midnight-preview.subscan.io/contract/0xd5ea58d1702899641495e5a879bd1696dadc611fd72c965351b7cabe3af0fbf3',
    explorerBaseUrl: 'https://midnight-preview.subscan.io',
    activeCircuits: ['depositPool', 'registerMerchant', 'revokeMerchant', 'redeemGrant'],
  },
};

export const getNetworkConfig = (network: MidnightNetwork = 'preprod'): NetworkConfig => {
  return NETWORKS[network] ?? NETWORKS.preprod;
};
