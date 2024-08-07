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
