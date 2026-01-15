import {
  Component,
  h,
  Prop,
  Event,
  State,
  Host,
  Watch,
  Element,
  type EventEmitter,
  type ComponentInterface,
} from '@stencil/core';
import { dir, t } from '@src/utils/utils';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { getTotalPageCount, getPaginationItemList, getPaginationWindowSize } from './utils';

import type { DropdownItem, IPresenterKey } from '@src/entities';
import { paginationMessages } from '@fe-infra/keystone-locales';

const PREFIX = 'pager';

@Component({
  tag: 'ks-pagination',
  styleUrl: 'ks-pagination.scss',
  shadow: true,
})
export class KsPagination implements ComponentInterface {
  ['ks-name'] = 'ks-pagination';
  private isPageSizeControlled = false;
  private isCurrentPageControlled = false;

  @Element() el!: HTMLKsPaginationElement;

  @State() internalPageSize = 10;
  @State() internalCurrentPage = 1;

  /**
   * @locale {en} Whether the pagination is disabled. When true, all controls are not interactive.
   * @locale {zh} 是否禁用分页。当为 true 时，所有交互控件不可用。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} Initial page number in uncontrolled mode. Ignored when `page` is provided.
   * @locale {zh} 非受控模式下的初始页码。当传入 `page` 时，此值将被忽略。
   */
  @Prop() defaultPage = 1;
  /**
   * @locale {en} Current page number (controlled). When provided, the component becomes controlled for page state.
   * The component will emit `ksPageChange`, but internal page state won't change unless the prop updates.
   * @locale {zh} 当前页码（受控）。一旦传入，分页的页码由外部控制。组件仍会触发 `ksPageChange`，
   * 但内部状态不会自行更新，需由外部根据事件回写。
   */
  @Prop() page?: number;
  @Watch('page')
  protected pageWatcher(page: number) {
    if (this.isCurrentPageControlled && page !== undefined) {
      this.internalCurrentPage = page;
    }
  }
  /**
   * @locale {en} Initial page size in uncontrolled mode. Ignored when `pageSize` is provided.
   * @locale {zh} 非受控模式下的初始每页条数。当传入 `pageSize` 时，此值将被忽略。
   */
  @Prop() defaultPageSize = 10;
  /**
   * @locale {en} Page size (controlled). When provided, the component becomes controlled for page size.
   * The component will emit `ksPageSizeChange`, but internal page size won't change unless the prop updates.
   * @locale {zh} 每页条数（受控）。一旦传入，分页的每页条数由外部控制。组件会触发 `ksPageSizeChange`，
   * 但内部状态不会自行更新，需由外部根据事件回写。
   */
  @Prop() pageSize?: number;
  @Watch('pageSize')
  protected pageSizeWatcher(pageSize: number) {
    if (this.isPageSizeControlled && pageSize !== undefined) {
      this.internalPageSize = pageSize;
    }
  }
  /**
   * @locale {en} Candidate page sizes for the user to select. Only rendered when `size` is `"md"`.
   * Selecting a page size may clamp the current page to the last available page.
   * @locale {zh} 供用户选择的每页条数列表。仅在 `size` 为 `"md"` 时渲染。变更后，当前页可能会被
   * 截断到可用的最后一页。
   */
  @Prop() pageSizeList: number[] = [];
  /**
   * @locale {en} Visual style of the pagination.
   * - `sm`: compact mode, displays "current/total" only.
   * - `md`: standard mode, displays page numbers; supports `showJump`, `showTotal`, and `pageSizeList`.
   * - `dropdown`: page is selected from a dropdown; prev/next buttons remain.
   * @locale {zh} 分页的展示样式。
   * - `sm`: 紧凑模式，仅展示 “当前/总页数”。
   * - `md`: 标准模式，展示页码；支持 `showJump`、`showTotal` 与 `pageSizeList`。
   * - `dropdown`: 通过下拉选择页码，同时保留上一页/下一页按钮。
   */
  @Prop() size: 'sm' | 'md' | 'dropdown' = 'md';
  /**
   * @locale {en} Total number of records across all pages. Used with `pageSize` to compute total pages.
   * @locale {zh} 数据总条数。与 `pageSize` 一起用于计算总页数。
   */
  @Prop() total = 0;
  /**
   * @locale {en} Whether to display the total number of records. Only effective when `size` is `"md"`.
   * If `renderTotal` is provided, its return value takes precedence.
   * @locale {zh} 是否显示数据总数。仅在 `size` 为 `"md"` 时生效。若提供 `renderTotal`，其返回值优先显示。
   */
  @Prop() showTotal = false;
  /**
   * @locale {en} Whether to show the page jump input. Only effective when `size` is `"md"` and
   * the total page count exceeds the window size.
   * @locale {zh} 是否显示页码跳转输入。仅在 `size` 为 `"md"` 且总页数大于窗口大小时显示。
   */
  @Prop() showJump = false;
  /**
   * @locale {en} Number of contiguous page numbers to show on each side between the ellipses in `md` mode.
   * Controls the visible window of page buttons.
   * @locale {zh} `md` 模式下省略号两侧连续可见页码的数量，用于控制页码按钮的可见窗口宽度。
   */
  @Prop() wrapNums = 2;
  /**
   * @locale {en} Custom renderer for the total text. Called with `total` and should return a display string.
   * Only used when `size` is `"md"`.
   * @locale {zh} 自定义总数文案渲染函数。入参为 `total`，返回用于展示的字符串。仅在 `size` 为 `"md"` 时使用。
   */
  @Prop() renderTotal?: (total: number) => string;
  /**
   * @locale {en} Fired when the current page changes. Payload is the new page number.
   * Triggers on prev/next click, number button click, and dropdown selection.
   * Emitted in both controlled and uncontrolled modes.
   * @locale {zh} 当前页变更时触发，事件负载为新页码。上一页/下一页、页码按钮以及下拉选择都会触发。
   * 受控与非受控模式下均会触发此事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksPageChange: EventEmitter<number>;
  /**
   * @locale {en} Emitted when the page size changes. Payload contains the effective `page` (possibly clamped)
   * and the new `pageSize`.
   * @locale {zh} 每页条数变更时触发。事件负载包含变更后的有效 `page`（可能被截断）与新的 `pageSize`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksPageSizeChange: EventEmitter<{ page: number; pageSize: number }>;

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this.isCurrentPageControlled = this.page !== undefined;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.internalCurrentPage = this.isCurrentPageControlled ? this.page : this.defaultPage;

    this.isPageSizeControlled = this.pageSize !== undefined;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.internalPageSize = this.isPageSizeControlled ? this.pageSize : this.defaultPageSize;
  }

  private handleJumperJump = ({ detail }: CustomEvent<number>) => {
    this.handleChange(detail)();
  };

  private handleChange = (page: number) => () => {
    if (!this.isCurrentPageControlled) {
      this.internalCurrentPage = page;
    }

    this.ksPageChange.emit(page);

    sendActionTracking(this.el, { eventType: 'change', subEventType: 'page', componentParams: { page } });
  };

  private handlePaginationChange = ({ detail }: CustomEvent<IPresenterKey | IPresenterKey[]>) => {
    const page = detail as number;

    if (!this.isCurrentPageControlled) {
      this.internalCurrentPage = page;
    }

    this.ksPageChange.emit(page);

    sendActionTracking(this.el, { eventType: 'change', subEventType: 'page', componentParams: { page } });
  };

  private handlePageSizeChange = ({ detail }: CustomEvent<IPresenterKey | IPresenterKey[]>) => {
    const pageSize = Number(detail as IPresenterKey);
    if (!this.isPageSizeControlled) {
      this.internalPageSize = pageSize;
    }

    const totalPageCount = getTotalPageCount(this.total, pageSize);
    const page = Math.min(this.internalCurrentPage, totalPageCount);
    if (!this.isCurrentPageControlled) {
      this.internalCurrentPage = page;
    }

    this.ksPageSizeChange.emit({ page, pageSize });

    sendActionTracking(this.el, { eventType: 'change', subEventType: 'pageSize', componentParams: { page, pageSize } });
  };

  private renderTotalArea() {
    if (!this.showTotal || this.size !== 'md') {
      return null;
    }

    return (
      <span class={`${PREFIX}__record`} part="record">
        {this.renderTotal?.(this.total) || t(paginationMessages.total, { total: this.total })}
      </span>
    );
  }

  private renderPageSizeList() {
    const { pageSizeList, disabled, internalPageSize, size } = this;

    if (!pageSizeList.length || size !== 'md') {
      return null;
    }

    const items = this.pageSizeList.map<DropdownItem>((item) => ({
      type: 'single',
      id: item,
      content: `${item}/${t(paginationMessages.page)}`,
    }));

    return (
      <ks-input-selector
        class={`${PREFIX}__select`}
        part="select"
        size="sm"
        width="auto"
        clearable={false}
        disabled={disabled}
        value={internalPageSize}
        dataSource={{
          type: 'list',
          items,
        }}
        onKsChange={this.handlePageSizeChange}
        data-testid="ks-pagination-index-dx4Jv9"
      />
    );
  }

  private renderJumper(totalPageCount: number) {
    const { showJump, wrapNums, size } = this;

    if (size !== 'md' || !showJump || totalPageCount <= getPaginationWindowSize(wrapNums)) {
      return null;
    }

    return (
      <ks-pagination-jumper
        class={`${PREFIX}__jumper`}
        onKsJump={this.handleJumperJump}
        data-testid="ks-pagination-ks-pagination-baTEqF"
      >
        {t(paginationMessages.go)}
      </ks-pagination-jumper>
    );
  }

  private renderDropdownPagination(totalPageCount: number) {
    const { disabled, internalCurrentPage } = this;

    const items = Array.from(
      { length: totalPageCount },
      (_, j): DropdownItem => ({
        type: 'single',
        id: j + 1,
        content: `${j + 1}`,
      }),
    );

    return (
      <ks-input-selector
        class={`${PREFIX}__select`}
        clearable={false}
        size="md"
        disabled={disabled}
        value={internalCurrentPage}
        dataSource={{
          type: 'list',
          items,
        }}
        onKsChange={this.handlePaginationChange}
        data-testid="ks-pagination-ks-pagination-1tGBm2"
      />
    );
  }

  render() {
    const { size, total, disabled, wrapNums, internalCurrentPage, internalPageSize } = this;

    const totalPageCount = getTotalPageCount(total, internalPageSize);

    const isPrevDisabled = internalCurrentPage <= 1 || disabled;
    const isNextDisabled = internalCurrentPage >= totalPageCount || disabled;

    return (
      <Host dir={dir()} ks-pagination>
        <div dir={dir()} class={`${PREFIX} ${PREFIX}--${size}`} part="self">
          {this.renderTotalArea()}

          <ks-button
            part="prev"
            size="sm"
            shape="square"
            variant="text"
            disabled={isPrevDisabled}
            onClick={this.handleChange(internalCurrentPage - 1)}
            data-testid="ks-pagination-index-pEQrn1"
          >
            <ks-icon-chevron-left
              class={{ [`${PREFIX}__button-icon`]: true, [`${PREFIX}__button-icon--disabled`]: isPrevDisabled }}
            />
          </ks-button>

          {size === 'sm' && (
            <div class={`${PREFIX}__item ${PREFIX}__item--simple`}>
              <span>{internalCurrentPage}</span>
              <span>/</span>
              <span>{totalPageCount}</span>
            </div>
          )}

          {size === 'md' &&
            getPaginationItemList({
              wrapNums,
              totalPageCount,
              currentPage: internalCurrentPage,
            }).map(({ value, label }) => (
              <ks-button
                key={`page-${label}`}
                class={{ [`${PREFIX}__item`]: true, [`${PREFIX}__item--active`]: internalCurrentPage === value }}
                part={internalCurrentPage === value ? 'page-active' : 'page'}
                size="sm"
                variant="text"
                disabled={this.disabled}
                onClick={this.handleChange(value)}
                data-testid={`ks-pagination-index-gKfSFW-${`page-${label}`}`}
              >
                {label}
              </ks-button>
            ))}
          {size === 'dropdown' && this.renderDropdownPagination(totalPageCount)}

          <ks-button
            class={`${PREFIX}__button`}
            part="next"
            size="sm"
            shape="square"
            variant="text"
            disabled={isNextDisabled}
            onClick={this.handleChange(internalCurrentPage + 1)}
            data-testid="ks-pagination-index-4C8Rxx"
          >
            <ks-icon-chevron-right
              class={{ [`${PREFIX}__button-icon`]: true, [`${PREFIX}__button-icon--disabled`]: isNextDisabled }}
            />
          </ks-button>

          {this.renderPageSizeList()}

          {this.renderJumper(totalPageCount)}
        </div>
      </Host>
    );
  }
}
