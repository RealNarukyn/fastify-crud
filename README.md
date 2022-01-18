<a href="https://www.coreof.tech/" target="_blank">
  <img src="https://api.brandy.run/core/logo" width="100" title="coreof.tech" alt="coreof.tech">
</a>

# Exercises W11D3 - Fastify CRUD

## 1. Make your own blog

Elabora un `CRUD` (create, read, update and delete) completo bajo la temática de un blog de noticias.

Tu aplicación debe cumplir los siguientes requisitos técnicos:

- Mínimo `2 modelos de mongoose` (entry y category) con una relación establecida entre los mismos por el campo `_id`. Complementa ambos modelos con los campos que consideres necesarios (título, descripción, imágenes, hastag, autor...)
- Persistencia de datos en bbdd
- Un archivo `seed` que cargue información en bbdd
- Posibilidad de emplear `variables de entorno`
- Configuración completa del back con un `servidor`, archivo de `configuración`, `aplicación` principal y carpeta de `routers`
- Emplea `layout` y al menos 2 `partials`
- Incluye al menos `1 formulario` que permita añadir o editar la información existente mediante el `método POST`
- Incorpora un botón que `elimine entradas específicas` del blog
- Incorpora un botón que `elimine todas las entradas` del blog
- Incorpora un botón que permita `filtar las entradas` por su categoría
- Incorpora `estilos` en tu blog. Puedes emplear librerías externas si lo prefieres

<img src="./img/jameson.jpeg" width="450">

## 2. Entrega

Añade a esta misma carpeta todo lo necesario para que al ejecutar `yarn install` y `yarn run dev` podamos ver los resultados de tu trabajo.
