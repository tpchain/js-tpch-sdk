/*
    This file is part of web3.js.
    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file eth-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018
 */

import {Log} from 'web3-core';
import {
    BlockTransactionObject,
    BlockTransactionString,
    BlockHeader,
    Eth,
    GetProof,
    Syncing,
    RLPEncodedTransaction,
    Transaction,
    TransactionReceipt,
    TransactionConfig,
    hardfork,
    Common,
    chain
} from 'web3-eth';
import BN = require('bn.js');
import BigNumber from 'bignumber.js';

// $ExpectType Eth
const eth_empty = new Eth();

// $ExpectType Eth
const tpc = new Eth('http://localhost:8545');

// $ExpectType provider
tpc.currentProvider;

// $ExpectType any
tpc.givenProvider;

// $ExpectType string | null
tpc.defaultAccount;

// $ExpectType BlockNumber
tpc.defaultBlock;

// $ExpectType Common
tpc.defaultCommon;

// $ExpectType hardfork
tpc.defaultHardfork;

// $ExpectType chain
tpc.defaultChain;

// $ExpectType number
tpc.transactionPollingTimeout;

// $ExpectType number
tpc.transactionConfirmationBlocks;

// $ExpectType number
tpc.transactionBlockTimeout;

// $ExpectType boolean
tpc.handleRevert;

// $ExpectType new (jsonInterface: AbiItem | AbiItem[], address?: string | undefined, options?: ContractOptions | undefined) => Contract
tpc.Contract;

// $ExpectType new (iban: string) => Iban
tpc.Iban;

// $ExpectType Personal
tpc.personal;

// $ExpectType Accounts
tpc.accounts;

// $ExpectType any
tpc.extend({property: 'test', methods: [{name: 'method', call: 'method'}]});

// $ExpectType Ens
tpc.ens;

// $ExpectType AbiCoder
tpc.abi;

// $ExpectType Network
tpc.net;

// $ExpectType void
tpc.clearSubscriptions(() => {});

// $ExpectType Subscription<Log>
tpc.subscribe('logs', {});
// $ExpectType Subscription<Log>
tpc.subscribe('logs', {}, (error: Error, log: Log) => {});

// $ExpectType Subscription<Syncing>
tpc.subscribe('syncing');
// $ExpectType Subscription<Syncing>
tpc.subscribe(
    'syncing',
    (error: Error, result: Syncing) => {}
);

// $ExpectType Subscription<BlockHeader>
tpc.subscribe('newBlockHeaders');
// $ExpectType Subscription<BlockHeader>
tpc.subscribe(
    'newBlockHeaders',
    (error: Error, blockHeader: BlockHeader) => {}
);

// $ExpectType Subscription<string>
tpc.subscribe('pendingTransactions');
// $ExpectType Subscription<string>
tpc.subscribe(
    'pendingTransactions',
    (error: Error, transactionHash: string) => {}
);

// $ExpectType boolean
tpc.setProvider('https://localhost:2100');

// $ExpectType BatchRequest
new tpc.BatchRequest();

// $ExpectType Promise<string>
tpc.getProtocolVersion();
// $ExpectType Promise<string>
tpc.getProtocolVersion((error: Error, protocolVersion: string) => {});

// $ExpectType Promise<boolean | Syncing>
tpc.isSyncing();
// $ExpectType Promise<boolean | Syncing>
tpc.isSyncing((error: Error, syncing: Syncing) => {});

// $ExpectType Promise<string>
tpc.getCoinbase();
// $ExpectType Promise<string>
tpc.getCoinbase((error: Error, coinbaseAddress: string) => {});

// $ExpectType Promise<boolean>
tpc.isMining();
// $ExpectType Promise<boolean>
tpc.isMining((error: Error, mining: boolean) => {});

// $ExpectType Promise<number>
tpc.getHashrate();
// $ExpectType Promise<number>
tpc.getHashrate((error: Error, hashes: number) => {});

// $ExpectType Promise<string>
tpc.getNodeInfo();
// $ExpectType Promise<string>
tpc.getNodeInfo((error: Error, version: string) => {});

// $ExpectType Promise<number>
tpc.getChainId();
// $ExpectType Promise<number>
tpc.getChainId((error: Error, chainId: number) => {});

// $ExpectType Promise<string>
tpc.getGasPrice();
// $ExpectType Promise<string>
tpc.getGasPrice((error: Error, gasPrice: string) => {});

// $ExpectType Promise<string[]>
tpc.getAccounts();
// $ExpectType Promise<string[]>
tpc.getAccounts((error: Error, accounts: string[]) => {});

// $ExpectType Promise<number>
tpc.getBlockNumber();
// $ExpectType Promise<number>
tpc.getBlockNumber((error: Error, blockNumber: number) => {});

// $ExpectType Promise<string>
tpc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
tpc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
tpc.getBalance(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '1000',
    (error: Error, balance: string) => {}
);
// $ExpectType Promise<string>
tpc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
tpc.getBalance(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    1000,
    (error: Error, balance: string) => {}
);

// $ExpectType Promise<string>
tpc.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<string>
tpc.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', new BN(2));
// $ExpectType Promise<string>
tpc.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', new BigNumber(2));
// $ExpectType Promise<string>
tpc.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000');
// $ExpectType Promise<string>
tpc.getStorageAt(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    '1000',
    (error: Error, balance: string) => {}
);
// $ExpectType Promise<string>
tpc.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000);
// $ExpectType Promise<string>
tpc.getStorageAt(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    1000,
    (error: Error, balance: string) => {}
);

// $ExpectType Promise<string>
tpc.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
tpc.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
tpc.getCode(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '1000',
    (error: Error, balance: string) => {}
);
// $ExpectType Promise<string>
tpc.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
tpc.getCode(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    1000,
    (error: Error, balance: string) => {}
);

// $ExpectType Promise<BlockTransactionString>
tpc.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<BlockTransactionString>
tpc.getBlock(345);
// $ExpectType Promise<BlockTransactionObject>
tpc.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true);
// $ExpectType Promise<BlockTransactionString>
tpc.getBlock(345);
// $ExpectType Promise<BlockTransactionObject>
tpc.getBlock(345, true);
// $ExpectType Promise<BlockTransactionString>
tpc.getBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, block: BlockTransactionString) => {}
);
// $ExpectType Promise<BlockTransactionString>
tpc.getBlock(345, (error: Error, block: BlockTransactionString) => {});
// $ExpectType Promise<BlockTransactionObject>
tpc.getBlock(345, true, (error: Error, block: BlockTransactionObject) => {});
// $ExpectType Promise<BlockTransactionObject>
tpc.getBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    true,
    (error: Error, block: BlockTransactionObject) => {}
);

// $ExpectType Promise<number>
tpc.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
tpc.getBlockTransactionCount(345);
// $ExpectType Promise<number>
tpc.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
tpc.getBlockTransactionCount(345);

// $ExpectType Promise<BlockTransactionString>
tpc.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4);
// $ExpectType Promise<BlockTransactionString>
tpc.getUncle(345, 4);
// $ExpectType Promise<BlockTransactionObject>
tpc.getUncle('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 4, true);
// $ExpectType Promise<BlockTransactionString>
tpc.getUncle(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    4,
    (error: Error, uncle: {}) => {}
);
// $ExpectType Promise<BlockTransactionString>
tpc.getUncle(345, 4, (error: Error, uncle: {}) => {});
// $ExpectType Promise<BlockTransactionObject>
tpc.getUncle(345, 4, true);
// $ExpectType Promise<BlockTransactionObject>
tpc.getUncle(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    4,
    true,
    (error: Error, uncle: {}) => {}
);
// $ExpectType Promise<BlockTransactionObject>
tpc.getUncle(345, 4, true, (error: Error, uncle: {}) => {});

// $ExpectType Promise<Transaction>
tpc.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Transaction>
tpc.getTransaction(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transaction: Transaction) => {}
);

// $ExpectType Promise<Transaction>
tpc.getTransactionFromBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<Transaction>
tpc.getTransactionFromBlock(345, 2);
// $ExpectType Promise<Transaction>
tpc.getTransactionFromBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    (error: Error, transaction: Transaction) => {}
);
// $ExpectType Promise<Transaction>
tpc.getTransactionFromBlock(
    345,
    2,
    (error: Error, transaction: Transaction) => {}
);

// $ExpectType Promise<TransactionReceipt>
tpc.getTransactionReceipt('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<TransactionReceipt>
tpc.getTransactionReceipt(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transactionReceipt: TransactionReceipt) => {}
);

// $ExpectType Promise<number>
tpc.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<number>
tpc.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<number>
tpc.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<number>
tpc.getTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, count: number) => {}
);
// $ExpectType Promise<number>
tpc.getTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, count: number) => {}
);
// $ExpectType Promise<number>
tpc.getTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    1000,
    (error: Error, count: number) => {}
);
// $ExpectType Promise<number>
tpc.getTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '1000',
    (error: Error, count: number) => {}
);

const code = '603d80600c6000396000f3007c0';

// $ExpectType PromiEvent<TransactionReceipt>
tpc.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    data: 'code'
});
// $ExpectType PromiEvent<TransactionReceipt>
tpc.sendTransaction(
    {
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: 'code'
    },
    (error: Error, hash: string) => {}
);

// $ExpectType PromiEvent<TransactionReceipt>
tpc.sendSignedTransaction('0xf889808609184e72a0008227109');
// $ExpectType PromiEvent<TransactionReceipt>
tpc.sendSignedTransaction(
    '0xf889808609184e72a0008227109',
    (error: Error, hash: string) => {}
);

// $ExpectType Promise<string>
tpc.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
// $ExpectType Promise<string>
tpc.sign('Hello world', 3);
// $ExpectType Promise<string>
tpc.sign(
    'Hello world',
    '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    (error: Error, signature: string) => {}
);
// $ExpectType Promise<string>
tpc.sign('Hello world', 3, (error: Error, signature: string) => {});

// $ExpectType Promise<RLPEncodedTransaction>
tpc.signTransaction({
    from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: '0x3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: ''
});
// $ExpectType Promise<RLPEncodedTransaction>
tpc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0'
);
// $ExpectType Promise<RLPEncodedTransaction>
tpc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);
// $ExpectType Promise<RLPEncodedTransaction>
tpc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);

// $ExpectType Promise<string>
tpc.call({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
    data:
        '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100
);
// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100'
);
// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100',
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<string>
tpc.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<number>
tpc.estimateGas({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    data:
        '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<number>
tpc.estimateGas(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, gas: number) => {}
);

// $ExpectType Promise<Log[]>
tpc.getPastLogs({
    address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    topics: ['0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
});
// $ExpectType Promise<Log[]>
tpc.getPastLogs(
    {
        address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        topics: [
            '0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234'
        ]
    },
    (error: Error, logs: Log[]) => {}
);

// $ExpectType Promise<string[]>
tpc.getWork();
// $ExpectType Promise<string[]>
tpc.getWork((error: Error, result: string[]) => {});

// $ExpectType Promise<boolean>
tpc.submitWork([
    '0x0000000000000001',
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
]);

// $ExpectType Promise<boolean>
tpc.submitWork(
    [
        '0x0000000000000001',
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
    ],
    (error: Error, result: boolean) => {}
);

// $ExpectType Promise<Transaction[]>
tpc.getPendingTransactions();

// $ExpectType Promise<Transaction[]>
tpc.getPendingTransactions((error: Error, result: Transaction[]) => {});

// $ExpectType Promise<GetProof>
tpc.getProof(
    '0x1234567890123456789012345678901234567890',
    [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000001'
    ],
    'latest'
);

// $ExpectType Promise<GetProof>
tpc.getProof(
    '0x1234567890123456789012345678901234567890',
    [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000001'
    ],
    'latest',
    (error: Error, result: GetProof) => {}
);

// $ExpectType Promise<GetProof>
tpc.getProof(
    '0x1234567890123456789012345678901234567890',
    [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000001'
    ],
    10
);

// $ExpectType Promise<GetProof>
tpc.getProof(
    '0x1234567890123456789012345678901234567890',
    [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000001'
    ],
    10,
    (error: Error, result: GetProof) => {}
);
