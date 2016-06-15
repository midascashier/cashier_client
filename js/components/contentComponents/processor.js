import React from 'react'

let Processor = React.createClass({
	render() {
		return (<div className="col-sm-6">
			<div className="method">
				<img src={this.props.originPath + '/images/processors/'+this.props.processor.caProcessor_Id+'.png'} alt={this.props.processor.DisplayName}/>
			</div>
		</div>)
	}
});

module.exports.Processor = Processor;