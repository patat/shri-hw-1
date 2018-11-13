import React, { Component } from 'react';
import './Button.css';
import { IButtonProps } from './index';
import { cn, classnames } from '@bem-react/classname';



const cnButton = cn('Button');

export class Button extends Component<IButtonProps> {
  render() {
    return (
      <div className={classnames('Button', this.props.className, undefined, 'Button')}
           onClick={this.props.clickHandler}>
        {this.props.text}
      </div>
    );
  }
}