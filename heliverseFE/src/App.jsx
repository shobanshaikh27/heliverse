


import './App.css'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Teams from './components/Teams';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Sidebar />} />
          <Route exact path='/teams/:id' element={<Teams />} />
          {/* <Cards /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
