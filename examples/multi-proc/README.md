# Multi-Process Example

Run the example using [node-foreman](https://npmjs.org/package/foreman) with `nf start`.

```
Procfile
lib.js
proc1.js    <-- first process
proc2.js    <-- second process 
routes.json <-- routes file
```

The routes file uses exact-matches for this example, but a match can be any regular expression.
The last routes all un-matched messages back to the local set of actors.

```
{
  "regex"   : ".*",
  "address" : "/local"
}
```

