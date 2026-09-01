// Lab 6: Decorators

export function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

export function Logger(logString: string) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        console.log(`[${logString}] Instance created:`, this);
      }
    };
  };
}

export function Required(target: any, propertyKey: string) {
  let value: any;
  const getter = () => value;
  const setter = (newVal: any) => {
    if (newVal === undefined || newVal === null || newVal === '') {
      console.warn(`[Required] Property '${propertyKey}' cannot be empty`);
    }
    value = newVal;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

export function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    }
  };
  return adjDescriptor;
}

export function Catch(errorHandler?: (error: Error) => void) {
  return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (errorHandler) {
          errorHandler(error as Error);
        } else {
          console.error(`Error in method:`, error);
        }
      }
    };
    return descriptor;
  };
}
