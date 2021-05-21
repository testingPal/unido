import React from 'react';
import {useState, useEffect} from 'react';

const Ventas = () => {
  
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  //creo un detalle sin nada
  const detalleEnBlanco = { id_plato: '', cantidad: '' };
  //asigno detalle en blanco como default
  const [DetallesVenta, setDetallesState] = useState([
    {...detalleEnBlanco},
  ]);
  /*const platosEnBlanco = { id_plato: 300,
  nombre: 'menu',
  precio: 0 };*/
  const [platos, setPlatos] = useState([ ]);
  const [total, setTotal] = useState(0);
  

  //agrega los platos de la base al estado platos
  useEffect(() => {

    const getPlatos = async () => {
      const platosServidor = await fetchPlatos();
      setPlatos(platosServidor);
    }

    getPlatos();
		
	}, []);

  //traer total

  


  
  //funcion para agregar un nuevo detalle en blanco ademas que los que ya estan
  const agregarDetalle = () => {
    setDetallesState([...DetallesVenta, {...detalleEnBlanco}]);
  }

  const detallesChange = (e) => {
    //crea una copia del estado con todos los  detalles hasta el momento
    const detallesActualizados = [...DetallesVenta];
    //uso e.target.dataset.idx para seleccionar el elemnto correcto del array, e.target.className para decir que campo del elemnto modificar
    detallesActualizados[e.target.dataset.idx][e.target.className] = e.target.value;
    //console.log(detallesActualizados[e.target.dataset.idx]);
    //sobreescribe el estado con los cambios
    setDetallesState(detallesActualizados);
  };

  //para borrado
  const eEntrada = (e) => {
    //hace una copia en limpio de todo el estado hasta ahora
    const todosLosDetalles = [...DetallesVenta];
    //console.log(e.target.getAttribute("id"));
    //obtienen el index del elemento que quiero eliminar
    const index = e.target.getAttribute("id");
    //remueve dicho index de mi copia del estado
    todosLosDetalles.splice(index, 1);
    //sobreescribe el estado con mi copia
    setDetallesState(todosLosDetalles);
  }

  //agregar a base

  const agregarventas = async (venta) => {

    const res = await fetch('http://localhost:8080/ventas', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjEsImlkX2VtcGxlYWRvIjoxLCJpZF90aXBvX3VzdWFyaW8iOjEsIm5vbWJyZV90aXBvX3VzdWFyaW8iOiJjYWplcm8ifSwiaWF0IjoxNjIxNjE5NzgzLCJleHAiOjE2MjE5Nzk3ODN9.L4qSYNmPkN7FThYW1HeEnSPAP4V6fECp0UNNQ1D--uU'
      },
      body: JSON.stringify(venta)
    })
    const data = await res.json();
    //console.log(data.data);
    return data.data;
  }

  //traer platos de la base(peque;o problema aqui porque hay que pasar el token del chef, talves dejar ruta platos publica? de todas fromas es el menu)

  const fetchPlatos = async () => {
    const res = await fetch('http://localhost:8080/platos', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjMsImlkX2VtcGxlYWRvIjo0LCJpZF90aXBvX3VzdWFyaW8iOjQsIm5vbWJyZV90aXBvX3VzdWFyaW8iOiJhZG1pbiJ9LCJpYXQiOjE2MjE2MjE5MDcsImV4cCI6MTYyMTk4MTkwN30.X8YFtqNNSw-DRAJn47c1lVVRsmU9Ld3ySPssz8LeHhk'
      }
    });
    const data = await res.json();
    //nuestra respuesta regresa un mensaje y un array
    return data.data;
  }

  let info = 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(detalles);
    //console.log(res);
    //espero a que se popule info con await
    info = await agregarventas({nombres, apellidos, DetallesVenta});
    //seteo total con el return de info
    setTotal(info);
  }
  
  
  return (

    <form onSubmit={onSubmit}>            
      <label htmlFor="nombres">nombres</label>   
      <input type="text" name="nombres" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} /> 
      <label htmlFor="apellidos">apellidos</label> 
      <input type="text" name="apellidos" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value) } />
      <input type="button" value="Agregar nuevo detalle" onClick={agregarDetalle} />      
      {
        DetallesVenta.map((val, idx) => {
          const id = `id-${idx}`;
          const cantidadId = `cantidad-${idx}`;
          const borradoId = idx;
          return (
            <div key={`detalle-${idx}`}>
              <label htmlFor={id}>{`id #${idx + 1}`}</label>
              <select
                type="text"
                name={id}
                data-idx={idx}
                id={id}
                className="id_plato"
                value={DetallesVenta[idx].id_plato}
                onChange={detallesChange} 
              >
                <option selected value="0">menu</option>
                {platos.map((plato) => (
                  <option key={Math.floor(Math.random() * 10000) + 1} value={plato.id_plato}>{plato.nombre}</option>  
                ))}

              </select>
              <label htmlFor={cantidadId}>Cantidad</label>
              <input
                type="text"
                name={cantidadId}
                data-idx={idx}
                id={cantidadId}
                className="cantidad"
                value={DetallesVenta[idx].cantidad}
                onChange={detallesChange}
              />
              <label htmlFor="precio">Precio</label>
              <label>{!DetallesVenta[idx].id_plato ? 'nada' : platos[DetallesVenta[idx].id_plato - 1].precio}</label>
              <label htmlFor="enInventario">En Inventario</label>
              <label>{!DetallesVenta[idx].id_plato ? 'nada' : platos[DetallesVenta[idx].id_plato - 1].cantidad_disponible}</label>
              <label data-idx={idx} id={borradoId} onClick={eEntrada} >X</label>
            </div>
          );      
        })
      }
      <input type="submit" value="Submit" />
      <label htmlFor="total">{total == 0 ? 'su total es: 0' : `su total es de ${total.total}`}</label>        
    </form> 
    
  )
}

export default Ventas;