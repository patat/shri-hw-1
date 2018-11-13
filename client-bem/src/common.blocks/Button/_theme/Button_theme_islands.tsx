import { withBemMod } from '@bem-react/core';
import { IButtonProps } from '../index';
import './Button_theme_islands.css';

export const ButtonThemeIslands = withBemMod<IButtonProps>('Button', { theme: 'islands' });