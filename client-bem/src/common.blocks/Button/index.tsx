import { compose, IClassNameProps } from '@bem-react/core';

import { Button as Base } from './Button';
import { ButtonThemeIslands } from './_theme/Button_theme_islands';
import { ButtonSizeSmall } from './_size/Button_size_small';
import { ButtonTypeAccept } from './_type/Button_type_accept';

export interface IButtonProps extends IClassNameProps {
  clickHandler: () => void;
  text?: string;
  type?: 'accept' | 'reject';
  theme?: 'islands';
  size?: 'small'
}

export const Button = compose(
  ButtonThemeIslands,
  ButtonSizeSmall,
  ButtonTypeAccept
)(Base);