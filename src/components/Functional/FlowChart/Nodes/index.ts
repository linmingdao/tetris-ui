import end from './End';
import start from './Start';
import process from './Process';
import judgment from './Judgment';
import { AvailableBuiltInTypeEnum, NodeDescription, DefaultNodesConfig } from '../types';

export function getBuiltInNodes(defaultNodeConfig: DefaultNodesConfig): NodeDescription[] {
  return [
    {
      label: defaultNodeConfig.start && defaultNodeConfig.start.label ? defaultNodeConfig.start.label : '开始',
      type: AvailableBuiltInTypeEnum.START.valueOf(),
      component: start,
    },
    {
      label: defaultNodeConfig.judgment && defaultNodeConfig.judgment.label ? defaultNodeConfig.judgment.label : '判断',
      type: AvailableBuiltInTypeEnum.JUDGMENT.valueOf(),
      component: judgment,
    },
    {
      label: defaultNodeConfig.process && defaultNodeConfig.process.label ? defaultNodeConfig.process.label : '流程',
      type: AvailableBuiltInTypeEnum.PROCESS.valueOf(),
      component: process,
    },
    {
      label: defaultNodeConfig.end && defaultNodeConfig.end.label ? defaultNodeConfig.end.label : '结束',
      type: AvailableBuiltInTypeEnum.END.valueOf(),
      component: end,
    },
  ];
}
