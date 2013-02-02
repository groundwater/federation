# Forward Routing

This example illustrates how one can design a star-topology, with a centralized router.

A **nexus-process** sits at a known address on the network,
a series of **edge-processes** connect to the nexus.

1. Edge processes do not know the address of any other edges.
2. The nexus maintains a list of routes based on connected edges.

Incoming packets are sent to the nexus, and then routed to their destination.

## Benefits

The benefits of a star topology is that only a single process needs to keep track of other processes addresses. 
Edge processes are unaware of each others location;
they message each other solely using actors and actor-names.

This is just a simple example.
The routing files are quite flexible,
and can generally be as complicated (or simple) as you desire.
