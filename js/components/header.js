import React from 'react'
import {Steps} from './headerComponents/steps'
import {Info} from './headerComponents/info'

let Header = React.createClass({
    render() {
        return (
            <div id="header">
                <Steps />
                <Info />
            </div>
        )
    }
});

module.exports.Header = Header;