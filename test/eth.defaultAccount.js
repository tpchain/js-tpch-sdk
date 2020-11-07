var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');
var Web3 = require('../packages/web3');

var tpc = new Eth();

var setValue = '0x47D33b27Bb249a2DBab4C0612BF9CaF4C1950855';

describe('web3.tpc', function () {
    describe('defaultAccount', function () {
        it('should check if defaultAccount is set to proper value', function () {
            assert.equal(tpc.defaultAccount, null);
            assert.equal(tpc.personal.defaultAccount, null);
            assert.equal(tpc.Contract.defaultAccount, null);
            assert.equal(tpc.getCode.method.defaultAccount, null);
        });
        it('should set defaultAccount for all sub packages is set to proper value, if Eth package is changed', function () {
            tpc.defaultAccount = setValue;

            assert.equal(tpc.defaultAccount, setValue);
            assert.equal(tpc.personal.defaultAccount, setValue);
            assert.equal(tpc.Contract.defaultAccount, setValue);
            assert.equal(tpc.getCode.method.defaultAccount, setValue);
        });
        it('should fail if address is invalid, wich is to be set to defaultAccount', function () {

            assert.throws(function(){ tpc.defaultAccount = '0x17F33b27Bb249a2DBab4C0612BF9CaF4C1950855'; });

        });
        it('should have different values for two Eth instances', function () {

            var eth1 = new Eth();
            eth1.defaultAccount = setValue;
            assert.equal(eth1.defaultAccount, setValue);

            var eth2 = new Eth();
            assert.equal(eth2.defaultAccount, null);

        });
        it('should have different values for two Web3 instances', function () {

            var web31 = new Web3();
            web31.tpc.defaultAccount = setValue;
            assert.equal(web31.tpc.defaultAccount, setValue);

            var web32 = new Web3();
            assert.equal(web32.tpc.defaultAccount, null);

        });
    });
});

