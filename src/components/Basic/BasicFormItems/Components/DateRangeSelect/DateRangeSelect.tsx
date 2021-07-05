import React from 'react';
import moment from 'moment';
import { Moment } from 'moment';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { Form, DatePicker, Input } from 'antd';
import CommonAttributes from '../../CommonAttributes';
import { RangePickerDateProps } from 'antd/lib/date-picker/generatePicker';

export type RangeValue = Parameters<Required<RangePickerDateProps<Moment>>['onChange']>[0];

interface PropTypes {
  name: string;
  value?: [string, string];
  label?: string;
  rules?: string[];
  startPlaceholder?: string;
  endPlaceholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (dateStrings?: [string, string]) => void;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const Stage: React.FC<PropTypes> = ({ disabled, startPlaceholder = '开始日期', endPlaceholder = '结束日期', value, onChange }) => {
  const handleChange = (date: RangeValue, dateStrings: [string, string]) => {
    triggerChange(date ? dateStrings : undefined);
  };

  const triggerChange = (dateStrings?: [string, string]) => {
    onChange && onChange(dateStrings);
  };

  const rangeVal = (value ? [moment(value[0], DATE_TIME_FORMAT), moment(value[1], DATE_TIME_FORMAT)] : null) as RangeValue;

  return (
    <DatePicker.RangePicker
      showTime
      allowClear
      value={rangeVal}
      disabled={disabled}
      format={DATE_TIME_FORMAT}
      style={{ width: '100%' }}
      onChange={handleChange}
      placeholder={[startPlaceholder, endPlaceholder]}
    />
  );
};

const Preview: React.FC<PropTypes> = props => {
  const { value, startPlaceholder = '开始日期', endPlaceholder = '结束日期' } = props;
  const rangeVal = (value ? [moment(value[0], DATE_TIME_FORMAT), moment(value[1], DATE_TIME_FORMAT)] : null) as RangeValue;

  return (
    <DatePicker.RangePicker
      showTime
      disabled
      bordered={false}
      value={rangeVal}
      format={DATE_TIME_FORMAT}
      placeholder={[startPlaceholder, endPlaceholder]}
    />
  );
};

const Attr: React.FC<PropTypes> = props => {
  const { value, startPlaceholder = '开始日期', endPlaceholder = '结束日期' } = props;
  const rangeVal = (value ? [moment(value[0], DATE_TIME_FORMAT), moment(value[1], DATE_TIME_FORMAT)] : null) as RangeValue;

  return (
    <CommonAttributes
      {...{
        ...props,
        initialValues: { value: rangeVal, startPlaceholder, endPlaceholder },
      }}
      noPlaceholder
    >
      <Form.Item label="start placeholder" name="startPlaceholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="end placeholder" name="endPlaceholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="value" name="value">
        <DatePicker.RangePicker
          showTime
          allowClear
          format={DATE_TIME_FORMAT}
          style={{ width: '100%' }}
          placeholder={[startPlaceholder, endPlaceholder]}
        />
      </Form.Item>
    </CommonAttributes>
  );
};

const Builder: React.FC<PropTypes> = props => {
  switch (props.mode) {
    case 'stage':
      return <Stage {...props} />;
    case 'attr':
      return <Attr {...props} />;
    case 'preview':
      return <Preview {...props} />;
    default:
      return <Stage {...props} />;
  }
};

export default Builder;

export const DateRangeSelect = {
  group: '基础组件',
  label: '日期范围',
  name: 'DateRangeSelect',
  instance: Builder,
  icon: <Iconfont type="icon-daterange" />,
  loader: () => import('./DateRangeSelect'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '日期范围',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    mode: 'stage',
  },
};
