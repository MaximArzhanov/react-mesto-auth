import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

  const { linkName, linkRoute } = props;

  return (
    <header className="header">
      <a href="#" className="header__logo"></a>
      <Link to={linkRoute} className="link header__link">
        {linkName}
      </Link>
    </header>
  );
}

export default Header;