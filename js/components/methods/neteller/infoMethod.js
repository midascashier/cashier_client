import React from 'react'

const NetellerInfoMethod = React.createClass({
	propTypes: {
		selectedProcessor: React.PropTypes.object,
		originPath: React.PropTypes.string,
		currency: React.PropTypes.string
	},

	render() {
		let minCustomer;
		let maxCustomer;
		for (let i=0;i<this.props.selectedProcessor.limitRules.length;i++){
			if (this.props.selectedProcessor.limitRules[i].description=="min"){
				minCustomer = this.props.selectedProcessor.limitRules[i].customerValue;
			}
			if (this.props.selectedProcessor.limitRules[i].description=="max"){
				maxCustomer = this.props.selectedProcessor.limitRules[i].customerValue;
			}
		}

		return (
			<div id="infoLimits" className="row">
        <div className="col-sm-12">
          <div className="title">Neteller Deposit Limits</div>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Min. Deposit:</td>
                  <td><span>{minCustomer} {this.props.currency}</span></td>
                </tr>
                <tr>
                  <td>Max. Deposit:</td>
                  <td><span>{maxCustomer} {this.props.currency}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-6">
                  <b>BOTON</b>
                </div>
                <div className="col-sm-6">
                  <img src={this.props.originPath + '/images/ssl.png'} alt="ssl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

module.exports.NetellerInfoMethod = NetellerInfoMethod;