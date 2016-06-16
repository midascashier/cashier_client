import React from 'react'
import {translate} from '../../constants/translate'
import {Loading} from '../loading'
import {Processor} from './processor'

let MethodsDepositList = React.createClass({
  propTypes: {
    selectedProcessor: React.PropTypes.number,
    depositProcessors: React.PropTypes.array,
    originPath: React.PropTypes.string
  },

	render() {
    let isSelected = false;
		return (
			<div id="methods" className="box">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-12">
                <div className="title">{translate('METHOD_SELECT_YOUR_DEPOSIT_METHOD')}</div>
              </div>
              <div className="col-sm-12">
                <div className="processors infoCol">
                  {(() => {
                    if (this.props.depositProcessors.length==0) {
                      return <Loading />;
                    }
                  })()}

                  {this.props.depositProcessors.map((data, i)=>{
                      if (this.props.selectedProcessor==data.caProcessor_Id){
                        isSelected=true;
                      }else{
                        isSelected=false;
                      }
                      return <Processor key={data.caProcessor_Id} selected={isSelected} processor={data} originPath={this.props.originPath}/>;
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
});

module.exports.MethodsDepositList = MethodsDepositList;