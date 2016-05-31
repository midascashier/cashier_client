import React from 'react'

let MethodInfo = React.createClass({
	render() {
		return (
			<div id="methodInfo" className="col-sm-6">
				<p>
					<a href="#">Good news! You have a <span>100%</span> deposit bonus up to <span>$1,000.</span></a>
				</p>
        <div className="row">
          <div className="col-sm-12">
            <div className="deposit-limits">
              <div className="title">Visa Deposit Limits</div>
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Min. Deposit:</td>
                      <td><span>$10</span></td>
                    </tr>
                    <tr>
                      <td rowSpan="3">Max. Deposit:</td>
                      <td><span>$640 / 24 hours</span></td>
                    </tr>
                    <tr>
                      <td><span>$1,500 / 7 Days</span></td>
                    </tr>
                    <tr>
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
                <div className="col-sm-6">
                  <p>
                    <a href="#"><i className="fa fa-money green"></i>Quick Deposit available</a>
                  </p>
                </div>
                <div className="col-sm-6">
                  <p><a href="#">Enter Pending Control Numbers</a></p>
                </div>
                <div className="col-sm-6">
                  <button type="submit" className="btn btn-green">Deposit with Visa</button>
                </div>
                <div className="col-sm-6">
                  <img src="images/ssl.png" alt="ssl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
});

module.exports.MethodInfo = MethodInfo;