import React, { Component } from 'react';
import { Button } from 'antd';
import { FancyButtonProps } from './types';
import { withTooltip, withPopconfirm } from './ButtonDecorator';
import { DeleteOutlined } from '@ant-design/icons';

class OriButton extends Component<FancyButtonProps, unknown> {
  constructor(props: FancyButtonProps) {
    super(props);
  }

  render() {
    return (
      <Button
        type="link"
        icon={<DeleteOutlined />}
        style={{ color: 'red' }}
        // {...this.props}
        // onClick={() => !this.props.confirmTitle && this.props.onClick && this.props.onClick()}
      />
    );
  }
}

class FancyButton extends Component<FancyButtonProps, unknown> {
  constructor(props: FancyButtonProps) {
    super(props);
  }

  render() {
    let Btn = OriButton;
    if (this.props.tooltipTitle) {
      Btn = withTooltip(Btn);
    }

    if (this.props.confirmTitle) {
      Btn = withPopconfirm(Btn);
    }

    return <Btn {...this.props} />;
  }
}

export default FancyButton;
