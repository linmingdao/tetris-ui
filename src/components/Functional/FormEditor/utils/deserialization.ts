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

export function merge(cascadeValues: any, name: string, value: any) {
  const keys = Object.keys(cascadeValues);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === name) {
      cascadeValues[key] = value;
      return;
    }
    if (typeof cascadeValues[key] === 'object') {
      merge(cascadeValues[key], name, value);
    }
  }
}

export function mergeFlatValues(cascadeValues: any, flatValues: any) {
  Object.keys(flatValues).forEach((name: string) => merge(cascadeValues, name, flatValues[name]));
  return cascadeValues;
}
