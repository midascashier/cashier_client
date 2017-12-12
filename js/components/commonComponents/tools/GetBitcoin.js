import React from 'react'

let GetBitcoin = React.createClass({

    componentWillMount(){

    },

    render(){
        return (
            <div className="col-sm-12 mod-center">
                <button className="btn-getBitcoin coinDirectElement" type="button" value="Get bitcoins"><i className="fa fa-btc"></i>Get Bitcoin</button>

                <div id='cryptoTransferModal'>
                    <div id='cryptoTransferModal-content'>
                        <div id='cryptoTransferModal-header'>
                            <input id='cryptoTransferModal-currencySearch' type='text'/>
                            <span id='cryptoTransferModal-close'>&times;</span>
                        </div>

                        <div id='cryptoTransfer-currencies'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports.GetBitcoin = GetBitcoin;