# Creando una aplicación AngularJS 1.X

### Modularización, componentización, estructura y  buenas prácticas en aplicaciones AngularJS 1.X

El siguiente tutorial es una guía práctica de creación de aplicaciones AngularJS 1.X que fomenta el uso de buenas prácticas de desarrollo y generar código menos propenso a errores, que permite una detección y corrección de errores más rápida y que es de fácil migración a Angular 2.

Éste tutorial también ha sido creado pensando en equipos que estén desarrollando aplicaciones AngularJS 1.X que no siguen éstas prácticas, para que puedan utilizarlo como guía en sus desarrollos actuales y futuras refactorizaciones.

## Indice

1. [Componentes AngularJS](#componentes)
1. [Modularización de código Javascript](#js-modules)
1. [Arquitectura modular y estructura de carpetas](#ng-modules)
1. [Router y Navegación. Gestión del flujo en el cliente](#router)
1. [Herramientas](#tools)


***

***



<a name="componentes" id="componentes"/>
## Componentes AngularJS

Es recomendable desarrollar las aplicaciones AngularJS como una **jerarquía de componentes**, siendo cada componente una parte aislada de la aplicación, responsable de su propia interfaz de usuario.

Los componentes son un tipo especial de directivas con una configuración sencilla ( **template + controller** ) en el que la vista y su lógica asociada forman un único bloque de construcción de una interfaz visual de un modo similar al uso de Web Components o aplicaciones Angular 2.

Los componentes **no acceden al `$scope`** (compartir datos de ésta manera no permite conocer el origen de los datos) y van a obtener todos sus datos de entrada via atributos desde el template de su componente padre y proporciona todos sus datos de salida mediantes callbacks definidos en el componente padre y pasados al hijo también como atributos en el template del padre, por lo tanto se recomienda **evitar el uso de `$scope` y `$watch`**.

Los componentes tienen un **ciclo de vida** en el que se ejecutan los siguientes eventos `$onInit`, `$onChanges`, `$postLink` and `$onDestroy`.

Puedes saber más sobre componentes en la [documentación oficial de AngularJS](https://docs.angularjs.org/guide/component)


***

### Creando un componente

Para poder crear un componente y verlo en acción necesitamos primero **la aplicacion AngularJS más sencilla del mundo**, para ello:

Clona este repositorio con el comando:

```
git clone https://aqdes-stash.cm.es/stash/scm/aicli/ng1-best-practices-app.git
```

Posiciónate en la rama *0-most-basic* con el comando:

```
git checkout 0-most-basic
```

Podemos arrancar la aplicación con el comando:

```
npm start
```

La estructura de ésta aplicación es la siguiente:

```javascript
src/
├── app/
│   └── app.module.js // Módulo raiz de la aplicación.
├── index.html  // Importa angularJS y evalúa una expresión AngularJS
└── main.js     // Hace bootstrap con el módulo principal de la aplicación.
```

> #### ES6 (ES2015)
> A partir de ahora vamos a utilizar sintaxis **ES6 (ES2015)** en nuestro código por lo que si tu aplicación no es compatible con las carácteristas básicas de éste standard como `class`, `const`, `let`, **funciones flecha** o **destructuración**, para poder seguir ejecutando nuestra aplicación te recomendamos seguir la [guia de instalación de Babel](#babel-install).  

> #### TypeScript y Angular 2
> Aunque nosotros hemos elegido ES2015/ES6 como lenguaje para éste tutorial por simplicidad en la configuración, el equipo de Angular 2 ha elegido TypeScript, un lenguaje que compila en JavaScript, para el desarrollo de aplicaciones con Angular 2.
> Puedes utilizar Typescript para tus desarrollos con Angular 1.X y aunque se pueden escribir aplicaciones Angular 2 en JavaScript, las futuras migraciones a Angular 2 serán más sencillas con Typescript.  
Si quieres saber más sobre la migración de tu código JavaScript a TypeScript en la [guía de migración oficial de Angular 1 a Angular 2](https://angular.io/docs/ts/latest/guide/upgrade.html#!#migrating-to-typescript) se hace referencia.

#### Controlador

Previamente a la creación del componente principal de la aplicación, vamos a crear la lógica del mismo con `angular.controller` en el fichero `app/app.controller.js`.

```javascript
// src/app/app.controller.js
class AppComponentController {
  constructor (){
    this.title = 'Componente Raíz';
  }
}

angular
  .module('app')
  .controller('AppComponentController', AppComponentController);
```

#### Componente

Ya podemos crear nuestro primer componente AngularJS con el método `angular.component()` que será el **componente raiz** del árbol de componentes que forman toda la aplicación y lo vamos a crear en el fichero `app/app.component.js`

> ####¿No tienes Angular 1.5+?
EL método `angular.component()` **sólo está disponible a partir de la versión 1.5 de AngularJS**, si te has quedado en una versión de AngularJS es menor que 1.5 y mayor que 1.3, puedes utilizar el polyfill [angular-component](https://github.com/toddmotto/angular-component) de [Todd Motto](https://toddmotto.com/) y podrás utilizarlo.

>En la rama `demo-polyfill-component` de éste tutorial tienes una versión funcional de la aplicación que estamos construyendo con la versión 1.3 de AngularJS  utilizando el mismo código ES6/ES2015

```javascript
// src/app/app.component.js
const controller = 'AppComponentController';

const AppComponent = {
  controller,
  template: `
    <header>Mi primera aplicación AngularJS con componentes!</header>
    <div class='main'>
      ¡El componente {{$ctrl.title}} está funcionando!</br>
      Pero falta algo de estilo....
    </div>
    <footer>© 2016 Bankia, S.A. Todos los derechos reservados.</footer>
  `
};

angular
  .module('app')
  .component('bkApp', AppComponent);

```

Como habrás observado hemos utilizado el [destructurado de objetos](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment) que nos ofrece ES6/2015 para asignar la propiedad `controller` de nuestro componente con el fin de separar en la cabecera de nuestra aplicación las dependencias externas del fichero (luego podrá cambiarse por un [`import`](#import-controller)).

Ya podemos utilizar la etiqueta `<bk-app>` en `index.html`. No olvides importar `app/app.controller.js` y `app/app.component.js` en los scripts de `index.html`:

```diff
<!-- src/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Most Basic AngularJS App</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
-    <div class="">
-      1 + 2 = {{ 1 + 2 }}
-    </div>
+    <bk-app></bk-app>

    <script src="node_modules/angular/angular.js"></script>

    <script src="app/app.module.js"></script>
+    <script src="app/app.controller.js"></script>
+    <script src="app/app.component.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

Aunque el template no es excesivamente grande, para tener todos los ficheros que generalmente van a formar un componente vamos a separar el template del componente en su propio fichero `app.component.html` que vamos a referenciar asignando **la ruta absoluta desde `/app`** con la propiedad `templateUrl`

```diff
// app.component.js
const controller = 'AppComponentController';

const AppComponent = {
  controller,
-  template: `
-    <header>Mi primera aplicación AngularJS con componentes!</header>
-    <div class='main'>
-      ¡El componente {{$ctrl.title}} está funcionando!</br>
-      Pero falta algo de estilo....
-    </div>
-    <footer>© 2016 Bankia, S.A. Todos los derechos reservados.</footer>
-  `
+  templateUrl: 'app/app.component.html'
};

angular
  .module('app')
  .component('bkApp', AppComponent);

```

Vuelve a visitar [http://localhost:3000](http://localhost:3000) para ver tu primer componente funcionando.

#### CSS

Como te habrás fijado nuestra aplicación necesita un poco de color, así que vamos a crear su hoja de estilos en el fichero `app.component.css` que importaremos en `index.html` con la etiqueta:

```diff
<!-- src/index.html -->
...
<head>
  ... <!-- otros contenido de head -->
+  <link rel="stylesheet" type="text/css" href="app/app.component.css">
</head>
...
```

Y tendrá es siguiente contenido:

```css
/* src/app/app.component.css */
body {
  margin: 0;
}

bk-app {
  min-height: 100vh;
}

bk-app,
bk-app > .main {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

bk-app > .main {
  padding: 15px 16px 0 15px;
  flex: 1;
}

header {
  background: white;
  border-bottom: 1px solid #DDD;
  color: #B9C800;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bolder;
  height: 50px;
  padding: 16px 15px 0 15px;
}

footer {
  background: white;
  border-top: 10px solid #B9C800;
  color: #444;
  font-size: 14px;
  font-weight:normal;
  min-height: 50px;
  line-height: 20px;
  padding: 15px 16px 0px 16px;
  text-align: center;
}
```

> Tienes la aplicación con el código correspondiente a éste punto del tutorial en la rama `1-app-component` de éste repositorio.

***

### Tipos de componentes
Será mucho más fácil reutilizar y clasificar tus componentes si los dividimos en tres tipos de componentes según la función que desempeñan en una aplicación Angular; contenedores (listos), de presentación (tontos) y de navegación.

#### Componentes *Listos* (smart/container)
- Contienen la lógica de negocio de la aplicación y los datos que pasan como atributo a los componentes *tontos* o a otros componentes *listos*.
- Gestionan su estado, normalmente comunicándose con el backend mediante un servicio, por lo que también implementan la lógica asíncrona que acompaña a éstas llamadas.
- Apenas contienen elementos del DOM propios más que algunos `div` ni tampoco CSS.
- No son muy reutilizables porque no tienen mucho sentido fuera del contexto de la aplicación.


#### Componentes *Tontos* (dumb/presentational)
La mayoría de componentes son *tontos* o *de presentación*, y se caracterizan por:

- Son los que contienen la parte visual de la aplicación (UI).
- No tienen estado propio (si lo tienen es un estado visual más que de datos).
- Tienen datos de entrada (`<`) y salida (`&`) definidos con la propiedad `bindings: {}` como si definieran su propio *API*.
- Contienen elementos del DOM y CSS.
- **Altamente reutilizable** y fáciles de hacer tests acercándose al standard de [Web Components](http://webcomponents.org).

En ésta imagen se puede ver la relación entre los componentes *listos* (*smart*) y los *tontos* (*dumb*)  
![DumbSmartComponents](https://teropa.info/images/data_down_actions_up.png)

#### Componentes de navegación

- Componentes *listos* con definiciones de rutas.
- Definen su propia lógica de ruteo.
- El input del componente `bindings: { datoEntrada: '<'}` se resuelve con la propiedad [`resolve`](https://ui-router.github.io/docs/latest/interfaces/ng1.ng1statedeclaration.html#resolve) de la declaración del estado de ruteo.


### Componentes vs Directivas

Cuando usar componentes:

  - Cuando queremos añadir lógica a sociada a una vista, es decir, cuando se necesita un template con un controlador. Las directivas no deberían declarar templates ni controladores o recibir datos con bindings.

Cuando usar directivas

  - Cuando se quiere añadir lógica a elementos ya existentes.
  - Operaciones propias de las funciones *compile* y *link* no disponibles en los componentes, como:
    - Manipulación del DOM
    - Añadir event listeners. Recuerda siempre destruir los event handlers con `$scope.on('$destroy', fn);`

  - Cuando se necesitan las opciones *priority*, *terminal* o *multi-element*
  - Cuando la directiva se aplica como atributo. Procura utilizar siempre `restrict: A` en directivas.


> #### Migración de directivas a componentes.
Si se desea migrar directivas existentes a componentes, se recomienda seguir las pautas de migración de [Tero Parivianen](http://teropa.info/blog/2015/10/18/refactoring-angular-apps-to-components.html) o la [guia de migración oficial de Angular 2](https://angular.io/docs/ts/latest/guide/upgrade.html).

### Flujo de datos unidireccional (one-way)
Para los datos de entrada de tus componentes, utiliza la sintaxis `<`  en lugar de `=`.

Para los datos de salida de tus componentes, utiliza la sintaxis `&`  en lugar de `=` para pasarle al componente funciones a modo de manejador de eventos que reciben como parámetro un objeto `$event` con los datos de salida del componente, como se indica en el siguiente código:

```javascript
// API del componente
...
bindings: {
  contact: '<',
  onSelect: '&'
},
...
// uso del componente
...
<contact
  contact="contact"
  on-select="$ctrl.goToContact($event);">
</contact>
...
```

Clona los objetos pasados por referencia en el hook `$onChanges` para no modificar la referencia del objeto en el componente padre.

Para trasladar información en los eventos de callback que definamos tenemos que simular el modelo de Angular 2 creando un objeto `EventEmitter` con el código:

```javascript
 .value('EventEmitter', payload => ({ $event: payload}))`
```

y pásalo como parámetro al ejecutar los funciones pasadas al componente como manejadores de eventos (output)

```javascript
...
this.onSelect(
  this.EventEmitter({
    todo: this.todo
  });
....
);
```

el paso de parámetros al componente hijo sería

```html
<my-component on-select="$ctrl.myFunction($event)">
...
</my-component>
```

Y la recepción de argumentos por parte de la función que reside en el controlador debe tener este formato:

```javascript
...
myFunction( {param} ) {
    ...
  }
);
```

***

***

<a name="js-modules" id="js-modules"/>
## Modularización y Empaquetado de código JavaScript
Antes de añadir más "componentes hijo" a nuestro componente raíz, vamos a tratar el problema del empaquetado de nuestro código JavaScript.

Como habrás observado en `index.html` hemos tenido que añadir una etiqueta `<script>` por cada uno de los ficheros `.js` que conforman nuestra aplicación, lo que significa que al añadir más componentes con sus correspondientes ficheros `.js` tendremos que añadir todavía más etiquetas `<scrript>` llegando a tener cientos de ellas.

El tener muchas etiquetas `<script>`, además de aumentar el tiempo de carga de nuestra aplicación ([que se solucionará con el uso de HTTP/2](https://blog.newrelic.com/2016/02/09/http2-best-practices-web-performance/)), implica la aparición de los siguientes problemas:

 - Posibles conflictos entre variables globales declaradas en los distintos ficheros.
 - Errores de dependencia si los scripts no se cargan en orden.
 - Acumulación de código inútil que no se utilizan en la aplicación.

#### Módulos JavaScript. ES6/ES2015.

 ES6 (ES2015) incluye módulos en su [especificación](http://www.ecma-international.org/ecma-262/6.0/#sec-modules) que nos permite, utilizando las instrucciones [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#See_also) y [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), declarar las dependencias de un fichero y exportar funciones, objetos y primitivas  hacia otros ficheros de la forma:

```javascript
// src/app/app.module.js
import { AppComponent } from './app.component.js'

angular.module('app', [])

export class AppModule {};
```

 Por desgracia todavía [no están implementados en todos los navegadores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Browser_compatibility) por lo tanto, para poder utilizarlos tenemos que recurrir a herramientas externas que compilan nuestro código en un formato no-nativo produciendo **un solo fichero .js** que podemos importar en nuestro `index.html`. Las herramientas de empaquetado de módulos más populares son browserify, webpack, jspm y Rollup.
En nuestro tutorial vamos a utilizar Webpack, puedes obtener más información sobre las razones y su instalación en la [guía de instalación de Webpack](#webpack-install).

> #### ¿No puedes refactorizar todo tu codigo con import/export?
> Para los equipos que ya tienen gran cantidad de código y añadir import/export les supondría un esfuerzo demasiado grande, la solución más adoptada es la **concatenación** de ficheros `.js` mediante una tarea automática. Las más populares son:
>
> - [gulp-concat](https://www.npmjs.com/package/gulp-concat)
> - [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)

***

### Modularizando el código de nuestra aplicación
El primer componente que vamos a modularizar es el fichero que contiene la lógica del controlador (`app.controller.js`) para poder referenciarlo desde `app.component.js`.

```diff
//src/app/app.controller.js
class AppComponentController {
 constructor() {
   this.title = 'AppComponent';
 }
}
- angular
-      .module('app')
-      .controller('AppComponentController', AppComponentController);
+ export default AppComponentController;
```diff

Ya no hace falta que declaremos el controlador (lo mismo con los componentes, servicios, directivas ...) ni que conozcamos el nombre del módulo al que pertenece el controlador (`app`) porque en el fichero de definición del módulo (`app.module.js`) vamos a centralizar todas éstas declaraciones como veremos en los siguientes pasos.

<a name="import-controller" id="import-controller"></a>
Ahora podemos referenciar al controlador que hemos exportado desde `app.component.js` y crear en éste fichero el objeto que define nuestro componente para exportarlo.

```diff
// src/app/app.component.js
- const controller = 'AppComponentController';
+ import controller from './app.controller';

const AppComponent = {
  controller,
  templateUrl: 'app/app.component.html'
};

- angular
-    .module('app')
-    .component('bkApp', AppComponent);
+ export default AppComponent;
```

Ya podemos importar el objeto que define el componente `bkApp` desde `app.module.js` y así tener centralizado en éste fichero la declaración del módulo, sus dependencias y los componentes que utiliza.

Además, como este es el módulo raiz de nuestra aplicación, incluiremos las dependencias externas de nuestra aplicación como es `angular` en nuestro caso.

```diff
// src/app/app.module.js
+ import angular from 'angular';
+ import AppComponent from './app.component';

- angular
-    .module('app', []);
+ const AppModule = angular
+   .module('app', [])
+   .component('bkApp', AppComponent)
+   .name;

+ export default AppModule;
```

No te asustes por esta refactorización que hemos realizado, el tener en un único fichero (`app.module.js`) todas las declaraciones de todos los miembros del módulo nos permite:

 - Que no tengas que cambiar el nombre del módulo en todos los miembros en caso de cambiarlo.
 - Saber todos los miembros de un módulo simplemente mirando el fichero de declaración del módulo.

**Ya casi hemos terminado**,  sólamente tenemos que importar el módulo base en el fichero `main.js` que es el punto de entrada de nuestra aplicación y donde se hace el bootstrapping de la aplicación utilizando el módulo raiz.

```diff
// src/main.js
+ import AppModule from './app/app.module';

- angular.bootstrap(document, ['app']);
+ angular.bootstrap(document, [AppModule]);
```

Y ya podemos eliminar todas las etiquetas `<script>` de `index.html`. La herramienta de empaquetado (Webpack en nuestro caso) va a concatenar en un solo fichero (`main.bundle.js`) todo nuestro código comenzando por `main.js` y siguiendo los `import` que hayamos declarado.

```diff
<!-- src/index.html -->
...
<body>
    <bk-app></bk-app>

-    <script src="node_modules/angular/angular.js"></script>

-    <script src="app/app.module.js"></script>
-    <script src="app/app.controller.js"></script>
-    <script src="app/app.component.js"></script>
-    <script src="main.js"></script>
+    <script src="main.bundle.js"></script>
</body>
...
```

> Tienes la aplicación con el código modularizado como hemos hecho hasta  éste punto del tutorial en la rama `2-modular-code` de éste repositorio.

***

***


<a name="ng-modules" id="ng-modules"/>
## Arquitectura modular y estructura de carpetas

Crear módulos angular con el método `angular.module` nos permite organizar nuestra aplicación en bloques funcionales encapsulando componentes, servicios, directivas, templates, definición de rutas y componentes hijo dentro de un mismo módulo AngularJS.

Estructurar los ficheros de nuestra aplicación siguiendo una estructura modular nos permite *localizar rápidamente el código de nuestra aplicación* con un simple vistazo al árbol de directorios.

*Estructurar la aplicación por funcionalidad* nos permite:

  -	 Conocer qué hace nuestra aplicación con sólo echarle un vistazo al árbol de directorios
  -	 Localizar fragmentos de código rápidamente.
  -	 Separar fragmentos de nuestra aplicación fácilmente.

Los directorios más cercanos a la raíz corresponden con **las principales funcionalidades de la aplicacion que corresponeden con un módulo angular** completamente autonomo que podamos fácilmente separar del resto de la aplicación sin apenas esfuerzo.

En el fichero que define un módulo podemos encontrar:

  -	 Todas sus dependencias
  -  Las declaraciones de los miembros que pertenecen al módulo (componentes, servicios ...)
  -	 Su configuracion ( `module.config`, `module.run` )
  -	 Su configuracion de rutas y navegacion

Los módulos tendrán **submodulos** que seguirán la misma estructura y convenciones que se acaban de presentar en esta sección, pudiendo tener varios niveles, pero intentando mantener el **árbol de directorios lo más plano posible**, pudiendo dividir un modulo en dos para así no aumentar la profundidad del árbol.

### Módulo raiz
El módulo raiz de nuestra aplicación es el que contiene el componente raiz que es la base sobre la que se construye el resto de la aplicación.
En nuestra aplicación de ejemplo el módulo raiz es el módulo `app` que está definido en el fichero `app.module.js`.

El módulo raiz **no define lógica de negocio**, ya que sirve fundamentalmente como punto de entrada y contenedor de las demás dependencias de la aplicación.

El módulo raiz es el que define las rutas de navegación de entrada a la aplicación y configuración general de Angular como `debugEnabled` y no suele declarar más componentes que el raiz ni Servicios.

### Módulo de recursos compartidos  (shared)
En éste módulo que no corresponde con una funcionalidad, es donde agrupamos el código reutilizable por varias funcionalidades de nuestra aplicación como Componentes genéricos, Servicios básicos y utilidades.


### Árbol de directorios
Siguiendo las pautas citadas, el árbol directorios quedaría de la siguiente forma:


```javascript
src/
├── app/
│   ├── cards/
│   │   ├── cards-list.componet.js
│   │   ├── cards-list.controller.js
│   │   ├── cards-list.componet.html
│   │   ├── cards-main-view.html
│   │   ├── cards.module.css
│   │   ├── cards.module.js
│   │   ├── cards.routes.js
│   │   ├── cards.service.js
│   │   ├── card-details/
│   │   │   ├── cards-details-edit.html
│   │   │   ├── cards-details-info.html
│   │   │   ├── cards-details.html
│   │   ├── search-card/
│   │   │   ├── search-card.component.html
│   │   │   ├── search-card.component.js
│   │   │   ├── search-card.service.js
│   │   │   └── search-card.module.js
│   │   ├── single-card/
│   │   │   ├── card.component.html
│   │   │   ├── card.component.js
│   │   │   ├── card.controller.js
│   ├── login/
│   │   ├── login.component.js
│   │   ├── login.service.js
│   │   ├── login.component.html
│   │   ├── login.component.css
│   │   └── login.module.js
│   ├── shared/
│   │   ├── navigation/
|   |   |   ├── navbar.component.js
|   |   |   ├── navbar.component.html
|   |   |   ├── navbar.component.css
|   |   |   ├── navbar.service.js
|   |   |   └── navigation.module.js
│   │   ├── banner.component.js
│   │   ├── validation.directive.js
│   │   ├── offline.service.js
│   │   └── shared.module.js
│   ├── app.component.js
│   ├── app.component.html
│   ├── app.component.css
│   └── app.module.js
├── main.js
└── index.html
```

***

### Añadiendo módulos a nuestra aplicación

Los módulos deberian comprender componentes, servicios o values con unas funcionalidades comunes.
Por ejemplo crearemos un módulo Cards que tenga un par de componentes y un servicio relacionados:

```javascript
import angular from 'angular';

import SearchCardModule from './search-card/search-card.module';
import CardsListComponent from './cards-list.component';
import CardComponent from './single-card/card.component';
import CardsService from './cards.service';


const CardModule = angular
  .module('cards', [SearchCardModule])
  .component('bkCard', CardComponent)
  .component('bkCardsList', CardsListComponent)
  .service('CardsService', CardsService)
  .name;


export default CardModule;
```

Como se observa en la declaración del módulo 'cards', dicho módulo tiene también una dependencia de otro módulo llamado SearchCardModule en el momento de ser importado:

```javascript
import SearchCardModule from './search-card/search-card.module';
```

De esta manera se irán añadiendo dependencias al módulo raiz.

```javascript
...
const AppModule = angular
  .module('app', [LoginModule, CardsModule, uiRouter])
 ...
```

Una vez añadidas, tendremos acceso en nuestros controladores y plantillas html a los servicios y componentes declarados previamente en ellos. Para ello tendremos que manejar el proceso de inyección:

```javascript
class CardsListController {
    constructor(CardsService, UserSrv) {
        this.title = 'Grandes inventores de la historia';
        this.UserSrv = UserSrv;
        this.user = this.UserSrv.getUser();
        this.noResults = true;

        CardsService.getAllInventors()
            .then((response) => {
                this.inventors = response.inventors;
            }, (error) => {
                console.log('error', error);
            });
    }

    cardChanged(card) {
        console.log('function called from card function "toggleSelection" ', card);
        console.log('this.title', this.title);
    }
}

CardsListController.$inject = ['CardsService', 'UserSrv'];

export default CardsListController;
```

Tanto CardsService como UserSrv son inyectados en el controlador CardsListController a través de argumentos que se pasan en la función 'constructor' y añadiendo al final del código la sentencia:

```javascript
CardsListController.$inject = ['CardsService', 'UserSrv'];
```

De esta manera evitamos que en el proceso de minificación llevado a cabo por Webpack sustituya los alias CardsService y UserSrv por variables genéricas.

***

***

<a name="router" id="router"/>
## Router y Navegación. Gestión del flujo en el cliente.

[UI-Router para Angular 1](https://ui-router.github.io/ng1/) habilita la navegación de una vista a otra en respuesta a acciones del usuario.

### Introducción

 UI-Router proporciona navegación basada en **estados** y que se definen en uno o varios archivos de configuración donde dichos estados son definidos y enriquecidos.

  - Modularización
  - Vista (UI)
  - URL (opcional)
  - Datos precargados
  - Otros prerrequisitos (p. ej. estar autenticado)


#### Modularización
Los componentes navegables deben disponer a su vez de su propio archivo myComponet-routes.js que customice sus propios estados.

Pese a que las url son relativas y se van anidando,  en los estados hay de definir cual es su estado padre para armar esta jerarquía, lo que impide modularizar nuestros componentes (ya que no sabemos a priori que otro componente o app nos va consumir).

La alternativa a seguir es definir todos los estados como estados hermanos (no anidados) y que solo existe jerarquía dentro del enrutado de los propios componentes. Es decir, si tenemos un componente bk-cards, el estado principal de este componente se llamará 'bk-cards' pese a que tal vez este componente dentro de la aplicación se encuentre contenido a nivel estructural dentro de otra sección principal o incluso dentro de otro componente.

> #### * Tip!
En nuestro caso es muy importante la nomeclatura de dichos estados. Al ser estados hermanos, si estos son definidos con el mismo alias, la aplicación fallará al no saber cual es el estado real que resolver.

#### Vista
La vista (UI) que define un estado está formado por una o varias `views` que se cargarán (dentro de etiquetas `<ui-view>`) cuando el estado se encuentre activo.

#### URL
[UI-Router](https://ui-router.github.io/ng1/) es capaz de interpretar una **URL** introducida en la barra de navegación como una instrucción para navegar hacia un estado de nuestra aplicación y darle unos datos de entrada, cargando en pantalla vista asociada al estado.
Además [UI-Router](https://ui-router.github.io/ng1/) es capaz de actualizar la URL del navegador con la del estado activo mientras el usuario navega por nuestra aplicación SPA.
Los estados determinan **una porción de la url** que se concatena a la url que determina su *estado padre* cuando el estado está activo (no ocurre así con el nombre de los estados)

#### Parámetros
Podemos enviar parámetros a un estado de tres formas:

- **Path** de la url: p. ej. `http://bankia.com/contratos/123` (parámetro 123)
- **Query string** de la url: p. ej. `http://bankia.com/contratos?idContrato=123`
- **Programaticamente**: No se refleja en la url.


#### Datos precargados
A veces un estado necesita tener disponible ciertos datos (p. ej. llamada a API) precargados para poder funcionar. La función `resolve`de [UI-Router](https://ui-router.github.io/ng1/)  nos permite ejecutar una llamada para recuperar datos. Si esta llamada no es satisfactorio se podrá capturar el error y no dejar el flujo de la aplicación en un estado inconsistente.

#### Otros prerrequisitos
La función  `resolve` también puede servir para definir el flujo de la navegación dependiendo de cierta información que obtengamos. Un ejemplo claro podría ser el login en cierta app.
En la función resolve de un estado se podría llamar a un servicio que nos dijera si estamos autenticados o no y actuar en consecuencia con una u otra redirección.


***

#### Preparando nuestra aplicación

Lo primero que vamos a hacer es añadir en el `<head>` de su `index.html` una etiqueta `<base>` en la que indicamos al router como construir las urls de nuestra aplicación.

```html
...
<head>
  <base href="/">
  ...
</head>
...
```

Instalando ui-router

```
npm install --save angular-ui-router
```

// TODO: añadir ui-router a nuestra aplicación.


***

***

<a name="tools" id="tools"/>
## Herramientas

### Babel
[Babel](https://babeljs.io/) es básicamente un compilador de ES6 (ES2015) a ES5, que permite ejecutar código Javascript que utiliza características de ES6 en navegadores que no soportan éstas caracteríasticas.

> Puedes conocer qué características de ES6 soportan los distintos navegadores visitando la [Tabla de Compatibilidades de ECMAScript6](http://kangax.github.io/compat-table/es6/)

#### Instalación de Babel<a name="babel-install" id="babel-install"></a>

Ejecuta desde la raíz de tu proyecto el comando:

```
npm install --save-dev babel-cli babel-preset-es2015
```

Añade la propiedad `"babel"` en tu package.json con la siguiente configuración de Babel

```javascript
// package.json
...
"babel": {
  "presets": ["es2015"]
}
...
```

Añade las tareas de compilación de Babel en la propiedad `"scripts"` de tu package json, para que babel compile nuestro código fuente en el directorio `src-compiled`

```javascript
// package.json
...
"babel": "babel src --out-dir src-compiled",
"babel:w": "babel src --out-dir src-compiled --watch",
...
```

Como Babel sólamente nos va a copiar en `src-compiled` los ficheros `.js` que ha compilado necesitamos una tarea que llamaremos `copy` que copiará el resto de ficheros a ésta carpeta, para ello utilizaremos el módulo [`cpy-cli`](https://www.npmjs.com/package/cpy-cli) que puedes instalar con el comando `npm install --save-dev cpy-cli` para copiar los ficheros y para ejecutar la misma tarea cada vez que cambie el código fuente, vamos a utilizar el módulo [`npm-watch`](https://www.npmjs.com/package/npm-watch) que puedes instalar con el comando `npm install --save-dev npm-watch` que define las tareas a ejecutar y los ficheros a observar en la propiedad `watch` de nuestro `package.json`.
> Aunque babel dispone de la opción --copy-files que realiza ésta tarea de copiado de fichero que no son `.js` preferimos separar las responsabilidades de cada herramienta para no depender en exceso de ninguna de ellas (p. ej. si nuestro navegador es compatible con ES6/ES2015 y queremos deshacernos de Babel).

```javascript
// package.json
{
  ...
  "scripts": {
    ...
    "copy": "cpy \"./**/*.*\" \"!./**/*.js\" \"../src-compiled\" --cwd=src --parents",
    "watch": "npm-watch",
    ...
  },
  "watch": {
    "copy": {
      "patterns": ["src"],
      "extensions": "html,css"
    }
  },
  ...
}
...

...
```

También vamos a crear una tarea `clean` que borrará la carpeta `scr-compiled` para asegurarnos que en la carpeta `scr-compiled` no se ha acumulado basura cada vez que arrancamos nuestro servidor de desarrollo. Para borrar vamos a utilizar el módulo [`rimraf`](https://www.npmjs.com/package/rimraf) que podemos instalar con el comando `npm install rimraf --save-dev`

```javascript
// package.json
...
"clean": "rimraf src-compiled",
...
```

También vamos a modificar la tarea `start` para que se ejecute la compilación ( `compile`, `compile:w` ) cada vez que actualizamos nuestro código. Las dos tareas de compilación las vamos a unir en una sola tarea llamada `compile`(`compile:w`) para organizar mejor nuestras tareas:

```javascript
// package.json
...
"start": "npm run clean && npm run compile && concurrently \"npm run compile:w\" \"lite-server\"",
"compile": "concurrently \"npm run babel\" \"npm run copy\"",
"compile:w": "concurrently \"npm run babel:w\" \"npm run watch\"",
...
```

>Como habrás observado en el comando anterior hemos utilizado [`concurrently`]('../../modules/es6.string.iterator') para ejecutar dos tareas a la vez. Puedes instalar ésta herramienta ejecutando el comando `npm install --save-dev concurrently`.

Finalmente tendremos que modificar el fichero de configuración de nuestro servidor local (`bs-config.json`) para que sirva los ficheros de la carpeta `src-compiled` (propiedad `"baseDir"` de `"server"`) y observe los cambios para republicar si cambian (propiedad `"files"`)

```diff
// bs-config.json
{
+ "files": "./src-compiled",
  "server": {
+   "baseDir": "./src-compiled",
    "routes": {
      "/node_modules": "node_modules"
    }
   }
}

Ya está configurado Babel, vuelve a ejecutar el comando `npm start` para arrancar nuestra aplicación con Babel configurado.
```

### Webpack
<a name="webpack-install" id="webpack-install"></a>
En este tutorial hemos elegido Webpack como empaquetador de módulos JavaScript por características como soporte de [reemplazo de módulos en caliente](https://webpack.github.io/docs/hot-module-replacement.html), la capacidad de [generación de múltiples ficheros](https://webpack.github.io/docs/code-splitting.html), su gran adopción entre los desarrolladores y las buenas espectativas de su versión 2 con mejora en rendimiento y [nuevas características](https://webpack.github.io/docs/roadmap.html) como Tree Shaking.

#### Instalación de Webpack

Instala Webpack con el comando:

```
npm install webpack --save-dev
```

Vamos a crear unas tareas para el empaquetado de nuestros módulos javascript que llamaremos `bundle` y `bundle:w` y las vamos a incluir en nuestras tareas de compilación (`compile` y `compile:w`) para incluir Webpack en el flujo de tareas.

```javascript
// package.json dentro de la propiedad scripts.
...
- "compile": "concurrently \"npm run babel\" \"npm run copy\"",
- "compile:w": "concurrently \"npm run babel:w\" \"npm run watch\"",
+ "compile": "concurrently \"npm run babel\" \"npm run copy\" && npm run bundle",
+ "compile:w": "concurrently \"npm run babel:w\" \"npm run watch\" \"npm run bundle:w\"",
+ "bundle": "webpack ./src-compiled/main.js ./src-compiled/main.bundle.js",
+ "bundle:w": "webpack ./src-compiled/main.js ./src-compiled/main.bundle.js --watch",
...
```

Para mejorar la eficiencia de la detección de cambios de nuestro servidor local, podemos configurarlo para que el único fichero Javascript del cual observe los cambios sea `main.bundle.js`

```diff
{
-  "files": "./src-compiled",
+ "files": [
+   "./src-compiled/**/*.{html, css}",
+   "./src-compiled/main.bundle.js"
+ ],
  "server": {
    "baseDir": "./src-compiled",
    "routes": {
      "/node_modules": "node_modules"
    }
   }
}
```

> También se pueden sincronizar Babel y Webpack con el plugin [babel-loader](https://github.com/babel/babel-loader), que nosotros no utilizaremos por simplicidad en la configuración (habría que tener un fichero `webpack.config.js`) y para **evitar la dependencia de plugins de terceros**.
Tienes una versión de nuestra aplicación utilizando `babel-loader` en la rama `demo-babel-loader` de éste repositorio.


### AngularCSS
[AngularCss](https://github.com/castillo-io/angular-css) permite referenciar hojas de estilo desde la propia implementación del componente añadiéndole la propiedad `css`.

Las hojas de estilo se cargarán como etiquetas `<link>` en el `<head>` de nuestra aplicación tal como haría Angular2 con la siguiente [configuración de encapsulacion de estilos](https://angular.io/docs/ts/latest/guide/component-styles.html#!#view-encapsulation) de un componente:

```javascript
encapsulation: ViewEncapsulation.None
```

#### Instalación de AngularCSS
Instala las dependencias necesarias con el comando

```
npm install angular-css angular-ui-router --save-dev
```

Importa las dependencias en el módulo principal de tu aplicación

```javascript
// src/app/app.module.js
...
import angularCss from 'angular-css'
import uiRouter from 'angular-ui-router'
...

const AppModule = angular
  .module('app', [..., uiRouter, angularCss])
...
```

Añade a los componentes la propiedad `css` cuyo valor será la **_ruta absoluta_** (normalmente es donde está  `index.html`)

```javascript
// src/app/app.component.js
const AppComponent = {
  css: 'app/app.component.css',
  ...
};

export default AppComponent;
```
