import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



// src/App.jsx
import AcaraList from "./components/AcaraList";

function App() {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <AcaraList />
    </div>
  );
}

export default App
