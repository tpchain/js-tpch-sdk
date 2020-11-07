var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var tpc = new Eth();

var setValue = 123;

describe('web3.tpc', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(tpc.defaultBlock, 'latest');
            assert.equal(tpc.personal.defaultBlock, 'latest');
            assert.equal(tpc.Contract.defaultBlock, 'latest');
            assert.equal(tpc.getCode.method.defaultBlock, 'latest');
        });
        it('should set defaultBlock for all sub packages is set to proper value, if Eth package is changed', function () {
            tpc.defaultBlock = setValue;

            assert.equal(tpc.defaultBlock, setValue);
            assert.equal(tpc.personal.defaultBlock, setValue);
            assert.equal(tpc.Contract.defaultBlock, setValue);
            assert.equal(tpc.getCode.method.defaultBlock, setValue);
        });
    });
});

