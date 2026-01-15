import type { KsCascader } from '@src/components/ks-cascader';
import type { KsMultipleCascader } from '@src/components/ks-cascader/multiple';
import type { DataSourceMap } from '@src/entities/components/cascader';
import type { KsInputCustomEvent } from '@src/components';
import { debounce } from 'lodash-es';
import { escapeRegExp } from '../utils';
import { EnumTreeItemKeys } from '../tree/treeMap';

export class SearchController {
  private component: KsCascader | KsMultipleCascader;

  constructor(component: KsCascader | KsMultipleCascader) {
    this.component = component;
    this.debouncedSearch = debounce(this._performSearch, this.component.searchDebounceTime);
  }

  private _performSearch = (searchString: string) => {
    const ignoreCase = this.component.ignoreCase;
    if (!searchString) {
      this.component.searchResultList = [];
      return;
    }
    const queryPatt = ignoreCase ? new RegExp(escapeRegExp(searchString), 'i') : new RegExp(escapeRegExp(searchString));
    const result = [];

    let datasource: DataSourceMap;
    if (this.component['ks-name'] === 'ks-multiple-cascader') {
      datasource = (this.component as KsMultipleCascader)._datasourceMap;
    } else {
      datasource = this.component.datasourceMap;
    }

    if (this.component.search !== undefined) {
      for (const key in datasource) {
        const option = datasource[key];
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (this.component.search(searchString, option)) {
          result.push(option);
        }
      }
    } else {
      for (const key in datasource) {
        const option = datasource[key];
        if (
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          String(option[EnumTreeItemKeys.FULL_VALUE_KEY]).match(queryPatt) ||
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          String(option[EnumTreeItemKeys.FULL_LABEL_KEY]).match(queryPatt)
        ) {
          result.push(option);
        }
      }
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.component.searchResultList = result;
  };

  public debouncedSearch: (query: string) => void;

  public searchChangeHandler = ({ detail }: KsInputCustomEvent<string>) => {
    this.component.ksSearchChange.emit(detail);
    if (this.component.searchValue === undefined) {
      this.component.queryString = detail;
    }
  };
}
