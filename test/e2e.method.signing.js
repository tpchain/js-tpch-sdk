var assert = require('assert');
var EJSCommon = require('ethereumjs-common');
var EJSTx = require('ethereumjs-tx');
var Basic = require('./sources/Basic');
var utils = require('./helpers/test.utils');
var Web3 = utils.getWeb3();

describe('transaction and message signing [ @E2E ]', function() {
    let web3;
    let accounts;
    let wallet;
    let basic;
    let instance;

    const basicOptions = {
        data: Basic.bytecode,
        gasPrice: '1',
        gas: 4000000
    };

    before(async function(){
        web3 = new Web3('http://localhost:8545');
        accounts = await web3.tpc.getAccounts();

        // Create a funded account w/ a private key
        wallet = web3.tpc.accounts.wallet.create(10);

        await web3.tpc.sendTransaction({
            from: accounts[0],
            to: wallet[0].address,
            value: web3.utils.toWei('50', 'tpch'),
        });

        basic = new web3.tpc.Contract(Basic.abi, basicOptions);
        instance = await basic.deploy().send({from: accounts[0]});
    });

    it('sendSignedTransaction (with tpc.signTransaction)', async function(){
        // ganache does not support eth_signTransaction
        if (process.env.GANACHE || global.window ) return

        const destination = wallet[1].address;
        const source = accounts[0]; // Unlocked geth-dev account

        const txCount = await web3.tpc.getTransactionCount(source);

        const rawTx = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            from:     source,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        };

        const signed = await web3.tpc.signTransaction(rawTx);
        const receipt = await web3.tpc.sendSignedTransaction(signed.raw);

        assert(receipt.status === true);
    });

    it('sendSignedTransaction (accounts.signTransaction with signing options)', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);
        const networkId = await web3.tpc.net.getId();
        const chainId = await web3.tpc.getChainId();


        const customCommon = {
            baseChain: 'mainnet',
            customChain: {
                name: 'custom-network',
                networkId: networkId,
                chainId: chainId,
            },
            harfork: 'petersburg',
        };

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            common: customCommon
        };

        const signed = await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
        const receipt = await web3.tpc.sendSignedTransaction(signed.rawTransaction);

        assert(receipt.status === true);
    });

    it('sendSignedTransaction (accounts.signTransaction / without signing options)', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        };

        const signed = await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
        const receipt = await web3.tpc.sendSignedTransaction(signed.rawTransaction);

        assert(receipt.status === true);
    });

    it('accounts.signTransaction, (with callback, nonce not specified)', function(done){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txObject = {
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        };

        web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey, async function(err, signed){
            const receipt = await web3.tpc.sendSignedTransaction(signed.rawTransaction);
            assert(receipt.status === true);
            done();
        });
    });

    it('accounts.signTransaction errors when common, chain and hardfork all defined', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            chain: "ropsten",
            common: {},
            hardfork: "istanbul"
        };

        try {
            await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
            assert.fail()
        } catch (err) {
            assert(err.message.includes('common object or the chain and hardfork'));
        }
    });

    it('accounts.signTransaction errors when chain specified without hardfork', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            chain: "ropsten"
        };

        try {
            await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
            assert.fail()
        } catch (err) {
            assert(err.message.includes('both values must be defined'));
        }
    });

    it('accounts.signTransaction errors when hardfork specified without chain', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            hardfork: "istanbul"
        };

        try {
            await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
            assert.fail()
        } catch (err) {
            assert(err.message.includes('both values must be defined'));
        }
    });

    it('accounts.signTransaction errors when tx signing is invalid', async function(){
        const source = wallet[0].address;
        const destination = wallet[1].address;

        const txCount = await web3.tpc.getTransactionCount(source);

        // Using gas === 0 / ethereumjs-tx checks this wrt common baseFee
        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       destination,
            value:    web3.utils.toHex(web3.utils.toWei('0.1', 'tpch')),
            gasLimit: web3.utils.toHex(0),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            hardfork: "istanbul",
            chain:    "ropsten",
        };

        try {
            await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);
            assert.fail()
        } catch (err) {
            assert(err.message.includes('gas limit is too low'));
        }
    })

    it('accounts.signTransaction errors when no transaction is passed', async function(){
        try {
            await web3.tpc.accounts.signTransaction(undefined, wallet[0].privateKey);
            assert.fail()
        } catch (err) {
            assert(err.message.includes('No transaction object'));
        }
    });

    it('wallet executes method call using chain & hardfork options', async function(){
        // Geth --dev errors with 'invalid sender' when using these options.
        // Requires a custom common configuration (see next test). Ganache doesn't care
        if(!process.env.GANACHE) return;

        basic = new web3.tpc.Contract(Basic.abi, basicOptions);
        basic.defaultChain = 'mainnet';
        basic.defaultHardfork = 'istanbul';

        instance = await basic
            .deploy()
            .send({from: wallet[0].address});

        const receipt = await instance
            .methods
            .setValue('1')
            .send({from: wallet[0].address});

        assert(receipt.status === true);
        assert(web3.utils.isHexStrict(receipt.transactionHash));
    });

    it('wallet executes method call using customCommon option', async function(){
        const networkId = await web3.tpc.net.getId();
        const chainId = await web3.tpc.getChainId();

        const customCommon = {
            baseChain: 'mainnet',
            customChain: {
                name: 'custom-network',
                networkId: networkId,
                chainId: chainId,
            },
            harfork: 'istanbul',
        };

        basic = new web3.tpc.Contract(Basic.abi, basicOptions);
        basic.defaultCommon = customCommon;

        instance = await basic
            .deploy()
            .send({from: wallet[0].address});

        const receipt = await instance
            .methods
            .setValue('1')
            .send({from: wallet[0].address});

        assert(receipt.status === true);
        assert(web3.utils.isHexStrict(receipt.transactionHash));
    });

    it('transactions sent with wallet throws error correctly (with receipt)', async function(){
        const data = instance
            .methods
            .reverts()
            .encodeABI();

        const tx = {
            from: wallet[0],
            to: instance.options.address,
            data: data,
            gasPrice: '1',
            gas: 4000000
        }

        try {
            await web3.tpc.sendTransaction(tx);
            assert.fail();
        } catch(err){
            var receipt = utils.extractReceipt(err.message);

            assert(err.message.includes('revert'))
            assert(receipt.status === false);
        }
    });

    it('sendSignedTransaction reverts with reason', async function(){
        const data = instance
            .methods
            .reverts()
            .encodeABI();

        const source = wallet[0].address;
        const txCount = await web3.tpc.getTransactionCount(source);

        const txObject = {
            nonce:    web3.utils.toHex(txCount),
            to:       instance.options.address,
            gasLimit: web3.utils.toHex(400000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            data: data
        };

        const signed = await web3.tpc.accounts.signTransaction(txObject, wallet[0].privateKey);

        web3.tpc.handleRevert = true;
        try {
            await web3.tpc.sendSignedTransaction(signed.rawTransaction);
            assert.fail();
        } catch(err){
            assert.equal(err.receipt.status, false);
            assert.equal(err.reason, "REVERTED WITH REVERT");
        }
    });

    it('transactions sent with wallet error correctly (OOG)', function(done){
        const data = instance
            .methods
            .reverts()
            .encodeABI();

        const tx = {
            from: wallet[0],
            to: instance.options.address,
            data: data,
            gasPrice: '1',
            gas: 10
        }

        web3
            .tpc
            .sendTransaction(tx)
            .on('error', function(err){
                assert(err.message.includes('gas'))
                done();
            })
    });

    it('tpc.personal.sign', async function(){
        // ganache does not support eth_sign
        if (process.env.GANACHE || global.window ) return

        const message = 'hello';

        const signature = await web3.tpc.personal.sign(
            message,
            accounts[1],            // Unlocked geth-dev acct
            "left-hand-of-darkness" // Default password at geth-dev
        );

        const recovered = await web3.tpc.personal.ecRecover(message, signature);
        assert.equal(accounts[1].toLowerCase(), recovered.toLowerCase());
    });

    it('tpc.accounts.sign', async function(){
        if (process.env.GANACHE || global.window ) return

        const message = 'hello';

        const signed = web3.tpc.accounts.sign(message, wallet[0].privateKey);
        const recovered = await web3.tpc.personal.ecRecover(message, signed.signature);
        assert.equal(wallet[0].address.toLowerCase(), recovered.toLowerCase());
    })

    // Smoke test to validate browserify's buffer polyfills (feross/buffer@5)
    // A companion regression test for Webpack & feross/buffer@4.9.2 exists at:
    // test/tpc.accounts.webpack.js
    it("encrypt then decrypt wallet", async function() {
        this.timeout(10000);

        const password = "qwerty";
        const addressFromWallet = wallet[0].address;

        const keystore = wallet.encrypt(password);

        // Wallet created w/ 10 accounts in before block
        assert.equal(keystore.length, 10);

        wallet.decrypt(keystore, password);
        assert.equal(wallet.length, 10);

        const addressFromKeystore = wallet[0].address;
        assert.equal(addressFromKeystore, addressFromWallet);
    });
});

