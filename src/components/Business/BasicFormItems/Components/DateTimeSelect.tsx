import React from 'react';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { allRules } from '../validator';
import { Form, Input, DatePicker, Select } from 'antd';
import { attrLabelCol, attrWrapperCol, attrLabelAlign, DATE_TIME_FORMAT } from '../config';

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

const Attr: React.FC<PropTypes> = ({ name, value, label, placeholder, rules, onAttrPropsChange }) => {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
  };

  const val = typeof value === 'string' ? moment(value, DATE_TIME_FORMAT) : value;

  return (
    <Form
      labelCol={attrLabelCol}
      wrapperCol={attrWrapperCol}
      labelAlign={attrLabelAlign}
      initialValues={{ name, label, value, rules, placeholder }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="value" name="value">
        <DatePicker value={val} showTime={true} format={DATE_TIME_FORMAT} placeholder="请选择" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="rules" name="rules">
        <Select placeholder="请选择" mode="multiple" allowClear>
          {allRules.map(rule => (
            <Select.Option key={rule} value={rule}>
              {rule}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
    </Form>
  );
};

const DateTimeSelect: React.FC<PropTypes> = props => {
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

DateTimeSelect.defaultProps = {
  name: nanoid(),
  value: moment(),
  label: '时间',
  placeholder: '请选择',
  mode: 'stage',
};

export default DateTimeSelect;
