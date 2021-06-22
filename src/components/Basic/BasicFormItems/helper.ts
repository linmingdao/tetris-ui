export function getComponentErrorTips(name?: string, label?: string) {
  if (name && label) {
    return '';
  } else if (!name && !label) {
    return '请设置 name 和 label 属性哟~~';
  } else if (!label) {
    return '请设置 label 属性哟~~';
  } else {
    return '请设置 name 属性哟~~';
  }
}

export function parseOptions(chunk?: string): any[] {
  if (chunk && chunk.trim()) {
    return chunk
      .split(/[;；]/)
      .filter(item => item.trim() !== '')
      .map(item => {
        const kvArr = item.split(/[，,]/);
        return kvArr.length === 1 ? { label: kvArr[0], value: kvArr[0] } : { label: kvArr[0], value: kvArr[1] };
      });
  } else {
    return [];
  }
}
