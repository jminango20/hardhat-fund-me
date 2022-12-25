//import 
//main function
//calling of main function

const { deployments, network } = require("hardhat");

// *** Option 1
//function deployFunc(){
//    console.log("Hi!")
//    hre.getNamedAccounts()
//    hre.deployments()
//}
//module.exports.default = deployFunc

// *** Option 2
//module.exports = async (hre) => {
//    const {getNamedAccounts, deployments} = hre

//const helperConfig = require("../helper-hardhat-config")
//const networkConfig = helperConfig.networkConfig
const { networConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async({getNamedAccounts, deployments}) => {
 const { deploy, log } = deployments
 const { deployer } = await getNamedAccounts()
 const chainId = network.config.chainId

 //if chainId is X use address Y
 //if chainId is Z use address A
 //const ethUsdPriceFeedAddress = networConfig[chainId]["ethUsdPriceFeed"]
 let ethsUsdPriceFeedAddress
 if(developmentChains.includes(network.name)){
   const ethUsdAggregator = await deployments.get("MockV3Aggregator")
   ethsUsdPriceFeedAddress = ethUsdAggregator.address
 }else{
   ethsUsdPriceFeedAddress = networConfig[chainId]["ethUsdPriceFeed"]
 }


 const args = [ethsUsdPriceFeedAddress]
 //when going for localhost or hardhat network we want to use a mock
 const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //put price feed address
    log: true,
 })

 if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
   //verify
   await verify(fundMe.address, args)
 }

 log("---------------------------------------------------------------")
}    
module.exports.tags = ["all", "FundMe"]