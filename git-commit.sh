#!/bin/bash
cd /Users/bytedance/prototypes
git add -A
git commit -m "Build Keystone packages and enable component usage

- Built keystone-ui/core package with all web components
- Built keystone-ui/react package with React wrapper components
- Fixed TypeScript errors in core package (table component, globalscript)
- Created missing load-icons.ts file
- Excluded test files from TypeScript compilation
- Added prettier to core package devDependencies
- All packages now build successfully
- Apps can now import and use Keystone components (e.g. KsInputSelector)"
git push origin main
