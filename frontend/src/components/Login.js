import {useState} from "react";

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email: email, password: password});
  }

  return(
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </div>
  )
}
export default Login