import { Component, h, Prop, Host, Event, State, EventEmitter, Watch, Element, forceUpdate } from '@stencil/core';
import { dir } from '@src/utils/utils';
import type {
  TreeDataNode,
  FlattenedNode,
  TreeViewCheckParams,
  TreeViewToggleExpandParams,
} from '@src/entities/components/tree-view';

const prefix = 'tree-view';
const ITEM_HEIGHT = 40;
const OVERSCAN_COUNT = 5;

export interface DynamicSlotsDeps {
  visibleNodes: FlattenedNode[];
  startIndex: number;
  endIndex: number;
}

/**
 * @part self - KsTreeView component shadow root element.
 */
@Component({
  tag: 'ks-tree-view',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTreeView {
  ['ks-name'] = 'ks-tree-view';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTreeViewElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private containerRef: HTMLDivElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private resizeObserver: ResizeObserver;

  @State() selectedKeys = new Set<string | number>();
  @State() halfKeys = new Set<string | number>();
  @State() innerExpandedKeys = new Set<string | number>();
  // virtusla-scroll related states
  @State() private scrollTop = 0;
  @State() private viewportHeight = 0;
  @State() private visibleNodes: FlattenedNode[] = [];

  private nodeMap = new Map<string | number, FlattenedNode>();
  private parentMap = new Map<string | number, FlattenedNode>();
  private flattenedNodes: FlattenedNode[] = [];
  // virtual-scroll related variables
  private startIndex = 0;
  private endIndex = 0;
  private totalHeight = 0;
  private lastRenderTime = 0;

  /**
   * @locale {en} The height of the tree view container. Can be a number (in pixels) or a string (e.g., "100%"). Default is "100%".
   * @locale {zh} 树视图容器的高度。可以是数字（像素单位）或字符串（例如 "100%"）。默认为 "100%"。
   */
  @Prop() height: string | number = '100%';
  /**
   * @locale {en} Whether the tree nodes are selectable, allowing users to select individual nodes.
   * @locale {zh} 树节点是否可选择，允许用户选择单个节点。
   */
  @Prop() selectable?: boolean = false;
  /**
   * @locale {en} Whether multiple tree nodes can be selected simultaneously.
   * @locale {zh} 是否可以同时选择多个树节点。
   */
  @Prop() multiple?: boolean = false;
  /**
   * @locale {en} Maximum number of nodes that can be selected when multiple selection is enabled.
   * @locale {zh} 在多选模式下可以选择的最大节点数量。
   */
  @Prop() maxSelectCount?: number;
  /**
   * @locale {en} Whether the entire tree structure is disabled, preventing interaction.
   * @locale {zh} 是否禁用整个树结构，禁止交互。
   */
  @Prop() disabled?: boolean = false;
  /**
   * @locale {en} The keys of the checked nodes. These nodes will appear as checked in the tree structure.
   * @locale {zh} 被选中节点的 key，这些节点会在树结构中显示为选中状态。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() checkedKeys: TreeDataNode['key'][];
  /**
   * @locale {en} The default checked keys when the tree is first rendered.
   * @locale {zh} 树首次渲染时默认选中的节点 key。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultCheckedKeys: TreeDataNode['key'][];
  /**
   * @locale {en} The default expanded keys when the tree is first rendered.
   * @locale {zh} 树首次渲染时默认展开的节点 key。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultExpandedKeys: TreeDataNode['key'][];
  /**
   * @locale {en} The keys of the expanded nodes. These nodes will appear as expanded in the tree structure.
   * @locale {zh} （受控模式）展开的节点的 key，这些节点会在树结构中显示为展开状态。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() expandedKeys: TreeDataNode['key'][];
  /**
   * @locale {en} The data structure that represents the tree.
   * @locale {zh} 表示树形结构的数据。
   */
  @Prop() treeData: TreeDataNode[] = [];

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() wrapWithSlot: (slotName: string, children: unknown) => unknown = (slotName: string, children: unknown) =>
    children;
  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() setDynamicRenderDeps?: (items: unknown[]) => void;
  // /**
  //  * @locale {en} Node keyword search
  //  * @locale {zh} 节点关键字搜索。
  //  */
  // @Prop() searchValue = '';
  // /**
  //  * @locale {en} Whether to use it as menu content (for internal development, not recommended for users)
  //  * @locale {zh} 是否作为菜单内容（内部开发使用，不建议用户使用）。
  //  */
  // @Prop() inMenu = false;

  /**
   * @locale {en} Custom event emitted when the checked keys of the tree nodes change.
   * @locale {zh} 当树节点的选中状态变化时触发的自定义事件，会返回被选中的顶层节点
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksCheck: EventEmitter<TreeViewCheckParams>;
  /**
   * @locale {en} Custom event emitted when the checked keys of the tree nodes change.
   * @locale {zh} 当树节点的选中状态变化时触发的自定义事件，会返回当前所有被选中的节点
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksCheckFull: EventEmitter<TreeDataNode['key'][]>;
  /**
   * @locale {en} Custom event emitted when the expanded keys of the tree nodes change and the node is loading status.
   * @locale {zh} 当树节点的展开状态变化，并且该节点是loading态时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksLoadMore: EventEmitter<TreeDataNode['key']>;
  /**
   * @locale {en} Custom event emitted when the expanded keys of the tree nodes change.
   * @locale {zh} 当树节点的展开状态变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksToggleExpand: EventEmitter<TreeViewToggleExpandParams>;

  @Watch('expandedKeys')
  handleExpandedKeys() {
    this.innerExpandedKeys = new Set(this.expandedKeys ?? []);
  }

  @Watch('innerExpandedKeys')
  handleInnerExpandedKeys() {
    const savedScrollTop = this.containerRef?.scrollTop || 0;

    this.updateVisibleNodes();
    this.totalHeight = this.visibleNodes.length * ITEM_HEIGHT;

    // restore scroll position in the next frame
    requestAnimationFrame(() => {
      if (this.containerRef) {
        this.containerRef.scrollTop = savedScrollTop;
        this.updateVisibleRange();
      }
    });
  }

  @Watch('treeData')
  @Watch('checkedKeys')
  treeDataWatcher() {
    requestAnimationFrame(() => {
      this.flattenedNodes = this.flattenNodes(this.treeData);
      this.updateVisibleNodes();
      this.totalHeight = this.visibleNodes.length * ITEM_HEIGHT;
      this.updateVisibleRange();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      let selectedKeys: Set<string | number> = undefined;
      this.selectedKeys.clear();
      this.halfKeys = new Set();
      this.innerExpandedKeys.clear();

      if (this.expandedKeys !== undefined) {
        this.innerExpandedKeys = new Set(this.expandedKeys);
      } else if (this.defaultExpandedKeys) {
        this.innerExpandedKeys = new Set(this.defaultExpandedKeys);
      }

      if (this.checkedKeys) {
        selectedKeys = new Set(this.checkedKeys);
      } else if (this.defaultCheckedKeys) {
        selectedKeys = new Set(this.defaultCheckedKeys);
      }

      if (selectedKeys !== undefined) {
        selectedKeys.forEach((key) => {
          if (this.selectedKeys.has(key)) return;
          const node = this.nodeMap.get(key);
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          if (node.disabled) {
            // disabled nodes are unclickable thus need to config manually
            if (!this.multiple) {
              this.selectedKeys.clear();
            }
            this.selectedKeys.add(key);
          } else {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.handleNodeClick(node, true);
          }
        });
      }
    });
  }

  handleScroll(event: Event) {
    // use requestAnimationFrame to limit scroll event handling frequency
    const now = performance.now();
    if (now - this.lastRenderTime < 16) {
      return;
    }

    this.lastRenderTime = now;
    this.scrollTop = (event.target as HTMLDivElement).scrollTop;
    this.updateVisibleRange();
  }

  updateVisibleNodes() {
    this.visibleNodes = this.flattenedNodes.filter(this.isNodeVisible.bind(this));
    this.setDynamicRenderDeps?.(
      KsTreeView.__internal_renderDynamicSlots(this, this.wrapWithSlot, {
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        visibleNodes: this.visibleNodes,
      }),
    );
  }

  updateVisibleRange() {
    if (!this.containerRef) {
      return;
    }

    const visibleStartIndex = Math.floor(this.scrollTop / ITEM_HEIGHT);
    const visibleEndIndex = Math.ceil((this.scrollTop + this.viewportHeight) / ITEM_HEIGHT);

    this.startIndex = Math.max(0, visibleStartIndex - OVERSCAN_COUNT);
    this.endIndex = Math.min(this.visibleNodes.length - 1, visibleEndIndex + OVERSCAN_COUNT);

    this.setDynamicRenderDeps?.(
      KsTreeView.__internal_renderDynamicSlots(this, this.wrapWithSlot, {
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        visibleNodes: this.visibleNodes,
      }),
    );

    forceUpdate(this.el);
  }

  flattenNodes(nodes: TreeDataNode[], level = 0, parent: string | number | null = null): FlattenedNode[] {
    return nodes.reduce<FlattenedNode[]>((acc, node) => {
      const flatNode: FlattenedNode = {
        ...node,
        level,
        parent,
        isExpanded: false,
        isLeaf: !node.children?.length,
      };

      this.nodeMap.set(node.key, flatNode);
      if (parent !== null) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.parentMap.set(node.key, this.nodeMap.get(parent));
      }

      acc.push(flatNode);
      if (node.children?.length) {
        acc.push(...this.flattenNodes(node.children, level + 1, node.key));
      }
      return acc;
    }, []);
  }

  handleNodeClick = (node: FlattenedNode, init = false) => {
    if (this.disabled || node.disabled) {
      return;
    }

    if (this.multiple) {
      this.handleMultiSelect(node, init);
    } else {
      this.handleSingleSelect(node, init);
    }
  };

  toggleExpand(node: FlattenedNode) {
    if (this.disabled || node.disabled) {
      return;
    }

    if (node.loading) {
      this.ksLoadMore.emit(node.key);
      return;
    }

    const expand = !this.innerExpandedKeys.has(node.key);
    const expandedKeys = new Set(
      expand ? [...this.innerExpandedKeys, node.key] : [...this.innerExpandedKeys].filter((k) => k !== node.key),
    );
    if (this.expandedKeys !== undefined) {
      this.ksToggleExpand.emit({
        expanded: expand,
        node,
        expandedKeys: Array.from(expandedKeys),
      });
    } else this.innerExpandedKeys = expandedKeys;

    const savedScrollTop = this.containerRef?.scrollTop || 0;

    this.updateVisibleNodes();
    this.totalHeight = this.visibleNodes.length * ITEM_HEIGHT;

    // restore scroll position in the next frame
    requestAnimationFrame(() => {
      if (this.containerRef) {
        this.containerRef.scrollTop = savedScrollTop;
        this.updateVisibleRange();
      }
    });
  }

  handleSingleSelect(node: FlattenedNode, init = false) {
    this.selectedKeys = new Set([node.key]);
    if (init) return;
    this.ksCheck.emit({
      checked: true,
      node,
      checkedKeys: Array.from(this.selectedKeys),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      checkedNodes: Array.from(this.selectedKeys).map((key) => this.nodeMap.get(key)),
      halfCheckedKeys: Array.from(this.halfKeys),
    });
    this.ksCheckFull.emit([node.key]);
  }

  handleMultiSelect(node: FlattenedNode, init = false) {
    if (
      this.maxSelectCount &&
      this.selectedKeys.size >= this.maxSelectCount &&
      !this.selectedKeys.has(node.key) &&
      !this.halfKeys.has(node.key)
    ) {
      return;
    }

    const newSelected = new Set(this.selectedKeys);
    const shouldSelect = !this.selectedKeys.has(node.key) || this.halfKeys.has(node.key);

    // handle current node's subtree first
    this.updateChildrenSelection(node, newSelected, shouldSelect);

    // update parent node's state
    this.updateParentSelection(node, newSelected);

    this.selectedKeys = newSelected;

    if (init) return;

    const selectedKeys = this.getEffectiveSelection();
    this.ksCheck.emit({
      checked: shouldSelect,
      node,
      checkedKeys: Array.from(selectedKeys),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      checkedNodes: Array.from(selectedKeys).map((key) => this.nodeMap.get(key)),
      halfCheckedKeys: Array.from(this.halfKeys),
    });
    this.ksCheckFull.emit(Array.from(this.selectedKeys));
  }

  updateChildrenSelection(node: FlattenedNode, selected: Set<string | number>, shouldSelect: boolean) {
    // update current node
    if (node.disabled) {
      return;
    }

    if (shouldSelect) {
      selected.add(node.key);
      this.halfKeys.delete(node.key);
    } else {
      selected.delete(node.key);
      this.halfKeys.delete(node.key);
    }

    // recursively handle all child nodes
    const children = this.flattenedNodes.filter((n) => n.parent === node.key);
    children.forEach((child) => {
      this.updateChildrenSelection(child, selected, shouldSelect);
    });
  }

  updateParentSelection(node: FlattenedNode, selected: Set<string | number>) {
    let current = this.parentMap.get(node.key);
    while (current) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const activeSiblings = this.flattenedNodes.filter((n) => n.parent === current.key && !n.disabled);
      const selectedSiblings = activeSiblings.filter((s) => selected.has(s.key));
      const halfSiblings = activeSiblings.filter((s) => this.halfKeys.has(s.key));

      if (selectedSiblings.length === activeSiblings.length) {
        selected.add(current.key);
        this.halfKeys.delete(current.key);
      } else if (selectedSiblings.length === 0 && halfSiblings.length === 0) {
        selected.delete(current.key);
        this.halfKeys.delete(current.key);
      } else {
        selected.delete(current.key);
        this.halfKeys.add(current.key);
      }

      current = this.parentMap.get(current.key);
    }
  }

  getEffectiveSelection(): Set<string | number> {
    const effective = new Set<string | number>();

    for (const key of this.selectedKeys) {
      const node = this.nodeMap.get(key);
      if (!node) {
        continue;
      }
      effective.add(key);
    }

    return effective;
  }

  componentWillLoad() {
    this.treeDataWatcher();
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.containerRef) {
          this.viewportHeight = entry.contentRect.height;
          this.updateVisibleRange();
        }
      }
    });
  }

  componentDidLoad() {
    if (this.containerRef) {
      this.resizeObserver.observe(this.containerRef);
      this.viewportHeight = this.containerRef.clientHeight;
      this.updateVisibleRange();
    }
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  renderNode(node: FlattenedNode, index: number) {
    const selectable = typeof node.selectable === 'undefined' ? this.selectable : node.selectable;
    const checked = this.selectedKeys.has(node.key);
    const half = this.halfKeys.has(node.key);
    const disabled = this.disabled || node.disabled;
    const customPopover = node.renderOptions?.popover;
    const { render, ...rest } = customPopover || {};
    const vanillaNode = (
      <div
        class={{
          [`${prefix}__node`]: true,
          [`${prefix}__node--selected`]: checked,
          [`${prefix}__node--half`]: half,
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          [`${prefix}__node--disabled`]: disabled,
          [`${prefix}__node--expanded`]: this.innerExpandedKeys.has(node.key),
          [`${prefix}__no-expand-icon`]: node.isLeaf,
        }}
      >
        {!node.isLeaf && (
          <ks-icon-filled-chevron-down
            size={12}
            class={{
              [`${prefix}__expand-icon`]: true,
              [`${prefix}__node--expanded`]: this.innerExpandedKeys.has(node.key),
            }}
            onClick={() => this.toggleExpand(node)}
            data-testid="ks-tree-view-index-q9Hvh5"
          />
        )}

        {selectable && this.multiple ? (
          <ks-checkbox
            class={{
              [`${prefix}__label`]: true,
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              [`${prefix}__label--disabled`]: disabled,
              [`${prefix}__label--padded`]: node.isLeaf,
            }}
            checked={checked}
            indeterminate={half}
            disabled={disabled}
            onKsChange={() => this.handleNodeClick(node)}
            onClick={() => this.handleNodeClick(node)}
            data-testid="ks-tree-view-index-1UrNnE"
          >
            <ks-text ellipsis variant="bodySm">
              {typeof node.label === 'string' ? node.label : <slot name={`node-${index}`}></slot>}
            </ks-text>
          </ks-checkbox>
        ) : (
          <ks-text
            ellipsis
            variant="bodySm"
            class={{
              [`${prefix}__label`]: true,
              [`${prefix}__label--checked`]: checked,
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              [`${prefix}__label--disabled`]: disabled,
              [`${prefix}__label--padded`]: node.isLeaf,
            }}
            onClick={() => (selectable ? this.handleNodeClick(node) : this.toggleExpand(node))}
            data-testid="ks-tree-view-index-wDtwhQ"
          >
            {typeof node.label === 'string' ? node.label : <slot name={`node-${index}`}></slot>}
          </ks-text>
        )}
      </div>
    );

    return (
      <div
        key={node.key}
        style={{
          position: 'absolute',
          top: `${(this.startIndex + index) * ITEM_HEIGHT}px`,
          left: '0',
          width: '100%',
          height: `${ITEM_HEIGHT}px`,
        }}
        data-testid={`ks-tree-view-index-2e9R2R-${node.key}`}
      >
        <div
          key={node.key}
          style={{ paddingLeft: `${node.level * 24}px` }}
          dir={dir()}
          data-testid={`ks-tree-view-index-1wwQoE-${node.key}`}
        >
          {customPopover ? (
            <ks-tooltip
              class={`${prefix}__tooltip`}
              trigger="hover"
              {...rest}
              key={node.key}
              data-testid={`ks-tree-view-index-rDqMXc-${node.key}`}
            >
              {render ? (
                <div id={`popover-${index}`} slot="content">
                  <slot name={`popover-${index}`}></slot>
                </div>
              ) : (
                <ks-text slot="content" variant="bodySm">
                  {customPopover.content || ''}
                </ks-text>
              )}

              {vanillaNode}
            </ks-tooltip>
          ) : (
            vanillaNode
          )}
        </div>
      </div>
    );
  }

  isNodeVisible(node: FlattenedNode): boolean {
    if (!node.visible) {
      return false;
    }

    if (!node.parent) {
      // root node is always visible
      return true;
    }

    let current = this.nodeMap.get(node.parent);
    // check if all ancestor nodes are expanded
    while (current) {
      if (!this.innerExpandedKeys.has(current.key)) {
        return false;
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      current = current.parent ? this.nodeMap.get(current.parent) : null;
    }
    return true;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static __internal_renderDynamicSlots(props, wrapper, dependencies: any = {}) {
    const visibleItems = (dependencies.visibleNodes || []).slice(dependencies.startIndex, dependencies.endIndex + 1);
    const renderedLabels = visibleItems
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      .map((node, index) => typeof node.label === 'function' && wrapper(`node-${index}`, node.label()))
      .filter(Boolean);
    const renderedPopovers = visibleItems
      // TODO: 这里的renderOptions?.popover?.render是为了兼容dropdown的popover，后续可以考虑是否可以简化为popover.label
      .map(
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        (node, index) =>
          typeof node.renderOptions?.popover?.render === 'function' &&
          wrapper(`popover-${index}`, node.renderOptions?.popover?.render()),
      )
      .filter(Boolean);
    return [...renderedLabels, ...renderedPopovers];
  }

  render() {
    const visibleItems = this.visibleNodes.slice(this.startIndex, this.endIndex + 1);

    return (
      <Host dir={dir()} ks-tree-view role="tree">
        <div
          ref={(el) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.containerRef = el;
          }}
          class={prefix}
          style={{
            height: typeof this.height === 'number' ? `${this.height}px` : this.height,
          }}
          onScroll={this.handleScroll.bind(this)}
          data-testid="ks-tree-view-index-6VTVNb"
        >
          <div
            style={{
              height: `${this.totalHeight}px`,
              position: 'relative',
            }}
          >
            {visibleItems.map((node, index) => this.renderNode(node, index))}
          </div>
        </div>
      </Host>
    );
  }
}
