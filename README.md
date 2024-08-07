# Dynamic Decorator Example

This project demonstrates how to create and use a dynamic decorator in a Node.js environment without using any external packages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Example Output](#example-output)

## Installation

To get started, clone this repository and install any necessary dependencies.

```bash
git clone https://github.com/your-username/dynamic-decorator-example.git
cd dynamic-decorator-example
npm install
```
## Usage
You can run the example by executing:

```bash
node index.js
```

## How It Works
### DynamicDecorator Class
The DynamicDecorator class is defined in DynamicDecorator.js. It takes options as a parameter and has an apply method that modifies the behavior of the target method.

```js
// DynamicDecorator.js
class DynamicDecorator {
  constructor(options) {
    this.options = options;
  }

  apply(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = (...args) => {
      console.log(`Method ${propertyKey} called with args: ${JSON.stringify(args)}`);
      console.log(`Decorator options: ${JSON.stringify(this.options)}`);

      const result = originalMethod.apply(this, args);

      console.log(`Method ${propertyKey} returned: ${result}`);
      return result;
    };

    return descriptor;
  }
}

module.exports = DynamicDecorator;
```

## Applying the Decorator
The DynamicDecorator is applied to the hello method of the Example class in index.js.

```js
// index.js
const DynamicDecorator = require('./DynamicDecorator');
class Example {
  hello(name) {
    return `Hello, ${name}!`;
  }
}
// Create an instance of the decorator
const decoratorInstance = new DynamicDecorator({ log: true });
// Manually apply the decorator
const descriptor = Object.getOwnPropertyDescriptor(Example.prototype, 'hello');
const decoratedDescriptor = decoratorInstance.apply(Example.prototype, 'hello', descriptor);
Object.defineProperty(Example.prototype, 'hello', decoratedDescriptor);

const example = new Example();
console.log(example.hello('World'));
```
## Example Output
When you run node index.js, you should see the following output:

```
Method hello called with args: ["World"]
Decorator options: {"log":true}
Method hello returned: Hello, World!
Hello, World!
```
