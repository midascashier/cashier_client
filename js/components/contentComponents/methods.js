import React from 'react'
import {TransactionHistory} from './transactionHistory'

let Methods = React.createClass({
    render() {
        return (
            <div id="methods">
                <TransactionHistory />
                <h1>Select Your Methods</h1><br />
                <ul>
                    <li>Visa</li>
                    <li>Skrill</li>
                </ul>
            </div>
        )
    }
});

module.exports.Methods = Methods;