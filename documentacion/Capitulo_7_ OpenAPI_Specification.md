
# Introducing the Swagger Module

```
npm install --save @nestjs/swagger swagger-ui-express
```

# Enabling CLI Plugin

Para habilitar el plugin que añade automaticamente los decoradores,
hay que abrir el nest-cli.json y añadir:

```
"compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      "@nestjs/swagger/plugin"
    ]
  }
```
IMPORTANTE: los dtos que son partial type de otro, para el swagger hay que importarlos con

```
import { PartialType } from "@nestjs/swagger";
```

# Decorating Model Properties

Añadir @ApiProperty() a cada propiedad de los DTO:
para añadri propierdades como "default", o "examples"

# Adding Example Responses

```
@ApiForbiddenResponse({ description: 'Forbidden.' })
```

# Using Tags to Group Resources
```
@ApiTags('coffees')
```
