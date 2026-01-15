import { Component, Prop, h, Host, Watch, State, forceUpdate, Element, Fragment } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { Slot, Slots } from '@src/utils/decorators';
import { getListWidth, getListHeight, getDotCount, hasMoreSlide } from '@src/utils/carousel/utils';
import { debounce } from 'lodash-es';

@Component({
  tag: 'ks-carousel',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCarousel {
  ['ks-name'] = 'ks-carousel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCarouselElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  container: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  first: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  last: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  slider: HTMLKsInnerSliderElement;
  /** Show the component; triggers the enter or exit states */
  /**
   * @locale {en} Indicates whether to display navigation dots for the carousel. If set to `true`, dots will be shown to represent the current slide position.
   * @locale {zh} 指示是否显示轮播的导航点。如果设置为 `true`，将显示点以表示当前幻灯片的位置。
   */
  @Prop() dots = false;
  /**
   * @locale {en} Indicates whether to display navigation arrows for the carousel. This can be a boolean value or set to `'overlay'` to show arrows over the slides.
   * - If set to `true`, arrows will be displayed.
   * - If set to `false`, arrows will be hidden.
   * - If set to `'overlay'`, arrows will be shown over the slides.
   * @locale {zh} 指示是否显示轮播的导航箭头。可以是布尔值或设置为 `'overlay'` 以在幻灯片上方显示箭头。
   * - 如果设置为 `true`，将显示箭头。
   * - 如果设置为 `false`，将隐藏箭头。
   * - 如果设置为 `'overlay'`，箭头将在幻灯片上方显示。
   */
  @Prop() arrows: boolean | 'overlay' = false;
  /**
   * @locale {en} Indicates whether the carousel should play automatically. If set to `true`, the slides will transition automatically at a specified interval.
   * @locale {zh} 指示轮播是否应自动播放。如果设置为 `true`，幻灯片将在指定的间隔内自动切换。
   */
  @Prop() autoplay = false;
  /**
   * @locale {en} Indicates whether the carousel should loop continuously. If set to `true`, the carousel will loop back to the first slide after reaching the last slide.
   * @locale {zh} 指示轮播是否应无限循环。如果设置为 `true`，在到达最后一张幻灯片后，轮播将返回到第一张幻灯片。
   */
  @Prop() infinite = false;
  /**
   * @locale {en} The duration (in milliseconds) between each slide transition when `autoplay` is `true`. This value determines how long each slide is displayed before transitioning to the next one. Effective only if `autoplay` is `true`.
   * @locale {zh} 当 `autoplay` 为 `true` 时，每个幻灯片切换之间的持续时间（以毫秒为单位）。此值决定了每个幻灯片在切换到下一个幻灯片之前的显示时间。仅当 `autoplay` 为 `true` 时生效。
   */
  @Prop() autoplaySpeed = 3000;
  /**
   * @locale {en} The number of slides to display at once in the carousel. This value determines how many slides are shown in the viewport simultaneously.
   * @locale {zh} 一次在轮播中显示的幻灯片数量。此值决定在视口中同时显示多少张幻灯片。
   */
  @Prop() slidesToShow = 1;
  /**
   * @locale {en} The number of slides to scroll at a time when navigating through the carousel. This value determines how many slides are moved during each transition.
   * @locale {zh} 在浏览轮播时每次滚动的幻灯片数量。此值决定每次切换时移动多少张幻灯片。
   */
  @Prop() slidesToScroll = 1;
  /**
   * @locale {en} The index of the initial slide to display when the carousel is first rendered. This value determines which slide is shown at the start.
   * @locale {zh} 在轮播首次渲染时显示的初始幻灯片索引。此值决定初始时显示哪一张幻灯片。
   */
  @Prop() initialSlide = 0;
  /**
   * @locale {en} Indicates whether to display pagination controls for the carousel. If set to `true`, pagination dots or indicators will be shown to navigate between slides.
   * @locale {zh} 指示是否显示轮播的分页控制。如果设置为 `true`，将显示分页点或指示器，以在幻灯片之间导航。
   */
  @Prop() pagination = false;
  /**
   * @private 内部属性，请勿使用
   */
  @Prop() bulletinMode = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlots: Slots<HTMLKsCarouselItemElement>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() renderChild;

  @State() containerWidth = 0;

  @State() width = 0;

  @State() sliderWidth = 0;

  @State() height = 0;

  @State() listWidth = 0;

  @State() currentIndex = 0;

  @State() clickArrow: 'left' | 'right' | 'none' = 'none';

  @State() count = 0;

  @State() dotsCount = 0;

  @State() dotsIndex = 1;

  @State() autoplaying = 'playing';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private observer: MutationObserver;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private resizeObserver: ResizeObserver;
  private timer = null;
  private debouncedResize = null;

  @Watch('initialSlide')
  @Watch('slidesToShow')
  @Watch('slidesToScroll')
  @Watch('infinite')
  handleSlidesToShowChange() {
    this.currentIndex = dir() === 'ltr' ? this.initialSlide : this.count - this.initialSlide;
    this.sliderWidth = this.width * this.slidesToScroll;
    this.currentIndex = this.initialSlide;
    this.renameSlot.call(this);
  }

  @Watch('autoplay')
  handleAutoplayChange() {
    if (this.autoplay) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      clearInterval(this.timer);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.timer = setInterval(() => {
        this.clickRightArrow.call(this);
      }, this.autoplaySpeed);
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      clearInterval(this.timer);
    }
  }

  @Watch('currentIndex')
  upDateDotsIndex() {
    this.dotsIndex = 1 + Math.ceil(this.currentIndex / this.slidesToScroll);
  }

  componentWillLoad() {
    this.currentIndex = this.initialSlide;
    this.sliderWidth = this.width * this.slidesToScroll;
    this.upDateDotsIndex();
  }

  componentDidLoad() {
    // const observe = watchTargetDescendantNodesEffect(this.el, this.renameSlot.bind(this));
    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.renameSlot();
        }
      }
    });

    this.resizeObserver = new ResizeObserver(this.onResized.bind(this));

    this.observer.observe(this.el, {
      childList: true, // 监听子元素的变化
    });
    this.resizeObserver.observe(this.el);
    this.containerWidth = getListWidth(this.el);
    this.renameSlot();
    this.handleAutoplayChange();
  }

  onResized() {
    if (this.debouncedResize) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.debouncedResize.cancel();
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.debouncedResize = debounce(() => this.resizeContainer(), 50);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.debouncedResize();
  }

  resizeContainer() {
    this.containerWidth = getListWidth(this.el);
    this.width = this.containerWidth / this.slidesToShow;
    this.sliderWidth = this.width * this.slidesToScroll;
    this.height = getListHeight(this.el);
    this.listWidth = this.slidesToShow * this.width * (this.count + Number(this.infinite) * 2 * this.slidesToShow);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  autoPlay = (playType) => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const { autoplaying } = this;
    if (playType === 'update') {
      if (autoplaying === 'hovered' || autoplaying === 'focused' || autoplaying === 'paused') {
        return;
      }
    } else if (playType === 'leave') {
      if (autoplaying === 'paused' || autoplaying === 'focused') {
        return;
      }
    } else if (playType === 'blur') {
      if (autoplaying === 'paused' || autoplaying === 'hovered') {
        return;
      }
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.timer = setInterval(this.play, this.autoplaySpeed + 50);
    this.autoplaying = 'playing';
  };

  play = () => {
    if (dir() === 'ltr' && (this.infinite || this.currentIndex > 0)) {
      this.clickRightArrow.call(this);
    } else if (this.infinite || hasMoreSlide(this)) {
      this.clickLeftArrow.call(this);
    }
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  pause = (pauseType) => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const { autoplaying } = this;
    if (pauseType === 'paused') {
      this.autoplaying = 'paused';
    } else if (pauseType === 'focused') {
      if (autoplaying === 'hovered' || autoplaying === 'playing') {
        this.autoplaying = 'focused';
      }
    } else {
      // pauseType  is 'hovered'
      if (autoplaying === 'playing') {
        this.autoplaying = 'hovered';
      }
    }
  };

  onDotsOver = () => this.autoplay && this.pause('hovered');
  onDotsLeave = () => this.autoplay && this.autoplaying === 'hovered' && this.autoPlay('leave');
  onTrackOver = () => this.autoplay && this.pause('hovered');
  onTrackLeave = () => {
    this.autoplay && this.autoplaying === 'hovered' && this.autoPlay('leave');
  };
  onSlideFocus = () => this.autoplay && this.pause('focused');
  onSlideBlur = () => this.autoplay && this.autoplaying === 'focused' && this.autoPlay('blur');

  disconnectedCallback() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    clearInterval(this.timer);
  }

  renameSlot() {
    Array.from(this?.el.children).forEach((item, index) => {
      item.slot = `carousel-${index}`;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.onmouseover = this.onSlideFocus.bind(this);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item.onmouseleave = this.onSlideBlur.bind(this);
    });
    this.width = this.containerWidth / this.slidesToShow;
    this.sliderWidth = this.width * this.slidesToScroll;
    this.height = getListHeight(this.el);
    this.count = this?.el.children?.length;
    this.dotsCount = getDotCount({
      slideCount: this.count,
      slidesToScroll: this.slidesToScroll,
      slidesToShow: this.slidesToShow,
      infinite: this.infinite,
    });
    if (this.infinite) {
      const lastChildList = Array.from(this?.el.children)
        .slice(0, this.slidesToShow)
        .map((item) => {
          const dom = document.createElement('div');
          dom.style.width = `${this.width}px`;
          dom.appendChild(item.cloneNode(true));
          dom.onfocus = this.onSlideFocus.bind(this);
          dom.onblur = this.onSlideBlur.bind(this);
          return dom;
        });
      const firstChildList = Array.from(this?.el.children)
        .slice(this.count - this.slidesToShow, this.count)
        .map((item) => {
          const dom = document.createElement('div');
          dom.style.width = `${this.width}px`;
          dom.appendChild(item.cloneNode(true));
          dom.onfocus = this.onSlideFocus.bind(this);
          dom.onblur = this.onSlideBlur.bind(this);
          return dom;
        });
      // this.slider?.append(...lastChildList);
      this.last.replaceChildren(...lastChildList);
      this.first.replaceChildren(...firstChildList);
    }

    this.listWidth = this.slidesToShow * this.width * (this.count + Number(this.infinite) * 2 * this.slidesToShow);
    forceUpdate(this.el);
  }

  renderCarousel() {
    const itemList = Array.from(this?.el.children)?.map((_, index) => (
      <div key={index} style={{ width: `${this.width}px` }} data-testid={`ks-carousel-index-cDdYjP-${index}`}>
        <slot name={`carousel-${index}`}></slot>
      </div>
    ));
    return (
      <Fragment>
        {this.infinite && (
          <div
            key="first"
            class={'first'}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.first = el)}
            style={{ width: `${this.slidesToShow * this.width}px`, float: 'left', display: 'flex' }}
            data-testid="ks-carousel-index-47jCpv"
          ></div>
        )}

        {itemList}
        {this.infinite && (
          <div
            key="last"
            class={'last'}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.last = el)}
            style={{ width: `${this.slidesToShow * this.width}px`, float: 'left', display: 'flex' }}
            data-testid="ks-carousel-index-3Gwhha"
          ></div>
        )}
      </Fragment>
    );
  }

  clickLeftArrow() {
    if (this.currentIndex >= this.slidesToScroll) {
      this.currentIndex = this.currentIndex - this.slidesToScroll;
    } else if (this.infinite) {
      const tempCurrent = this.currentIndex - this.slidesToScroll;
      this.currentIndex = this.count + Math.max(-this.slidesToShow, tempCurrent);
    } else {
      this.currentIndex = 0;
    }
    this.clickArrow = 'left';
  }

  clickRightArrow() {
    if (this.currentIndex + this.slidesToShow < this.count - this.slidesToScroll) {
      this.currentIndex = this.currentIndex + this.slidesToScroll;
    } else if (this.infinite) {
      const tempCurrent = this.currentIndex + this.slidesToScroll;
      this.currentIndex = tempCurrent >= this.count ? 0 : tempCurrent;
    } else {
      this.currentIndex = this.count - this.slidesToShow;
    }
    this.clickArrow = 'right';
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleArrowButtonClick(e) {
    const { detail }: { detail: string } = e;
    if (this.autoplay) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      clearInterval(this.timer);
    }
    if (detail === 'left') {
      this.clickLeftArrow();
    } else {
      this.clickRightArrow();
    }
  }

  render() {
    return (
      <Host dir={dir()} ks-carousel>
        <ks-inner-slider
          clickArrow={this.clickArrow}
          count={this.count}
          currentIndex={this.currentIndex}
          listWidth={this.listWidth}
          height={this.height}
          sliderWidth={this.width}
          slidesToScroll={this.slidesToScroll}
          slidesToShow={this.slidesToShow}
          infinite={this.infinite}
        >
          {this.renderCarousel()}
        </ks-inner-slider>
        {this.arrows && (
          <ks-arrow-button-group
            onKsChange={this.handleArrowButtonClick.bind(this)}
            currentIndex={this.currentIndex}
            slidesToShow={this.slidesToShow}
            count={this.count}
            infinite={this.infinite}
            orient="left"
            arrows={this.arrows}
            onKsArrowOver={this.onTrackOver.bind(this)}
            onKsArrowLeave={this.onTrackLeave.bind(this)}
            onKsArrowEnter={this.onTrackLeave.bind(this)}
            bulletinMode={this.bulletinMode}
            data-testid="ks-carousel-index-kt2aFL"
          />
        )}

        {(this.pagination || (this.dots && this.dotsCount > 6)) && (
          <ks-arrow-pagination
            onKsChange={this.handleArrowButtonClick.bind(this)}
            count={this.dotsCount}
            currentIndex={this.dotsIndex}
            slidesToShow={this.slidesToShow}
            infinite={this.infinite}
            onKsArrowOver={this.onTrackOver.bind(this)}
            onKsArrowLeave={this.onTrackLeave.bind(this)}
            onKsArrowEnter={this.onTrackLeave.bind(this)}
            data-testid="ks-carousel-index-aNUY1x"
          />
        )}

        {this.dots && this.dotsCount < 7 && (
          <ks-dots
            class={{ 'bulletin-mode': this.bulletinMode }}
            count={this.dotsCount}
            currentIndex={this.dotsIndex}
            onKsChange={(e) => {
              const { detail } = e;
              this.currentIndex = this.currentIndex + (detail as number) * this.slidesToScroll;
              this.clickArrow = 'none';
            }}
            onKsDotsOver={this.onDotsOver.bind(this)}
            onKsDotsLeave={this.onDotsLeave.bind(this)}
            onKsDotsEnter={this.onDotsLeave.bind(this)}
            data-testid="ks-carousel-index-eLjmrW"
          />
        )}
      </Host>
    );
  }
}
