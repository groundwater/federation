![Awesome Picard Meme](http://i.imgur.com/T5kIkxX.jpg)

# Introduction

> Federation is a federated event emitter for distributed environments.

Federation is inspired by Akka and Erlang,
and borrows some semantics from the actor model.
While there _are_ actors,
many features familiar to Akka and Erlang are not included.
Federation prioritizes being useful to the Node.js community
over being faithful to the pure actor model.

Federation considers cross-process and cross-host messaging to be the top priority. 
It has been designed to sit _above_ an application protocol like `axon` or `http`, and can be extended to any other protocol quite easily.

# Contributors

A good module evolves to meet the needs of the community.
There are many ways you can help.
Pull-requests are always welcome, but you don't have to be a programming expert to lend a hand.

1. [ask a question](https://github.com/jacobgroundwater/federation/issues/new) about using federation, your question may help others
2. [suggest an enhancement](https://github.com/jacobgroundwater/federation/issues/new), suggestions can help prioritize features
3. [tell us your success stories](https://github.com/jacobgroundwater/federation/wiki/Success-Stories), how have you used federation, and what tips do you have for others?

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

Actors have names, any name you like.
The nameing convention is up to you,
but choosing a good convention will make routing easier.

Each process has its own router and routing table.
The routing table matches actor names to URLs using regular expressions.
Once a match is found, the message is sent to the remote process.

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
