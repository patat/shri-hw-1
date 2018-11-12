import React, { Component } from 'react';
import './EventCard.css';
import './music.css';
import richdata from './richdata.svg';
import { cn } from '@bem-react/classname';
import { IEventCardProps } from './index';

const cnEventCard = cn('EventCard');

class EventCard extends Component<IEventCardProps> {
  render() {
    return (
      <div className={this.props.className}>
        <div className={cnEventCard('Options')}>
          <div className={cnEventCard('Close')}></div>
          <div className={cnEventCard('More')}></div>
        </div>
        <div className={cnEventCard('Top')}>
          <div className={cnEventCard('Header')}>
            <div className={cnEventCard('Icon', { type: this.props.icon })} />
            <div className={cnEventCard('Heading', ['LineClamp'])}>
              <h2 className={cnEventCard('Title', ['LineClamp-Text'])}>{this.props.title}</h2>
            </div>
          </div>
          <div className={cnEventCard('Source')}>{this.props.source}</div>
          <div className={cnEventCard('Time')}>{this.props.time}</div>
        </div>
        <div className={cnEventCard('Rest')}>
          {this.props.description &&
            <p className={cnEventCard('Item') + cnEventCard('Description')}>{this.props.description}</p>
          }
          
          {this.props.data && this.props.data.type === "graph" &&
            <img src={richdata} className={cnEventCard('Item') + cnEventCard('Graph')} />
          }
          
          {this.props.data && this.props.data.temperature &&
            this.props.data.humidity &&
            <div className={cnEventCard('Item') + cnEventCard('Climate')}>
              <div className={cnEventCard('Temperature')}>Температура: <span className={cnEventCard('ClimateValue')}>{this.props.data.temperature} С</span></div>
              <div className={cnEventCard('Humidity')}>Влажность: <span className={cnEventCard('ClimateValue')}>{this.props.data.humidity}%</span></div>
            </div>            
          }

          {this.props.data && 
           this.props.data.albumcover &&
           this.props.data.artist &&
           this.props.data.track &&
           this.props.data.volume &&
             <div className={cnEventCard('Item') + cnEventCard('Music', ['music'])}>
              <div className="music__albumcover"></div>
              <div className="music__title">
                {this.props.data.artist} — {this.props.data.track.name}
              </div>
              <div className="music__progress"></div>
              <div className="music__length">{this.props.data.track.length}</div>
              <div className="music__prev-track"></div>
              <div className="music__next-track"></div>
              <div className="music__volume-slider"></div>
              <div className="music__volume-value">{this.props.data.volume}</div>
            </div>
          }
 
          {this.props.data && this.props.data.buttons &&
            <div className={cnEventCard('Item') + cnEventCard('Buttons')}>
              <div className={cnEventCard('Button', {accept: true})}>
                {this.props.data.buttons[0]}
              </div>
              <div className={cnEventCard('Button', {accept: false})}>
                {this.props.data.buttons[1]}
              </div>
            </div>            
          }

          {this.props.data && this.props.data.image &&
            <div className={cnEventCard('Item') + cnEventCard('Camera')}>
              <div className={cnEventCard('View')}>
                <div className={cnEventCard('Scrollbar')}>
                  <div className={cnEventCard('Scroller')}></div>
                </div>
              </div>
              <div className={cnEventCard('Panel')}>
                <div className={cnEventCard('Zoom')}>Приближение: 78%</div>
                <div className={cnEventCard('Brightness')}>Яркость: 50%</div>
              </div>
            </div>            
          }
        </div>
      </div>
    );
  }
}

export default EventCard;