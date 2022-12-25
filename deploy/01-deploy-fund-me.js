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
module.exports = async({getNamedAccounts, deployments}) => {
 const { deploy, log } = deployments
 const { deployer } = await getNamedAccounts
 const chainId = network.config.chainId

}    
