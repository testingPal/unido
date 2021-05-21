import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  //se usa para manejar el redireccionamiento
  const history = useHistory();

  const cerrarSesion = () => {
    sessionStorage.clear();
    history.push('/');
  };
  return (
    <>
    
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Nombre Restaurante</span>
          <input
            className="btn btn-primary"
            type="button"
            value="Cerrar Sesión"
            onClick={cerrarSesion}
          />
        
      </div>
      </nav>
    </>

  );
};

export default Header;
