import React from 'react';

const Detalles = ({ detalles }) => {
	return (
		<>
			{detalles.map((detalle) => (
				<ul className='list-group' key={detalle.id_detalle_venta}>
					<li className='list-group-item'>
						<span className='text-center'>{detalle.nombre}</span>
						{' - '}
						<span className='text-right circle'>{detalle.cantidad}</span>
					</li>
				</ul>
			))}
		</>
	);
};

export default Detalles;
