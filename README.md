# Introduction

> Federation is a federated event emitter

Federation is a messaging network built on top of Axon,
that lets any two nodes in the federation send routed messages to one and other.

# Goals

- fault tolerance
- zero-configuration setup
- minimal and familiar api

# Install

    $ npm install federation

# Usage

Federation is a peer-to-peer messaging network with no central server.

    var fed   = require('federation');
    
    var node1 = fed.node('node1');
    var node2 = fed.ndoe('node2');

Federation nodes can send and receive messages to each other.
Each node on the network exists at a fully-qualified URL.
Assume the above script is running on host `192.168.0.23`,
then `node1` and `node2` had the respective addresses:

    fed://192.168.0.23/node1
    fed://192.168.0.23/node2

## Send a Message

Nodes can message other nodes with their address:

    var message = "Hello World";
    var address = "fed://192.168.0.23/node2";
    node1.tell(address,message);

For nodes on the same host, the hostname may be omitted:

    node1.tell("/node2", message);

## Receive Messages

Incoming messages are emitted via the `message` event:

    node1.on('message',function(message){
      // handle message
    })

Optionally a node may choose to receive the message header:

    node1.on('message',function(message,header){
      // handle message
      // handle header
    })

The header contains connection details, and can be used to send a reply.

    this.tell( header.replyAddress, 'reply' );

## Receiving Replies

Nodes are stateless. All messages are fire-and-forget.

This pattern doesn't work well for serving `HTTP` requests, etc. Something needs to hang on to the incoming socket connection while the request is being processed.

Federation uses _anonymous-nodes_ for receiving replies.
Instead of using `node.tell` to send messages use `node.ask`. The method `node.ask` returns a single-purpose node that will receive any replies to the original message.

    // asking node
    node2.on('message',function(question,header){
      this.tell(header.replyAddress, 'Bob');
    })
    
    // replying node
    var anonymous_node = node1.ask('/node2','what is your name?')
    
    anonymous_node.on('message',function(name){
      console.log('Hello %s',name);
    });

# Specification

- the `fed://` protocol refers to whatever the default protocol will be, perhaps `axon://`
- any protocol can be supported via a `Protocol` interface

## Future Features

- location-independent names (DNS)
