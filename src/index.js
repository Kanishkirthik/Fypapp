import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from'react-router-dom';
import Login from './Login';
import Register from './Register';
import DashBoard from './DashBoard';
//Create root element of react
const root = ReactDOM.createRoot(document.getElementById('root'));
//root element contains method render that we can pass params of component
root.render(
  //We are using react router to route url get data back on router so we need pass more params  so react offers mode strict Mode
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/DashBoard' element={<DashBoard/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
