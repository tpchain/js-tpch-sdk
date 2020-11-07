var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var tpc = new Eth();

var setValue = 123;

describe('web3.tpc', function () {
    describe('transactionPollingTimeout', function () {
        it('should check if transactionPollingTimeout is set to proper value', function () {
            assert.equal(tpc.transactionPollingTimeout, 750);
            assert.equal(tpc.Contract.transactionPollingTimeout, 750);
            assert.equal(tpc.getCode.method.transactionPollingTimeout, 750);
        });
        it('should set transactionPollingTimeout for all sub packages is set to proper value, if Eth package is changed', function () {
            tpc.transactionPollingTimeout = setValue;

            assert.equal(tpc.transactionPollingTimeout, setValue);
            assert.equal(tpc.Contract.transactionPollingTimeout, setValue);
            assert.equal(tpc.getCode.method.transactionPollingTimeout, setValue);
        });
    });
});

