import { Component, Prop, h, Host, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';

const COLLAPSE_TRANSITION =
  'opacity 200ms var(--ks-transition-easing-standardInOut), height 200ms var(--ks-transition-easing-standardInOut)';

const prefix = 'ks-collapse-transition';

@Component({
  tag: 'ks-collapse-transition',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCollapseTransition {
  ['ks-name'] = 'ks-collapse-transition';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCollapseTransitionElement;
  /**
   * @locale {en} Controls the visibility of the content. Set to `true` to expand and show the content, `false` to collapse and hide it. This triggers the enter or exit transition states.
   * @locale {zh} 控制内容的可见性。设置为 `true` 以展开并显示内容，设置为 `false` 以折叠并隐藏内容。这将触发进入或退出过渡状态。
   */
  @Prop() in = false;

  addEndListener: HTMLKsTransitionElement['addEndListener'] = (node, callback) => {
    node.addEventListener('transitionend', callback, { once: true });
  };

  addTransition(el: HTMLElement) {
    el.style.transition = COLLAPSE_TRANSITION;
  }
  removeTransition(el: HTMLElement) {
    el.style.transition = '';
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsEnter = ({ detail: el }) => {
    if (el.scrollHeight !== 0) {
      this.addTransition(el);
      el.style.height = '0px';
      el.style.opacity = 0;
    }
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  async onKsEntering({ detail: el }) {
    // el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = 1;
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsEntered = ({ detail: el }) => {
    this.removeTransition(el);
    el.style.height = '';
    el.style.opacity = '';
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsExit = ({ detail: el }) => {
    if (el.scrollHeight !== 0) {
      this.addTransition(el);
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = 1;
    }
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsExiting = ({ detail: el }) => {
    if (el.scrollHeight !== 0) {
      el.style.height = '0px';
      el.style.opacity = 0;
    }
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onKsExited = ({ detail: el }) => {
    this.removeTransition(el);
    el.style.height = '';
    el.style.opacity = '';
  };

  render() {
    return (
      <Host dir={dir()} ks-collapse-transition>
        <ks-transition
          in={this.in}
          addEndListener={this.addEndListener}
          onKsEnter={this.onKsEnter}
          onKsEntering={this.onKsEntering}
          onKsEntered={this.onKsEntered}
          onKsExit={this.onKsExit}
          onKsExiting={this.onKsExiting}
          onKsExited={this.onKsExited}
          data-testid="ks-collapse-transition-index-oXoTr7"
        >
          <div class={classNames(`${prefix}__wrapper`, this.in && `${prefix}__wrapper--in`)}>
            <slot></slot>
          </div>
        </ks-transition>
      </Host>
    );
  }
}
