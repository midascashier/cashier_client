let React = require('react');
let {render} = require('react-dom');
import {Client} from './components/client'
import {WithdrawContent} from './components/withdrawContent'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {NetellerInfo} from './components/methods/neteller/infoMethod'
import {NetellerAskInfo} from './components/methods/neteller/askInfo'
import {NetellerTicket} from './components/methods/neteller/ticketMethod'
import {VisaInfo} from './components/methods/visa/infoMethod'
import {TransactionHistory} from './components/transactionHistoryComponent'
import {Methods} from './components/contentComponents/methods'



render(<Client />, document.getElementById('app'));

render((
	<Router history={browserHistory}>
		<Route path="/" component={Client}>
			<IndexRoute component={NetellerInfo}/>
			<Route path="/deposit/" component={NetellerInfo}/>
			<Route path="/withdraw/" component={WithdrawContent}/>
			<Route path="/transaction_history/" component={TransactionHistory}/>
			<Route path="/" component={Methods}>
				<Route path="/deposit/neteller/" component={NetellerInfo}/>
				<Route path="/deposit/visa/" component={VisaInfo}/>
				<Route path="/deposit/neteller/askinfo" component={NetellerAskInfo}/>
				<Route path="/deposit/neteller/ticket" component={NetellerTicket}/>
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));