// ============================================================
// DATOS: base de datos simulada de TecnoStore
// ============================================================

export const tienda = {
  nombre: 'TecnoStore',
  ruc: '20123456789',
  direccion: {
    calle: 'Av. Arequipa 1250',
    distrito: 'Lince',
    ciudad: 'Lima'
  }
};

export const configuracionPorDefecto = {
  moneda: 'S/',
  igv: 0.18,
  descuentoMaximo: 30,
  mostrarStock: true
};

export const configuracionUsuario = {
  moneda: 'S/',
  descuentoMaximo: 25
};

export const productosLaptops = [
  { id: 1, nombre: 'Laptop Lenovo IdeaPad 3', categoria: 'Laptops', precio: 2499.90, stock: 8 },
  { id: 2, nombre: 'Laptop HP Pavilion 15', categoria: 'Laptops', precio: 3199.00, stock: 5 },
  { id: 3, nombre: 'MacBook Air M2', categoria: 'Laptops', precio: 4899.00, stock: 2 }
];

export const productosAccesorios = [
  { id: 4, nombre: 'Mouse Logitech M170', categoria: 'Accesorios', precio: 39.90, stock: 50 },
  { id: 5, nombre: 'Teclado Redragon Kumara', categoria: 'Accesorios', precio: 149.00, stock: 0 },
  { id: 6, nombre: 'Audífonos Sony WH-CH520', categoria: 'Accesorios', precio: 199.00, stock: 15 }
];

export const productosMonitores = [
  { id: 7, nombre: 'Monitor LG 24" IPS', categoria: 'Monitores', precio: 549.00, stock: 10 },
  { id: 8, nombre: 'Monitor Samsung 27" Curvo', categoria: 'Monitores', precio: 899.00, stock: 3 }
];

export const clientes = [
  {
    id: 101,
    nombres: 'Ana',
    apellidos: 'Torres Quispe',
    email: 'ana.torres@correo.com',
    direccion: { distrito: 'Miraflores', ciudad: 'Lima' },
    tipo: 'frecuente'
  },
  {
    id: 102,
    nombres: 'Luis',
    apellidos: 'Ramírez Huamán',
    email: 'luis.ramirez@correo.com',
    direccion: { distrito: 'Cercado', ciudad: 'Arequipa' },
    tipo: 'nuevo'
  },
  {
    id: 103,
    nombres: 'María',
    apellidos: 'Flores Chávez',
    email: 'maria.flores@correo.com',
    direccion: { distrito: 'Víctor Larco', ciudad: 'Trujillo' },
    tipo: 'frecuente'
  }
];

export const pedido = {
  codigo: 'PED-0001',
  clienteId: 101,
  items: [
    { productoId: 1, cantidad: 1 },
    { productoId: 4, cantidad: 2 },
    { productoId: 7, cantidad: 1 }
  ]
};

// Coordenadas del almacén: [latitud, longitud]
export const ubicacionAlmacen = [-12.0853, -77.0346];
