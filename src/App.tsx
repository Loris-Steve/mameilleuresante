// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import IngredientDetailScreen from './screens/IngredientDetailScreen';
import RemedyDetailScreen from './screens/RemedyDetailScreen';
import SicknessDetailScreen from './screens/SicknessDetailScreen';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="webSiteContent" >
        <SearchForm />
        <div className='container border rounded p-3'>
          <Switch>
            <Route path='/' exact component={IngredientDetailScreen} />
            <Route path='/ingredient' exact component={IngredientDetailScreen} />
            <Route path='/ingredient/:id' exact component={IngredientDetailScreen} />
            <Route path='/remede' exact component={RemedyDetailScreen} />
            <Route path='/remede/:id' exact component={RemedyDetailScreen} />
            <Route path='/maladie' exact component={SicknessDetailScreen} />
            <Route path='/maladie/:id' exact component={SicknessDetailScreen} />
            {/* <Route path='*' exact component={IngredientDetailScreen} /> */}
          </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
