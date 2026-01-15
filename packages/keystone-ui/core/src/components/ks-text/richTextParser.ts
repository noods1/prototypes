interface LinkNode {
  tag: string;
  attrs: Record<string, string>;
  content: string;
}

export function parseRichTextString(richTextString: string): (string | LinkNode)[] {
  const aTagRegex = /<a\s+([^>]*)>([^<]*)<\/a>/g;
  const result = [];
  let lastIndex = 0;
  let match;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const parseAttributes = (attrsString) => {
    const attrs = {};
    const attrRegex = /(\w+)\s*=\s*"([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
      const [, attrName, attrValue] = attrMatch;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (!attrName.startsWith('on')) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        attrs[attrName] = attrValue;
      }
    }
    return attrs;
  };

  while ((match = aTagRegex.exec(richTextString)) !== null) {
    const [, attrsString, content] = match;

    // 保留匹配之前的文本部分
    if (match.index > lastIndex) {
      result.push(richTextString.slice(lastIndex, match.index));
    }

    // 解析属性并构建属性对象
    const attrs = parseAttributes(attrsString);

    // 将解析后的对象加入结果数组
    result.push({ tag: 'a', attrs, content });

    // 更新最后处理的索引
    lastIndex = aTagRegex.lastIndex;
  }

  // 保留最后一个匹配后的文本部分
  if (lastIndex < richTextString.length) {
    result.push(richTextString.slice(lastIndex));
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return result;
}
