import React, { Component } from 'react';
import { Tooltip, Popconfirm } from 'antd';
import { FancyButtonProps } from './types';

export const withPopconfirm = (WrappedComponent: React.JSXElementConstructor<FancyButtonProps>) => {
  return class extends Component<FancyButtonProps, unknown> {
    constructor(props: FancyButtonProps) {
      super(props);
    }

    render() {
      return (
        <Popconfirm okText="确 认" cancelText="取 消" title={this.props.confirmTitle} onConfirm={() => this.props.onClick && this.props.onClick()}>
          <WrappedComponent {...this.props} />
        </Popconfirm>
      );
    }
  };
};

export const withTooltip = (WrappedComponent: React.JSXElementConstructor<FancyButtonProps>) => {
  return class extends Component<FancyButtonProps, unknown> {
    constructor(props: FancyButtonProps) {
      super(props);
    }

    render() {
      return (
        <Tooltip mouseEnterDelay={0.5} title={this.props.tooltipTitle}>
          <WrappedComponent {...this.props} />
        </Tooltip>
      );
    }
  };
};
