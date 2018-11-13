import { withBemMod } from '@bem-react/core';
import { IButtonProps } from '../index';
import './Button_type_accept.css';

export const ButtonTypeAccept = withBemMod<IButtonProps>('Button', { type: 'accept' });