var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var tpc = new Eth();

var setValue = 123;

describe('web3.tpc', function () {
    describe('transactionConfirmationBlocks', function () {
        it('should check if transactionConfirmationBlocks is set to proper value', function () {
            assert.equal(tpc.transactionConfirmationBlocks, 24);
            assert.equal(tpc.Contract.transactionConfirmationBlocks, 24);
            assert.equal(tpc.getCode.method.transactionConfirmationBlocks, 24);
        });
        it('should set transactionConfirmationBlocks for all sub packages is set to proper value, if Eth package is changed', function () {
            tpc.transactionConfirmationBlocks = setValue;

            assert.equal(tpc.transactionConfirmationBlocks, setValue);
            assert.equal(tpc.Contract.transactionConfirmationBlocks, setValue);
            assert.equal(tpc.getCode.method.transactionConfirmationBlocks, setValue);
        });
    });
});

