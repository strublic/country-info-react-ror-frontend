import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Form from './Form';

export const AddCountry = () => (
  <>
    <Link to="/home/new">
      <button>Cadastrar novo país</button>
    </Link>
    <Routes>
      <Route path="/home/:action" element={<Form />} />
    </Routes>
  </>
);

function Button() {
  
  return (
    <div>Button</div>
  )
}

export default Button