import { useEffect, useState } from 'react';

import Header from "./Header";

const AUTH_URL = 'http://localhost:5050/user/';

function logout() {
  localStorage.removeItem('token');
  window.location.assign('/');
}

function Chat() {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(AUTH_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then(response => response.json())
      .then(result => {
        if(result.user) {
          setUser({
            _id: result.user._id,
            username: result.user.username,
          });
        } else {
          logout();
        }
      });
  }, []);
  return (
    <>
      <Header>
        <span className="mx-1">Usuário: {user.username}</span>
        <button type="button" className="login btn btn-secondary mx-1" onClick={logout}>Sair</button>
      </Header>

      <main className="container-fluid">
        
      </main>
    </>
  );
}

export default Chat;
