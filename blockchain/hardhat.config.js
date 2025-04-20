require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/a0803a473a864a908cb25ef0442d4a1c`,
      accounts: [`0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0`],
    },
  },
  paths: {
    artifacts: "../client/src/artifacts",
  },
};
