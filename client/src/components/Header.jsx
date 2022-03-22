function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="logo navbar-brand" href="/">Chat-Web</a>
          <div>
            <button type="button" className="signup btn btn-primary mx-1" onClick={
              () => window.location.assign('/signup')
            }>Cadastrar</button>
            <button type="button" className="login btn btn-secondary mx-1" onClick={
              () => window.location.assign('/login')
            }>Entrar</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
