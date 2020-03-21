import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.component';
import ShopingList from './components/shoppinglist.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import ModalExample from './components/addItem.component';
import {userloading} from './action/authaction'
class  App extends Component {
  componentDidMount(){
    store.dispatch(userloading());
  }
  render(){
  return (
    <Provider store={store}>
    <div className="App">
      <Navbar/>
      <ModalExample/>
      <ShopingList/>
    </div>
    </Provider>
  );
}
}
export default App;
