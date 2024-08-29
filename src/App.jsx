
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";


function App() {
  
  return (
    <>
      <Header/>
        <Outlet />
        <ToastContainer />
      <Footer />
    </>
  )
}

export default App
