import React, { Component } from 'react';
import './EventCard.css';
import './music.css';
import { HouseEvent } from '../event-cards/EventCards';
import richdata from './richdata.svg';


export interface EventCardProps extends HouseEvent {
  mix?: string
}

class EventCard extends Component<EventCardProps> {

  render() {
    return (
      <div className={`event-card ${this.props.mix ? this.props.mix : ""}`}>
        <div className="event-card__options">
          <div className="event-card__close"></div>
          <div className="event-card__more"></div>
        </div>
        <div className="event-card__top">
          <div className="event-card__header">
            <div className={`event-card__icon event-card__icon_${this.props.icon}`} />
            <div className="event-card__heading line-clamp">
              <h2 className="event-card__title line-clamp__text">{this.props.title}</h2>                  
            </div>
          </div>
          <div className="event-card__source">{this.props.source}</div>
          <div className="event-card__time">{this.props.time}</div>
        </div>
        <div className="event-card__rest">
          {this.props.description &&
            <p className="event-card__item event-card__description">{this.props.description}</p>
          }
          
          {this.props.data && this.props.data.type === "graph" &&
            <img src={richdata} className="event-card__item event-card__graph" />
          }
          
          {this.props.data && this.props.data.temperature &&
            this.props.data.humidity &&
            <div className="event-card__item event-card__climate">
              <div className="event-card__temperature">Температура: <span className="event-card__climate-value">{this.props.data.temperature} С</span></div>
              <div className="event-card__humidity">Влажность: <span className="event-card__climate-value">{this.props.data.humidity}%</span></div>
            </div>            
          }

          {this.props.data && 
           this.props.data.albumcover &&
           this.props.data.artist &&
           this.props.data.track &&
           this.props.data.volume &&
             <div className="event-card__item event-card__music music">
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
            <div className="event-card__item event-card__buttons">
              <div className="event-card__button event-card__button_accept">
                {this.props.data.buttons[0]}
              </div>
              <div className="event-card__button">
                {this.props.data.buttons[1]}
              </div>
            </div>            
          }

          {this.props.data && this.props.data.image &&
            <div className="event-card__item event-card__camera">
              <div className="event-card__view">
                <div className="event-card__scrollbar">
                  <div className="event-card__scroller"></div>
                </div>
              </div>
              <div className="event-card__panel">
                <div className="event-card__zoom">Приближение: 78%</div>
                <div className="event-card__brightness">Яркость: 50%</div>
              </div>
            </div>            
          }
        </div>
      </div>
    );
  }
}

export default EventCard;