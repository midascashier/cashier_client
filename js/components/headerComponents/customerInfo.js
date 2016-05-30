import React from 'react'

let CustomerInfo = React.createClass({
    render() {
        return (
            <div id="customerInfo">
                <b>User:</b> Test | <b>Mail:</b> test@test.com | <b>Balance:</b> 100.10
            </div>
        )
    }
});

module.exports.CustomerInfo = CustomerInfo;