import React from 'react'
import Cashier from '../../constants/Cashier'
import { CashierStore } from '../../stores/CashierStore'

let Processor = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		processorId: React.PropTypes.string,
		displayName: React.PropTypes.string
	},

	/**
	 * this function change current processor
	 */
	selectProcessor(){
		let url = Cashier.BACKEND_WS;
		let company = CashierStore.getCompany();
		let customer = CashierStore.getCustomer();
		let processor = CashierStore.getProcessor();

		if(this.props.processorId || processor.processorId){
			let data = {
				method: 'POST',
				body: {
					f: "getProcessorMinMaxLimits",
					sys_access_pass:1,
					module: "limits",
					companyId: company.companyId,
					processorId: (this.props.processorId) ? this.props.processorId : processor.processorId,
					level: customer.personalInformation.level,
					isWithdraw: CashierStore.getIsWithdraw(),
					currencyCode: customer.currency
				}
			};

			fetch(url, data).then((response) => {
				return response.json()
			}).then((limits) => {
				console.log(limits)
			}).catch(function(err){
				console.error(err);
			});
		}
	},

	render(){
		let isActive = "";
		if(this.props.selected){
			isActive = "active";
		}

		return (
			<div className="col-sm-6">
				<div className={"method "+ isActive} onClick={this.selectProcessor}>
					<a href="javascript:;" className={this.props.name.toLowerCase()}/>
					{(() =>{
						if(this.props.selected){
							return <i className='fa fa-check-circle'/>;
						}
					})()}
				</div>
			</div>
		)
	}
});

module.exports.Processor = Processor;