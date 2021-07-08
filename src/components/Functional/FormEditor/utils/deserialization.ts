import { StageItem } from '../types';

export function flat(stageItem: StageItem, flatInitialValuesRef: any, cascadeValuesRef: any, indexMapRef: any, parentIdx: string) {
  indexMapRef[stageItem.props.name] = parentIdx;
  if (stageItem.children && stageItem.children.length) {
    cascadeValuesRef[stageItem.props.name] = {};
    stageItem.children.forEach((childStageItem: StageItem, index: number) => {
      indexMapRef[childStageItem.props.name] = `${parentIdx}-${index}`;
      flat(childStageItem, flatInitialValuesRef, cascadeValuesRef[stageItem.props.name], indexMapRef, `${parentIdx}-${index}`);
    });
  } else {
    cascadeValuesRef[stageItem.props.name] = stageItem.props.value;
    flatInitialValuesRef[stageItem.props.name] = stageItem.props.value;
  }
}

export function flatStageItemList(stageItemList: StageItem[]): any {
  const indexMap: any = {};
  const cascadeValues: any = {};
  const flatInitialValues: any = {};

  stageItemList.forEach((stageItem, index: number) => {
    flat(stageItem, flatInitialValues, cascadeValues, indexMap, index + '');
  });

  return { indexMap, cascadeValues, flatInitialValues };
}

export function merge(cascadeValues: any, name: string, value: any, fieldNames: string[]) {
  const keys = Object.keys(cascadeValues);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === name) {
      cascadeValues[key] = value;
      return;
    }
    if (typeof cascadeValues[key] === 'object' && fieldNames.includes(key)) {
      merge(cascadeValues[key], name, value, fieldNames);
    }
  }
}

export function mergeFlatValues(cascadeValues: any, flatValues: any, fieldNames: string[]) {
  Object.keys(flatValues).forEach((name: string) => {
    let _name = name;
    if (name.includes('::')) {
      const arr = name.split('::');
      _name = arr[arr.length - 1];
    }
    merge(cascadeValues, _name, flatValues[name], fieldNames);
  });
  return cascadeValues;
}

export function getFieldNames(flatValues: any): string[] {
  return Object.keys(flatValues).map(name => {
    let _name = name;
    if (name.includes('::')) {
      const arr = name.split('::');
      _name = arr[arr.length - 1];
      return _name;
    } else {
      return _name;
    }
  });
}
