import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Input } from 'antd';
import { attrLabelCol, attrWrapperCol, attrLabelAlign, attTextAreaRows } from '../config';
import debounce from 'lodash.debounce';

const { TextArea } = Input;

interface PropTypes {
  name: string;
  label?: string;
  notesHtml?: string;
  mode?: string;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

const Stage: React.FC<PropTypes> = ({ notesHtml }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: notesHtml ? notesHtml : '请编辑注释信息',
      }}
    ></div>
  );
};

const Attr: React.FC<PropTypes> = props => {
  const { name, label, notesHtml } = props;

  const handleValuesChange = debounce((changedValues: any, allValues: any) => {
    props.onAttrPropsChange && props.onAttrPropsChange(changedValues, allValues);
  }, 500);

  return (
    <Form
      labelCol={attrLabelCol}
      wrapperCol={attrWrapperCol}
      labelAlign={attrLabelAlign}
      onValuesChange={handleValuesChange}
      initialValues={{ name, label, notesHtml }}
    >
      <Form.Item label="name" name="name" rules={[{ required: true, message: '请输入' }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="编辑注释" name="notesHtml">
        <TextArea rows={attTextAreaRows} placeholder="请直接输入注释信息，支持 html 格式" />
      </Form.Item>
    </Form>
  );
};

const Notes: React.FC<PropTypes> = props => {
  const { mode } = props;
  switch (mode) {
    case 'stage':
      return <Stage {...props} />;
    case 'attr':
      return <Attr {...props} />;
    default:
      return <Stage {...props} />;
  }
};

Notes.defaultProps = {
  name: nanoid(),
  label: '标题',
  notesHtml:
    "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
  mode: 'stage',
};

export default Notes;
