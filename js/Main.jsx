import React from 'react'
import { render }  from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Client } from './components/Client'
import { Welcome } from './components/Welcome'
import { DepositContent } from './components/DepositContent'
import { WithdrawContent } from './components/WithdrawContent'

/**
 * Generic components
 */
import { TicketRejected } from './components/methods/ticket/RejectedTicket'
import { TicketApproved } from './components/methods/ticket/ApprovedTicket'

/**
 * Neteller set of components to create routes
 */
import { Neteller } from './components/methods/neteller/Neteller'
import { NetellerTicket } from './components/methods/neteller/TicketMethod'

/**
 * Bitcoin set of components to create routes
 */
import { BitCoin } from './components/methods/bitcoin/Bitcoin'
import { BitCoinTicket } from './components/methods/bitcoin/TicketMethod'
import { BitCoinTicketInstructions } from './components/methods/bitcoin/tickets/InstructionsTicket'
import { ConfirmWithdraw } from './components/methods/bitcoin/ConfirmWithdraw'

/**
 * Visa set of components to create routes
 */
import { Visa } from './components/methods/visa/Visa'
import { VisaConfirm } from './components/methods/visa/Confirm'
import { VisaTicket } from './components/methods/visa/TicketMethod'

/**
 * Person2Person set of components to create routes
 */
import {Person2Person} from './components/methods/person2person/Person2Person'
import {Person2PersonConfirm} from './components/methods/person2person/Confirm'
import {Person2PersonTicket} from './components/methods/person2person/TicketMethod'
import {Person2PersonTicketInstructions} from './components/methods/person2person/tickets/InstructionsTicket'

/**
 * Common components
 */
import { ProcessorsInfo } from './components/methods/ProcessorsInfo'
import { TransactionHistoryContent } from './components/TransactionHistoryContent'
import RouterContainer from './services/RouterContainer'

/**
 * routing application
 *
 * @type {XML}
 */
let routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Client}>
			<IndexRoute component={Welcome}/>
			<Route path="/welcome/" component={Welcome}/>
			<Route path="/transaction_history/" component={TransactionHistoryContent}/>
			<Route path="/deposit/" component={DepositContent}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/ticket/" component={NetellerTicket}>
					<Route path="approved/" component={TicketApproved}/>
					<Route path="rejected/" component={TicketRejected}/>
				</Route>

				<Route path="btcscreen/" component={BitCoin}/>
				<Route path="btcscreen/ticket/" component={BitCoinTicket}>
					<Route path="instructions/" component={BitCoinTicketInstructions}/>
					<Route path="rejected/" component={TicketRejected}/>
				</Route>

				<Route path="visa/" component={Visa}/>
				<Route path="visa/confirm/" component={VisaConfirm}/>
				<Route path="visa/ticket/" component={VisaTicket}>
					<Route path="approved/" component={TicketApproved}/>
					<Route path="rejected/" component={TicketRejected}/>
				</Route>

				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/confirm/" component={Person2PersonConfirm}/>
				<Route path="moneygram/ticket/" component={Person2PersonTicket}>
					<Route path="instructions/" component={Person2PersonTicketInstructions}/>
					<Route path="rejected/" component={TicketRejected}/>
				</Route>

			</Route>
			<Route path="/withdraw/" component={WithdrawContent}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="btcscreen/" component={BitCoin}/>
				<Route path="btcscreen/confirm/" component={ConfirmWithdraw}/>
				<Route path="btcscreen/ticket/" component={BitCoinTicket}>
					<Route path="approved/" component={TicketApproved}/>
					<Route path="rejected/" component={TicketRejected}/>
				</Route>

			</Route>
		</Route>
	</Router>
);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));
