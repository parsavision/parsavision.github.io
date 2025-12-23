---
title: "Mastering TypeScript: Advanced Patterns and Best Practices"
date: "2024-12-18"
description: "Deep dive into advanced TypeScript patterns including generics, conditional types, and type inference that will level up your code."
category: "Programming"
tags: ["TypeScript", "JavaScript", "Programming", "Best Practices"]
featured: true
author: "Your Name"
---

TypeScript has become the go-to choice for building large-scale JavaScript applications. In this post, we'll explore advanced patterns that will help you write more maintainable and type-safe code.

## Generics: Beyond the Basics

Generics allow you to write reusable code that works with multiple types while maintaining type safety.

### Generic Constraints

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("Hello"); // ✅ Works - strings have length
logLength([1, 2, 3]); // ✅ Works - arrays have length
logLength(123); // ❌ Error - numbers don't have length
```

### Generic Factory Functions

```typescript
function createInstance<T>(
  Constructor: new () => T
): T {
  return new Constructor();
}

class User {
  name = "John";
}

const user = createInstance(User);
// user is typed as User
```

## Conditional Types

Conditional types enable type transformations based on conditions:

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// More practical example
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>;   // number
```

<Callout type="info" title="The infer Keyword">
The `infer` keyword allows you to extract and use types within conditional type expressions. It's incredibly powerful for building type utilities.
</Callout>

## Template Literal Types

TypeScript 4.1+ supports template literal types:

```typescript
type EventName = "click" | "focus" | "blur";
type Handler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

type Route = `/${string}`;
const validRoute: Route = "/users"; // ✅
const invalidRoute: Route = "users"; // ❌
```

## Discriminated Unions

Perfect for handling different states or variants:

```typescript
type Result<T> = 
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
  | { status: "loading" };

function handleResult<T>(result: Result<T>) {
  switch (result.status) {
    case "success":
      // TypeScript knows result.data exists here
      console.log(result.data);
      break;
    case "error":
      // TypeScript knows result.error exists here
      console.error(result.error.message);
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}
```

## Mapped Types

Transform existing types into new ones:

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Custom mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null }
```

<Callout type="success" title="Built-in Utility Types">
TypeScript provides many built-in utility types like `Partial`, `Required`, `Pick`, `Omit`, `Record`, and more. Learn them well!
</Callout>

## Type Guards

Create custom type guards for runtime type checking:

```typescript
interface Dog {
  breed: string;
  bark(): void;
}

interface Cat {
  breed: string;
  meow(): void;
}

// Type guard function
function isDog(pet: Dog | Cat): pet is Dog {
  return (pet as Dog).bark !== undefined;
}

function handlePet(pet: Dog | Cat) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript knows it's a Dog
  } else {
    pet.meow(); // TypeScript knows it's a Cat
  }
}
```

## The `satisfies` Operator

New in TypeScript 4.9, `satisfies` ensures a value matches a type while preserving the narrowest type:

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Colors, RGB | string>;

// palette.red is [number, number, number], not RGB | string
const redValue = palette.red[0]; // number, not (number | undefined)
```

## Best Practices

1. **Use strict mode**: Enable `strict: true` in tsconfig.json
2. **Avoid `any`**: Use `unknown` instead when type is truly unknown
3. **Prefer interfaces**: Use interfaces for object types, types for unions/intersections
4. **Use const assertions**: `as const` for immutable literal types
5. **Document complex types**: Add JSDoc comments for complex type definitions

```typescript
/** 
 * Represents a user in the system
 * @template T - Additional metadata type
 */
interface User<T = Record<string, unknown>> {
  id: string;
  name: string;
  metadata: T;
}
```

<Callout type="warning" title="Avoid Type Assertions">
Avoid using `as` type assertions unless absolutely necessary. They can hide type errors and make your code less safe.
</Callout>

## Conclusion

These advanced TypeScript patterns will help you:
- Write more reusable code with generics
- Create powerful type utilities with conditional types
- Handle complex state with discriminated unions
- Transform types with mapped types

Keep practicing these patterns, and they'll become second nature. Happy typing! 🎯
