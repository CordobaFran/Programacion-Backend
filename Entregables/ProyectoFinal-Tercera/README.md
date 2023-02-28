# ProyectoFinal - Tercero

## Lista de comandos utilizados:

```
nodemon server 8081 FORK
nodemon server 8082 CLUSTER

forever start server.js 8081 FORK
forever start server.js 8082 CLUSTER
forever list

pm2 start server.js --name='Server2' --  -- 8082 FORK --watch -f
pm2 start server.js --name='Server1' -- -i 4 -- 8083 CLUSTER --watch
pm2 list

```

## NGINX

```

node server 8081 CLUSTER

node server 8082 CLUSTER
node server 8083 CLUSTER
node server 8084 CLUSTER
node server 8085 CLUSTER
```
* **El archivo de configuración de NGINX se encuentra en la carpeta raiz**


