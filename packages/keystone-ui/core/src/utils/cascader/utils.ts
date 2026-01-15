/**
 * 访问tree中的末端叶子节点，并通过callback处理
 * @param startObject
 * @param cb
 */
export function visitEndLeafNode(startObject: Record<string, unknown>, cb: (object: Record<string, unknown>) => void) {
  const dfs = (option: Record<string, unknown>) => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (option.children?.length) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      option.children.forEach((child) => {
        dfs(child);
      });
    } else {
      cb?.(option);
    }
  };
  dfs(startObject);
}

/**
 * 查找节点的父、祖父节点集合
 * @param startObject
 * @param parentKey
 * @param end
 * @returns
 */
export function findParentNodes(
  startObject: Record<string, unknown>,
  parentKey = '__parent',
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  end: (parent: Record<string, unknown> | undefined) => boolean = (parent) => parent?.__floor >= 0,
) {
  const parentNodes = [];
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  while (end(startObject[parentKey])) {
    parentNodes.push(startObject[parentKey]);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    startObject = startObject[parentKey];
  }
  return parentNodes;
}

/**
 * 比对Array和Set值相等
 * @param setArray
 * @param array
 * @returns
 */
export function isSameSetAndArray(setArray: Set<string | number>, array: Array<string | number>) {
  return array.length === setArray.size && array.every((item) => setArray.has(item));
}
