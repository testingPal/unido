//almacenar autenticacion en session storage
export const almacenarSesion = (token, cargo) => {
  sessionStorage.setItem('token', 'cargo');
  sessionStorage.token = token;
  sessionStorage.cargo = cargo;
};

//verificar si hay autenticacion en session storage
export const leerSesion = () => {
  let token = sessionStorage.getItem('token');
  let cargo = sessionStorage.getItem('cargo');

  if (token && cargo) {
    return { existe: true, token, cargo };
  } else {
    return { existe: false };
  }
};
