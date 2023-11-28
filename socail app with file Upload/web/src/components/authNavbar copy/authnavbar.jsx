import { Link } from "react-router-dom";
import './authNavbar.css'
import { BellFill, ChatDotsFill, Controller, HouseFill, PlusCircleFill, Search } from 'react-bootstrap-icons';
import LogoImg from '../../images/socailVibeLogo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AuthNavbar = () => {
    return (
        <>
            <div className="upper-div">
                <div className="logo m-2  flex items-center">
                    <img src={LogoImg} width={120} alt="" />
                </div>
                <div className="icons-div">
                    <div className="search-div">
                        <Link to={`search`}> <Search size={25} />  </Link>
                    </div>
                    <div className="msg-div">
                        <Link to={`search`}> < ChatDotsFill size={25} />  </Link>
                    </div>
                </div>



            </div>

            <div className="header flex justify-between">
                <div className="nav-bar flex  items-center">
                    <Link className="link" to={`/`}> <HouseFill size={20} /> </Link>
                    <Link className="link" to={`/notification`}> <BellFill size={20} /> </Link>
                    <Link className="link" to={`/create`}> <PlusCircleFill size={29} /> </Link>
                    <Link className="link" to={`/search`}><Controller size={20} /></Link>
                    <Link className="link" to={`/profile`}><AccountCircleIcon /></Link>
                </div>
            </div>







        </>        // <div className="logo-nav">
        // </div>
    );
}

export default AuthNavbar;
