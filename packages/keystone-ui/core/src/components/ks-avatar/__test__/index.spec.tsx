import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsAvatar } from '../index';
import { KsBadge } from '../../ks-badge'; // 假设 ks-badge 在同一层级或可被解析
import { KsText } from '../../ks-text'; // 假设 ks-text 在同一层级或可被解析

describe('ks-avatar component', () => {
  it('should renders with default props', async () => {
    const page = await newSpecPage({
      components: [KsAvatar],
      template: () => <ks-avatar></ks-avatar>,
    });
    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const avatarOuter = page.root.shadowRoot.querySelector('.avatar-outer');
    expect(avatarOuter).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const avatarDiv = avatarOuter.querySelector('.avatar');
    expect(avatarDiv).toHaveClass('avatar--circle');
    expect(avatarDiv).toHaveClass('avatar--md');
  });

  it('should renders when different shapes and sizes provided', async () => {
    const page = await newSpecPage({
      components: [KsAvatar],
      template: () => <ks-avatar shape="square" size="lg"></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const avatarDiv = page.root.shadowRoot.querySelector('.avatar');
    expect(avatarDiv).toHaveClass('avatar--square');
    expect(avatarDiv).toHaveClass('avatar--lg');
  });

  it('should renders an image when src is provided', async () => {
    const imageUrl = 'https://example.com/avatar.jpg';
    const altText = 'User Avatar';
    const page = await newSpecPage({
      components: [KsAvatar],
      template: () => <ks-avatar src={imageUrl} alt={altText}></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.avatar')).toHaveClass('avatar--image');
  });

  it('should renders children in the default slot when src is not provided', async () => {
    const page = await newSpecPage({
      components: [KsAvatar],
      template: () => (
        <ks-avatar>
          <span>AB</span>
        </ks-avatar>
      ),
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slotContent = page.root.shadowRoot.querySelector('slot').assignedNodes()[0].parentElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(slotContent.innerHTML).toBe('<span>AB</span>');
  });

  it('should renders label when showLabel is true', async () => {
    const name = 'John Doe';
    const description = 'Software Engineer';
    const page = await newSpecPage({
      components: [KsAvatar, KsText], // Ensure KsText is registered if it's a separate component
      template: () => <ks-avatar showLabel name={name} description={description}></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const labelDiv = page.root.shadowRoot.querySelector('.avatar-label');
    expect(labelDiv).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const nameElement = labelDiv.querySelector('ks-text:first-child');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const descriptionElement = labelDiv.querySelector('ks-text:last-child');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(nameElement.textContent).toBe(name);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(descriptionElement.textContent).toBe(description);
  });

  it('should not render label when showLabel is false', async () => {
    const page = await newSpecPage({
      components: [KsAvatar],
      template: () => <ks-avatar showLabel={false} name="Test" description="Desc"></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const labelDiv = page.root.shadowRoot.querySelector('.avatar-label');
    expect(labelDiv).toBeFalsy();
  });

  it('should renders badge when showBadge is true', async () => {
    const page = await newSpecPage({
      components: [KsAvatar, KsBadge], // Ensure KsBadge is registered
      template: () => <ks-avatar showBadge type="dot" variant="success"></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const badgeComponent = page.root.shadowRoot.querySelector('ks-badge');
    expect(badgeComponent).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.type).toBe('dot');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.variant).toBe('success');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.__avatarUsage).toBe(true); // for circle shape by default
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.__avatarSize).toBe('md'); // default size
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.__inAvatar).toBe(true);
  });

  it('should renders badge when count is provided', async () => {
    const page = await newSpecPage({
      components: [KsAvatar, KsBadge],
      template: () => <ks-avatar showBadge type="count" count={5} overflowCount={99}></ks-avatar>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const badgeComponent = page.root.shadowRoot.querySelector('ks-badge');
    expect(badgeComponent).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.type).toBe('count');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.count).toBe(5);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(badgeComponent.overflowCount).toBe(99);
  });
});
