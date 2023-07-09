const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the NFT Contract
  const nftContract = await hre.ethers.deployContract("NFT");
  await nftContract.waitForDeployment();
  console.log("NFT deployed to:", nftContract.target);

  // Deploy the Fake Marketplace Contract
  const MarketplaceContract = await hre.ethers.deployContract(
    "Marketplace"
  );
  await MarketplaceContract.waitForDeployment();
  console.log(
    "Marketplace deployed to:",
    MarketplaceContract.target
  );

  // Deploy the DAO Contract
  const daoContract = await hre.ethers.deployContract("DAO", [
    MarketplaceContract.target,
    nftContract.target,
  ]);
  await daoContract.waitForDeployment();
  console.log("DAO deployed to:", daoContract.target);

  // Sleep for 30 seconds to let Etherscan catch up with the deployments
  await sleep(30 * 1000);

  // Verify the NFT Contract
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [],
  });

  // Verify the Fake Marketplace Contract
  await hre.run("verify:verify", {
    address: MarketplaceContract.target,
    constructorArguments: [],
  });

  // Verify the DAO Contract
  await hre.run("verify:verify", {
    address: daoContract.target,
    constructorArguments: [
      MarketplaceContract.target,
      nftContract.target,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});