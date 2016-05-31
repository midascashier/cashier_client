import React from 'react'
import {Methods} from './contentComponents/methods'
import {MethodInfo} from './contentComponents/methodInfo'

let Content = React.createClass({
	render() {
		return (
			<div id="content" className="internal-content">
				<div className="row">
          <div className="col-sm-12">
            <div className="modules">
              <div className="row">
                <Methods />
                <MethodInfo />
              </div>
            </div>
          </div>
				</div>
			</div>
		)
	}
});

module.exports.Content = Content;