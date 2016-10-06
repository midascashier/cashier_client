import React from 'react'
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

/**
 * Skrill set of components to create routes
 */
import { Skrill } from './components/methods/skrill/Skrill'
import { SkrillConfirmWithdraw } from './components/methods/skrill/ConfirmWithdraw'

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
import { VisaRejectedTicket } from './components/methods/visa/tickets/RejectedTicket'
import { VisaRejectBankTicket } from './components/methods/visa/tickets/RejectBankTicket'
import { VisaRejectAmountTicket } from './components/methods/visa/tickets/RejectAmountTicket'
import { VisaRejectCardTicket } from './components/methods/visa/tickets/RejectCardTicket'

/**
 * Astropay set of components to create routes
 */
import { Astropay } from './components/methods/astropay/Astropay'


/**
 * MC set of components to create routes
 */
import { MasterCard } from './components/methods/mastercard/MasterCard'
import { MasterCardConfirm } from './components/methods/mastercard/Confirm'
import { MasterCardApprovedTicket } from './components/methods/mastercard/tickets/ApprovedTicket'
import { MasterCardRejectedTicket } from './components/methods/mastercard/tickets/RejectedTicket'
import { MasterCardRejectBankTicket } from './components/methods/mastercard/tickets/RejectBankTicket'
import { MasterCardRejectAmountTicket } from './components/methods/mastercard/tickets/RejectAmountTicket'
import { MasterCardRejectCardTicket } from './components/methods/mastercard/tickets/RejectCardTicket'

/**
 * Person2Person set of components to create routes
 */
import { Person2Person } from './components/methods/person2person/Person2Person'
import { P2PConfirmWithdraw } from './components/methods/person2person/ConfirmWithdraw'
import { P2PTicketPending } from './components/methods/person2person/tickets/InstructionsTicket'
import { P2PTicketProcessing } from './components/methods/person2person/tickets/ProcessingTicket'

/**
 * Common components
 */
import { ProcessorsInfo } from './components/methods/ProcessorsInfo'
import { TransactionHistoryContent } from './components/TransactionHistoryContent'
import { PendingControlNumber } from './components/PendingMTCNContent'
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
			<Route path="/pendingControlNumber/" component={PendingControlNumber}/>

			<Route path="/deposit/" component={Content}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="skrill_ew/" component={Skrill}/>
				<Route path="skrill_ew/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="crd3co/" component={Ecopayz}/>
				<Route path="crd3co/ticket/" component={LoadingTicket}>
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
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="etew_visa/" component={Visa}/>
				<Route path="etew_visa/confirm/" component={VisaConfirm}/>
				<Route path="etew_visa/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="pp_apcc/" component={Astropay}/>
				<Route path="pp_apcc/confirm/" component={VisaConfirm}/>
				<Route path="pp_apcc/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="mastercard/" component={MasterCard}/>
				<Route path="mastercard/confirm/" component={MasterCardConfirm}/>
				<Route path="mastercard/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={MasterCardApprovedTicket}/>
					<Route path="rejected/" component={MasterCardRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={MasterCardRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={MasterCardRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={MasterCardRejectCardTicket}/>
				</Route>


				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="westernunion/" component={Person2Person}/>
				<Route path="westernunion/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="billpay/" component={Person2Person}/>
				<Route path="billpay/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="ria/" component={Person2Person}/>
				<Route path="ria/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
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

				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="moneygram/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="westernunion/" component={Person2Person}/>
				<Route path="westernunion/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="westernunion/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>
				
				<Route path="ria/" component={Person2Person}/>
				<Route path="ria/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="ria/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="skrill_ew/" component={Skrill}/>
				<Route path="skrill_ew/confirm/" component={SkrillConfirmWithdraw}/>
				<Route path="skrill_ew/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

			</Route>

		</Route>
	</Router>
);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));