var chai = require('chai');
var assert = chai.assert;
var u = require('./helpers/test.utils.js');

var Eth = require('../packages/web3-eth');
var tpc = new Eth();

describe('tpc', function() {
    describe('methods', function() {
        u.methodExists(tpc, 'getBalance');
        u.methodExists(tpc, 'getStorageAt');
        u.methodExists(tpc, 'getTransactionCount');
        u.methodExists(tpc, 'getCode');
        u.methodExists(tpc, 'isSyncing');
        u.methodExists(tpc, 'sendTransaction');
        u.methodExists(tpc, 'call');
        u.methodExists(tpc, 'getBlock');
        u.methodExists(tpc, 'getTransaction');
        u.methodExists(tpc, 'getUncle');
        u.methodExists(tpc, 'getBlockTransactionCount');
        u.methodExists(tpc, 'getBlockUncleCount');
        u.methodExists(tpc, 'subscribe');
        u.methodExists(tpc, 'Contract');
        u.methodExists(tpc, 'Iban');
        u.methodExists(tpc, 'getChainId')

        u.methodExists(tpc, 'isMining');
        u.methodExists(tpc, 'getCoinbase');
        u.methodExists(tpc, 'getGasPrice');
        u.methodExists(tpc, 'getHashrate');
        u.methodExists(tpc, 'getAccounts');
        u.methodExists(tpc, 'getBlockNumber');

        u.methodExists(tpc, 'getProtocolVersion');

        u.methodExists(tpc, 'setProvider');
        u.propertyExists(tpc, 'givenProvider');
        u.propertyExists(tpc, 'defaultBlock');
        u.propertyExists(tpc, 'defaultAccount');

        u.propertyExists(tpc, 'net');
        u.methodExists(tpc.net, 'getId');
        u.methodExists(tpc.net, 'isListening');
        u.methodExists(tpc.net, 'getPeerCount');

        u.propertyExists(tpc, 'personal');
        u.methodExists(tpc.personal, 'sendTransaction');
        u.methodExists(tpc.personal, 'newAccount');
        u.methodExists(tpc.personal, 'unlockAccount');
    });
});

