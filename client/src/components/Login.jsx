import { useState } from 'react';

import Alert from './Alert';

const LOGIN_URL = 'http://localhost:5050/user/login';

const initialUser = {
  username: '',
  password: '',
};

function Login() {
  const [user, setUser] = useState(initialUser);
  const [alert, setAlert] = useState(false);
  return (
    <main className="container-fluid">
      <div className='form'>
        <Alert error={alert} />
        <div className="mb-3">
          <label htmlFor="#usernameInput">Nome de usuário:</label>
          <input 
            type="text"
            className="form-control"
            id="usernameInput"
            name="username"
            value={user.username}
            onChange={(event) => {
              setUser({
                ...user,
                username: event.target.value
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="#passwordInput">Senha:</label>
          <input 
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={user.password}
            onChange={(event) => {
              setUser({
                ...user,
                password: event.target.value
              });
            }}
          />
        </div>
        <button 
          className="btn btn-primary" 
          onClick={(event) => {
            fetch(LOGIN_URL, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                'content-type': 'application/json',
              },
            }).then((response) => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then((error) => {
                throw new Error(error.message);
              });
            }).then((result) => {
              localStorage.token = result.token;
              window.location.assign('/chat');
            }).catch((error) => {
              setAlert(error);
            });
          }}
        >Entrar</button>
      </div>
    </main>
  );
}

export default Login;
