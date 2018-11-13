import React, { Component } from 'react';
import { compose } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import EventCardCommon from '../../common.blocks/EventCard/EventCard';
import { EventCardTypeCritical } from '../../common.blocks/EventCard/_type/EventCard_type_critical';
import { Button } from '../../common.blocks/Button';


const cnEventCard = cn('EventCard');

class EventCardMibile extends EventCardCommon {
  renderButtons(buttons: string[]) {
    if (!buttons) return;

    return (
      <div className={`${cnEventCard('Item')} ${cnEventCard('Buttons')}`}>
        {buttons.map(text => {
          const buttonType = text === 'Да' ? 'accept' : 'reject';
          return (
            <Button className={cnEventCard('Button')}
                  text={text}
                  theme={'islands'}
                  type={buttonType}
                  size={'small'}
                  clickHandler={() => alert(buttonType)}
            />
          );
        })}
      </div>
    );
  }  
}

export const EventCard = compose(
  EventCardTypeCritical
)(EventCardMibile);