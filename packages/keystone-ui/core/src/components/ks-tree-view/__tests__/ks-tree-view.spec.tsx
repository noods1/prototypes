import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTreeView } from '../index';

const basicTreeData = [
  {
    key: '0-0',
    label: '🍔 Burger',
    visible: true,
    children: [
      {
        key: '0-0-0',
        label: '🍟 French Fries',
        visible: true,
      },
      {
        key: '0-0-1',
        label: '🥤 Soda',
        visible: true,
      },
    ],
  },
  {
    key: '0-1',
    label: '🍕 Pizza',
    visible: true,
    children: [
      {
        key: '0-1-0',
        label: '🧀 Cheese Pizza',
        visible: true,
      },
      {
        key: '0-1-1',
        label: '🍖 Pepperoni Pizza',
        loading: true,
        visible: true,
      },
      {
        children: [
          {
            key: '0-1-2-0',
            label: '🍍 Pineapple Pizza',
            visible: true,
          },
          {
            key: '0-1-2-1',
            label: '🌶️ Spicy Pizza',
            visible: true,
          },
        ],
        key: '0-1-2',
        label: '🍕 Special Pizza',
        visible: true,
      },
    ],
  },
  {
    key: '0-2',
    label: '🍦 Ice Cream',
    loading: true,
    visible: true,
    disabled: true, // This node is disabled
    children: [],
  },
];

describe('ks-tree-view component', () => {
  it('should render when treeData is provided', async () => {
    const page = await newSpecPage({
      components: [KsTreeView],
      template: () => <ks-tree-view treeData={basicTreeData}></ks-tree-view>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const treeView = page.root.shadowRoot.querySelector('.tree-view');
    expect(treeView).toBeTruthy();
  });
});
