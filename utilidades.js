// ============================================================
// FUNCIONES: lógica de negocio de TecnoStore (ES6+)
// ============================================================

// Combina las listas de productos usando spread.
export const obtenerCatalogo = (productosLaptops, productosAccesorios, productosMonitores) => [
  ...productosLaptops,
  ...productosAccesorios,
  ...productosMonitores
];

// Combina la configuración por defecto con la del usuario.
export const obtenerConfiguracion = (configuracionPorDefecto, configuracionUsuario) => ({
  ...configuracionPorDefecto,
  ...configuracionUsuario
});

// Los parámetros por defecto reemplazan el patrón antiguo con ||.
export const formatearPrecio = (monto, moneda = 'S/', decimales = 2) =>
  moneda + ' ' + monto.toFixed(decimales);

export const calcularDescuento = (precio, porcentaje = 0) => {
  const descuento = precio * (porcentaje / 100);
  return precio - descuento;
};

export const calcularPrecioConIGV = (precio, igv = 0.18) => precio + (precio * igv);

export const describirProducto = (producto) => {
  const { nombre, precio, stock, categoria } = producto;
  const estado = stock > 0 ? `Disponible (${stock} und.)` : 'AGOTADO';
  return `[${categoria}] ${nombre} - ${formatearPrecio(precio)} - ${estado}`;
};

export const resumenCliente = (cliente) => {
  const { nombres, apellidos, email, direccion: { distrito, ciudad } } = cliente;
  return `${nombres} ${apellidos} <${email}> - ${distrito}, ${ciudad}`;
};

// Optimizado con ES6+ .find()
export const buscarProductoPorId = (catalogo, id) => 
  catalogo.find(producto => producto.id === id) || null;

// Optimizado con ES6+ .find()
export const buscarClientePorId = (listaClientes, id) => 
  listaClientes.find(cliente => cliente.id === id) || null;

export const filtrarPorCategoria = (catalogo, categoria) =>
  catalogo.filter((producto) => producto.categoria === categoria);

export const productosDisponibles = (catalogo) =>
  catalogo.filter((producto) => producto.stock > 0);

export const listarNombres = (catalogo) =>
  catalogo.map((producto) => producto.nombre);

// Optimizado con ES6+ .reduce() para sumar montos variables
export const sumarMontos = (...montos) => 
  montos.reduce((total, monto) => total + monto, 0);

export const registrarEvento = (tipo, ...etiquetas) => {
  console.log(`[${tipo.toUpperCase()}] ${etiquetas.join(' | ')}`);
};

// Spread crea un objeto nuevo sin modificar el original.
export const actualizarProducto = (producto, cambios) => ({
  ...producto,
  ...cambios
});

export const calcularPedido = (pedidoActual, catalogo, porcentajeDescuento = 0, config) => {
  const detalle = [];
  const subtotales = [];

  for (let i = 0; i < pedidoActual.items.length; i++) {
    const item = pedidoActual.items[i];
    const producto = buscarProductoPorId(catalogo, item.productoId);
    const subtotal = producto.precio * item.cantidad;

    detalle.push(`${item.cantidad} x ${producto.nombre} = ${formatearPrecio(subtotal, config.moneda)}`);
    subtotales.push(subtotal);
  }

  // Spread pasa los valores del arreglo como argumentos individuales.
  const subtotalGeneral = sumarMontos(...subtotales);
  const conDescuento = calcularDescuento(subtotalGeneral, porcentajeDescuento);
  const total = calcularPrecioConIGV(conDescuento, config.igv);

  return {
    codigo: pedidoActual.codigo,
    detalle,
    subtotal: subtotalGeneral,
    descuento: porcentajeDescuento,
    total
  };
};

export const obtenerExtremos = (catalogo) => {
  const ordenados = [...catalogo].sort((a, b) => b.precio - a.precio);
  return [ordenados[0], ordenados[ordenados.length - 1]];
};