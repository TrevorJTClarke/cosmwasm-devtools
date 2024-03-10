import { chains } from "chain-registry";

const allowedChainIds = [
  'juno-1',
  'uni-6',
  'stargaze-1',
  'elgafar-1',
  'osmosis-1',
  'osmo-test-5',
  'neutron-1',
  'pion-1',
  'archway-1',
  'constantine-3',
  'phoenix-1',
  'pisco-1',
]

export const getPresetsFromChains = () => {
  let chainMap: any = {}
  chains.forEach(chain => {
    // const rpcEndpoint = chain?.apis?.rpc[0]?.address ?? "";
    let rpcEndpoint: string = '';
    let restEndpoint: string = '';

    // i "love" typescript
    if (chain && chain.apis && chain.apis.rpc && chain.apis.rpc[0] && chain.apis.rpc[0].address) {
      rpcEndpoint = chain.apis.rpc[0].address;
    }
    if (chain && chain.apis && chain.apis.rest && chain.apis.rest[0] && chain.apis.rest[0].address) {
      restEndpoint = chain.apis.rest[0].address;
    }
    if (allowedChainIds.includes(chain.chain_id)) chainMap[chain.chain_id] = {
      chainName: chain.pretty_name,
      chainId: chain.chain_id,
      rpcEndpoint, // "https://rpc-juno.itastakers.com/",
      restEndpoint, // "https://lcd-juno.itastakers.com/",
      faucetEndpoint: "",
      addressPrefix: chain.bech32_prefix,
      microDenom: `u${chain.bech32_prefix}${chain.chain_id === 'uni-6' ? 'x' : ''}`,
      coinDecimals: "6",
      gasPrice: "0.025"
    }
  })

  return chainMap
}

export default getPresetsFromChains();
