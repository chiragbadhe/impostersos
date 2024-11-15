import * as hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy Reward token first
  const RewardContract = await hre.ethers.getContractFactory("Reward");
  const rewardToken = await RewardContract.deploy();
  
  // Deploy GameRoom with reward token address
  const GameRoomContract = await hre.ethers.getContractFactory("GameRoom");
  const contract = await GameRoomContract.deploy(rewardToken.target);

  console.log("Reward Token deployed to:", rewardToken.target);
  console.log("Game Room deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// To run this script:
// npx hardhat run scripts/01_deploy_gameRoom.ts --network localhost
// Or for other networks configured in hardhat.config.ts:
// npx hardhat run scripts/01_deploy_gameRoom.ts --network <network_name>

// To verify contracts:
// npx hardhat verify --network <network_name> <game_room_contract_address> <reward_token_address>
// npx hardhat verify --network <network_name> <reward_token_address>