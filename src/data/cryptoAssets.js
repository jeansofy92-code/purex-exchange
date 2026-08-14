import bitcoinLogo from '../assets/crypto/bitcoin.png'
import ethereumLogo from '../assets/crypto/ethereum.png'
import tetherLogo from '../assets/crypto/tether.png'
import bnbLogo from '../assets/crypto/bnb.png'
import solanaLogo from '../assets/crypto/solana.png'
import xrpLogo from '../assets/crypto/xrp.png'

const cryptoAssets = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: bitcoinLogo,
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: ethereumLogo,
  },
  tether: {
    name: 'Tether',
    symbol: 'USDT',
    logo: tetherLogo,
  },
  bnb: {
    name: 'BNB',
    symbol: 'BNB',
    logo: bnbLogo,
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    logo: solanaLogo,
  },
  xrp: {
    name: 'XRP',
    symbol: 'XRP',
    logo: xrpLogo,
  },
}

export default cryptoAssets
