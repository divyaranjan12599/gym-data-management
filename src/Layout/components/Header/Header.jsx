import React, { useState } from 'react'
import './Header.css'
import Logo from "../../assets/logo.png"
import Bars from "../../assets/bars.png"

import { Link } from "react-router-dom"

const Header = () => {

  const mobile = window.innerWidth <= 768 ? true : false

  const [menuOpened, setMenuOpened] = useState(false)



  return (
    <div className="header" >
      <img className='logo' src={Logo} alt="logo" />
      {
        (menuOpened === false && mobile === true) ? (
          <div style={{ backgroundColor: '#3c3f45', padding: '0.5rem', borderRadius: '5px' }}
            onClick={() => setMenuOpened(true)}
          >
            <img
              style={{ width: '1.5rem', height: '1.5rem' }}
              src={Bars}
              alt="menu"

            />
          </div>
        ) : (
          <ul className='header-menu'>
            <li  ><Link
              onClick={() => setMenuOpened(false)}
              to="home"
              // spy={true}
              smooth={true}
              duration={100}
            >Home</Link></li>
            <li  ><Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              spy={true}
              smooth={true}
              duration={100}

            >Programs</Link></li>
            <li  ><Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              spy={true}
              smooth={true}
              duration={100}

            >Why Us</Link></li>
            <li  ><Link
              onClick={() => setMenuOpened(false)}
              to="plans"
              spy={true}
              smooth={true}
              duration={100}

            >Plans</Link></li>
            <li  ><Link
              onClick={() => setMenuOpened(false)}
              to="testimonials"
              spy={true}
              smooth={true}
              duration={100}

            >Testimonials</Link></li>
            {mobile ? <li><button className='btn'>Login</button></li> : ""}
          </ul>
        )
      }

    </div>
  )
}

export default Header