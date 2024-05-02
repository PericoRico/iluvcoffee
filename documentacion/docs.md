
## Evitar codigo redundante en dtos
npm i @nestjs/mapped-types

extender con partialType, apra hacer las propiedades opcionales en el update

## Evitar codigo malicioso
Añadir al Valitdation pipe :whitelist: true, solo deja pasar los campos del DTO y ninguno mas.

Si quieres lanzar un error cunado venga una que no es, añadir:  forbidNonWhitelisted: true

Añadir transform: true, para transformaciones de tipos primitivos

## Con esto no hace falta decorar con type los DTO

transformOptions: {
        enableImplicitConversion: true 
      }

## TypeORM

lo instala y lo importa en el appmodule. Luego crea las entidades @Entity()

### Migraciones

npx typeorm migration:create src/migrations/CoffeeRefactor

crea un archivo de migracion

Todos deben tener un metodo up y down

lugo hace el build y aplica la migracion con
npx typeorm migration:run -d dist/typeorm-cli.config

npx typeorm migration:revert -d dist/typeorm-cli.config

tambien crea automaticamente el archivo
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config

y lugo lo aplica, despues de añadirlo a l .config del typeORM

# Capitulo 3

## Inyeccion de dependencias

1. en el servicio esta el decorado @Injectable, que marca la clase como un PROVIDER
2. En el controller se pide el servicio en el constructor, lo inyecta apra poder utilizarlo
3. Nest sabe que esa clase els un provider porque esta incluido en el module, que registra el proveedor en el Nest Inversion of Control Container (IoC)

Cuando el nest container instancia el controller mira si hace faltra alguna dependencia, los servicios que se inyectan, enotnces mira que es es servicio y devuelve la clase.
Suponiendo que el Provider tiene un singleton scope, que es lo default, entonces crea una instancia y la cachea o devuelve la cacheada.
Todo esto pasa en el aplication bootstraping

Si el injectado tiene otars dependencais ha yque resolverlas tambien, con el arbol de dependencias que lo hace nest solo

## Encapsualcion
 Por defecto nest encapsula los providers por lo que no se puede injectar providers qeu no son parte del modulo o exportados de otro modulo.

 Se peude pensar en el export como la API del modulo

 ## Inyeccion sin clases

 pare inyectar en el constructor los private xxx son clases, si se queire meter uno que no sea un clase:
 @Inject('COFFEE_BRANDS') coffeeBrands: string[]

 ## DynamicModule

 Crear modulos que aceptan parametros para su creacion, como el de base de datos, que luego lo importa en otro pasandole los datos de la DB que necesita.

 ## Providers Scope:

 Nodejs no sigue el modelo stateless request/response multi-hilo.
 El server no guarda info de estado de cada cliente entre las peticiones, cada RQ se trata de forma independiente.
 No mantiene un estado de sesion para cada usuario, el estado (userInfo, preferencias...) se manejan con cookies o sesiones en la aplicacion cliente.

Por esto usar instancias singleton es seguro.
Por defecto cada provider en nestJS es un Singleton, el decorador @Injectable() por defecto tiene la opcion ({scope:scopeDEFAULT}), y el defaut es sigleton

SINGLETON: significa que si un componente modifica alguna propiedad del proveedor, esa modificación afectará a todos los demás componentes que también lo utilizan.

El lifetime del privider esta atado al de la app

--> Cuando la app ha bootstrapped todos los providers se han instanciado.
Recomiendan usar singleton por performance

Hay otros scopes como:
- Scope.Transient que creq una instancia por cada vez que se injecta
- Scope.Request, crae uan instancia por cada request

Si el servcie es scope.request, el contorller aunque no lo especifiques tambien lo es porque lo necesita
Los providers request-scoped pueden injectar el objeto "original" de la RQ (headers, cookies, IPs..)
Se recomeinda el singleton porque este baja el rendimiento.


# Capitulo 5

## env
valdiar las variables

npm install @hapi/joi
npm install --save-dev @types/hapi__joi

luego pone

import * as Joi from '@hapi/joi';

ConfigModule.forRoot({
  validationSchema: Joi.object({
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
  }),
}),
## mas complejo

 crea el app.config como una factory

 luego en el app module le pasa el load
```
 ConfigModule.forRoot({
      load: [appConfig], // 👈
    }),
```



# Capitulo 6: Building Blocks
 ver otro archivo