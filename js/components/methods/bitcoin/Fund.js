import React from 'react'
import {CashierStore} from '../../../stores/CashierStore'
import {UIService} from '../../../services/UIService'
import {translate} from '../../../constants/Translate'

let Fund = React.createClass({

	render(){
		let processorLimits = UIService.getBuyCryptoProcessorLimits();
		let min = processorLimits.min;
		let max = processorLimits.max;
		let currencyCode = processorLimits.currencyCode;

		let titleAvailable = translate('TITLE_AVAILABLE', '', {
			customerBalance: CashierStore.getCryptoBalance(),
			cryptoCurrencyCode: 'BTC'
		});

		let cryptoCurrencyName = 'bitcoin';

		return (
			<div className="col-md-12">
				<div className="crypto-fund-background">
					<div className="">
						<div className="col-md-6 center-block text-center crypto-box-content deposit-with-available">
							<h2>{translate('TITLE_AMOUNT')}</h2>
							<div>
								<img src="../../../../images/buyCrypto/icon_dolar.png" alt="icon_dolar"/>
								<input type="number" className="crypto-input"/>
							</div>
							<div className="crypto-limits-content">
								<div className="crypto-limits-left"> Min <br/>{min} {currencyCode}</div>
								<div className="crypto-limits-right"> Max <br/>{max} {currencyCode}</div>
							</div>
						</div>
						<div className="col-md-6 center-block text-center crypto-box-content deposit-with-available">
							<h2 dangerouslySetInnerHTML={{__html: titleAvailable}}></h2>
							<div>
								<img src="../../../../images/buyCrypto/icon_bitcoin.png" alt="icon_bitcoin"/>
								<input type="number" className="crypto-input"/>
							</div>
							<div>
								<input type="button" className="btn btn-green" value={translate('BTN_DEPOSIT_WITH', '', {cryptoCurrencyName: cryptoCurrencyName})}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports.Fund = Fund;