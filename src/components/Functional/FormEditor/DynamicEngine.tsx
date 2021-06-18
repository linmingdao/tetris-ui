import Loadable from 'react-loadable';
import { ITemplateItem } from './types';
import { EditorContext } from './EditorContext';
import React, { useMemo, memo, FC, useContext } from 'react';
import { WarningOutlined, LoadingOutlined } from '@ant-design/icons';

const tipStyle: React.CSSProperties = {
  fontSize: '14px',
  textAlign: 'center',
  verticalAlign: 'middle',
  display: 'inline-block',
  boxSizing: 'border-box',
};

function ErrorTip(msg: string) {
  return (
    <span style={{ ...tipStyle, color: '#f55757' }}>
      <WarningOutlined />
      <span style={{ paddingLeft: 8 }}>{msg}</span>
    </span>
  );
}

function LoadingTip(msg: string) {
  return (
    <span style={{ ...tipStyle, color: '#1890FF' }}>
      <LoadingOutlined />
      <span style={{ paddingLeft: 8 }}>{msg}</span>
    </span>
  );
}

function Loading(componentName: string) {
  return function (props: any) {
    if (props.error) {
      return ErrorTip(`${componentName} 组件加载失败, 请确认是否注册成功`);
    } else if (props.timedOut) {
      return ErrorTip(`${componentName} 组件加载超时了`);
    } else {
      return LoadingTip(`${componentName} 组件加载中...`);
    }
  };
}

export const DynamicFunc = (loader: any, componentName: string) => {
  return Loadable({
    loader,
    loading: Loading(componentName),
  });
};

export interface DynamicEngineProps {
  templateConfig: ITemplateItem;
  componentProps: any;
}

const DynamicEngine = memo((props: DynamicEngineProps) => {
  const { templates } = useContext(EditorContext);

  const { name } = props.templateConfig;
  if (!templates[name]) {
    return ErrorTip(`不存在名称为【${name}】的模板, 请检查传入的模板配置是否有误哟~~`);
  }

  const loader = templates[name].loader;
  if (!loader) {
    return ErrorTip(`名称为【${name}】的模板loader配置错误哟~~`);
  }

  const reactiveComponentProps = { ...props.componentProps };
  const Dynamic = useMemo(() => {
    return (DynamicFunc(loader, name) as unknown) as FC<DynamicEngineProps>;
  }, []);

  return <Dynamic {...reactiveComponentProps} />;
});

DynamicEngine.displayName = 'DynamicEngine';

export default DynamicEngine;
