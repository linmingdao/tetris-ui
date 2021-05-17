import React from 'react';
import { message } from 'antd';
import { Story, Meta } from '@storybook/react';
import FlowChart, {
  FlowChartProps,
  ElementType,
  AvailableBuiltInTypeEnum,
  EdgeType,
  ElementDropReturnType,
  EdgeReturnType,
} from '../../components/Functional/FlowChart';

const data = [
  {
    id: '1',
    type: 'start',
    position: { x: 207, y: -96 },
    data: {
      label: '告警',
    },
  },
  {
    id: '2',
    type: 'process',
    position: { x: 313, y: 34 },
    data: {
      label: '查看机器剩余内存',
    },
  },
  {
    id: '3',
    type: 'judgment',
    position: { x: 86, y: 219 },
    data: {
      label: '>60%',
    },
  },
  {
    id: '4',
    type: 'judgment',
    position: { x: 435, y: 176 },
    data: { label: '<=60%' },
  },
  {
    id: '5',
    type: 'end',
    position: { x: 50, y: 377 },
    data: { label: 'End' },
  },
  {
    id: '6',
    type: 'process',
    position: { x: 494, y: 301 },
    data: { label: '查看业务线程CPU' },
  },
  {
    id: '7',
    type: 'end',
    position: { x: 291, y: 428 },
    data: {
      label: '未知',
    },
  },
  {
    id: 'e5',
    source: '4',
    target: '6',
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
  },
  {
    source: '3',
    sourceHandle: null,
    target: '5',
    targetHandle: null,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-3null-5null',
  },
  {
    source: '2',
    sourceHandle: null,
    target: '3',
    targetHandle: null,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-2null-3null',
  },
  {
    source: '2',
    sourceHandle: null,
    target: '4',
    targetHandle: null,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-2null-4null',
  },
  {
    source: '1',
    sourceHandle: null,
    target: '2',
    targetHandle: null,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-1null-2null',
  },
  {
    source: '6',
    sourceHandle: null,
    target: '7',
    targetHandle: null,
    type: 'smoothstep',
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-6null-7null',
  },
  {
    source: '1',
    sourceHandle: null,
    target: '7',
    targetHandle: null,
    type: 'smoothstep',
    animated: true,
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-1null-7null',
  },
  {
    source: '1',
    sourceHandle: null,
    target: '3',
    targetHandle: null,
    type: 'smoothstep',
    label: '告警测试',
    labelStyle: { fill: '#000', fillColor: '#e6e6e6' },
    arrowHeadType: 'arrowclosed',
    style: { strokeWidth: 2 },
    id: 'reactflow__edge-1null-3null',
  },
];

const onSave = (elements: any[]) => message.info(JSON.stringify(elements));

const onNodeDoubleClick = (event: any, element: any) => message.info(`You dbclick：${JSON.stringify(element)}`);

const onElementDrop = (element: ElementType): ElementDropReturnType => new Promise(resolve => resolve(element));
const onEdgeConnect = (element: EdgeType): EdgeReturnType => new Promise(resolve => resolve(element));

export default {
  title: '功能组件/FlowChart',
  component: FlowChart,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '490px',
          width: '100%',
          padding: 10,
          boxShadow: ' 0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<FlowChartProps> = args => <FlowChart {...args} />;

export const CanEdit = Template.bind({});
CanEdit.storyName = '编辑模式';
CanEdit.args = {
  editable: true,
  dataSource: data,
  onSave,
  onEdgeConnect,
  onElementDrop,
  onNodeDoubleClick,
  defaultNodeConfig: { start: { label: '告警' } },
  defaultNodes: [AvailableBuiltInTypeEnum.END, AvailableBuiltInTypeEnum.JUDGMENT, AvailableBuiltInTypeEnum.PROCESS, AvailableBuiltInTypeEnum.START],
};

export const CanNotEdit = Template.bind({});
CanNotEdit.storyName = '阅览模式';
CanNotEdit.args = {
  editable: false,
  dataSource: data,
  onSave,
  onElementDrop,
  onNodeDoubleClick,
};
