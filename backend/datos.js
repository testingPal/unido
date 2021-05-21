let arreglo = [
  'asparagus',
  'apples',
  'avacado',
  'alfalfa',
  'acornsquash',
  'almond',
  'arugala',
  'artichoke',
  'applesauce',
  'asiannoodles',
  'antelope',
  'ahituna',
  'albacoretuna',
  'Applejuice',
  'Avocadoroll'
];

const generar = () => {
  arreglo.forEach((item) => {
    console.log(
      `insert into Plato (nombre, precio, descripcion, imagen) values ('${item}' ,15,'descripcion de comida', null)`
    );
  });
};

generar();
