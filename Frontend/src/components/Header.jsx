import logoheader from '../images/logoheader.png';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faHome, faSearchDollar, faThermometerThreeQuarters, faIdCard, faUsersCog, faSignOutAlt, faBars);

const Header = () => {
    return(
        <div className="wrapper">
            <header className="principal">
            <div className="topNavBar">
                <div className="hamburger">
                    <FontAwesomeIcon icon={faBars}/> 
                    <a href="#"><i className="fas fa-bars"></i></a>
                </div>

                <div className="iconCompany">
                    <img src= {logoheader} alt="logo header" height="50px"/>
                </div>
            </div>
            </header>
        </div>
    );
};

export default Header;