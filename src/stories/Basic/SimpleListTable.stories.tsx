import React from 'react';
import { Story, Meta } from '@storybook/react';
import SimpleListTable, { SimpleListTableProps } from '../../components/Basic/SimpleListTable/SimpleListTable';

export default {
  title: '基础组件/SimpleListTable',
  component: SimpleListTable,
  argTypes: {},
  decorators: [
    Story => (
      <div
        style={{
          height: '600px',
          width: '100%',
          padding: 10,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<SimpleListTableProps> = args => <SimpleListTable {...args} />;

export const SimpleListTableDemo = Template.bind({});
SimpleListTableDemo.storyName = '使用方式';
SimpleListTableDemo.args = {
  rowkey: 'id',
  columns: [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '住址', dataIndex: 'address', key: 'address' },
  ],
  dataSource: [
    { id: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
    { id: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '3', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '4', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '5', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '6', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '7', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '8', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '9', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
    { id: '10', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
  ],
  expandable: {
    rowExpandable: (record: any) => record.age > 40,
    expandedRowRender: (record: any) => <p>{JSON.stringify(record)}</p>,
  },
};
