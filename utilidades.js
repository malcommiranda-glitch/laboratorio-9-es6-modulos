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

export const buscarProductoPorId = (catalogo, id) => {
  for (let i = 0; i < catalogo.length; i++) {
    if (catalogo[i].id === id) return catalogo[i];
  }
  return null;
};

export const buscarClientePorId = (listaClientes, id) => {
  for (let i = 0; i < listaClientes.length; i++) {
    if (listaClientes[i].id === id) return listaClientes[i];
  }
  return null;
};

export const filtrarPorCategoria = (catalogo, categoria) =>
  catalogo.filter((producto) => producto.categoria === categoria);

export const productosDisponibles = (catalogo) =>
  catalogo.filter((producto) => producto.stock > 0);

export const listarNombres = (catalogo) =>
  catalogo.map((producto) => producto.nombre);

// Rest reúne todos los argumentos en un arreglo.
export const sumarMontos = (...montos) => {
  let total = 0;
  for (let i = 0; i < montos.length; i++) {
    total += montos[i];
  }
  return total;
};

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
