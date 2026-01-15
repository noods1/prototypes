import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsBulletinTile } from '../index';
import { KsCarousel } from '../../ks-carousel';
import { KsCarouselItem } from '../../ks-carousel-item';
import { KsButton } from '../../ks-button';
import { KsText } from '../../ks-text';
import { BulletinDataType } from '@src/entities/components/bulletin-tile';

describe('ks-bulletin-tile component', () => {
  const mockData: BulletinDataType[] = [
    {
      key: '1',
      image: 'test-image-1.jpg',
      title: 'Test Title 1',
      content: 'Test content 1',
      buttons: [
        { text: 'Button 1', variant: 'primary' },
        { text: 'Button 2', variant: 'default' },
      ],
    },
    {
      key: '2',
      image: 'test-image-2.jpg',
      title: 'Test Title 2',
      content: 'Test content 2',
      buttons: [{ text: 'Button 3', variant: 'primary' }],
    },
  ];

  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile></ks-bulletin-tile>,
    });

    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.bulletin-tile')).toBeTruthy();
  });

  it('should render items from dataSource', async () => {
    const page = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile dataSource={mockData}></ks-bulletin-tile>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const items = page.root.shadowRoot.querySelectorAll('ks-carousel-item');
    expect(items.length).toBe(2);

    // Check first item content
    const firstItem = items[0] as HTMLElement;
    const img = firstItem?.querySelector('img');
    expect(img).toEqualAttribute('src', 'test-image-1.jpg');

    expect(firstItem.textContent).toContain('Test Title 1');
    expect(firstItem.textContent).toContain('Test content 1');

    // Check buttons
    const buttons = Array.from(firstItem?.querySelectorAll('ks-button') || []);
    expect(buttons).toHaveLength(2);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(buttons[0].textContent).toEqualText('Button 1');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(buttons[1].textContent).toEqualText('Button 2');
  });

  it('should apply imageMode to images', async () => {
    const page = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile dataSource={mockData} imageMode="contain"></ks-bulletin-tile>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const img = page.root.shadowRoot?.querySelector('img');
    expect(img?.style.objectFit).toBe('contain');
  });

  it('should emit button click event with correct data', async () => {
    const page = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile dataSource={mockData}></ks-bulletin-tile>,
    });

    const buttonClickSpy = jest.fn();
    page.root?.addEventListener('ksButtonClick', buttonClickSpy);

    const button = page.root?.shadowRoot?.querySelector('ks-button');
    if (button) {
      (button as HTMLElement).click();
    }

    await page.waitForChanges();

    expect(buttonClickSpy).toHaveBeenCalled();
  });

  it('should show dots only when multiple items exist', async () => {
    // Test with multiple items
    const multiPage = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile dataSource={mockData}></ks-bulletin-tile>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const carousel = multiPage.root.shadowRoot?.querySelector('ks-carousel');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(carousel.dots).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(carousel.arrows).toBe('overlay');
  });

  it('should not show dots when only one item exists', async () => {
    // Test with single item
    const singlePage = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      template: () => <ks-bulletin-tile dataSource={[mockData[0]]}></ks-bulletin-tile>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const singleCarousel = singlePage.root.shadowRoot?.querySelector('ks-carousel');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(singleCarousel.dots).toBe(false);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(singleCarousel.arrows).toBe(false);
  });

  it('should apply correct classes and attributes', async () => {
    const page = await newSpecPage({
      components: [KsBulletinTile, KsCarousel, KsCarouselItem, KsButton, KsText],
      template: () => <ks-bulletin-tile dataSource={mockData}></ks-bulletin-tile>,
    });

    const bulletinTile = page.root?.shadowRoot?.querySelector('.bulletin-tile');
    expect(bulletinTile).toBeTruthy();

    const contentCard = page.root?.shadowRoot?.querySelector('.content-card');
    expect(contentCard).toBeTruthy();

    const title = page.root?.shadowRoot?.querySelector('.title');
    expect(title).toBeTruthy();

    const body = page.root?.shadowRoot?.querySelector('.body');
    expect(body).toBeTruthy();
  });
});
