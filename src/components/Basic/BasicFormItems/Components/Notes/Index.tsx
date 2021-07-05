import React from 'react';
import { Form } from 'antd';
import { nanoid } from 'nanoid';
import Iconfont from '../../Iconfont';
import RichText from '../../../RichText';
import CommonAttributes from '../../CommonAttributes';

interface PropTypes {
  name: string;
  label?: string;
  notesHtml?: string;
  mode?: string;
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
      {...{
        ...props,
        initialValues: { notesHtml },
      }}
      noPlaceholder
      noRules
    >
      <Form.Item label="编辑注释" name="notesHtml">
        <RichText placeholder="请输入注释信息" />
      </Form.Item>
    </CommonAttributes>
  );
};

const Builder: React.FC<PropTypes> = props => {
  const { mode } = props;
  switch (mode) {
    case 'stage':
      return <Stage {...props} />;
    case 'preview':
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
  loader: () => import('./Index'),
  props: {
    name: nanoid(),
    label: '标题',
    value:
      '<p>1、注释内容1</p><p>2、注释内容2，<a href="https://www.baidu.com" target="_blank">百度</a></p><p>3、注释内容3</p><p>4、注释内容4</p><p>5、哈哈哈哈哈哈</p>',
    notesHtml:
      '<p>1、注释内容1</p><p>2、注释内容2，<a href="https://www.baidu.com" target="_blank">百度</a></p><p>3、注释内容3</p><p>4、注释内容4</p><p>5、哈哈哈哈哈哈</p>',
    mode: 'stage',
  },
};
