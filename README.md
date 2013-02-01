# Introduction

Federation is an actor system for Node.js inspired by Erlang and Akka.

# Install

    $ npm install federation

# Usage

Federation nodes can send and receive messages to each other.

    var director = require('federation').init().director;
    
    var actorBob = director.createActor('bob');
    var actorTom = director.createActor('tom');

## Send a Message

Every actor has a name, and can receive messages at that name.
Actors `tell` each other one-off messages:

    actorBob.tell('tom','Good Morning');

## Receive Messages

Actors receive messages by binding a callback to their `onMessage` property:

    actorTom.onMessage = function(message){
      console.log('Got Message:', message);
    }

## Request-Reply Pattern

Actors can also `ask` other actors questions that will receive replies.

    actorBob.ask('tom','Are you happy?',function(happy){
      if(happy){
        console.log('Tom is Happy');
      }else{
        console.log('Tom is Not Happy');
      }
    })

The request-reply pattern uses anonymous actors known as **extras**.
An extra has a limited life span of `5000` by default.
