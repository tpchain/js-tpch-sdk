var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var tpc = new Eth();

var setValue = 123;

describe('web3.tpc', function () {
    describe('transactionBlockTimeout', function () {
        it('should check if transactionBlockTimeout is set to proper value', function () {
            assert.equal(tpc.transactionBlockTimeout, 50);
            assert.equal(tpc.Contract.transactionBlockTimeout, 50);
            assert.equal(tpc.getCode.method.transactionBlockTimeout, 50);
        });
        it('should set transactionBlockTimeout for all sub packages is set to proper value, if Eth package is changed', function () {
            tpc.transactionBlockTimeout = setValue;

            assert.equal(tpc.transactionBlockTimeout, setValue);
            assert.equal(tpc.Contract.transactionBlockTimeout, setValue);
            assert.equal(tpc.getCode.method.transactionBlockTimeout, setValue);
        });
    });
});

