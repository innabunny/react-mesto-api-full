import {useState} from "react";
import {Link} from "react-router-dom";
function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({email: email, password: password});
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={handleEmailChange}/>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handlePasswordChange}/>
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__subtitle">Уже зарегистрированы?
        <Link to='/sign-in' className="auth__link">Войти</Link> </p>
    </div>
  )
}
export default Register