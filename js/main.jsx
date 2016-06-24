let React = require('react');
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
let {render} = require('react-dom');
import {Client} from './components/Client'
import {Welcome} from './components/Welcome'
import {DepositContent} from './components/DepositContent'
import {NetellerTicket} from './components/methods/neteller/TicketMethod'
import {Neteller} from './components/methods/neteller/Neteller'
import {MethodList} from './components/methods/MethodList'
import {TransactionHistoryContent} from './components/TransactionHistoryContent'
import RouterContainer from './services/RouterContainer'


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