import React from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import { Form, DatePicker } from 'antd';
import CommonAttributes from '../../CommonAttributes';

interface PropTypes {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (value: any) => void;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, onChange }) => {
  const handleChange = (date: moment.Moment | null, dateString: string) => {
    triggerChange(dateString);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  const val = value ? moment(value, DATE_TIME_FORMAT) : null;

  return (
    <DatePicker
      value={val}
      showTime
      allowClear
      disabled={disabled}
      format={DATE_TIME_FORMAT}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

const Preview: React.FC<PropTypes> = props => {
  const { value, placeholder } = props;
  const val = value ? moment(value, DATE_TIME_FORMAT) : null;

  return <DatePicker disabled value={val} showTime style={{ width: '100%' }} format={DATE_TIME_FORMAT} placeholder={placeholder} />;
};

const Attr: React.FC<PropTypes> = props => {
  const { value } = props;
  const val = value ? moment(value, DATE_TIME_FORMAT) : null;

  return (
    <CommonAttributes
      {...{
        ...props,
        initialValues: { value: val },
      }}
    >
      <Form.Item label="value" name="value">
        <DatePicker showTime format={DATE_TIME_FORMAT} placeholder="请选择日期" style={{ width: '100%' }} />
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

export const DateTimeSelect = {
  group: '基础组件',
  label: '日期',
  name: 'DateTimeSelect',
  instance: Builder,
  icon: <Iconfont type="icon-datetimeselect" />,
  loader: () => import('./DateTimeSelect'),
  props: {
    name: nanoid(),
    value: undefined,
    label: '日期',
    placeholder: '请选择日期',
    mode: 'stage',
  },
};
