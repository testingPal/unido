export const obtener = async (token) => {
  try {
    const res = await fetch(`http://127.0.0.1:8080/platos`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    });
    console.log('des', token);
    const datos = await res.json();
    return datos;
  } catch (err) {
    console.log('desde catch', token);
    return err;
  }
};

export const insertar = async (plato) => {
  try {
    const res = await fetch('http://127.0.0.1:8080/platos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(plato)
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};

export const editar = async (plato_edit) => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8080/platos/${plato_edit.id_plato}`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          nombre: plato_edit.nombre,
          precio: plato_edit.precio,
          descripcion: plato_edit.descripcion
        })
      }
    );
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};

export const eliminar = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:8080/platos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};
