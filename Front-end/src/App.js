import logo from './logo.svg';
import './App.css';
import SignUp, {} from './pages/signup/SignUp'
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import MainRouter from './router/Router';
import View from './pages/crud/View';
import Add from './pages/crud/Add';
import Edit from './pages/crud/Edit';


function App() {

  return (

      <BrowserRouter>
        <MainRouter>
          <Route path='/create/' element={<Add/>}/>
          <Route path='/detail/:id' element={<View/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </MainRouter>
      </BrowserRouter>
   
  );
}

export default App;
