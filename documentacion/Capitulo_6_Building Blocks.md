
# Capitulo 6: Building Blocks

## Types of building blocks
### Exception Filters

Responsible for handling and processing unhandled exceptions that might occur.
Control the flow and content of any specific responses

### Pipes

Handle transformations: Input -transform-> Output
Validation: Evaluate input data

### Guards

Determine whether a given RQ meets certain confitions (auth..)

### Interceptors

Aspect Oriented Programming..

1. Bind Extra Logic befor or after method execution
2. Transform the result returned from a method
3. Extend basic method behavior
4. Even completely override a method depending on specific conditions. FOR EXAMPLE "CACHING RESPONSES"

## Binding Techniques


No se anulan uno a otro, se colocan en capas.



### Global scoped
En el main.js
Si en el main.ts escribes app.use ya te recomienda los metodos para otros buildingBlocks 


Puede definir:
{
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }

en el app module como provider, asi instancia el validationPipe en el scope del AppModule
y cuando se crea lo registra como GlobalPipe

### Controller scoped

@UsePipes(ValidationPipe)

Pone el decorador encima del controller
### Method scoped
Usa el mismo decorator pero encima de un metodo

### Param scoped (pipes only)
Si la logica de validacion aplica exclusivamente a un parametro
@Body(ValidationPipe) , se lo aplica asi al body por ejemplo

## Catch Exceptions with Filters

Crear un filtro con la  terminal: nest g filter common/filters/http-exception


```
@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

Le mete el httpException en el parentesis porque son los errores que quiere controlar

<T>: esto es que acepta un argumento de tipo, que le indicara al metodo catch



## Protect Routes with Guards

nest g guard common/guards/api-key

añade comprobaciones de si tiene un apiKey en el header

## Using Metadata to build generic guards or interceptors

Detectar si al ruta es publica o no.

    @SetMetadata('isPublic', true)
encima del metodo en el controller, pero es mejor crear tu propio decorator:
@Public

luego en el guard añade la comprobacion de si es public o no:
Para eso usa una helper class called Reflector

Para que no pete porque esta usando inyeccion de dependencias en el guard, hay que añadirlo a un modulo:
crea un modulo para el common y lo instancia alli
$ nest g mo common


## Add pointcuts with interceptors

- bind extra logic before or after method execution
- transform the result returned from a method
- transform the exception thrown from a method
- extend basic method behavior
- or even completely overriding a method - depending on a specific condition (for example: doing something like caching various responses)

nest g interceptor common/interceptors/wrap-response

## Handling TimeOuts With Interceptors

Extender la funcionalidad aplicando RxJS operators al response stream
Por ejemplo para manejar timeouts de los endpoints.

## Creating Custom Pipes

Transformation: where we transform input data to the desired output
& validation: where we evaluate input data and if valid, simply pass it through unchanged. If the data is NOT valid - we want to throw an exception.
In both cases, pipes operate on the arguments being processed by a controller’s route handler. 

NestJS triggers a pipe just before a method is invoked.

```nest g pipe common/pipes/parse-int
```

## Add Request Logging with Middleware

Middleware functions have access to the request and response objects, and are not specifically tied to any method, but rather to a specified route PATH.

executing code
making changes to the request and the response objects.
ending the request-response cycle.
Or even calling the next middleware function in the call stack.
When working with middleware, if the current middleware function does not END the request-response cycle, it must call the next() method, which passes control to the next middleware function.

Otherwise, the request will be left hanging - and never complete

```nest g middleware common/middleware/logging
```

## Create Custom Param Decorators

