let React = require('react');
let {render} = require('react-dom');
import {Client} from './components/client'
import {Welcome} from './components/welcome'
import {WithdrawContent} from './components/withdrawContent'
import {DepositContent} from './components/depositContent'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {Neteller} from './components/methods/neteller/neteller'
import {MethodList} from './components/methods/methodList'

import {TransactionHistoryContent} from './components/TransactionHistoryContent'
import RouterContainer from './services/RouterContainer'


let routes = (  <Router history={browserHistory}>
	<Route path="/" component={Client}>
		<IndexRoute component={Welcome}/>
		<Route path="/welcome/" component={Welcome}/>
		<Route path="/transaction_history/" component={TransactionHistoryContent}/>
		<Route path="/deposit/" component={DepositContent}>
			<IndexRoute component={MethodList}/>
			<Route path="/deposit/neteller/" component={Neteller}/>
		</Route>
	</Route>
</Router>);

RouterContainer.set(routes);

render((routes), document.getElementById('app'));