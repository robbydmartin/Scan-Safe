import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScanScreen from "./Screens/ScanScreen";
import ResultScreen from "./Screens/ResultScreen";
import YourIngredientsScreen from "./Screens/YourIngredientsScreen";
import InfluencerDashboard from "./Screens/InfluencerDashboard";
import AlternativeProductForm from "./Screens/AlternativeProductForm";
import ProposedIngredientForm from './Screens/ProposedIngredientForm';
import UpdateAlternativeProduct from './Screens/UpdateAlternativeProduct';
import UpdateProposedIngredient from './Screens/UpdateProposedIngredient';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from "./Screens/Profile";
import Navbar from "./components/Navbar";
import AuthService from "./Services/AuthService";
import {useEffect, useState} from "react";
import admin from "./Screens/Admin";
import Admin from "./Screens/Admin";
import Proposals from "./Screens/Proposals";
import Pizzatime from "./Screens/Pizzatime";
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ScanScreen />} />
        <Route path="product">
          <Route path=":upc" element={<ResultScreen />} />
        </Route>
        <Route path="/your-ingredients" element={<YourIngredientsScreen />} />
        <Route path="InfluencerDashboard" element={<InfluencerDashboard />} />
        <Route path="AlternativeProductForm" element={<AlternativeProductForm />} />
        <Route path="ProposedIngredientForm" element={<ProposedIngredientForm />} />
        <Route path="UpdateAlternativeProduct/:id" element={<UpdateAlternativeProduct />} />
        <Route path="UpdateProposedIngredient/:id" element={<UpdateProposedIngredient /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path="proposals" element={<Proposals/>}/>
        <Route path="pizzatime" element={<Pizzatime/>}/>
      </Routes>
    </Router>
  );
}

export default App;
