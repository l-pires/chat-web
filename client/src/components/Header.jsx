function Header(props) {
  return (
    <div className="header">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="logo navbar-brand" href="/">Chat-Web</a>
          <div>
            {props.children}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
