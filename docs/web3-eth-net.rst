.. _eth-net:

=========
web3.tpc.net
=========


Contains functions to get information about the current network.


------------------------------------------------------------------------------


.. include:: include_package-net.rst


------------------------------------------------------------------------------

getNetworkType
=====================

.. code-block:: javascript

    web3.tpc.net.getNetworkType([callback])

Guesses the chain the node is connected by comparing the genesis hashes.

.. note:: It's recommended to use the :ref:`web3.tpc.getChainId <eth-chainId>` method to detect the currently connected chain.

-------
Returns
-------

``Promise`` returns ``String``:
    - ``"main"`` for main network
    - ``"morden"`` for the morden test network
    - ``"ropsten"`` for the morden test network
    - ``"private"`` for undetectable networks.


-------
Example
-------

.. code-block:: javascript

    web3.tpc.net.getNetworkType()
    .then(console.log);
    > "main"


