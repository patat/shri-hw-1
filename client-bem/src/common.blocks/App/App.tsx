import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di';
import MainWrapper from '../MainWrapper/MainWrapper';

const cnApp = cn('App');

export const App: React.SFC = () => (
  <RegistryConsumer>
    {registries => {
      // // reading App registry
      // const registry = registries[cnApp()];

      // // taking desktop or mobile version
      // const Button = registry.get<IButtonProps>(cnButton());

      return <MainWrapper />;
    }}
  </RegistryConsumer>
);
