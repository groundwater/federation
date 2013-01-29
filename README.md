# Introduction

Federation is an actor system for Node.js inspired by Erlang and Akka.

# Install

    $ npm install federation

# Usage

Federation nodes can send and receive messages to each other.

    var router = require('federation').router;
    
    var node1  = router.createNode('node1');
    var node2  = router.createNode('node2');

## Send a Message

Every node exists at a URL, and can be messaged at that URL.
For nodes on the same host, the host and protocol can be omitted.

    var message = "Hello World";
    var address = "/node2";
    node1.tell(address,message);

Federation can also send nodes across the network:

    var address = "axon://192.168.0.12/node2";
    var message = "Hello from 192.168.0.9";
    node1.tell(address,message);

## Receive Messages

Each node can be assigned a single `receive` function,
which will be called whenever the node receives a message.

    node1.receive = function(message){
      // handle message
    }

## Request/Reply Pattern

Nodes can reply contextually using the `ask` method.

    node1
    .ask('/node2','How old are you?')
    .receive(function(msg){
      console.log('Got Reply',msg);
    });

The request/reply pattern uses anonymous nodes,
i.e. one-time actors.
Anonymous nodes have a default timeout of 5000,
after which an error will be triggered.
You can respond to the error with:

    node1.ask('/nod2','How old are you?')
    .receive(function(msg){
      // handle reply
    })
    .error(function(err){
      // handle error
    })

