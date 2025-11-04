# Delivery - API

Bienvenido a la API de Delivery. Esta aplicación backend, construida con **NestJS**, gestiona toda la lógica de negocio para tiendas, productos, autenticación de usuarios y las relaciones entre ellos.

## Tabla de Contenidos

1.  [Prerrequisitos](#prerrequisitos)
2.  [Instalación y Configuración](#instalación-y-configuración)
3.  [Ejecutando la Aplicación](#ejecutando-la-aplicación)
4.  [Proceso de Build para Producción](#proceso-de-build-para-producción)
5.  [Scripts Disponibles](#scripts-disponibles)
6.  [Estructura de la API](#estructura-de-la-api)
7.  [Stack Tecnológico](#stack-tecnológico)

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

-   [**Node.js**](https://nodejs.org/) (se recomienda versión 18.x o superior)
-   [**npm**](https://www.npmjs.com/) (generalmente viene con Node.js)
-   Una instancia de **PostgreSQL** corriendo localmente o en un servidor accesible.

## Instalación y Configuración

Sigue estos pasos para tener un entorno de desarrollo funcional.

### 1. Clonar el Repositorio

```bash
$ git clone <URL_DE_TU_REPOSITORIO>
$ cd delivery-api
```

### 2. Instalar Dependencias

Instala todas las dependencias del proyecto definidas en el `package.json`.

```bash
$ npm install
```

### 3. Configurar Variables de Entorno

La aplicación utiliza un archivo `.env` para gestionar las variables de entorno. Crea una copia del archivo de ejemplo:

```bash
$ cp .env.example .env
```

Ahora, abre el archivo `.env` y edita las variables con tus credenciales locales, especialmente las de la base de datos y el secreto para JWT.

```ini
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_DATABASE=delivery_db

# JWT
JWT_SECRET=ESTE_ES_UN_SECRETO_MUY_SEGURO_CAMBIAME
JWT_EXPIRES_IN=6h

# Clodinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

### 4. Ejecutar las Migraciones

Este comando aplicará todas las migraciones pendientes sobre tu base de datos, creando la estructura de tablas necesaria.

```bash
$ npm run migration:run
```

### 5. Poblar la Base de Datos (Seeding)

Para tener datos de prueba y poder usar la API inmediatamente, ejecuta el script de seeding. Este comando insertará tiendas, productos y sus relaciones.

```bash
$ npm run seed
```

¡Listo! Tu entorno de desarrollo está completamente configurado y listo para usarse.

## Ejecutando la Aplicación

### Modo Desarrollo

Este comando inicia la aplicación en modo de desarrollo con "hot-reloading". El servidor se reiniciará automáticamente cada vez que guardes un cambio en un archivo.

```bash
$ npm run start:dev
```

La API estará disponible en `http://localhost:3000` (o el puerto que hayas configurado).

### Modo Producción

Para desplegar la aplicación en un entorno de producción, sigue estos dos pasos.

1.  **Construir la aplicación:**
    ```bash
    $ npm run build
    ```
    Este comando compila el código TypeScript a JavaScript y lo guarda en la carpeta `dist`.

2.  **Iniciar el servidor:**
    ```bash
    $ npm start
    ```
    Este comando ejecuta la aplicación desde los archivos compilados en la carpeta `dist`. Es más eficiente y está optimizado para producción.

## Proceso de Build para Producción

El comando `npm run build` es fundamental para el despliegue. Transpila todo el código fuente de TypeScript a JavaScript plano, que es lo que Node.js ejecuta de forma nativa. Este proceso es obligatorio antes de poder ejecutar la aplicación con `npm start`.

## Scripts Disponibles

Este proyecto incluye los siguientes scripts en `package.json`:

| Script                 | Descripción                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run build`        | Compila el proyecto de TypeScript a JavaScript en la carpeta `dist`.                                      |
| `npm start`            | Inicia la aplicación en modo producción desde la carpeta `dist`.                                          |
| `npm run start:dev`    | Inicia la aplicación en modo desarrollo con auto-recarga.                                                 |
| `npm run lint`         | Ejecuta el linter (ESLint) para verificar la calidad y el estilo del código.                              |
| `npm run migration:run`| Ejecuta las migraciones de TypeORM para actualizar el esquema de la base de datos.                        |
| `npm run seed`         | Ejecuta el script de seeding para poblar la base de datos con datos iniciales.                            |
| `npm test`             | Ejecuta las pruebas unitarias y de integración.                                                           |

## Estructura de la API

La API sigue un diseño RESTful, con los siguientes recursos principales:

-   `/auth`: Endpoints para registro (`/register`) y autenticación (`/login`).
-   `/stores`: CRUD para la gestión de tiendas.
-   `/products`: CRUD para la gestión de productos.
-   `/stores/:storeId/products`: Endpoints para gestionar la relación entre tiendas y productos (stock, precios, etc.).

## Documentación de la API (Swagger)

Esta API incluye una implementación de Swagger (OpenAPI) para visualizar y probar los endpoints de manera interactiva.

Una vez que la aplicación esté corriendo en modo de desarrollo, puedes acceder a la documentación en la siguiente URL:

**[http://localhost:3000/docs](http://localhost:3000/docs)**

La documentación te permitirá ver todos los endpoints disponibles, los parámetros que aceptan, los DTOs (Data Transfer Objects) y los posibles códigos de respuesta.


## Stack Tecnológico

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **ORM**: [TypeORM](https://typeorm.io/)
-   **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
-   **Autenticación**: JWT (JSON Web Tokens)
-   **Validación**: `class-validator` y `class-transformer`

## Contacto

Este proyecto es mantenido por **Romel Gonzalez**.

-   **Correo**: [romel.gonzalez0036@gmail.com](mailto:romel.gonzalez0036@gmail.com)
-   **LinkedIn**: [Romel Gonzalez](www.linkedin.com/in/romel-gonzalez-37a88b2a6)


