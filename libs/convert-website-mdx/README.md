# Convert Website MDX

将网站中的MDX组件文档转换为标准Markdown文档的工具。
因为网站内的mdx文档里面的demo还有props和slot都是src引用的, 所以需要将demo和props和slot转换为markdown文档, 方便给大模型用, 同时 devGPT 不支持mdx文件, 所以需要转换为md文件.

## 功能特点

- 将MDX文件转换为MD格式文件
- 提取并嵌入代码片段内容
- 自动转换PropertyTable、EventTable和SlotTable组件为Markdown表格

## 使用方法

## 目录结构

```
convert-website-mdx/
├── bin/              # 命令行工具入口
├── md/               # 输出的Markdown文件目录
│   └── components/   # 组件文档输出目录
├── src/              # 源代码
│   └── index.js      # 主要逻辑
├── package.json      # 项目配置
└── README.md         # 本文档
```

## 配置

在`src/index.js`文件中可以修改以下配置：

- `baseDir`: MDX文件所在的目录
  ```javascript
  const baseDir = path.resolve(rootDir, '../../../apps/website/src/content/develop/components');
  ```

- `snippetsDir`: 代码片段所在的目录
  ```javascript
  const snippetsDir = path.resolve(rootDir, '../../../apps/website/src/snippets');
  ```

- `outputDir`: 输出目录
  ```javascript
  const outputDir = path.resolve(rootDir, '../md/components');
  ```

## 如何工作

1. 扫描`baseDir`目录下的所有MDX文件
2. 从每个文件中提取导入信息、组件引用和内容
3. 通过`@byted-keystone/types`获取组件的属性、事件和插槽信息
4. 将MDX特有的组件转换为标准Markdown语法
5. 生成新的Markdown文件到`outputDir`目录