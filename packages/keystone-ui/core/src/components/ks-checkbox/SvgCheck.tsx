import { h } from '@stencil/core';

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export const SvgCheck = ({ className }) => (
  <svg class={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.90723 8.0013L6.55306 11.6471L13.8447 4.35547"
      stroke="white"
      style={{ stroke: 'white', strokeOpacity: '1' }}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
export const SvgCheckIndeterminate = ({ className }) => (
  <svg class={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.07812 8H13.2865"
      stroke="white"
      style={{ stroke: 'white', strokeOpacity: '1' }}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
