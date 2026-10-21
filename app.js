// ============================================================
// PROGRAMA PRINCIPAL: importa datos y funciones
// ============================================================

import {
  tienda,
  configuracionPorDefecto,
  configuracionUsuario,
  productosLaptops,
  productosAccesorios,
  productosMonitores,
  clientes,
  pedido,
  ubicacionAlmacen
} from './datos.js';

import {
  obtenerCatalogo,
  obtenerConfiguracion,
  formatearPrecio,
  calcularDescuento,
  describirProducto,
  resumenCliente,
  buscarProductoPorId,
  buscarClientePorId,
  filtrarPorCategoria,
  productosDisponibles,
  listarNombres,
  sumarMontos,
  registrarEvento,
  actualizarProducto,
  calcularPedido,
  obtenerExtremos
} from './utilidades.js';

console.log('==============================================');
console.log(`  ${tienda.nombre} - RUC ${tienda.ruc}`);
console.log(`  ${tienda.direccion.calle}, ${tienda.direccion.distrito} - ${tienda.direccion.ciudad}`);
console.log('==============================================');

// 1. Configuración
const config = obtenerConfiguracion(configuracionPorDefecto, configuracionUsuario);
console.log('\n--- 1. Configuración del sistema ---');
console.log(config);

// 2. Catálogo completo
const catalogo = obtenerCatalogo(productosLaptops, productosAccesorios, productosMonitores);
console.log(`\n--- 2. Catálogo completo (${catalogo.length} productos) ---`);
for (let i = 0; i < catalogo.length; i++) {
  console.log(describirProducto(catalogo[i]));
}

// 3. Filtros
console.log('\n--- 3. Filtros ---');
console.log('Monitores:', listarNombres(filtrarPorCategoria(catalogo, 'Monitores')));
console.log(`Con stock: ${productosDisponibles(catalogo).length} de ${catalogo.length}`);

// 4. Producto más caro y más barato: desestructuración de arreglo.
const [masCaro, masBarato] = obtenerExtremos(catalogo);
console.log('\n--- 4. Extremos de precio ---');
console.log(`Más caro  : ${masCaro.nombre} (${formatearPrecio(masCaro.precio)})`);
console.log(`Más barato: ${masBarato.nombre} (${formatearPrecio(masBarato.precio)})`);

// 5. Clientes
console.log('\n--- 5. Clientes registrados ---');
for (let j = 0; j < clientes.length; j++) {
  console.log(`${j + 1}. ${resumenCliente(clientes[j])}`);
}

// 6. Descuentos y formatos
console.log('\n--- 6. Descuentos y formatos ---');
console.log('Sin descuento     : ' + formatearPrecio(calcularDescuento(1000)));
console.log('Con 15% descuento : ' + formatearPrecio(calcularDescuento(1000, 15)));
console.log('Formato en dólares: ' + formatearPrecio(250, '$'));
console.log('Con 3 decimales   : ' + formatearPrecio(99.5, 'S/', 3));

// 7. Pedido
console.log('\n--- 7. Pedido ---');
const cliente = buscarClientePorId(clientes, pedido.clienteId);
const descuentoCliente = cliente.tipo === 'frecuente' ? 10 : 0;
const resultado = calcularPedido(pedido, catalogo, descuentoCliente, config);

console.log('Pedido : ' + resultado.codigo);
console.log(`Cliente: ${cliente.nombres} ${cliente.apellidos} (${cliente.tipo})`);
for (let k = 0; k < resultado.detalle.length; k++) {
  console.log('  - ' + resultado.detalle[k]);
}
console.log('Subtotal          : ' + formatearPrecio(resultado.subtotal));
console.log('Descuento aplicado: ' + resultado.descuento + '%');
console.log('Total (con IGV)   : ' + formatearPrecio(resultado.total));

// 8. Actualización de stock
console.log('\n--- 8. Actualización de stock ---');
const teclado = buscarProductoPorId(catalogo, 5);
const tecladoActualizado = actualizarProducto(teclado, { stock: 20 });
console.log('Original   : ' + describirProducto(teclado));
console.log('Actualizado: ' + describirProducto(tecladoActualizado));

// 9. Suma con cantidad variable de argumentos
console.log('\n--- 9. Suma de montos variables ---');
console.log('Ventas del día: ' + formatearPrecio(sumarMontos(1200, 350.5, 89.9, 2499.9)));

// 10. Ubicación del almacén: desestructuración de arreglo.
const [latitud, longitud] = ubicacionAlmacen;
console.log('\n--- 10. Ubicación del almacén ---');
console.log(`Latitud: ${latitud} | Longitud: ${longitud}`);

// 11. Registro de eventos: etiquetas recibidas mediante rest.
console.log('\n--- 11. Eventos ---');
registrarEvento('info', 'Sistema iniciado', 'Catálogo cargado', 'Pedido procesado');
registrarEvento('alerta', 'Producto agotado', teclado.nombre);

console.log('\n==============================================');
console.log('  Fin de la ejecución');
console.log('==============================================');
