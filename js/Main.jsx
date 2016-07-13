import React from 'react'
import "babel-polyfill";
import { render }  from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Client } from './components/Client'
import { Welcome } from './components/Welcome'
import { Content } from './components/Content'
import { RejectedTicket } from './components/methodTickets/RejectedTicket'
import { ApprovedTicket } from './components/methodTickets/ApprovedTicket'
import { DeferredTicket } from './components/methodTickets/DeferredTicket'
import { LoadingTicket } from './components/methodTickets/LoadingTicket'

/**
 * Neteller set of components to create routes
 */
import { Neteller } from './components/methods/neteller/Neteller'
import { NetellerConfirmWithdraw } from './components/methods/neteller/ConfirmWithdraw'


/**
 * Bitcoin set of components to create routes
 */
import { BitCoin } from './components/methods/bitcoin/Bitcoin'
import { BitCoinConfirmWithdraw } from './components/methods/bitcoin/ConfirmWithdraw'
import { BitCoinTicketPending } from './components/methods/bitcoin/tickets/PendingTicket'

/**
 * Visa set of components to create routes
 */
import { Visa } from './components/methods/visa/Visa'
import { VisaConfirm } from './components/methods/visa/Confirm'
import { VisaApprovedTicket } from './components/methods/visa/tickets/ApprovedTicket'

/**
 * Person2Person set of components to create routes
 */
import {Person2Person} from './components/methods/person2person/Person2Person'
import {P2PTicketPending} from './components/methods/person2person/tickets/InstructionsTicket'

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

			<Route path="/deposit/" component={Content}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="btcscreen/" component={BitCoin}/>
				<Route path="btcscreen/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={BitCoinTicketPending}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="visa/" component={Visa}/>
				<Route path="visa/confirm/" component={VisaConfirm}/>
				<Route path="visa/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

			</Route>

			<Route path="/withdraw/" component={Content}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="btcscreen/" component={BitCoin}/>
				<Route path="btcscreen/confirm/" component={BitCoinConfirmWithdraw}/>
				<Route path="btcscreen/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/confirm/" component={NetellerConfirmWithdraw}/>
				<Route path="neteller_new/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>


			</Route>
		</Route>
	</Router>
);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));