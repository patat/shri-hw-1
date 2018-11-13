import { withBemMod } from '@bem-react/core';
import { IButtonProps } from '../index';
import './Button_size_small.css';

export const ButtonSizeSmall = withBemMod<IButtonProps>('Button', { size: 'small' });