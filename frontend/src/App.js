import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={HomePage} exact />
        <Route path="/category/:category" component={CategoryPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute path="/cart" component={CartPage} />
        <Route path="/product/:id" component={ProductPage} />
      </main>
      <Footer />
    </Router>
  )
}

export default App;