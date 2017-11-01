# Summary
Awesome metadata emitter for TypeScript. Injects fake decorators in every class with additional information, to be accessed by other libraries
and utilities.

<!-- 
You can see an example of emitted metadata in this project at [src/metadata.ts](https://github.com/lilezek/awesome-metadata/blob/master/src/metadata.ts). 
-->

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

This branch is not in an usable stage. This is a mid-step for getting a better emitter without the need of having a separate `metadata.ts`
file and two compilation steps. 

# Metadatas

## Class body

You can get an schema of a class using:

```ts
Reflect.getMetadata("atm:body", AnyClass);
```