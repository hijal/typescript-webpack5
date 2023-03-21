/**
 * Auto binding decorator
 */
export function Autobinding(_: any, _1: string, desc: PropertyDescriptor) {
  const originalMethod = desc.value;

  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };

  return adjustedDescriptor;
}
