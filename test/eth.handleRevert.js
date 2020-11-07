var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var tpc = new Eth();

var setValue = true;

describe('web3.tpc', function () {
    describe('handleRevert', function () {
        it('should check if handleRevert is set to proper value', function () {
            assert.equal(tpc.handleRevert, false);
            assert.equal(tpc.Contract.handleRevert, false);
            assert.equal(tpc.getCode.method.handleRevert, false);
        });

        it('should set handleRevert for all sub packages', function () {
            tpc.handleRevert = setValue;

            assert.equal(tpc.handleRevert, setValue);
            assert.equal(tpc.Contract.handleRevert, setValue);
            assert.equal(tpc.getCode.method.handleRevert, setValue);
        });
    });
});

