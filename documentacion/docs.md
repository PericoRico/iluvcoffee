
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

tambien crea automaticamente el archivo
npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config

y lugo lo aplica, despues de añadirlo a l .config del typeORM