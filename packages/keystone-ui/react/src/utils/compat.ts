import React from 'react';
import ReactDOM from 'react-dom';

const isReact18OrHigher = () => {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const majorVersion = parseInt(React.version.split('.')[0], 10);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return majorVersion >= 18;
};

export interface ReactRootCompat {
  render: (element: React.ReactElement | null) => void;
  unmount: () => void;
}

export function createReactRoot(container: HTMLElement): ReactRootCompat {
  // Use React.version to determine API availability
  if (isReact18OrHigher()) {
    const { createRoot } = ReactDOM as any;
    const root = createRoot(container);
    return {
      render: (element) => root.render(element),
      unmount: () => root.unmount(),
    };
  }

  // Fallback to React 17 render API
  return {
    render: (element) => {
      if (element === null) {
        ReactDOM.unmountComponentAtNode(container);
      } else {
        ReactDOM.render(element, container);
      }
    },
    unmount: () => ReactDOM.unmountComponentAtNode(container),
  };
}
