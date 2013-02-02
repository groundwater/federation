![Awesome Picard Meme](http://i.imgur.com/T5kIkxX.jpg)

# Introduction

> Federation is a federated event emitter for distributed environments.

Federation is inspired by Akka and Erlang,
and borrows some semantics from the actor model.
While being a full-fledged actor system would be impressive,
it does not meet with the demands of most Node.js apps.
Federation prioritizes being useful to the Node.js community
over being faithful to the pure actor model.

# Install

    $ npm install federation

# Usage

Every actor has a name, and can receive messages at that name.

```javascript
var director = require('federation').init().director;
    
var actorBob = director.createActor('bob');
var actorTom = director.createActor('tom');
```

## Send a Message

Federation nodes can send and receive messages to each other.
Actors `tell` each other messages with:

```javascript
actorBob.tell('tom','Good Morning');
```

Telling a message is a fire-and-forget approach.

## Receive Messages

Actors receive messages by binding a callback to their `onMessage` property:

```javascript
actorTom.onMessage = function(message){
  console.log('Got Message:', message);
}
```

The callback will be invoked as a method, so `this` resolves to the actor object.

```javascript
actorTom.onMessage = function(message){
  this.tell('joe','Got Message!');
}
```
## Request-Reply Pattern

Actors can also `ask` other actors questions that will receive replies.

```javascript
actorBob.ask('tom','Are you happy?',function(err,happy){
  if(err) return console.log('Error Asking Tom:',err);
  if(happy){
    console.log('Tom is Happy');
  }else{
    console.log('Tom is Not Happy');
  }
});
```

The request-reply pattern uses anonymous actors known as **extras**.
An extra has a limited life span of `5000` by default.
If the timeout occurs before a reply is delivered,
a `TIMEOUT` error will be send to your callback.

# Routing

Federation supports inter-process communication,
and abstracts the details away from the programmer.

Actor names can exist on _any_ process, on _any_ host on the network.

Whenever a message packet hits the `router` object,
the router consults a routing table that matches actor names to network addresses.
The packet is then forwarded to the appropriate host and process.

- the routing table completely describes the network topology

![Routing](https://raw.github.com/jacobgroundwater/federation/assets/export/federation.png)

The [default routing table](https://github.com/jacobgroundwater/federation/blob/master/routes.json) is a decoded from a JSON file.

```json
[
  {
    "regex": "hadoop/.*",
    "address": "axon://10.0.1.12/local"
  },
  {
    "regex": "mongo/.*",
    "address": "axon://10.0.1.122/local"
  }
]
```

Incoming messages are matched in-order against the `regex` key.
The first match wins, and the packet is forwarded to the gateway at the destination address.

See the example in [Multi-Proc Example](https://github.com/jacobgroundwater/federation/tree/master/examples/multi-proc) for two-process routing table.
Routes can be the same, or different hosts.

# Todo

The todo list is maintained under the [issue tracker](https://github.com/jacobgroundwater/federation/issues?labels=enhancement&page=1&state=open)

# License

Copyright (c) 2013 Jacob Groundwater (groundwater@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
