
# Introducing Jest

Jest hace primero los test que fallaron

Se pueden hacer Unit Tests y e2e Tests.

```
// For unit tests
npm run test 

// For unit tests + collecting testing coverage
npm run test:cov

// For e2e tests
npm run test:e2e
```


# Getting Starte with Test Suites

Unit Tests
For unit tests In NestJS, it’s a common practice to keep the spec files in the same folder as the application source code files that they test. 

Each controller, provider, service, etc. should have its own dedicated test file. The test file extension must be (dot).spec.ts (this is so that integrated test tooling can identify it as a test file with test suites).

End-to-End (e2e) Tests
For e2e tests, these files are typically located in a dedicated `test` directory by default. e2e tests are typically grouped into separate files by the feature or functionality that they test. The file extension must be (dot).e2e-spec.ts. 

How are they different?
While unit tests focus on individual classes and functions…

e2e tests are great for high-level validation of the entire system. e2e testing covers the interaction of classes and modules at a more aggregate level -- closer to the kind of interaction that end-users will have with the production system. 

---

- Dentro del archivo.spec.ts, la funcion `describe` define un bloque que agrupa diferentes test.
- La funcion `beforeEach`que se ejecuta antes de cada test, es el "Setup Phase". Otras opciones son `beforeAll`,`afterEach`, `afterAll`:

- La clase Test se usa para dar un contexto de ejecucion que mockea un full Nest runtime. La clase test tiene el metodo `createTestingModule`, que coge la metadata de un modulo como argumento.

- Luego encadena con el metodo `compile()` que arranca el modulo con sus dependencias, similar al bootstrap de el main.ts con el NestFactory.create(). Este metodo nos devuelve un testing module instance (TestingModule). Una vez que está compilado se puede recoger cualqueir static instance declarada en el modulo usando el metodo `get` (module.get)

- La funcion `it` representa un Individual Test

## Ejecutar el test

```
npm run test:watch -- coffees.service
```


# Adding Unit Test

Para testear un metodo mira que tien que cubrir, n el findOne del coffee de cubrir si esta o no el coffee
Por eso hace dos it:

```
describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {

      it('should throw NotFoundException', async () => {
```

En la primera parte espera que un valor sea igual a otro
```
expect(coffee).toEqual(expectedCoffee)

```

Da un error de que findOne no existe en el service, porque esta  el repositorio  vacio, sin metodos definidos:

```
        { provide: getRepositoryToken(Coffee), useValue: {} }
```

Entonces crear una funcion generica que return un objeto mockeado con los mismos metodso que la clase repositorio provides
y ahora reemplaza los {} con la nueva funcion



# Diving into e2e tests

Abre el D:\Usuarios\Miguel\Documentos\PROGRAMACION\Repos\Nest_course\iluvcoffee\test\app.e2e-spec.ts

Hace falta usar el createNestApplication para instanciar un nestJS runtime environment

El metodo init monta todas las rutas, hooks etc.


El primer it('/ (GET)', () ...
Simula una llamada http con la libreria supertest, con la funcion request()

Para ejecutar los test e2e:

```
npm run test:e2e
```

# Creating our first e2e test

Crea una nueva carpeta dentro de test para cada modulo, coffee

Importa sol el modulo de coffeees


mete unso scripts en el package json porque creo otra db en docker 

"pretest:e2e": "docker-compose up -d test-db",
"posttest:e2e": "docker-compose stop test-db && docker-compose rm -f test-db"

# Implementing e2e Test Logic

