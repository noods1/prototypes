import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { Uncontrollable } from '@src/utils/decorators/uncontrollable';
import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';

describe('uncontrollable', () => {
  describe('uncontrolled', () => {
    it('should use default value', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable></ks-test-helper-uncontrollable>,
      });

      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('Default Value');
    });

    it('should use defaultValue prop', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable defaultValue="Custom Default"></ks-test-helper-uncontrollable>,
      });

      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('Custom Default');
    });

    it('should not update mergedValue when defaultValue prop changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable defaultValue="Custom Default"></ks-test-helper-uncontrollable>,
      });
      page.rootInstance.defaultValue = 'Mock Default';
      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('Custom Default');
    });

    it('should update mergedValue and emit event', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable></ks-test-helper-uncontrollable>,
      });
      const ksChangeSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksChange', ksChangeSpy);

      page.rootInstance.mergedValue = 'New Value';
      await page.waitForChanges();

      expect(page.rootInstance.mergedValue).toBe('New Value');
      expect(ksChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'New Value' }));
    });
  });

  describe('controlled', () => {
    it('should use value prop', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Controlled Value"></ks-test-helper-uncontrollable>,
      });

      await page.waitForChanges();

      expect(page.rootInstance.mergedValue).toBe('Controlled Value');
    });

    it('should update mergedValue when value prop changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Controlled Value"></ks-test-helper-uncontrollable>,
      });
      page.rootInstance.value = 'New Controlled Value';
      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('New Controlled Value');
    });

    it('should not update mergedValue when defaultValue prop changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Controlled Value"></ks-test-helper-uncontrollable>,
      });
      page.rootInstance.defaultValue = 'Mock Default';
      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('Controlled Value');
    });

    it('should not update mergedValue internally but emit event', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Controlled Value"></ks-test-helper-uncontrollable>,
      });
      const ksChangeSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksChange', ksChangeSpy);

      page.rootInstance.mergedValue = 'Try to update';
      await page.waitForChanges();

      expect(page.rootInstance.mergedValue).toBe('Controlled Value');
      expect(ksChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Try to update' }));
    });

    it('should call mergedValueWatcher when mergedValue changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable></ks-test-helper-uncontrollable>,
      });
      const mergedValueWatcherSpy = jest.fn();
      page.rootInstance.mergedValueWatcher = mergedValueWatcherSpy;

      page.rootInstance.mergedValue = 'New Value';
      await page.waitForChanges();

      expect(mergedValueWatcherSpy).toHaveBeenCalledWith('New Value', 'Default Value');
    });
  });

  describe('transition', () => {
    it('from uncontrolled to controlled', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable></ks-test-helper-uncontrollable>,
      });
      expect(page.rootInstance.mergedValue).toBe('Default Value');

      page.rootInstance.value = 'Now Controlled';
      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('Now Controlled');
    });

    it('from controlled to uncontrolled', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Controlled"></ks-test-helper-uncontrollable>,
      });
      expect(page.rootInstance.mergedValue).toBe('Controlled');

      page.rootInstance.value = undefined;
      await page.waitForChanges();

      // After becoming uncontrolled, it should reset to the default value, like Ant Design
      expect(page.rootInstance.mergedValue).toBe('Default Value');

      // And now it should behave as uncontrolled
      const ksChangeSpy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksChange', ksChangeSpy);
      page.rootInstance.mergedValue = 'New Uncontrolled';
      await page.waitForChanges();
      expect(page.rootInstance.mergedValue).toBe('New Uncontrolled');
      expect(ksChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'New Uncontrolled' }));
    });
  });

  describe('watchers', () => {
    it('should call watchers when defaultValue changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => (
          <ks-test-helper-uncontrollable defaultValue="Old Default Value"></ks-test-helper-uncontrollable>
        ),
      });
      const defaultValueWatcherSpy = jest.fn();
      page.rootInstance.defaultValueWatcher = defaultValueWatcherSpy;
      await page.waitForChanges();
      page.rootInstance.defaultValue = 'New Default Value';
      await page.waitForChanges();
      expect(defaultValueWatcherSpy).toHaveBeenCalledWith('New Default Value', 'Old Default Value');
    });

    it('should call watchers when value changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable value="Old Value"></ks-test-helper-uncontrollable>,
      });
      const valueWatcherSpy = jest.fn();
      page.rootInstance.valueWatcher = valueWatcherSpy;
      await page.waitForChanges();
      page.rootInstance.value = 'New Value';
      await page.waitForChanges();
      expect(valueWatcherSpy).toHaveBeenCalledWith('New Value', 'Old Value');
    });

    it('should call watchers when mergedValue changes', async () => {
      const page = await newSpecPage({
        components: [KsTestHelperUncontrollable],
        template: () => <ks-test-helper-uncontrollable></ks-test-helper-uncontrollable>,
      });

      const valueWatcherSpy = jest.fn();
      const mergedValueWatcherSpy = jest.fn();
      page.rootInstance.valueWatcher = valueWatcherSpy;
      page.rootInstance.mergedValueWatcher = mergedValueWatcherSpy;
      await page.waitForChanges();

      page.rootInstance.value = 'New Value';
      await page.waitForChanges();
      expect(valueWatcherSpy).toHaveBeenCalledWith('New Value', undefined);
      expect(mergedValueWatcherSpy).toHaveBeenCalledWith('New Value', 'Default Value');
    });
  });
});

@Component({
  tag: 'ks-test-helper-uncontrollable',
  shadow: true,
})
class KsTestHelperUncontrollable {
  @Prop() value?: string;
  @Prop() defaultValue = 'Default Value';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() valueWatcher?: (value, oldValue) => void;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValueWatcher?: (value, oldValue) => void;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() mergedValueWatcher?: (value, oldValue) => void;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false }) ksChange: EventEmitter<string>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Uncontrollable('value', 'defaultValue', 'ksChange') @State() mergedValue: string;

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  watchValue(value, oldValue) {
    this.valueWatcher?.(value, oldValue);
  }

  @Watch('defaultValue')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  watchDefaultValue(value, oldValue) {
    this.defaultValueWatcher?.(value, oldValue);
  }

  @Watch('mergedValue')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  watchMergedValue(value, oldValue) {
    this.mergedValueWatcher?.(value, oldValue);
  }
}
