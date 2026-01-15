import { Component, Prop, h, Host, Event, Watch, State, EventEmitter, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { forceReflow } from '@src/utils/dom/reflow';
import { Slot, Slots } from '@src/utils/decorators';
import { KsTransitionStatus } from '@src/entities/components/transition';

/*!
 * Code based on third party project react-transition-group (v4.4.5): https://github.com/reactjs/react-transition-group.
 * License:
 * ---------------------------------
    BSD 3-Clause License

    Copyright (c) 2018, React Community
    Forked from React (https://github.com/facebook/react) Copyright 2013-present, Facebook, Inc.
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

    * Neither the name of the copyright holder nor the names of its
      contributors may be used to endorse or promote products derived from
      this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ---------------------------------
 */

// const prefix = 'transition';

@Component({
  tag: 'ks-transition',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTransition {
  ['ks-name'] = 'ks-transition';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTransitionElement;
  /**
   * @locale {en} Controls whether the component is visible. Setting to `true` triggers the enter transition, and `false` triggers the exit transition.
   * @locale {zh} 控制组件是否可见。设置为 `true` 会触发进入过渡，设置为 `false` 会触发退出过渡。
   */
  @Prop() in = false;
  /**
   * @locale {en} The duration of the transition in milliseconds. Can be a single number for all transitions or an object specifying `enter`, `exit`, and `appear` durations. Required unless `addEndListener` is provided.
   * @locale {zh} 过渡的持续时间（以毫秒为单位）。可以是适用于所有过渡的单个数字，也可以是指定 `enter`、`exit` 和 `appear` 持续时间的对象。除非提供了 `addEndListener`，否则此属性为必需。
   */
  @Prop() timeout: number | { enter?: number; exit?: number; appear?: number } | null = null;

  /**
   * @locale {en} A callback function that can be used to manually handle the end of a transition. It receives the transitioning DOM node and a `done` callback that should be called when the transition is complete. Overrides the `timeout` prop if provided.
   * @locale {zh} 一个回调函数，可用于手动处理过渡的结束。它接收正在过渡的 DOM 节点和一个应在过渡完成时调用的 `done` 回调。如果提供，则会覆盖 `timeout` 属性。
   */
  @Prop() addEndListener?: (node: HTMLElement, callback: () => void) => void;

  /** ---SECTION-START--- We only implements these as fixed value, TODO support them as props in the future  */
  readonly unmountOnExit = false;
  readonly mountOnEnter = true;
  readonly enter = true;
  readonly exit = true;
  /**
   * By default the child component does not perform the enter transition when it first mounts, regardless of the value of in. If you want this behavior, set both appear and in to true.
   * Note: there are no special appear states like appearing/appeared, this prop only adds an additional enter transition. However, in the <CSSTransition> component that first enter transition does result in additional .appear-* classes, that way you can choose to style it differently.
   */
  readonly appear: boolean = false; // TODO appear should be a prop, but it does not works now
  /** ---SECTION-END----- */

  /**
   * @locale {en} Fired before the "entering" status is applied. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "entering" 状态之前触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksEnter: EventEmitter<HTMLElement>;
  /**
   * @locale {en} Fired after the "entering" status is applied and animations have started. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "entering" 状态并且动画已开始后触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksEntering: EventEmitter<HTMLElement>;
  /**
   * @locale {en} Fired after the "entered" status is applied and animations have completed. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "entered" 状态并且动画已完成后触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksEntered: EventEmitter<HTMLElement>;
  /**
   * @locale {en} Fired before the "exiting" status is applied. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "exiting" 状态之前触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksExit: EventEmitter<HTMLElement>;
  /**
   * @locale {en} Fired after the "exiting" status is applied and animations have started. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "exiting" 状态并且动画已开始后触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksExiting: EventEmitter<HTMLElement>;
  /**
   * @locale {en} Fired after the "exited" status is applied and animations have completed. The event detail is the transitioning DOM node.
   * @locale {zh} 在应用 "exited" 状态并且动画已完成后触发。事件详细信息是正在过渡的 DOM 节点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksExited: EventEmitter<HTMLElement>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() currentStatus: KsTransitionStatus;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  appearStatus?: KsTransitionStatus = null;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  nextCallback?: ((param?: unknown) => void) & { cancel: () => void } = null;

  // Implementation for the componentDidUpdate of <Transition> of react-transition-group which only triggers on props change not state change
  // Should watch for all props
  @Watch('in')
  // @Watch('appear')
  @Watch('timeout')
  // "componentDidUpdate"
  propsChangeHandler() {
    let nextStatus: KsTransitionStatus | null = null;

    if (this.in) {
      if (this.currentStatus !== KsTransitionStatus.ENTERING && this.currentStatus !== KsTransitionStatus.ENTERED) {
        nextStatus = KsTransitionStatus.ENTERING;
      }
    } else {
      if (this.currentStatus === KsTransitionStatus.ENTERING || this.currentStatus === KsTransitionStatus.ENTERED) {
        nextStatus = KsTransitionStatus.EXITING;
      }
    }

    this.updateStatus(false, nextStatus);
  }

  componentWillLoad(/*props, context*/) {
    if (this.in) {
      if (this.appear) {
        this.currentStatus = KsTransitionStatus.EXITED;
        this.appearStatus = KsTransitionStatus.ENTERING;
      } else {
        this.currentStatus = KsTransitionStatus.ENTERED;
      }
    } else {
      if (this.unmountOnExit || this.mountOnEnter) {
        this.currentStatus = KsTransitionStatus.UNMOUNTED;
      } else {
        this.currentStatus = KsTransitionStatus.EXITED;
      }
    }
  }

  componentDidLoad() {
    this.updateStatus(true, this.appearStatus);
  }

  disconnectedCallback() {
    this.cancelNextCallback();
  }

  getTimeouts() {
    const { timeout } = this;
    let exit, enter, appear;

    exit = enter = appear = timeout;

    if (timeout && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      // TODO: remove fallback for next major
      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }
    return { exit, enter, appear };
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  updateStatus(mounting: boolean, nextStatus) {
    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === KsTransitionStatus.ENTERING) {
        if (this.unmountOnExit || this.mountOnEnter) {
          // const node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
          const node = this.defaultSlot?.[0];
          // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.
          if (node) {
            forceReflow(node);
          }
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.unmountOnExit && this.currentStatus === KsTransitionStatus.EXITED) {
      this.currentStatus = KsTransitionStatus.UNMOUNTED;
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  performEnter(mounting) {
    const { enter } = this;
    const appearing = /* this.context ? this.context.isMounting : */ mounting;
    // const [maybeNode, maybeAppearing] = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing];
    const maybeNode = this.defaultSlot?.[0];

    const timeouts = this.getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter /* || config.disabled */) {
      this.safeSetState({ currentStatus: KsTransitionStatus.ENTERED }, () => {
        this.ksEntered.emit(maybeNode);
      });
      return;
    }

    this.ksEnter.emit(maybeNode /*, maybeAppearing*/);

    this.safeSetState({ currentStatus: KsTransitionStatus.ENTERING }, () => {
      this.ksEntering.emit(maybeNode /*, maybeAppearing*/);

      this.onTransitionEnd(enterTimeout, () => {
        this.safeSetState({ currentStatus: KsTransitionStatus.ENTERED }, () => {
          this.ksEntered.emit(maybeNode /*, maybeAppearing*/);
        });
      });
    });
  }

  performExit() {
    const { exit } = this;
    const timeouts = this.getTimeouts();
    // const maybeNode = this.props.nodeRef ? undefined : ReactDOM.findDOMNode(this);
    const maybeNode = this.defaultSlot?.[0];

    // no exit animation skip right to EXITED
    if (!exit /* || config.disabled*/) {
      this.safeSetState({ currentStatus: KsTransitionStatus.EXITED }, () => {
        this.ksExited.emit(maybeNode);
      });
      return;
    }

    this.ksExit.emit(maybeNode);

    this.safeSetState({ currentStatus: KsTransitionStatus.EXITING }, () => {
      this.ksExiting.emit(maybeNode);

      this.onTransitionEnd(timeouts.exit, () => {
        this.safeSetState({ currentStatus: KsTransitionStatus.EXITED }, () => {
          this.ksExited.emit(maybeNode);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.nextCallback.cancel();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.nextCallback = null;
    }
  }

  _afterRendering: ((...args: unknown[]) => unknown)[] = [];
  componentDidRender() {
    while (this._afterRendering.length) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this._afterRendering.pop()();
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  safeSetState(nextState: Partial<KsTransition>, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    Object.assign(this, nextState);
    this._afterRendering.push(callback);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  setNextCallback(callback) {
    let active = true;

    this.nextCallback = ((event) => {
      if (active) {
        active = false;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.nextCallback = null;

        callback(event);
      }
    }) as ((param?: unknown) => void) & { cancel: () => void };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    // const node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    const node = this.defaultSlot?.[0];

    const doesNotHaveTimeoutOrListener = !!timeout && !this.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback as () => void, 0);
      return;
    }

    if (this.addEndListener) {
      const [maybeNode, maybeNextCallback] = /*this.props.nodeRef ? [this.nextCallback] : */ [node, this.nextCallback];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout) {
      setTimeout(this.nextCallback as () => void, timeout);
    }
  }

  render() {
    return (
      <Host dir={dir()} ks-transition>
        <slot></slot>
      </Host>
    );
  }
}
