import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { createComponent } from './create-component';

describe('createComponent', () => {
  it('should call defineCustomElement if it is defined', () => {
    const defineCustomElement = vi.fn();

    createComponent({
      defineCustomElement,
      tagName: 'my-component',
      elementClass: class Foo {} as any,
      react: React,
      events: {},
      slots: {},
      displayName: 'MyComponent',
      tagNameTransform: false,
    });

    expect(defineCustomElement).toHaveBeenCalled();
  });
});
