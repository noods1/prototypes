/**
 * 通过监听document节点变化，来更新popper的位置，为防止内存溢出，只监听弹出的popper，其他类似popper的场景也可以复用
 */
class DocumentObserve {
  queue: Set<(mutations: MutationRecord[]) => void> = new Set();
  constructor() {
    const mutationObserver = new MutationObserver((mutations) => {
      this.queue.forEach((fn) => fn(mutations));
    });
    mutationObserver.observe(document.body, {
      subtree: true, // 如果设置为true，配合属性"attributes"、"childList"、"characterData"等可以实现目标节点整个dom tree的变动
      childList: true, // 是否监视指定的一个或多个节点以添加或删除新的子节点
      attributes: true, // 属性
      attributeFilter: ['style', 'class', 'id'],
    });
  }
  add(fn: (mutations?: MutationRecord[]) => void) {
    this.queue.add(fn);
  }
  remove(fn: (mutations?: MutationRecord[]) => void) {
    this.queue.delete(fn);
  }
}

export default new DocumentObserve();
