var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');

var setValue = 123;

describe('web3.tpc', function () {
    describe('maxListenersWarningThreshold', function () {
        var tpc;

        beforeEach(function (){
            tpc = new Eth();
        })
        it('should default to 100', function () {
            assert.equal(tpc.maxListenersWarningThreshold, 100);
        });
        it('should set threshold to proper value', function () {
            // Mock EventEmitter interface
            tpc.currentProvider = {
                setMaxListeners: () => {}
            }
            tpc.maxListenersWarningThreshold = setValue;
            assert.equal(tpc.maxListenersWarningThreshold, setValue);
        });
        it('should *NOT* set threshold when there is no currentProvider', function () {
            tpc.maxListenersWarningThreshold = setValue;
            assert.equal(tpc.maxListenersWarningThreshold, 100);
        });
        it('should *NOT* set threshold when currentProvider does not extend EventEmitter', function () {
            tpc.currentProvider = {}
            tpc.maxListenersWarningThreshold = setValue;
            assert.equal(tpc.maxListenersWarningThreshold, 100);
        });
    });
});

