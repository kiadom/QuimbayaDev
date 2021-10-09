import Footer from "../components/Footer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import '../styles/modulos.css';

const Layout = ({children}) => {
    return (
        <div className = 'mainContainer'>
            <Sidebar/>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
};

export default Layout;