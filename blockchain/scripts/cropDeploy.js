const hre = require("hardhat");

async function main() {
  const CropMarketplace = await hre.ethers.getContractFactory("CropMarketplace");
  const marketplace = await CropMarketplace.deploy();
  console.log("CropMarketplace deployed to:", marketplace.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
