import { useEffect, useState } from 'react';

import Header from './Header';
import Alert from './Alert';

const AUTH_URL = 'http://localhost:5050/user/';
const LOGIN_URL = 'http://localhost:5050/user/login';

const initialUser = {
  username: '',
  password: '',
};

function Login() {
  const [user, setUser] = useState(initialUser);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    fetch(AUTH_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then(response => response.json())
      .then(result => {
        if(result.user) {
          window.location.assign('/chat');
        } else {
          localStorage.removeItem('token');
        }
      });
  }, []);
  return (<>
    <Header>
      <button type="button" className="signup btn btn-primary mx-1" onClick={
        () => window.location.assign('/signup')
      }>Cadastrar</button>
    </Header>

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
  </>);
}

export default Login;
