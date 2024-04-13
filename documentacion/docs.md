
## Evitar codigo redundante en dtos
npm i @nestjs/mapped-types

extender con partialType, apra hacer las propiedades opcionales en el update

## Evitar codigo malicioso
Añadir al Valitdation pipe :whitelist: true, solo deja pasar los campos del DTO y ninguno mas.

Si quieres lanzar un error cunado venga una que no es, añadir:  forbidNonWhitelisted: true

Añadir transform: true, para transformaciones de tipos primitivos
