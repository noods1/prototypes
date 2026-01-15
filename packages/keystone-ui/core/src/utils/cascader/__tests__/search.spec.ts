import { SearchController } from '../search';
import { EnumTreeItemKeys } from '../../tree/treeMap';

describe('SearchController', () => {
  // 模拟 Cascader 组件
  const mockCascader = {
    'ks-name': 'ks-cascader',
    ignoreCase: false,
    searchDebounceTime: 0,
    datasourceMap: {},
    searchResultList: [],
    queryString: '',
    ksSearchChange: {
      emit: jest.fn(),
    },
    search: undefined,
    searchValue: undefined,
  };

  // 模拟 MultipleCascader 组件
  const mockMultipleCascader = {
    'ks-name': 'ks-multiple-cascader',
    ignoreCase: false,
    searchDebounceTime: 0,
    _datasourceMap: {},
    searchResultList: [],
    queryString: '',
    ksSearchChange: {
      emit: jest.fn(),
    },
    search: undefined,
    searchValue: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCascader.search = undefined;
    mockMultipleCascader.search = undefined;
    mockCascader.searchResultList = [];
    mockMultipleCascader.searchResultList = [];
  });

  // 测试构造函数
  it('should create a SearchController instance', () => {
    const controller = new SearchController(mockCascader as any);
    expect(controller).toBeTruthy();
  });

  // 测试 searchChangeHandler 方法
  it('should emit ksSearchChange event when searchChangeHandler is called', () => {
    const controller = new SearchController(mockCascader as any);
    controller.searchChangeHandler({ detail: 'test' } as any);
    expect(mockCascader.ksSearchChange.emit).toHaveBeenCalledWith('test');
  });

  // 测试 searchChangeHandler 方法 - 非受控模式
  it('should update queryString when searchValue is undefined', () => {
    const controller = new SearchController(mockCascader as any);
    mockCascader.searchValue = undefined;
    controller.searchChangeHandler({ detail: 'test' } as any);
    expect(mockCascader.queryString).toBe('test');
  });

  // 测试 searchChangeHandler 方法 - 受控模式
  it('should not update queryString when searchValue is defined', () => {
    const controller = new SearchController(mockCascader as any);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    mockCascader.searchValue = 'controlled';
    mockCascader.queryString = 'controlled';
    controller.searchChangeHandler({ detail: 'test' } as any);
    expect(mockCascader.queryString).toBe('controlled');
  });

  // 测试 _performSearch 方法 - 空搜索字符串
  it('should clear searchResultList when search string is empty', () => {
    const controller = new SearchController(mockCascader as any);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    mockCascader.searchResultList = ['some result'];
    controller['_performSearch']('');
    expect(mockCascader.searchResultList).toEqual([]);
  });

  // 测试 _performSearch 方法 - 默认搜索逻辑
  it('should search using default logic when search function is not provided', () => {
    const controller = new SearchController(mockCascader as any);
    mockCascader.datasourceMap = {
      item1: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'value1',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'label1',
      },
      item2: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'value2',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'label2',
      },
    };
    controller['_performSearch']('label1');
    expect(mockCascader.searchResultList.length).toBe(1);
  });

  // 测试 _performSearch 方法 - 自定义搜索逻辑
  it('should search using custom search function when provided', () => {
    const controller = new SearchController(mockCascader as any);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    mockCascader.search = jest.fn().mockImplementation((query, option) => {
      return option[EnumTreeItemKeys.FULL_LABEL_KEY].includes(query);
    });
    mockCascader.datasourceMap = {
      item1: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'value1',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'apple',
      },
      item2: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'value2',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'banana',
      },
    };
    controller['_performSearch']('app');
    expect(mockCascader.search).toHaveBeenCalled();
    expect(mockCascader.searchResultList.length).toBe(1);
  });

  // 测试 _performSearch 方法 - 忽略大小写
  it('should ignore case when ignoreCase is true', () => {
    const controller = new SearchController(mockCascader as any);
    mockCascader.ignoreCase = true;
    mockCascader.datasourceMap = {
      item1: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'valuexx',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'Apple',
      },
    };
    controller['_performSearch']('apple');
    expect(mockCascader.searchResultList.length).toBe(1);
  });

  // 测试 MultipleCascader 的数据源
  it('should use _datasourceMap for MultipleCascader', () => {
    const controller = new SearchController(mockMultipleCascader as any);
    mockMultipleCascader._datasourceMap = {
      item1: {
        [EnumTreeItemKeys.FULL_VALUE_KEY]: 'value1',
        [EnumTreeItemKeys.FULL_LABEL_KEY]: 'label1',
      },
    };
    controller['_performSearch']('label1');
    expect(mockMultipleCascader.searchResultList.length).toBe(1);
  });
});
