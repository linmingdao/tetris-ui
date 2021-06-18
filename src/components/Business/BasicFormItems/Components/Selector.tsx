import React from 'react';
import { Form, Input, Select } from 'antd';
import { nanoid } from 'nanoid';
import { allRules } from '../validator';
import { parseOptions } from '../helper';
import { attrLabelCol, attrWrapperCol, attrLabelAlign, attTextAreaRows } from '../config';
import { SelectValue } from 'antd/lib/select';

const { TextArea } = Input;
const { Option } = Select;

declare const ModeOptions: ['tags', 'multiple'];
export declare type ModeOption = typeof ModeOptions[number];

interface PropTypes {
  name: string;
  value?: any;
  label?: string;
  rules?: string[];
  selectMode?: ModeOption;
  placeholder?: string;
  disabled?: boolean;
  options?: string;
  optionsList?: any[];
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = props => {
  const { disabled, placeholder, value, selectMode, optionsList } = props;

  const handleChange = (value: SelectValue) => {
    triggerChange(value);
  };

  const triggerChange = (newVal: any) => {
    const { onChange } = props;
    onChange && onChange(newVal);
  };

  return (
    <Select
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      style={{ width: '100%' }}
      mode={selectMode === 'multiple' ? 'multiple' : undefined}
    >
      {optionsList &&
        optionsList.map(m => {
          return (
            <Option key={m.value} value={m.value}>
              {m.label}
            </Option>
          );
        })}
    </Select>
  );
};

const Preview: React.FC<PropTypes> = props => {
  const { selectMode, optionsList, value } = props;
  if (!selectMode) {
    // 单选模式
    const targetItem = optionsList && optionsList.length && (optionsList as any[]).find(item => item.value === value);
    return <div>{targetItem ? targetItem.label : value}</div>;
  } else {
    // 多选模式
    return (
      <div>
        {value &&
          value.length &&
          value
            .map((val: any) => {
              const targetItem = (optionsList as any[]).find(item => item.value === val);
              return targetItem ? targetItem.label : val;
            })
            .join(', ')}
      </div>
    );
  }
};

const Attr: React.FC<PropTypes> = ({ name, label, value, options, selectMode, rules, optionsList, onAttrPropsChange }) => {
  const handleValuesChange = (changedValues: any, allValues: any) => {
    onAttrPropsChange && onAttrPropsChange(changedValues, allValues);
  };

  return (
    <Form
      name="Attr"
      labelCol={attrLabelCol}
      wrapperCol={attrWrapperCol}
      labelAlign={attrLabelAlign}
      initialValues={{ name, label, value, options, rules }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="name" name="name" rules={[{ required: true, message: '请输入' }]}>
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="value" name="value">
        <Select placeholder="请选择" allowClear={true} style={{ width: '100%' }} mode={selectMode ? selectMode : undefined}>
          {optionsList &&
            optionsList.map(m => (
              <Option key={m.value} value={m.value}>
                {m.label}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="单选or多选" name="selectMode">
        <Select placeholder="请选择" style={{ width: '100%' }}>
          <Option value="undefined">单选</Option>
          <Option value="multiple">多选</Option>
        </Select>
      </Form.Item>
      <Form.Item label="rules" name="rules">
        <Select placeholder="请选择" mode="multiple" allowClear>
          {allRules.map(rule => (
            <Option key={rule} value={rule}>
              {rule}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="options" name="options">
        <TextArea rows={attTextAreaRows} placeholder="请输入选项信息,例如: 中国,China;日本,Japan;美国,America" allowClear />
      </Form.Item>
      <div
        style={{
          textAlign: 'left',
          color: '#f55757',
          fontSize: 12,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        * 请以 label,value 的形式输入您的选项，label 和 value 间请以中文或英文逗号隔开，选项间请以中文或英文分号隔开，例如：key1,value1;key2,value2
      </div>
      <div
        style={{
          textAlign: 'left',
          color: '#f55757',
          fontSize: 12,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        * 如果 label,value 都是相同值，那么可以简单只提供一个值：value1;value2;key,value3
      </div>
    </Form>
  );
};

const Selector: React.FC<PropTypes> = props => {
  const { mode, options } = props;
  const _options = parseOptions(options);
  switch (mode) {
    case 'stage':
      return <Stage {...props} optionsList={_options} />;
    case 'attr':
      return <Attr {...props} optionsList={_options} />;
    case 'preview':
      return <Preview {...props} optionsList={_options} />;
    default:
      return <Stage {...props} optionsList={_options} />;
  }
};

Selector.defaultProps = {
  name: nanoid(),
  value: undefined,
  selectMode: undefined,
  rules: [],
  label: '标题',
  placeholder: '请选择',
  options: '选项1,option1;选项2,option2;选项3,option3',
  mode: 'stage',
};

export default Selector;
