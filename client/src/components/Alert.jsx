function Alert(props) {
  if(props.error) {
    let message = '';
    if(props.error.message.startsWith('"password"')) {
      message = 'Senha deve ter pelo menos 8 caracteres.'
    } else if(props.error.message.startsWith('"username"')) {
      message = 'Nome de usuário deve ter pelo menos 2 caracteres.'
    } else {
      message = props.error.message;
    }
    return (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  } else {
    return <></>;
  }
}

export default Alert;