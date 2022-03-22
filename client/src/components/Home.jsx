import Header from './Header';

function Home() {
  return (
    <>
      <Header>
        <button type="button" className="signup btn btn-primary mx-1" onClick={
          () => window.location.assign('/signup')
        }>Cadastrar</button>
        <button type="button" className="login btn btn-secondary mx-1" onClick={
          () => window.location.assign('/login')
        }>Entrar</button>
      </Header>
      <main>
        Home!
      </main>
    </>
  );
}

export default Home;
