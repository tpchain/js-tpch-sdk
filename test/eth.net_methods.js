var chai = require('chai');
var assert = chai.assert;
var u = require('./helpers/test.utils.js');
var Eth = require('../packages/web3-eth');
var tpc = new Eth();

describe('web3.net', function() {
    describe('methods', function() {
        u.methodExists(tpc.net, 'getId');
        u.methodExists(tpc.net, 'getNetworkType');
        u.methodExists(tpc.net, 'isListening');
        u.methodExists(tpc.net, 'getPeerCount');
    });
});
