import { Component, h, Prop, Element, Host, ComponentInterface } from '@stencil/core';
import classnames from 'classnames';
import { TreeMap, EnumTreeItemKeys, CheckStrategy } from '../../../utils/tree/treeMap';
import { CascaderItemValue, CascaderItem, CascaderTreeItem, DataSourceMap } from '../../../entities';
import { t } from '@src/utils/utils';
import { commonMessages } from '@fe-infra/keystone-locales';

const prefix = 'cascader-searchlist';

@Component({
  tag: 'ks-cascader-searchlist',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCascaderSearchlist implements ComponentInterface {
  ['ks-name'] = 'ks-cascader-searchlist';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCascaderSearchlistElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  endEl: HTMLElement;
  @Prop() valueKey = 'value';
  @Prop() labelKey = 'label';
  @Prop() disabledKey = 'disabled';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() displayWidth: string;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() panelHeight: string;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() treeMap: TreeMap<CascaderItem>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() dataSource: Array<CascaderTreeItem>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() datasourceMap: DataSourceMap;
  @Prop() multiple = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() queryString: string;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() checkStrategy: CheckStrategy;
  @Prop() selectedFullValue?: CascaderItemValue | Set<CascaderItemValue>; // 单选 & 多选
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /** 单选时更新值 */
  @Prop() updateSelectedFullValue?: (selectOption: CascaderItem) => void;
  /** 多选时更新值 */
  @Prop() addSelectedFullValue?: (selectOption: CascaderItem) => void;
  @Prop() removeSelectedFullValue?: (selectOption: CascaderItem) => void;

  multipleChangeItem(changeOption: CascaderTreeItem, checked: boolean) {
    checked ? this.addSelectedFullValue?.(changeOption) : this.removeSelectedFullValue?.(changeOption);
  }

  singleActiveItem(activeOption: CascaderTreeItem, disabled: boolean) {
    !disabled && this.updateSelectedFullValue?.(activeOption);
  }

  renderItem(option: CascaderTreeItem) {
    const classPrefix = `${prefix}__item`;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ancestryDisabled = option[EnumTreeItemKeys.FULL_PATH_KEY].some(
      (parentFullValue) => this.datasourceMap[parentFullValue]?.disabled,
    );
    const label = option[this.labelKey];
    const disabled = option[this.disabledKey] || this.disabled || ancestryDisabled;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const searchIndex = option[this.labelKey].toLowerCase().indexOf(this.queryString.toLowerCase());

    const highlightContent =
      searchIndex > -1 ? (
        <ks-text class={`${prefix}__text`} ellipsis variant="bodySm">
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {searchIndex > 0 && <span>{label.toString().slice(0, searchIndex)}</span>}
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          <span data-highlight>{label.slice(searchIndex, this.queryString.length + searchIndex)}</span>
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {searchIndex + this.queryString.length < label?.length && (
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            <span>{label.toString().slice(this.queryString.length + searchIndex)}</span>
          )}
        </ks-text>
      ) : (
        <ks-text ellipsis variant="bodySm">
          {label}
        </ks-text>
      );
    if (this.multiple) {
      const { selected, isIndeterminate } = this.treeMap.isSelectedInMultipleMode(
        option,
        this.selectedFullValue as Set<CascaderItemValue>,
        this.checkStrategy,
      );
      return (
        <div
          class={classnames(`${classPrefix}`, {
            [`${classPrefix}--selected`]: selected || isIndeterminate,
            [`${classPrefix}--disabled`]: disabled,
          })}
          part="item"
        >
          <div class={classnames(`${classPrefix}__left`, `${classPrefix}__left--fulllabel`)} part="item-left">
            <ks-checkbox
              checked={selected}
              indeterminate={isIndeterminate}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              disabled={disabled}
              onKsChange={({ detail }) => {
                this.multipleChangeItem(option, detail);
              }}
              data-testid="searchlist-index-mUbuQW"
            >
              {highlightContent}
            </ks-checkbox>
          </div>
        </div>
      );
    } else {
      const selected = this.treeMap.isSelectedInSingleMode(option, this.selectedFullValue as CascaderItemValue);
      return (
        <div
          class={classnames(`${classPrefix}`, {
            [`${classPrefix}--selected`]: selected,
            [`${classPrefix}--disabled`]: disabled,
          })}
          onClick={() => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.singleActiveItem(option, disabled);
          }}
          part="item"
          data-testid="searchlist-index-qkjYC8"
        >
          <div class={classnames(`${classPrefix}__left`)} part="item-left">
            {highlightContent}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Host>
        <div
          class={classnames(`${prefix}`)}
          style={{
            width: this.displayWidth,
            height: this.panelHeight,
          }}
        >
          {this.dataSource.length ? (
            this.dataSource.map((option: CascaderTreeItem) => this.renderItem(option))
          ) : (
            <ks-empty-states title={t(commonMessages.empty)}></ks-empty-states>
          )}
        </div>
      </Host>
    );
  }
}
