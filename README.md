# Summary
Awesome metadata emitter for TypeScript. Generates a typescript file which emits additional metadata, even though there is no decorators placed in those classes.

You can see an example of emitted metadata in this project at [src/metadata.ts](https://github.com/lilezek/awesome-metadata/blob/master/src/metadata.ts).

# Libraries using atm at the moment

* [TSON](https://github.com/lilezek/tson): This library makes automatic serialization and deseralization possible, like GSON for Java.
* [ts-mongoose-metadata](https://github.com/lilezek/ts-mongoose-metadata) Generates mongoose schemas automatically from class metadata.
* [ts-express-validator](https://github.com/lilezek/ts-express-validator) Middleware for express that automatically deserializes the body of a request,
and checks if the data is valid.

# Goals

The goal of this project is to offer metadata for all elements in TypeScript, being as simple as possible. 

## Features

* [ ] Class body schema metadata `atm:body`
  * [x] Visibility (private, protected, public, none)
  * [x] Optionality (question mark token) 
  * [x] Primitive members serialization
  * [x] Union types serialization
  * [x] Type alias serialization
  * [x] Array of generic types
  * [ ] Type literal serialization
  * [ ] Interface type serialization
* [ ] Configuration based metadata emit
  * Needs discussion.
* [ ] Interface body schema metadata 
  * Needs discussion.
* [ ] Variable and function metadata
  * Needs discussion.

# Usage

When installed using npm, this library installs a cli:

```sh
atm > metadata.ts
```

This generates a typescript file which emits metadata of everything even if it is not decorated. When included, you can access 
all the metadatas it defines.

# Metadatas

## Class body

You can get an schema of a class using:

```ts
Reflect.getMetadata("atm:body", AnyClass);
```