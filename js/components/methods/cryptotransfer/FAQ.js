import React from 'react'

let FAQ = React.createClass({

    showFAQ(){
        let faq = document.getElementById('methodInfo');
        let isShow = faq.style.display;

        if(isShow == 'none' || isShow == ''){
            faq.style.display = 'block'
        }else{
            faq.style.display = 'none'
        }
    },

    render(){
        return(
            <div className="textData">
                <br />
                <p><a href="#methodInfo" className="fLightBoxInline" onClick={this.showFAQ}>Payment FAQ's</a></p>
                <div id="methodInfo">

                    <p><strong>Who sets the exchange rate?</strong></p>
                    <p>We use our own exchange rate, determined using a variety of market sources. Whether you’re exchanging a small amount or something larger, you can expect the same exchange rate.</p>

                    <p><strong>What are the fees?</strong></p>
                    <p>You can expect to pay a miner’s fee on every transaction, but nothing more. We calculate the miner’s fee by looking at the best fee across all coin networks and averaging things out. Below, you’ll find our miner’s fee structure:</p>

                    <p><strong>BCH:</strong>	Bitcoin Cash Miner Fee: .0002 BCH</p>
                    <p><strong>ETH:</strong>	Ether Miner Fee: 0.001 ETH</p>
                    <p><strong>LTC:</strong>	Litecoin Miner Fee: 0.001 LTC</p>
                    <p><strong>XMR:</strong>	Monero Miner Fee: 0.02 XMR</p>
                    <p><strong>DASH:</strong> Dash Miner Fee: 0.002 DASH</p>
                    <p><strong>BTC:</strong>	Bitcoin Miner Fee: 0.001 BTC</p>
                    <details>
                        <summary><strong>View more</strong></summary>
                        <div className="newspaper">
                            <p><strong>1ST:</strong> 1st Blood Miner Fee: 0.01 1ST</p>
                            <p><strong>ANT:</strong>	Aragon Miner Fee: 0.01 ANT</p>
                            <p><strong>BAT:</strong>	Basic Attention Token Miner Fee: 0.01 BAT</p>
                            <p><strong>BCY:</strong> Bitcrystals Miner Fee: 4.0 BCY</p>
                            <p><strong>BLK:</strong> Blackcoin Miner Fee: 0.01 BLK</p>
                            <p><strong>BNT:</strong>	Bancor Miner Fee: 0.01 BNT</p>
                            <p><strong>BTS:</strong>	BitShares Miner Fee: 0.5 BTS</p>
                            <p><strong>CLAM:</strong>	Clams Miner Fee: 0.001 CLAM</p>
                            <p><strong>CVC:</strong>	Civic Miner Fee: 0.1 CVC</p>
                            <p><strong>DCR:</strong>	Decred Miner Fee: 0.03 DCR</p>
                            <p><strong>DGB:</strong>	Digibyte Miner Fee: 0.01 DGB</p>
                            <p><strong>DGD:</strong>	DigixDao Miner Fee: 0.001 DGD</p>
                            <p><strong>DOGE:</strong>	Dogecoin Miner Fee: 2.0 DOGE</p>
                            <p><strong>EDG:</strong>	Edgeless Miner Fee: 0.3 EDG</p>
                            <p><strong>EMC:</strong>	Emercoin Miner Fee: 0.2 EMC</p>
                            <p><strong>EOS:</strong>	EOS Miner Fee: 0.04 EOS</p>
                            <p><strong>ETC:</strong>	Ether classNameic Miner Fee: 0.01 ETC</p>
                            <p><strong>FCT:</strong>	Factoids Miner Fee: 0.001 FCT</p>
                            <p><strong>FUN:</strong>	FunFair Token Miner Fee: 0.01 FUN</p>
                            <p><strong>GAME:</strong>	GameCredits Miner Fee: 0.2 GAME</p>
                            <p><strong>GNO:</strong>	Gnosis Miner Fee: 0.01 GNO</p>
                            <p><strong>GNT:</strong>	Golem Miner Fee: 0.01 GNT</p>
                            <p><strong>GUP:</strong>	Matchpool Miner Fee: 0.01 GUP</p>
                            <p><strong>ICN:</strong>	Iconomi Miner Fee: 0.2 ICN</p>
                            <p><strong>KMD:</strong>	Komodo Miner Fee: 0.002 KMD</p>
                            <p><strong>LBC:</strong>	LBRY Credits Miner Fee: 0.02 LBC</p>
                            <p><strong>LSK:</strong>	Lisk Miner Fee: 0.1 LISK</p>
                            <p><strong>MAID:</strong>	Maidsafe Miner Fee: 7.0 MAID</p>
                            <p><strong>MLN:</strong>	Melon Miner Fee: 0.003 MLN</p>
                            <p><strong>MSCN:</strong>	Mastercoin Miner Fee: 0.325 MSCN</p>
                            <p><strong>MONA:</strong>	Monacoin Miner Fee: 0.2 MONA</p>
                            <p><strong>MTL:</strong>	Metal Pay Miner Fee: 0.01 MTL</p>
                            <p><strong>NMC:</strong>	Namecoin Miner Fee: 0.005 NMC</p>
                            <p><strong>NMR:</strong>	Numeraire Miner Fee: 0.004 NMR</p>
                            <p><strong>NVC:</strong>	Novacoin Miner Fee: 0.1 NVC</p>
                            <p><strong>PAY:</strong> TenX Token Miner Fee: 0.01 PAY</p>
                            <p><strong>USNBT:</strong>	Nubits Miner Fee: 0.01 USNBT</p>
                            <p><strong>NXT:</strong>	Nxt Miner Fee: 1.0 NXT</p>
                            <p><strong>OMG:</strong>	OmiseGO Miner Fee: 0.01 OMG</p>
                            <p><strong>POT:</strong>	Potcoin Miner Fee: 0.01 POT</p>
                            <p><strong>PPC:</strong>	Peercoin Miner Fee: 0.01 PPC</p>
                            <p><strong>QTUM:</strong>	Qtum Miner Fee: 0.01 QTUM</p>
                            <p><strong>RDD:</strong>	Reddcoin Miner Fee: 0.01 RDD</p>
                            <p><strong>REP:</strong>	Augur Miner Fee: 0.01 REP</p>
                            <p><strong>RLC:</strong>	iExec Miner Fee: 0.01 RLC</p>
                            <p><strong>SC:</strong>	Siacoin Miner Fee: 10.0 SIA</p>
                            <p><strong>SJCX:</strong>	StorjcoinX Miner Fee: 0.01 SJCX</p>
                            <p><strong>SNGLS:</strong>	SingularDTV Miner Fee: 3 SNGLS</p>
                            <p><strong>SNT:</strong>	Status Miner Fee: 3.0 SNT</p>
                            <p><strong>START:</strong>	Startcoin Miner Fee: 0.02 START</p>
                            <p><strong>STEEM:</strong>	Steem Miner Fee: 0.01 STEEM</p>
                            <p><strong>SWT:</strong>	SwarmCity Miner Fee: 0.1 SWT</p>
                            <p><strong>TKN:</strong>	TokenCard Miner Fee: 0.01 TKN</p>
                            <p><strong>USDT:</strong>	TetherUSD Miner Fee: 1.1 USDT</p>
                            <p><strong>VRC:</strong>	Vericoin Miner Fee: 0.0002 VRC</p>
                            <p><strong>VTC:</strong>	Vertcoin Miner Fee: 0.02 VTC</p>
                            <p><strong>VOX:</strong>	Voxels Miner Fee: 0.01 VOX</p>
                            <p><strong>TRST:</strong>	WeTrust Miner Fee: 0.01 TRST</p>
                            <p><strong>WAVES:</strong>	Waves Miner Fee: 0.001 WAVES</p>
                            <p><strong>WINGS:</strong>	Wings Miner Fee: 0.01 WINGS</p>
                            <p><strong>XCP:</strong>	Counterparty Miner Fee: 0.1 XCP</p>
                            <p><strong>XRP:</strong>	Ripple Miner Fee: 0.5 XRP</p>
                            <p><strong>ZEC:</strong>	Zcash Miner Fee: 0.0001 ZEC</p>
                            <p><strong>ZRX:</strong>	0x Miner Fee: 0.005 ZRX</p>
                        </div>
                    </details>

                    <p><strong>Why do I need to enter a refund address?</strong></p>
                    <p>The refund address is where we'll send your funds if we need to refund your transaction.  You can find this by looking for the + sign under wallets on exchanges.
                        It will list the address or give you the option to create a new address.  If you store your cryptocurrency in a hardware wallet, the refund address is under the ‘receiving coin' section.
                        It's either your deposit or receiving address, depending on the wallet.
                    </p>

                    <p><strong>I accidentally sent my funds to the wrong address. Can I get them back?</strong></p>
                    <p>Unfortunately, there’s nothing we can do on our end once the funds are sent. Always double-check the address on the order page.</p>

                    <p><strong>My deposit is still pending. What’s the deal?</strong></p>
                    <p>This means that your exchange has been received and confirmed on the network, and is simply awaiting the exchange process to be complete. Once this is done, you’ll see a completed deposit.</p>

                    <p><strong>How fast can I expect my deposit to be processed?</strong></p>
                    <p>It varies from 5 to 40 minutes. Typically, though, you’re looking at just a few minutes.</p>

                    <p><strong>My deposit shows as pending. Can I speed things up?</strong></p>
                    <p>Be patient. Remember, your transactions are processed by miners and the number of transactions that can be confirmed on each block is limited.</p>

                    <p><strong>Can I reuse a deposit address?</strong></p>
                    <p>No, you need to create a new address for every deposit.</p>

                    <p><strong>What are the deposit limits?</strong></p>
                    <p><li>Minimum deposit = $100</li>
                        <li>Maximum deposit = $2500</li>
                    </p>

                    <p><strong>I’d like to see a coin added. How can I suggest that?</strong></p>
                    <p>There’s no formal submission process, but feel free to send us a message with your suggestion. We’ll add it to our discovery list and investigate further to see if it’s a good fit.
                        We get dozens of new requests each day, so we can’t promise we’ll add anything. But if enough people are talking about it, it’ll be on our radar.
                    </p>
                </div>
            </div>
        )
    }
});

module.exports.FAQ = FAQ;