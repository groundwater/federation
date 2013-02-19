# Forge Pattern

Most libraries in Federation follow the **Forge Pattern**.

The forge pattern is a dependency injection pattern that consists of three main parts.

1. the class description
2. the forge description
3. the dependency injector

## Forgeable Module

Most libraries implement this as follows:

```javascript
// The Class
function Foo(){}

// The Forge
function FooForge(app){
  // Capture Dependencies
}

// The Dependency Injector
module.exports.forge = function(app){
  return new FooForge(app);
}
```

The `app` object represents the current set of injected dependencies.
Libraries do not directly require one and other,
their _Forge_ objects are created once on start and passed around in the `app` container.

### Capture Dependencies

The Forge object captures dependencies when created:

```javascript
function FooForge(app){
  assert( this.Bar = app.Bar, 'Missing Dependency Bar' );
}
```

### Constructor Methods

The Forge object contains all of the classes constructors.
Constructors have specific names like `NewWithNameAndEmitter`;
there can be many different constructors.

```javascript
FooForge.prototype.NewWithNameAndEmitter = function(name,emitter){
  var foo = new Foo();
  foo.name    = name;
  foo.emitter = emitter;
  return foo;
}
```

The actual class is never directly exported, there are reasons for this.
The forge pattern is designed around the idea of encapsulation,
and keeping things flexible.

## App Container

You create your application by forging each module using an app-container;

```javascript
var app = {};

app.Module1 = require('./module1').forge(app);
app.Module2 = require('./module2').forge(app);
app.Module3 = require('./module3').forge(app);
app.Module4 = require('./module4').forge(app);

app.Module4.start();
```
