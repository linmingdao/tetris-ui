import React from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';
import Iconfont from '../Iconfont';
import { Form, DatePicker } from 'antd';
import CommonAttributes, { extractCommonAttributes } from '../CommonAttributes';

interface PropTypes {
  name: string;
  value?: any;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const Stage: React.FC<PropTypes> = ({ disabled, placeholder, value, onChange }) => {
  const handleChange = (date: moment.Moment | null, dateString: string) => {
    triggerChange(dateString);
  };

  const triggerChange = (newVal: any) => {
    onChange && onChange(newVal);
  };

  const val = typeof value === 'string' ? moment(value, DATE_TIME_FORMAT) : value;

  return (
    <DatePicker
      disabled={disabled}
      showTime={true}
      value={val}
      format={DATE_TIME_FORMAT}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

const Preview: React.FC<PropTypes> = props => {
  const { value } = props;
  return <div>{moment(value.valueOf()).format(DATE_TIME_FORMAT)}</div>;
};

const Attr: React.FC<PropTypes> = props => {
  const { value } = props;
  const val = typeof value === 'string' ? moment(value, DATE_TIME_FORMAT) : value;

  return (
    <CommonAttributes
      {...extractCommonAttributes({
        ...props,
        initialValues: { value: val },
      })}
    >
      <Form.Item label="value" name="value">
        <DatePicker showTime={true} format={DATE_TIME_FORMAT} placeholder="请选择" style={{ width: '100%' }} />
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
  label: '日期选择器',
  name: 'DateTimeSelect',
  instance: Builder,
  icon: <Iconfont type="icon-datetimeselect" />,
  loader: () => import('./DateTimeSelect'),
  props: {
    name: nanoid(),
    value: moment(),
    label: '时间',
    placeholder: '请选择',
    mode: 'stage',
  },
};
