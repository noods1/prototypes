import { Component, h, Prop, Host, ComponentInterface, Element, State, Event, EventEmitter } from '@stencil/core';
import { throttle } from 'lodash-es';
import { dir, t } from '@src/utils/utils';
import classNames from 'classnames';
import { IPresenterValue, Status, IPresenterKey } from '@src/entities';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { searchMessages } from '@fe-infra/keystone-locales';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'search';

@Component({
  tag: 'ks-search',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSearch implements ComponentInterface {
  ['ks-name'] = 'ks-search';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSearchElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  ksInputEl: HTMLKsInputElement;
  /**
   * @locale {en} The current input value of the search box.
   * @locale {zh} 搜索框的当前输入值。
   */
  @Prop() @Vue2ValueFix() value?: string;
  /**
   * @locale {en} Indicates whether the search box is disabled. When `true`, the search box will be inactive.
   * @locale {zh} 指示搜索框是否被禁用。当为 `true` 时，搜索框将处于非活动状态。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} The placeholder text displayed in the search input field when it is empty.
   * @locale {zh} 搜索输入框为空时显示的占位符文本。
   */
  @Prop() placeholder?: string;
  /**
   * @locale {en} The placeholder text for the category dropdown, displayed when no category is selected.
   * @locale {zh} 类别下拉菜单的占位符文本，当未选择任何类别时显示。
   */
  @Prop() categoryPlaceholder?: string;
  /**
   * @locale {en} A list of categories that users can choose from.
   * @locale {zh} 用户可以选择的类别列表。
   */
  @Prop() categories?: IPresenterValue[];
  /**
   * @locale {en} A list of categories that users can choose from.
   * @locale {zh} 用户可以选择的类别列表。
   */
  @Prop() selectedCategory?: IPresenterKey;
  /**
   * @locale {en} The status of the search input. Can be one of the following values: `"default"`, `warning", `"error"`.
   * @locale {zh} 搜索框的状态（默认、警告、错误）。可选值为：`"default"`、`"warning"`、`"error"`。
   */
  @Prop() status?: Exclude<Status, 'success'> = 'default';
  /**
   * @locale {en} A list of suggestions to display as the user types in the search box.
   * @locale {zh} 用户在搜索框中输入时显示的建议列表。
   */
  @Prop() suggestions?: string[];
  /**
   * @locale {en} Indicates whether the input field can be cleared by the user. When `true`, a clear button is displayed to clear the input value.
   * @locale {zh} 指示用户是否可以清除输入框的内容。当值为 `true` 时，将显示一个清除按钮以清空输入值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;

  /**
   * @locale {en} The width of the category select dropdown. Can be a string (e.g., "100px", "50%") or a number (in pixels).
   * @locale {zh} 类别选择下拉框的宽度。可以是一个字符串（例如 "100px", "50%"）或一个数字（单位为像素）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() selectWidth: string | number;

  /**
   * @locale {en} Custom event triggered when the input value changes. This event can be used to handle input changes in real-time.
   * @locale {zh} 输入值更改时触发的自定义事件。此事件可用于实时处理输入更改。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string>;

  /**
   * @locale {en} Custom event triggered when a search action is performed. This event can be used to handle the search action.
   * @locale {zh} 执行搜索操作时触发的自定义事件。此事件可用于处理搜索操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSearch: EventEmitter<string>;
  /**
   * @locale {en} Custom event triggered when the clear button is clicked to clear the input field.
   * @locale {zh} 当点击清除按钮以清空输入框时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClear: EventEmitter<string>;

  /**
   * @locale {en} Custom event triggered when the category selector changes. This event can be used to handle changes in the selected category.
   * @locale {zh} 类别选择器更改时触发的自定义事件。此事件可用于处理所选类别更改。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksCategoryChange: EventEmitter<string>;

  @State() isInputFocused = false;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleInput = ({ detail }) => {
    this.ksChange.emit(detail);
    throttle(() => sendActionTracking(this.el, { eventType: 'change', componentParams: { value: detail } }), 500);
  };
  handleInputFocus = () => {
    this.isInputFocused = true;
    sendActionTracking(this.el, { eventType: 'focus' });
  };
  handleInputBlur = () => {
    this.isInputFocused = false;
    sendActionTracking(this.el, { eventType: 'blur' });
  };

  onInputKeyup = (event: KeyboardEvent) => {
    if (['Enter', 'NumpadEnter'].includes(event.code)) {
      this.ksSearch.emit(this.value);
      sendActionTracking(this.el, { eventType: 'confirm', componentParams: { value: this.value } });
    }
  };

  render() {
    const cls = classNames(prefix, { [`${prefix}__disabled`]: this.disabled });
    return (
      <Host dir={dir()} ks-search>
        <div class={cls}>
          <ks-space compact>
            {this.categories?.length && (
              <ks-input-selector
                value={this.selectedCategory as IPresenterKey}
                placeholder={this.categoryPlaceholder}
                disabled={this.disabled}
                dataSource={{
                  type: 'list',
                  items: this.categories.map(({ key, label }) => ({
                    type: 'single',
                    id: key,
                    content: label,
                    disabled: false,
                  })),
                }}
                width={typeof this.selectWidth === 'string' ? this.selectWidth : `${this.selectWidth}px`}
                onKsVisibleChange={({ detail }) => {
                  if (detail) {
                    sendExposeTracking(this.el, { eventType: 'popup', subEventType: 'category' });
                    sendDurationTracking(this.el, { eventType: 'popup', subEventType: 'category', reset: true });
                  } else {
                    sendDurationTracking(this.el, { eventType: 'popup', subEventType: 'category' });
                  }
                }}
                onKsChange={({ detail }) => {
                  this.ksCategoryChange.emit(detail as string);
                }}
                data-testid="ks-search-index-nT4bhG"
              ></ks-input-selector>
            )}

            {/* style only Search, interaction here is weird, dropdown is also weird */}
            <ks-dropdown-menu
              class={`${prefix}__input`}
              visible={Boolean(this.suggestions?.length && this.isInputFocused)}
              search={(query) => query === this.value}
              dataSource={{
                type: 'list',
                items:
                  this.suggestions?.map((suggestion) => ({
                    type: 'single',
                    content: suggestion,
                    id: suggestion,
                    disabled: false,
                  })) ?? [],
              }}
              searchValue={this.value}
              onKsVisibleChange={({ detail }) => {
                if (detail) {
                  sendExposeTracking(this.el, { eventType: 'popup', subEventType: 'suggestion' });
                  sendDurationTracking(this.el, { eventType: 'popup', subEventType: 'suggestion', reset: true });
                } else {
                  sendDurationTracking(this.el, { eventType: 'popup', subEventType: 'suggestion' });
                }
              }}
              selectable={false}
              onKsValueChange={({ detail }) => {
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                const value = detail[0].content;
                this.ksChange.emit(value);
                sendActionTracking(this.el, {
                  eventType: 'change',
                  subEventType: 'suggestion',
                  componentParams: { value },
                });
              }}
              data-testid="ks-search-index-cGeD77"
            >
              <ks-input
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                ref={(el) => (this.ksInputEl = el)}
                value={this.value}
                placeholder={this.placeholder || t(searchMessages.placeholder)}
                status={this.status}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
                disabled={this.disabled}
                onKsChange={this.handleInput}
                onKeyUp={this.onInputKeyup}
                onKsClear={() => {
                  this.ksClear.emit();
                }}
                clearable={this.clearable}
                data-testid="ks-search-index-muL9Zv"
              >
                {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                {!this.isInputFocused && !this.value && !this.ksInputEl?.inputEl?.value && (
                  <ks-icon-search id="search-icon" size={16} slot="prefix" />
                )}
              </ks-input>
            </ks-dropdown-menu>
          </ks-space>
        </div>
      </Host>
    );
  }
}
