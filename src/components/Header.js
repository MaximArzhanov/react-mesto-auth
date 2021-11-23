import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  //const { textLink } = props;

  return (
    <header className="header">
      <a href="#" className="header__logo"></a>
      <Link to="/sign-in" className="link header__link">
        Войти
      </Link>
    </header>
  );
}

export default Header;