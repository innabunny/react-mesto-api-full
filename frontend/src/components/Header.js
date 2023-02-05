import {Link, useLocation} from "react-router-dom";

function Header(props) {
  const {pathname}  = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__nav">
        {(pathname === '/sign-up') &&
          <Link to='/sign-in' className="header__link">Войти</Link>}
        {(pathname === '/sign-in') &&
          <Link to='/sign-up' className="header__link">Регистрация</Link>}
        {(pathname === '/') &&
          <>
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={props.signOut}>Выйти</button>
          </>
        }
      </div>
    </header>
  )
}
export default Header