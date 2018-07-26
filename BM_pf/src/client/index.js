import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const App = asyncComponent(() =>
  System.import('./containers/App').then(module => module.default)
)
const OwnerRegister = asyncComponent(() =>
  System.import('./containers/OwnerRegister').then(module => module.default)
)
const Home = asyncComponent(() =>
  System.import('./containers/Home').then(module => module.default)
)
const Paied = asyncComponent(() =>
  System.import('./containers/Paied').then(module => module.default)
)
const Cart = asyncComponent(() =>
  System.import('./containers/Cart').then(module => module.default)
)
const MyPage = asyncComponent(() =>
  System.import('./containers/MyPage').then(module => module.default)
)
const Menu = asyncComponent(() =>
  System.import('./containers/Menu').then(module => module.default)
)
const Store = asyncComponent(() =>
  System.import('./containers/Store').then(module => module.default)
)
const WriteReview = asyncComponent(() =>
  System.import('./containers/WriteReview').then(module => module.default)
)
const Login = asyncComponent(() =>
  System.import('./containers/Login').then(module => module.default)
)
const Search = asyncComponent(() =>
  System.import('./containers/Search').then(module => module.default)
)
const Event = asyncComponent(() =>
  System.import('./containers/Event').then(module => module.default)
)
const Register = asyncComponent(() =>
  System.import('./containers/Register').then(module => module.default)
)
const OwnerPage = asyncComponent(() =>
  System.import('./containers/OwnerPage').then(module => module.default)
)
const OwnerEditTwo = asyncComponent(() =>
  System.import('./containers/OwnerEditTwo').then(module => module.default)
)
const DetailMenuView = asyncComponent(() =>
  System.import('./containers/DetailMenuView').then(module => module.default)
)
const OrderLists = asyncComponent(() =>
  System.import('./containers/OrderLists').then(module => module.default)
)
const CallOrderLists = asyncComponent(() =>
  System.import('./containers/CallOrderLists').then(module => module.default)
)

// import { App, OwnerRegister, Home, Paied, Cart,
//   MyPage, Menu, Store, WriteReview, Login, Search,
//   Event, Register, OwnerPage, OwnerEditTwo,
//   DetailMenuView, OrderLists, CallOrderLists} from './containers';
import './style.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/' component={App}/>
        <Route exact path='/' component={Home}/>
        <Switch>
          <Route path='/ownerpage/registerstore' component={OwnerRegister}/>
          <Route path='/ownerpage/:store_id/1' component={OwnerRegister}/>
          <Route path='/ownerpage/:store_id/2' component={OwnerEditTwo}/>
          <Route path='/ownerpage' component={OwnerPage}/>
        </Switch>
        <Route path='/event' component={Event}/>
        <Route path='/paied/:list_type' component={Paied}/>
        <Route path='/cart' component={Cart}/>
        <Switch>
          <Route path='/mypage/:user_id' component={MyPage}/>
          <Route path='/mypage' component={MyPage}/>
        </Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/search' component={Search}/>
        <Switch>
          <Route path='/menu/:categories/:_id/review/edit/:nth_review' component={WriteReview}/>
          <Route path='/menu/:categories/:_id/review' component={WriteReview}/>
          <Route path='/menu/:categories/:_id/:tabs/detail/:menu_index' component={DetailMenuView}/>
          <Route path='/menu/:categories/:_id/:tabs' component={Store}/>
          <Route path='/menu/:categories' component={Menu}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
