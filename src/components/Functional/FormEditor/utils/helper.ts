import { Templates, GroupedTemplates, StageItem } from '../types';

export function getComponentErrorTips(name?: string) {
  if (name) {
    return '';
  } else {
    return "<span style='color:#f5222d;font-size:14px;'>请设置 name 属性哟~~</span>";
  }
}

/**
 * 对传入的模板信息进行分组
 * @param templates
 * @returns
 */
export function groupTemplates(templates: Templates): GroupedTemplates {
  const groupedTemplates: GroupedTemplates = {};

  const templateKeys = Object.keys(templates);
  templateKeys.length &&
    templateKeys.map((name: string) => {
      const templateItem = templates[name];
      const groupName = templateItem.group;
      if (!groupedTemplates[groupName]) groupedTemplates[groupName] = [];
      groupedTemplates[groupName].push(templateItem);
    });

  return groupedTemplates;
}

/**
 * 通过下标找到当前节点(target)和父节点(parent)
 * @param index
 * @param stageItemList
 * @returns
 */
export function findStageItemByIndex(index: string, stageItemList: StageItem[]): { target?: StageItem; parent?: StageItem; targetIndex?: number } {
  const res: { target?: StageItem; parent?: StageItem; targetIndex?: number } = {};
  if (index.includes('-')) {
    const idxArr = index.split('-');
    let target: StageItem = stageItemList[Number(idxArr[0])];
    for (let i = 0; i < idxArr.length; i++) {
      const currentIdx = Number(idxArr[i]);
      // 继续递归遍历
      i !== 0 && target.children && (target = target.children[currentIdx]);
      // 找到父节点
      idxArr.length - i === 2 && (res.parent = target);
      // 找到子节点
      idxArr.length - i === 1 && ((res.target = target), (res.targetIndex = currentIdx));
    }
  } else {
    res.target = stageItemList[Number(index)];
  }

  return res;
}

/**
 * 通过下标找到所有兄弟节点
 * @param index
 * @param stageItemList
 * @returns
 */
export function findSiblingStageItemsByIndex(index: string, stageItemList: StageItem[]): StageItem[] {
  const { parent, target } = findStageItemByIndex(index, stageItemList);
  if (target && parent && parent.children) {
    return parent.children.filter(item => item.id !== target.id) || [];
  } else {
    return stageItemList.filter(item => item.id !== target?.id);
  }
}

/**
 * 获取子表单控件在父children数组中的真实下标
 * @param index
 * @returns
 */
export function getChildIndexOfParent(index: string) {
  if (index.includes('-')) {
    const idxArr = index.split('-');
    return idxArr[idxArr.length - 1];
  } else {
    return index;
  }
}

/**
 * 判断子表单控件是否在父children数组中处在第一位置
 * @param index
 * @returns
 */
export function isChildInFirstPlaceOfParent(index: string): boolean {
  return getChildIndexOfParent(index) === '0';
}

/**
 * 判断子表单控件是否在父children数组中处在末尾位置
 * @param index
 * @param stageItemList
 * @returns
 */
export function isChildInTheEndPlaceOfParent(index: string, stageItemList: StageItem[]): boolean {
  if (index.includes('-')) {
    const childIdx = getChildIndexOfParent(index);
    const { parent } = findStageItemByIndex(index, stageItemList);
    if (parent && parent.children && parent.children.length) {
      return Number(childIdx) === parent.children.length - 1;
    } else {
      return false;
    }
  } else {
    return Number(index) === stageItemList.length - 1;
  }
}
