import { useState } from 'react';
import Joi from 'joi';

import Alert from './Alert';

const SIGNUP_URL = 'http://localhost:5050/user/signup';

const initialUser = {
  username: '',
  password: '',
};

const schema = Joi.object().keys({
  username: Joi.string().trim().min(2).required(),
  password: Joi.string().trim().min(8).required(),
});

function Signup() {
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
            setAlert(schema.validate(user).error);
            fetch(SIGNUP_URL, {
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
        >Cadastrar</button>
      </div>
    </main>
  );
}

export default Signup;
