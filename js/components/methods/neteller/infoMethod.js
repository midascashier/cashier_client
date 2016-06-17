import React from 'react'

const NetellerInfoMethod = React.createClass({
	propTypes: {
		originPath: React.PropTypes.string
	},

	render() {
		return (
			<div id="infoLimits" className="row">
        <div className="col-sm-12">
          <div className="title">Neteller Deposit Limits</div>
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Min. Deposit:</td>
                  <td><span>$10</span></td>
                </tr>
                <tr>
                  <td>Max. Deposit:</td>
                  <td><span>$640 / 24 hours</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><span>$1,500 / 7 Days</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><span>$2000 / 24 hours</span></td>
                </tr>
                <tr>
                  <td>Remaining Limit:</td>
                  <td><span>$640.00</span></td>
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