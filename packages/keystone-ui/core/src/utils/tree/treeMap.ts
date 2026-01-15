// eslint-disable-next-line @stencil-community/ban-exported-const-enums
export enum EnumCheckStrategy { // FIXME TYPE_FIXME unexpected ban-exported-const-enums error
  ALL = 'all',
  PARENT = 'parent',
  CHILD = 'child',
  INDEPENDENT = 'independent',
}

export type CheckStrategy = `${EnumCheckStrategy}`;

export type TreeItemValue = string | number;

// eslint-disable-next-line @stencil-community/ban-exported-const-enums
export enum EnumTreeItemKeys {
  FLOOR_KEY = '__floor',
  FULL_VALUE_KEY = '__fullValue',
  FULL_LABEL_KEY = '__fullLabel',
  PARENT_FULL_VALUE_KEY = '__pFullValue',
  FULL_PATH_KEY = '__fullPath',
  LABEL_FULL_PATH_KEY = '__labelFullPath',
  LEAFS_VALUE_KEY = '__leafsValue',
  PARENT_KEY = '__parent',
  ORIGIN_DATA = '__originData',
}

export interface TreeItem {
  [key: string]: unknown;
  [EnumTreeItemKeys.FLOOR_KEY]?: number;
  [EnumTreeItemKeys.FULL_VALUE_KEY]?: TreeItemValue;
  [EnumTreeItemKeys.FULL_LABEL_KEY]?: string;
  [EnumTreeItemKeys.PARENT_FULL_VALUE_KEY]?: TreeItemValue;
  [EnumTreeItemKeys.FULL_PATH_KEY]?: Array<TreeItemValue>;
  [EnumTreeItemKeys.LABEL_FULL_PATH_KEY]?: Array<string>;
  [EnumTreeItemKeys.LEAFS_VALUE_KEY]?: Array<TreeItemValue>;
  [EnumTreeItemKeys.PARENT_KEY]?: TreeItem;
  [EnumTreeItemKeys.ORIGIN_DATA]?: Record<string, unknown>;
}

export class TreeMap<T extends TreeItem> {
  data: Record<string, TreeItem & T>;
  fullpathMode: boolean;
  valueKey: string;
  labelKey: string;
  childrenKey: string;
  disabledKey: string;
  needLoadKey: string;
  rootFloor = -1;

  constructor(option: {
    fullpathMode?: boolean;
    valueKey?: string;
    labelKey?: string;
    childrenKey?: string;
    disabledKey?: string;
    needLoadKey?: string;
  }) {
    const {
      fullpathMode = false,
      valueKey = 'value',
      labelKey = 'label',
      childrenKey = 'children',
      disabledKey = 'disabled',
      needLoadKey = 'needLoad',
    } = option;
    this.fullpathMode = fullpathMode;
    this.valueKey = valueKey;
    this.labelKey = labelKey;
    this.childrenKey = childrenKey;
    this.disabledKey = disabledKey;
    this.needLoadKey = needLoadKey;
    this.data = {};
  }
  createRootNode() {
    return { [EnumTreeItemKeys.FLOOR_KEY]: this.rootFloor };
  }
  /**
   * create a treeMap Object
   * @param datasource 数据源
   * @param rootNode 根节点
   * @returns Record<string, TreeItem>
   */
  createData(datasource: Array<T> = [], rootNode?: TreeItem & T) {
    // console.time('cascader-initial-data');
    if (rootNode !== undefined && datasource?.length) {
      this.btRemoveLeaf(rootNode);
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this; // FIXME TYPE_FIXME unexpected @typescript-eslint/no-this-alias error
    const { valueKey, labelKey, childrenKey, fullpathMode, unValidVal } = this;
    const rootNode$1 = rootNode !== undefined ? rootNode : this.createRootNode();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    rootNode$1[this.childrenKey] = [...(rootNode$1[this.childrenKey] || []), ...datasource];
    const map: Record<string, TreeItem & T> = {};
    function DFS(num: number, target: TreeItem & T, arr: Array<T>) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i] as TreeItem & T;
        item[EnumTreeItemKeys.FLOOR_KEY] = num;
        if (fullpathMode) {
          item[EnumTreeItemKeys.FULL_VALUE_KEY] = unValidVal(target[EnumTreeItemKeys.FULL_VALUE_KEY])
            ? `${item[valueKey]}`
            : `${target[EnumTreeItemKeys.FULL_VALUE_KEY]}/${item[valueKey]}`;
          item[EnumTreeItemKeys.FULL_LABEL_KEY] = unValidVal(target[EnumTreeItemKeys.FULL_LABEL_KEY])
            ? `${item[labelKey]}`
            : `${target[EnumTreeItemKeys.FULL_LABEL_KEY]}/${item[labelKey]}`;
        } else {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          item[EnumTreeItemKeys.FULL_VALUE_KEY] = item[valueKey];
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          item[EnumTreeItemKeys.FULL_LABEL_KEY] = item[labelKey];
        }
        item[EnumTreeItemKeys.FULL_PATH_KEY] = [].concat(
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          target[EnumTreeItemKeys.FULL_PATH_KEY] || [],
          item[EnumTreeItemKeys.FULL_VALUE_KEY],
        );
        item[EnumTreeItemKeys.LABEL_FULL_PATH_KEY] = [].concat(
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          target[EnumTreeItemKeys.LABEL_FULL_PATH_KEY] || [],
          item[EnumTreeItemKeys.FULL_LABEL_KEY],
        );
        item[EnumTreeItemKeys.PARENT_FULL_VALUE_KEY] = target[EnumTreeItemKeys.FULL_VALUE_KEY];
        item[EnumTreeItemKeys.PARENT_KEY] = target;
        if (!unValidVal(item[EnumTreeItemKeys.FULL_VALUE_KEY])) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          map[item[EnumTreeItemKeys.FULL_VALUE_KEY]] = item;
        }
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (item[childrenKey]?.length) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          DFS(num + 1, item, item[childrenKey]);
        } else {
          if (!_this.ignoreOption(item)) {
            // 叶子
            _this.btAddLeaf(item);
          }
        }
      }
    }
    DFS(0, rootNode$1 as TreeItem & T, datasource);

    rootNode === undefined && (this.data = map); // 从0创建，而非插入
    // console.timeEnd('cascader-initial-data');
    return map;
  }
  /** 回溯添加叶子节点 */
  private btAddLeaf(target: TreeItem) {
    let parent = target[EnumTreeItemKeys.PARENT_KEY];
    while (parent && parent[EnumTreeItemKeys.FLOOR_KEY] !== this.rootFloor) {
      if (parent[EnumTreeItemKeys.LEAFS_VALUE_KEY] instanceof Array) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        parent[EnumTreeItemKeys.LEAFS_VALUE_KEY].push(target[EnumTreeItemKeys.FULL_VALUE_KEY]);
      } else {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        parent[EnumTreeItemKeys.LEAFS_VALUE_KEY] = [target[EnumTreeItemKeys.FULL_VALUE_KEY]];
      }
      parent = parent[EnumTreeItemKeys.PARENT_KEY];
    }
  }
  /** 回溯删除叶子节点 */
  private btRemoveLeaf(target: TreeItem) {
    let parent = target[EnumTreeItemKeys.PARENT_KEY];
    while (parent && parent[EnumTreeItemKeys.FLOOR_KEY] !== this.rootFloor) {
      const leafs = parent[EnumTreeItemKeys.LEAFS_VALUE_KEY];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      leafs.splice(leafs.indexOf(target[EnumTreeItemKeys.FULL_VALUE_KEY]), 1);
      parent = parent[EnumTreeItemKeys.PARENT_KEY];
    }
  }
  /**
   * 像已创建的treeMap Object插入一个子集
   * @param datasource
   * @param parentNode 根节点
   */
  insertNode(datasource: Array<T>, parentNode: TreeItem & T) {
    const subMap = this.createData(datasource, parentNode);
    Object.assign(this.data, subMap);
    return this.data;
  }
  isSelectedInSingleMode(currentOption: TreeItem & T, selectValue: TreeItemValue) {
    return selectValue === currentOption[EnumTreeItemKeys.FULL_VALUE_KEY];
  }
  isSelectedInMultipleMode(
    currentOption: TreeItem & T,
    selectedValue: Set<TreeItemValue>,
    checkStrategy: CheckStrategy,
  ) {
    if (this.isRootNode(currentOption)) {
      let selected = false;
      let isIndeterminate = false;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const selectedArray = [];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const isIndeterminateArray = [];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      currentOption[this.childrenKey]?.forEach((option: TreeItem & T) => {
        const { selected: selected$1, isIndeterminate: isIndeterminate$1 } = this.isSelectedInMultipleMode(
          option,
          selectedValue,
          checkStrategy,
        );
        selectedArray.push(selected$1);
        isIndeterminateArray.push(isIndeterminate$1);
      });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      selected = selectedArray.every((item) => item);
      isIndeterminate =
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        (!selected && selectedArray.some((item) => item)) || isIndeterminateArray.some((item) => item);
      return {
        selected,
        isIndeterminate,
      };
    }
    let selected = false;
    let isIndeterminate = false;
    let count = 0;
    function getLeafsSelectedLen() {
      return (
        currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]?.filter((item: TreeItemValue) => selectedValue?.has(item))
          .length || 0
      );
    }
    if (selectedValue?.size) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const isInSelectedVal = selectedValue?.has(currentOption[EnumTreeItemKeys.FULL_VALUE_KEY]);
      if (checkStrategy === EnumCheckStrategy.INDEPENDENT) {
        // 独立模式中，项目选中状态由：自身出现在备选池决定【因为备选池会保有该项值】
        selected = isInSelectedVal;
        // 独立模式中，无半选状态
      } else if (checkStrategy === EnumCheckStrategy.ALL) {
        const leafSelectedLen = getLeafsSelectedLen();
        // all 模式中，项目选中状态由：自身出现在备选池决定【因为备选池会保有该项值】
        selected = isInSelectedVal;
        // all 模式中，半选状态由：1、自身未出现在备选池；2、子节点是不全在备选池
        isIndeterminate =
          !isInSelectedVal &&
          leafSelectedLen > 0 &&
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          leafSelectedLen < currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]?.length;
      } else if (checkStrategy === EnumCheckStrategy.PARENT) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const isAncestryInSelectVal: boolean = currentOption[EnumTreeItemKeys.FULL_PATH_KEY]?.some(
          (value: TreeItemValue) => selectedValue?.has(value),
        );
        // parent 模式中，项目选中状态由：1、自身出现在备选池【如果子项全部在则会被转化为当前项】；「OR」 2、祖先元素出现在备选池【因为，如果祖先出现，自身将被merge】「且」自身没被忽略
        selected = isInSelectedVal || (isAncestryInSelectVal && !this.ignoreOption(currentOption));
        // parent 模式中，半选状态由：自身的任何一个子节点出现在备选池中
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        currentOption[this.childrenKey]?.forEach((option: TreeItem & T) => {
          const { selected: selected$1 } = this.isSelectedInMultipleMode(option, selectedValue, checkStrategy);

          if (selected$1) {
            count++;
          }
        });
        this.visitChildrenNodeBfs(currentOption, (node) => {
          if (
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            node[this.childrenKey]?.some((item: TreeItem) => selectedValue.has(item[EnumTreeItemKeys.FULL_VALUE_KEY]))
          ) {
            isIndeterminate = true;
            return true;
          }
          return false;
        });
      } else if (checkStrategy === EnumCheckStrategy.CHILD) {
        const leafSelectedLen = getLeafsSelectedLen();
        // child 模式，项目选中状态由：1、自身出现在备选池；「OR」2、自身所有叶子节点出现在备选池；【因为，备选池只有叶子节点】
        selected = isInSelectedVal || leafSelectedLen === currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]?.length;
        // child 模式，半选状态由：是否有自身叶子节点出现在备选池，【因为，备选池只有叶子节点】
        isIndeterminate =
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          leafSelectedLen > 0 && leafSelectedLen < currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]?.length;
      }
    }
    return {
      selected,
      isIndeterminate,
      count,
    };
  }
  singleSelect(currentOption: TreeItem & T, checkStrategy: CheckStrategy): Promise<TreeItemValue> {
    return new Promise((resolve, reject) => {
      if (
        checkStrategy === EnumCheckStrategy.INDEPENDENT ||
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        (!currentOption[this.childrenKey]?.length && !currentOption[this.needLoadKey])
      ) {
        // 独立选择模式 或者 无下级
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        resolve(currentOption[EnumTreeItemKeys.FULL_VALUE_KEY]);
      } else {
        reject(new Error('Option selection failed due to invalid strategy or missing children.'));
      }
    });
  }
  private addSelfValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    const value = currentOption[EnumTreeItemKeys.FULL_VALUE_KEY];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    selectedValue.add(value);
  }
  private addChildValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 判断是否为叶子节点
    if (currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]) {
      currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY].forEach((value: TreeItemValue) => {
        selectedValue.add(value);
      });
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      selectedValue.add(currentOption[EnumTreeItemKeys.FULL_VALUE_KEY]);
    }
  }
  private addParentValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 递归删除
    const bfsDelete = (option: TreeItem & T) => {
      const queue = [option];
      while (queue.length) {
        const target = queue.shift();
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        selectedValue.delete(target[EnumTreeItemKeys.FULL_VALUE_KEY]);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (target[this.childrenKey]?.length) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          target[this.childrenKey].forEach((child: TreeItem & T) => {
            queue.push(child);
          });
        }
      }
    };
    bfsDelete(currentOption);
    // 回溯合并
    const btMerge = (option: TreeItem & T) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      selectedValue.add(option[EnumTreeItemKeys.FULL_VALUE_KEY]);
      const parent = option[EnumTreeItemKeys.PARENT_KEY];
      if (
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        parent?.[this.childrenKey]?.length &&
        parent[EnumTreeItemKeys.FLOOR_KEY] !== this.rootFloor // 如果父节点是root，那么该项是视图的第一列，不需要合并
      ) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const canMerge: boolean = parent[this.childrenKey].every((item: TreeItem & T) => {
          if (this.ignoreOption(item)) {
            return true;
          }
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          return selectedValue.has(item[EnumTreeItemKeys.FULL_VALUE_KEY]);
        });
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (canMerge && (parent.selectable || parent.selectable === undefined)) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          parent[this.childrenKey].forEach((child: TreeItem & T) =>
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            selectedValue.delete(child[EnumTreeItemKeys.FULL_VALUE_KEY]),
          );
          btMerge(parent as TreeItem & T);
        }
      }
    };
    btMerge(currentOption);
  }
  private addEveryValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 递归追加【向后】
    const dfs = (target: TreeItem & T) => {
      if (target && !this.ignoreOption(target)) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        selectedValue.add(target[EnumTreeItemKeys.FULL_VALUE_KEY]);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        target[this.childrenKey]?.forEach((option: TreeItem & T) => {
          dfs(option);
        });
      }
    };
    dfs(currentOption);
    // 回溯追加【向前】
    const btAppend = (option: TreeItem & T) => {
      const parent = option[EnumTreeItemKeys.PARENT_KEY];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const parentIsFull: boolean = parent[this.childrenKey].every((item: TreeItem & T) => {
        if (this.ignoreOption(item)) {
          return true;
        }
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        return selectedValue.has(item[EnumTreeItemKeys.FULL_VALUE_KEY]);
      });
      if (parentIsFull) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        selectedValue.add(parent[EnumTreeItemKeys.FULL_VALUE_KEY]);
        btAppend(parent as TreeItem & T);
      }
    };
    btAppend(currentOption);
  }
  multipleAddSelect(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>, checkStrategy: CheckStrategy) {
    if (this.isRootNode(currentOption)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      currentOption[this.childrenKey]?.forEach((option: TreeItem & T) => {
        this.multipleAddSelect(option, selectedValue, checkStrategy);
      });
      return;
    }
    switch (checkStrategy) {
      case 'independent':
        this.addSelfValue2Selected(currentOption, selectedValue);
        break;
      case 'child':
        this.addChildValue2Selected(currentOption, selectedValue);
        break;
      case 'all':
        this.addEveryValue2Selected(currentOption, selectedValue);
        break;
      case 'parent':
        this.addParentValue2Selected(currentOption, selectedValue);
        break;
      default:
        this.addParentValue2Selected(currentOption, selectedValue);
        break;
    }
  }
  private removeSelfValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    const value = currentOption[EnumTreeItemKeys.FULL_VALUE_KEY];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    selectedValue.delete(value);
  }
  private removeChildValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 判断是否为叶子节点
    if (currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY]) {
      currentOption[EnumTreeItemKeys.LEAFS_VALUE_KEY].forEach((value: TreeItemValue) => {
        selectedValue.delete(value);
      });
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      selectedValue.delete(currentOption[EnumTreeItemKeys.FULL_VALUE_KEY]);
    }
  }
  private removeParentValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 回溯查找merge节点或叶子节点
    const btBreakUp = (activeOption: TreeItem & T) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (selectedValue.has(activeOption[EnumTreeItemKeys.FULL_VALUE_KEY])) {
        // 命中merge节点或叶子节点后，广度优先展开追加
        const bfs = (target: TreeItem & T) => {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          selectedValue.delete(target[EnumTreeItemKeys.FULL_VALUE_KEY]);
          if (target === currentOption) return; // 结束到操作项目
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          target[this.childrenKey]?.forEach((opt: TreeItem & T) => {
            if (this.ignoreOption(opt)) {
              return;
            }
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            if (currentOption[EnumTreeItemKeys.FULL_PATH_KEY].includes(opt[EnumTreeItemKeys.FULL_VALUE_KEY])) {
              bfs(opt);
              return;
            }
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            selectedValue.add(opt[EnumTreeItemKeys.FULL_VALUE_KEY]);
          });
        };
        bfs(activeOption);
      } else {
        // 未命中merge节点，继续向上查找
        btBreakUp(activeOption[EnumTreeItemKeys.PARENT_KEY] as TreeItem & T);
      }
    };
    btBreakUp(currentOption);
  }
  private removeEveryValue2Selected(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>) {
    // 回溯删除【向前】
    const btAppend = (option: TreeItem & T) => {
      const parent = option[EnumTreeItemKeys.PARENT_KEY];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const parentIsFull: boolean = selectedValue.has(parent[EnumTreeItemKeys.FULL_VALUE_KEY]);
      if (parentIsFull) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        selectedValue.delete(parent[EnumTreeItemKeys.FULL_VALUE_KEY]);
        btAppend(parent as TreeItem & T);
      }
    };
    btAppend(currentOption);
    // 递归删除 【向后】
    const dfs = (target: TreeItem & T) => {
      if (target) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        selectedValue.delete(target[EnumTreeItemKeys.FULL_VALUE_KEY]);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        target[this.childrenKey]?.forEach((option: TreeItem & T) => {
          dfs(option);
        });
      }
    };
    dfs(currentOption);
  }
  multipleRemoveSelect(currentOption: TreeItem & T, selectedValue: Set<TreeItemValue>, checkStrategy: CheckStrategy) {
    if (this.isRootNode(currentOption)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      currentOption[this.childrenKey]?.forEach((option: TreeItem & T) => {
        this.multipleRemoveSelect(option, selectedValue, checkStrategy);
      });
      return;
    }
    switch (checkStrategy) {
      case 'independent':
        this.removeSelfValue2Selected(currentOption, selectedValue);
        break;
      case 'child':
        this.removeChildValue2Selected(currentOption, selectedValue);
        break;
      case 'all':
        this.removeEveryValue2Selected(currentOption, selectedValue);
        break;
      case 'parent':
        this.removeParentValue2Selected(currentOption, selectedValue);
        break;
      default:
        this.removeParentValue2Selected(currentOption, selectedValue);
        break;
    }
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private unValidVal(val) {
    return [undefined, '', NaN].includes(val);
  }
  private ignoreOption(option: TreeItem): boolean {
    const btGetDisabled = (target: TreeItem): boolean => {
      if (target[EnumTreeItemKeys.FLOOR_KEY] === this.rootFloor) {
        return false;
      }
      if (target[this.disabledKey]) {
        return true;
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      return btGetDisabled(target[EnumTreeItemKeys.PARENT_KEY]);
    };
    const disabled = btGetDisabled(option);
    return disabled;
  }
  visitChildrenNodeBfs(startNode: TreeItem & T, cb: (node: TreeItem & T) => boolean) {
    const queue = [startNode];
    let stop = false;
    while (queue.length && !stop) {
      const target = queue.shift();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      stop = cb?.(target);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      queue.push(...(target[this.childrenKey] || []));
    }
  }
  isRootNode(node: TreeItem) {
    return node[EnumTreeItemKeys.FLOOR_KEY] === this.rootFloor;
  }
}
