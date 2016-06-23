let React = require('react');
let {render} = require('react-dom');
import {Client} from './components/client'
import {Welcome} from './components/welcome'
import {WithdrawContent} from './components/withdrawContent'
import {DepositContent} from './components/depositContent'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {NetellerInfo} from './components/methods/neteller/infoMethod'
import {NetellerTicket} from './components/methods/neteller/ticketMethod'
import {VisaInfo} from './components/methods/visa/infoMethod'
import {TransactionHistoryContent} from './components/TransactionHistoryContent'
import RouterContainer from './services/RouterContainer'

let routes = (  <Router history={browserHistory}>
	<Route path="/" component={Client}>
		<IndexRoute component={Welcome}/>
		<Route path="/welcome/" component={Welcome}/>
		<Route path="/transaction_history/" component={TransactionHistoryContent}/>
		<Route path="/deposit/" component={DepositContent}>
			<Route path="/deposit/neteller/" component={NetellerInfo}/>
			<Route path="/deposit/neteller/confirm/" component={NetellerTicket}/>
			<Route path="/deposit/visa/" component={VisaInfo}/>
		</Route>
		<Route path="/withdraw" component={WithdrawContent}>
		</Route>
	</Route>
</Router>);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));