# Laboratorio 09 – TecnoStore (ES6+ y módulos)

Proyecto refactorizado aplicando sintaxis moderna de JavaScript y módulos `import` / `export`.

## Archivos

- `datos.js`: datos de la tienda, configuración, productos, clientes, pedido y ubicación. Usa `export`.
- `utilidades.js`: funciones de la lógica de negocio. Usa funciones flecha, parámetros por defecto, desestructuración, spread y rest.
- `app.js`: importa los datos y funciones y ejecuta el programa principal.
- `index.html`: carga `app.js` con `<script type="module">`.
- `salida-esperada.txt`: salida original que se usa para comparar el resultado.

## Cómo ejecutar en el navegador

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Si no tienes Live Server, instálalo desde la sección Extensiones.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
4. En el navegador abre las herramientas de desarrollador con `F12` y entra en **Console**.

Los módulos ES no deben ejecutarse abriendo el archivo HTML con doble clic (`file://`), porque el navegador puede bloquear las importaciones.

## Cómo ejecutar con Node.js

El proyecto incluye `package.json` con `"type": "module"`. Desde una terminal ubicada en esta carpeta, ejecuta:

```bash
node app.js
```

## Verificación

La salida de `app.js` se comparó con `salida-esperada.txt` y coincide con el resultado original.
