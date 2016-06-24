let React = require('react');
let {render} = require('react-dom');
import {Client} from './components/client'
import {Welcome} from './components/welcome'
import {DepositContent} from './components/depositContent'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {NetellerTicket} from './components/methods/neteller/ticketMethod'
import {Neteller} from './components/methods/neteller/neteller'
import {MethodList} from './components/methods/methodList'
import {TransactionHistoryContent} from './components/transactionHistoryContent'
import RouterContainer from './services/routerContainer'


let routes = (  <Router history={browserHistory}>
	<Route path="/" component={Client}>
		<IndexRoute component={Welcome}/>
		<Route path="/welcome/" component={Welcome}/>
		<Route path="/transaction_history/" component={TransactionHistoryContent}/>
		<Route path="/deposit/" component={DepositContent}>
			<IndexRoute component={MethodList}/>
			<Route path="neteller/" component={Neteller}/>
			<Route path="neteller/ticket" component={NetellerTicket}/>
		</Route>
	</Route>
</Router>);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));