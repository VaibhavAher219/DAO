require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const sepolia_url = process.env.sepolia_url;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    Sepolia: {
      url: sepolia_url,
      accounts: [PRIVATE_KEY]
    }
  }
};