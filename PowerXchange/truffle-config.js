require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "534352", // Match any network id
    },
    scroll: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.SCROLL_RPC_URL),
      network_id: '534352', // Replace with the correct Scroll network ID if available
    },
  },
  compilers: {
    solc: {
      version: "0.8.19", // Fetch exact version from solc-bin
    },
  },
};
