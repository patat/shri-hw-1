import React, { Component } from 'react';
import './Music.css';
import { cn, classnames } from '@bem-react/classname';

export interface IMusicProps {
  className: string,
  albumcover: string,
  artist: string,
  track: {
    name: string,
    length: string
  },
  volume: string
}

const cnMusic = cn('Music');

class Music extends Component<IMusicProps> {
  render() {
    return (
      <div className={classnames('Music', this.props.className, undefined, 'Music')}>
        <div className={cnMusic('Albumcover')}></div>
        <div className={cnMusic('Title')}>
          {this.props.artist} — {this.props.track.name}
        </div>
        <div className={cnMusic('Progress')}></div>
        <div className={cnMusic('Length')}>{this.props.track.length}</div>
        <div className={cnMusic('PrevTrack')}></div>
        <div className={cnMusic('NextTrack')}></div>
        <div className={cnMusic('VolumeSlider')}></div>
        <div className={cnMusic('VolumeValue')}>{this.props.volume}</div>
      </div>      
    );
  }
}

export default Music;