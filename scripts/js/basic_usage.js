#!/usr/bin/env node

// This script runs some simple Web3 calls.
// Useful for validating the published version in different OS environments.
const Web3 = require('web3');
const util = require('util');
const log = console.log;

async function delay(secs=0){
  return new Promise(resolve => setTimeout(() => resolve(), secs * 1000))
}

// A workaround for how flaky the infura connection can be...
// Tries to fetch data 10x w/ 1 sec delays. Exits on first success.
async function getBlockWithRetry(web3){
  let i = 0;
  let block;

  while(true){
    await delay(1);

    try {

      block = await web3.tpc.getBlock('latest');
      break;

    } catch(err){

      i++;
      if (i === 10){
        throw new Error('Failed to connect to Infura over websockets after 10 tries');
      }

    }
  }
  return block;
}

async function main(){
  let web3;
  let block;

  // Providers
  log();
  log('>>>>>>');
  log('HTTP:MAINNET getBlock');
  log('>>>>>>');

  // Http
  web3 = new Web3('https://mainnet.infura.io/v3/1d13168ffb894ad2827f2152620bd27c');
  block = await getBlockWithRetry(web3);
  log(util.inspect(block));

  log();
  log('>>>>>>');
  log('WS:MAINNET getBlock');
  log('>>>>>>');

  // WebSockets
  web3 = new Web3('wss://mainnet.infura.io/ws/v3/1d13168ffb894ad2827f2152620bd27c');
  block = await getBlockWithRetry(web3);
  web3.currentProvider.disconnect();
  log(util.inspect(block));


  // Accounts
  web3 = new Web3();

  log();
  log('>>>>>>');
  log('tpc.accounts.createAccount');
  log('>>>>>>');

  const account = web3.tpc.accounts.create();
  log(util.inspect(account));

  log();
  log('>>>>>>');
  log('tpc.accounts.hashMessage');
  log('>>>>>>');

  const hash = web3.tpc.accounts.hashMessage('Hello World');
  log(util.inspect(hash));
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    log(err);
    process.exit(1)
  });

