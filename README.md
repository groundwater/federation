 # Introduction

> Federation is a federated event emitter

Federation is a messaging network built on top of Axon,
that lets any two nodes in the federation send routed messages to one and other.

# Goals

- fault tolerance
- zero-configuration setup
- minimal and familiar api

# Install

### Running a Federation Base Server

All federations require a base server.
Base servers are zero-configuration:

    $ npm install -g federation
    $ federation start
    Federation Base Started at axon://10.0.1.1

### Joining a Federation

Once a base server is established,
modify your modules to join the federation.

    $ npm install --save federation

**server.js**

    var fed  = require('federation').join('axon://10.0.1.1');
    var node = fed.node(options);

The above `node` object is a citizen of the network,
who can send and receive messages to other nodes.

# Usage

A federation operates like an event-emitter:

    var launch_code = "12345puppy";
    node.emit('president',launch_code);

The message recipient registers to obtain the message with:

    node.on('message',function(message){
        launch_the_missiles(message);
    });

## Address Space

Every emitted message is sent to an address on the network.
Addresses look like both absolute an relative paths.

- absolute path - `//america/whitehouse/president`
- relative path - `vice-president`

Relative paths are resolved to an absolute path based on the address of the sender.

    # given the following addresses
    //canada/parliament/prime-minister <-- node A
    //canada/parliament/house-speaker  <-- node B
    
    # node A can message node B with the address `house-speaker`

## Message Handlers

Emitted messages hint their type using a hash-tag (`#`).
Nodes can choose to handle messages according to their hinted type.

    node.emit('planet-express/fry#package',package);

The receiving node will be resolved to `fry`.
Fry can catch that message with:

    node.on('#package',function(package){
        put_in_spaceship(package);
    });

Hinted messages that are not caught will be emitted as `message`.

### Anonymous Handlers

You can receive replies to your messages by specifying anonymous handlers:

    node.emit('planet-express/bender',beer).on('reply',function(money){
        // thanks for the money bender!
    });

A receiver can reply to messages by catching a reference to the sender in the handler:

    node.on('message',function(message,sender){
        sender.emit('THANK YOU');
    });

# Specification

The specification contains the technical details of the project.

- federation uses the Axon PubEmitter / SubEmitter socket
- default port: 8973

# Future Features

The following are features that _may_ be cool in a beta release,
but are not planned for the alpha.

- broadcast / multicast addresses
- multiple addresses

