import React from 'react'
import ReactGA from 'react-ga'
import {render} from 'react-dom'
import {Client} from './components/Client'
import {Welcome} from './components/Welcome'
import {Content} from './components/Content'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'
import {LoadingTicket} from './components/methodTickets/LoadingTicket'
import {RejectedTicket} from './components/methodTickets/RejectedTicket'
import {ApprovedTicket} from './components/methodTickets/ApprovedTicket'
import {DeferredTicket} from './components/methodTickets/DeferredTicket'
import {SecurityBlock} from "./components/methodTickets/SecurityBlock"
/**
 * Neteller set of components to create routes
 */
import {Neteller} from './components/methods/neteller/Neteller'
import {NetellerConfirmWithdraw} from './components/methods/neteller/ConfirmWithdraw'
/**
 * Skrill set of components to create routes
 */
import {Skrill} from './components/methods/skrill/Skrill'
import {SkrillConfirmWithdraw} from './components/methods/skrill/ConfirmWithdraw'
import {SkrillTicketPending} from './components/methods/skrill/tickets/PendingTicket'
/**
 * DebitCards set of components to create routes
 */
import {DebitCards} from './components/methods/debitcards/DebitCards'
import {DebitCardConfirmWithdraw} from './components/methods/debitcards/ConfirmWithdraw'
/**
 * EcoPayz set of components to create routes
 */
import {Ecopayz} from './components/methods/ecopayz/Ecopayz'
import {EcoConfirmWithdraw} from './components/methods/ecopayz/ConfirmWithdraw'
import {EcopayzTicketPending} from './components/methods/ecopayz/tickets/PendingTicket'
/**
 * skrill_1tap set of components to create routes
 */
import {Skrill_1tap} from './components/methods/skrill_1tap/Skrill_1tap'
/**
 * genck set of components to create routes
 */
import {Genck} from './components/methods/genck/genck'
import {CKConfirmWithdraw} from './components/methods/genck/ConfirmWithdraw'
/**
 * Bitcoin set of components to create routes
 */
import {BitCoin} from './components/methods/bitcoin/Bitcoin'
import {BitCoinConfirmWithdraw} from './components/methods/bitcoin/ConfirmWithdraw'
import {BitCoinTicketPending} from './components/methods/bitcoin/tickets/PendingTicket'
/**
 * Visa set of components to create routes
 */
import {Visa} from './components/methods/visa/Visa'
import {VisaConfirm} from './components/methods/visa/Confirm'
import {VisaConfirmWithdraw} from './components/methods/visa/ConfirmWithdraw'
import {VisaApprovedTicket} from './components/methods/visa/tickets/ApprovedTicket'
import {VisaPendingTicket} from './components/methods/visa/tickets/PendingTicket'
import {VisaRejectedTicket} from './components/methods/visa/tickets/RejectedTicket'
import {VisaRejectBankTicket} from './components/methods/visa/tickets/RejectBankTicket'
import {VisaRejectAmountTicket} from './components/methods/visa/tickets/RejectAmountTicket'
import {VisaRejectCardTicket} from './components/methods/visa/tickets/RejectCardTicket'
/**
 * Astropay set of components to create routes
 */
import {Astropay} from './components/methods/astropay/Astropay'
import {AstroPayRejectedTicket} from './components/methods/astropay/tickets/RejectedTicket'
import {AstroPayApprovedTicket} from './components/methods/astropay/tickets/ApprovedTicket'
/**
 * Person2Person set of components to create routes
 */
import {Person2Person} from './components/methods/person2person/Person2Person'
import {P2PConfirmWithdraw} from './components/methods/person2person/ConfirmWithdraw'
import {P2PTicketPending} from './components/methods/person2person/tickets/InstructionsTicket'
import {P2PTicketProcessing} from './components/methods/person2person/tickets/ProcessingTicket'
/**
 * Crypto Transfer
 */
import {CryptoTransfer} from './components/methods/cryptotransfer/CryptoTransfer'
import {CryptoTransferConfirmWithdraw} from './components/methods/cryptotransfer/ConfirmWithdraw'
import {CryptoTransferTicketPending} from './components/methods/cryptotransfer/tickets/PendingTicket'
/**
 * Crypto Screen
 */
import {CryptoScreen} from './components/methods/cryptoscreen/CryptoScreen'
import {CryptoScreenConfirmWithdraw} from './components/methods/cryptoscreen/ConfirmWithdraw'
import {CryptoScreenTicketPending} from './components/methods/cryptoscreen/tickets/PendingTicket'
/**
 * Agent Transfer
 */
import {Player2Agent} from './components/methods/player2agent/Player2Agent'
import {Player2AgentConfirmWithdraw} from './components/methods/player2agent/ConfirmWithdraw'
import {Player2AgentApprovedTicket} from './components/methods/player2agent/tickets/ApprovedTicket'
/**
 * CCEcommpay set of components to create routes
 */
import {CCEcommpay} from './components/methods/ccecommpay/CCEcommpay'
import {CCEcommpayTicketPending} from './components/methods/ccecommpay/tickets/PendingTicket'
/**
 * WMEcommpay set of components to create routes
 */
import {WMEcommpay} from './components/methods/wmecommpay/WMEcommpay'
import {WMEcommpayTicketPending} from './components/methods/wmecommpay/tickets/PendingTicket'
/**
 * Common components
 */
import {ProcessorsInfo} from './components/methods/ProcessorsInfo'
import {TransactionHistoryContent} from './components/TransactionHistoryContent'
import {RequestsContent} from './components/RequestContent'
import {PendingControlNumber} from './components/PendingMTCNContent'
import RouterContainer from './services/RouterContainer'

//method

/**
 * initialize GA account and basic page view
 */
ReactGA.initialize('UA-36534718-32');

let fireTracking = () => {
	if(window.location.pathname != "/"){
		ReactGA.pageview(window.location.pathname);
	}
};

/**
 * routing application
 *
 * @type {XML}
 */
let routes = (
	<Router onUpdate={fireTracking} history={browserHistory}>
		<Route path="/" component={Client}>
			<IndexRoute component={Welcome}/>
			<Route path="/welcome/" component={Welcome}/>
			<Route path="/transaction_history/" component={TransactionHistoryContent}/>
			<Route path="/requests/" component={RequestsContent}/>
			<Route path="/pendingControlNumber/" component={PendingControlNumber}/>

			<Route path="/deposit/" component={Content}>
				<IndexRoute component={ProcessorsInfo}/>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/securityBlock/" component={SecurityBlock}/>
				<Route path="neteller_new/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="skrill_ew/" component={Skrill}/>
				<Route path="skrill_ew/securityBlock/" component={SecurityBlock}/>
				<Route path="skrill_ew/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="pending/" component={SkrillTicketPending}/>
				</Route>

				<Route path="crd3co/" component={Ecopayz}/>
				<Route path="crd3co/securityBlock/" component={SecurityBlock}/>
				<Route path="crd3co/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="pending/" component={EcopayzTicketPending}/>
				</Route>

				<Route path="skrill_1tap/" component={Skrill_1tap}/>
				<Route path="skrill_1tap/securityBlock/" component={SecurityBlock}/>
				<Route path="skrill_1tap/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="bitcoin/" component={BitCoin}/>
				<Route path="bitcoin/securityBlock/" component={SecurityBlock}/>
				<Route path="bitcoin/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={BitCoinTicketPending}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="visa/" component={Visa}/>
				<Route path="visa/confirm/" component={VisaConfirm}/>
				<Route path="visa/securityBlock/" component={SecurityBlock}/>
				<Route path="visa/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="pending/" component={VisaPendingTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="etew_visa/" component={Visa}/>
				<Route path="etew_visa/confirm/" component={VisaConfirm}/>
				<Route path="etew_visa/securityBlock/" component={SecurityBlock}/>
				<Route path="etew_visa/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="pp_apcc/" component={Astropay}/>
				<Route path="pp_apcc/securityBlock/" component={SecurityBlock}/>
				<Route path="pp_apcc/ticket/" component={LoadingTicket}>
					<Route path="rejected/" component={AstroPayRejectedTicket}/>
					<Route path="approved/" component={AstroPayApprovedTicket}/>
				</Route>

				<Route path="mastercard/" component={Visa}/>
				<Route path="mastercard/confirm/" component={VisaConfirm}/>
				<Route path="mastercard/securityBlock/" component={SecurityBlock}/>
				<Route path="mastercard/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="pending/" component={VisaPendingTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="amex/" component={Visa}/>
				<Route path="amex/confirm/" component={VisaConfirm}/>
				<Route path="amex/securityBlock/" component={SecurityBlock}/>
				<Route path="amex/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="pending/" component={VisaPendingTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

				<Route path="jcb/" component={Visa}/>
				<Route path="jcb/confirm/" component={VisaConfirm}/>
				<Route path="jcb/securityBlock/" component={SecurityBlock}/>
				<Route path="jcb/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={VisaApprovedTicket}/>
					<Route path="pending/" component={VisaPendingTicket}/>
					<Route path="rejected/" component={VisaRejectedTicket}/>
					<Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
					<Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
					<Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
				</Route>

        <Route path="discover/" component={Visa}/>
        <Route path="discover/confirm/" component={VisaConfirm}/>
        <Route path="discover/securityBlock/" component={SecurityBlock}/>
        <Route path="discover/ticket/" component={LoadingTicket}>
          <Route path="approved/" component={VisaApprovedTicket}/>
          <Route path="pending/" component={VisaPendingTicket}/>
          <Route path="rejected/" component={VisaRejectedTicket}/>
          <Route path="rejected/blockByBank/" component={VisaRejectBankTicket}/>
          <Route path="rejected/invalidAmount/" component={VisaRejectAmountTicket}/>
          <Route path="rejected/invalidCard/" component={VisaRejectCardTicket}/>
        </Route>

				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/securityBlock/" component={SecurityBlock}/>
				<Route path="moneygram/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="westernunion/" component={Person2Person}/>
				<Route path="westernunion/securityBlock/" component={SecurityBlock}/>
				<Route path="westernunion/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="billpay/" component={Person2Person}/>
				<Route path="billpay/securityBlock/" component={SecurityBlock}/>
				<Route path="billpay/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="ria/" component={Person2Person}/>
				<Route path="ria/securityBlock/" component={SecurityBlock}/>
				<Route path="ria/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={P2PTicketPending}/>
					<Route path="processing/" component={P2PTicketProcessing}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="btc_crypto_transfer/" component={CryptoTransfer}/>
				<Route path="btc_crypto_transfer/securityBlock/" component={SecurityBlock}/>
				<Route path="btc_crypto_transfer/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={CryptoTransferTicketPending}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="cryptoscreen/" component={CryptoScreen}/>
				<Route path="cryptoscreen/securityBlock/" component={SecurityBlock}/>
				<Route path="cryptoscreen/ticket/" component={LoadingTicket}>
					<Route path="pending/" component={CryptoScreenTicketPending}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

        <Route path="cc_ecommpay/" component={CCEcommpay}/>
        <Route path="cc_ecommpay/securityBlock/" component={SecurityBlock}/>
        <Route path="cc_ecommpay/ticket/" component={LoadingTicket}>
          <Route path="approved/" component={ApprovedTicket}/>
          <Route path="rejected/" component={RejectedTicket}/>
          <Route path="pending/" component={CCEcommpayTicketPending}/>
        </Route>

        <Route path="wm_ecommpay/" component={WMEcommpay}/>
        <Route path="wm_ecommpay/securityBlock/" component={SecurityBlock}/>
        <Route path="wm_ecommpay/ticket/" component={LoadingTicket}>
          <Route path="approved/" component={ApprovedTicket}/>
          <Route path="rejected/" component={RejectedTicket}/>
          <Route path="pending/" component={WMEcommpayTicketPending}/>
        </Route>

			</Route>

			<Route path="/withdraw/" component={Content}>
				<IndexRoute component={ProcessorsInfo}/>

        <Route path="paytocard/" component={Visa}/>
        <Route path="paytocard/confirm/" component={VisaConfirmWithdraw}/>
        <Route path="paytocard/securityBlock/" component={SecurityBlock}/>
        <Route path="paytocard/ticket/" component={LoadingTicket}>
          <Route path="deferred/" component={DeferredTicket}/>
          <Route path="rejected/" component={RejectedTicket}/>
        </Route>

				<Route path="bitcoin/" component={BitCoin}/>
				<Route path="bitcoin/confirm/" component={BitCoinConfirmWithdraw}/>
				<Route path="bitcoin/securityBlock/" component={SecurityBlock}/>
				<Route path="bitcoin/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>

				<Route path="moneygram/" component={Person2Person}/>
				<Route path="moneygram/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="moneygram/securityBlock/" component={SecurityBlock}/>
				<Route path="moneygram/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="westernunion/" component={Person2Person}/>
				<Route path="westernunion/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="westernunion/securityBlock/" component={SecurityBlock}/>
				<Route path="westernunion/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="genck/" component={Genck}/>
				<Route path="genck/confirm/" component={CKConfirmWithdraw}/>
				<Route path="genck/securityBlock/" component={SecurityBlock}/>
				<Route path="genck/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="crd3co/" component={Ecopayz}/>
				<Route path="crd3co/confirm/" component={EcoConfirmWithdraw}/>
				<Route path="crd3co/securityBlock/" component={SecurityBlock}/>
				<Route path="crd3co/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="neteller_new/" component={Neteller}/>
				<Route path="neteller_new/confirm/" component={NetellerConfirmWithdraw}/>
				<Route path="neteller_new/securityBlock/" component={SecurityBlock}/>
				<Route path="neteller_new/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="ria/" component={Person2Person}/>
				<Route path="ria/confirm/" component={P2PConfirmWithdraw}/>
				<Route path="ria/securityBlock/" component={SecurityBlock}/>
				<Route path="ria/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="skrill_ew/" component={Skrill}/>
				<Route path="skrill_ew/confirm/" component={SkrillConfirmWithdraw}/>
				<Route path="skrill_ew/securityBlock/" component={SecurityBlock}/>
				<Route path="skrill_ew/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="debitcards/" component={DebitCards}/>
				<Route path="debitcards/confirm/" component={DebitCardConfirmWithdraw}/>
				<Route path="debitcards/securityBlock/" component={SecurityBlock}/>
				<Route path="debitcards/ticket/" component={LoadingTicket}>
					<Route path="deferred/" component={DeferredTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
				</Route>

				<Route path="btc_crypto_transfer/" component={CryptoTransfer}/>
				<Route path="btc_crypto_transfer/confirm/" component={CryptoTransferConfirmWithdraw}/>
				<Route path="btc_crypto_transfer/securityBlock/" component={SecurityBlock}/>
				<Route path="btc_crypto_transfer/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>

				<Route path="cryptoscreen/" component={CryptoScreen}/>
				<Route path="cryptoscreen/confirm/" component={CryptoScreenConfirmWithdraw}/>
				<Route path="cryptoscreen/securityBlock/" component={SecurityBlock}/>
				<Route path="cryptoscreen/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={ApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>

				<Route path="player2agent/" component={Player2Agent}/>
				<Route path="player2agent/confirm/" component={Player2AgentConfirmWithdraw}/>
				<Route path="player2agent/securityBlock/" component={SecurityBlock}/>
				<Route path="player2agent/ticket/" component={LoadingTicket}>
					<Route path="approved/" component={Player2AgentApprovedTicket}/>
					<Route path="rejected/" component={RejectedTicket}/>
					<Route path="deferred/" component={DeferredTicket}/>
				</Route>

			</Route>
		</Route>
	</Router>
);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));
