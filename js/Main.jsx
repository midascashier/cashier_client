import React from 'react'
import {render}  from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Client} from './components/Client'
import {Welcome} from './components/Welcome'
import {DepositContent} from './components/DepositContent'
import {WithdrawContent} from './components/WithdrawContent'

/**
 * Neteller set of components to create routes
 */
import {Neteller} from './components/methods/neteller/Neteller'
import {NetellerTicket} from './components/methods/neteller/TicketMethod'
import {NetellerRejectedTicket} from './components/methods/neteller/tickets/RejectedTicket'
import {NetellerApprovedTicket} from './components/methods/neteller/tickets/ApprovedTicket'

/**
 * Bitcoin set of components to create routes
 */
import {Bitcoin} from './components/methods/bitcoin/Bitcoin'
import {ConfirmWithdraw} from './components/methods/bitcoin/ConfirmWithdraw'

/**
 * Common components
 */
import {ProcessorsInfo} from './components/methods/ProcessorsInfo'
import {TransactionHistoryContent} from './components/TransactionHistoryContent'
import RouterContainer from './services/RouterContainer'

/**
 * routing application
 *
 * @type {XML}
 */
let routes = (  <Router history={browserHistory}>
	<Route path="/" component={Client}>
		<IndexRoute component={Welcome}/>
		<Route path="/welcome/" component={Welcome}/>
		<Route path="/transaction_history/" component={TransactionHistoryContent}/>
		<Route path="/deposit/" component={DepositContent}>
			<IndexRoute component={ProcessorsInfo}/>
			<Route path="neteller/" component={Neteller}/>
			<Route path="neteller/ticket/" component={NetellerTicket}>
				<Route path="approved" component={NetellerApprovedTicket}/>
				<Route path="rejected" component={NetellerRejectedTicket}/>
			</Route>
			<Route path="bitcoin/" component={Bitcoin}/>
		</Route>
    <Route path="/withdraw/" component={WithdrawContent}>
      <IndexRoute component={ProcessorsInfo}/>
      <Route path="bitcoin/" component={Bitcoin}/>
			<Route path="bitcoin/confirm/" component={ConfirmWithdraw} />

    </Route>
	</Route>
</Router>);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));
