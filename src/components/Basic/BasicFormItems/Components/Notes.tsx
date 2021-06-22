import React from 'react';
import { nanoid } from 'nanoid';
import Iconfont from '../Iconfont';
import { Form, Input } from 'antd';
import CommonAttributes, { extractCommonAttributes } from '../CommonAttributes';

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
  const { notesHtml } = props;

  return (
    <CommonAttributes
      {...extractCommonAttributes({
        ...props,
        initialValues: { notesHtml },
      })}
      noPlaceholder
      noRules
    >
      <Form.Item label="编辑注释" name="notesHtml">
        <TextArea rows={6} placeholder="请直接输入注释信息，支持 html 格式" />
      </Form.Item>
    </CommonAttributes>
  );
};

const Builder: React.FC<PropTypes> = props => {
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

export default Builder;

export const Notes = {
  group: '基础组件',
  label: '注释',
  name: 'Notes',
  instance: Builder,
  icon: <Iconfont type="icon-notes" />,
  loader: () => import('./Notes'),
  props: {
    name: nanoid(),
    label: '标题',
    value:
      "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
    notesHtml:
      "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
    mode: 'stage',
  },
};
