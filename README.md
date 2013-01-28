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

## Receive Messages

Each node can be assigned a single `receive` function,
which will be called whenever the node receives a message.

    node1.receive = function(message){
      // handle message
    }

# TODO

- add network-level transport
- add request-reply pattern
