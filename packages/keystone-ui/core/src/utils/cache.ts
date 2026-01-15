// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export function cacheOrUpdate<Key, Value>(key: Key, updateCache: (key: Key, options) => Value, options?) {
  let cachedKey = key + JSON.stringify(options);
  let cachedValue = updateCache(key, options);

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return (key: Key, options?) => {
    if (key !== cachedKey) {
      cachedValue = updateCache(key, options);
      cachedKey = key + JSON.stringify(options);
    }
    return cachedValue;
  };
}

/** Store memory cache to globalThis to be shared across different version of the package */
export function globalThisAsyncCache<T>(key: string, fn: () => Promise<T>): () => Promise<T> {
  let globalObj: typeof globalThis;
  try {
    globalObj = globalThis || window || global;
  } catch (e) {
    /* do nothing */
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const cache: Map<string, Promise<unknown>> = (globalObj.__keystone_global_cache__ ||= new Map());

  return () => {
    let pendingOrResolvedPromise = cache.get(key) as Promise<T> | undefined;
    if (!pendingOrResolvedPromise) {
      pendingOrResolvedPromise = fn();
      cache.set(key, pendingOrResolvedPromise);
      pendingOrResolvedPromise.catch(() => cache.delete(key));
    }

    return pendingOrResolvedPromise;
  };
}
