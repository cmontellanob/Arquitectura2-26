# Microservicios 10-27

Mejora de la version 10-21: las bases de datos ahora corren en contenedores.

| Servicio     | Contenedor          | Puerto | Base de datos |
|--------------|---------------------|--------|---------------|
| nginx        | nginx_gateway       | 80     | -             |
| users        | service_users       | 3000   | MongoDB       |
| items        | service_items       | 3002   | MySQL         |
| categories   | service_categories  | 3005   | MySQL         |
| mysql        | mysql_tantakatu     | 3306   | bd_tantakatu  |
| mongodb      | mongodb_usuarios    | 27017  | bd_usuarios   |

## Configuracion
- `.env` (raiz): credenciales de MySQL, MongoDB y puertos que usa `docker-compose.yml`.
- `serviceX/.env`: configuracion de cada microservicio (puerto, JWT, base de datos).
  Sirve para correr en local (`npm run dev`); dentro de Docker el compose
  sobrescribe el host de la BD (`mysql` / `mongodb`) y las credenciales.
- `mysql/init/*.sql`: script inicial de `bd_tantakatu` (tablas category, item, purchase).
  Solo se ejecuta la primera vez que se crea el volumen.

## Levantar todo
```
docker compose up -d --build
docker compose ps
docker compose logs -f
```

## Reiniciar las bases desde cero (borra los datos)
```
docker compose down -v
docker compose up -d --build
```

## Probar (a traves de nginx)
- POST http://localhost/api/v1/users   -> crear usuario
- POST http://localhost/api/v1/login   -> obtener token
- GET  http://localhost/api/v1/categories  (Authorization: Bearer <token>)
- GET  http://localhost/api/v1/items       (Authorization: Bearer <token>)
