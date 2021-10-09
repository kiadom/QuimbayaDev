import FooterFull from "../components/FooterFull"
import HeaderFull from "../components/HeaderFull"
import '../styles/style.css';

export const MainLayout = ({children}) => {
    return (
        <div className = 'mainContainer'>
            <HeaderFull/>
            <main>{children}</main>
            <FooterFull/>
        </div>
    )
};

export default MainLayout