import React from 'react';
import classNames from 'classnames';
import { Player, Shortcut, ControlBar, CurrentTimeDisplay } from 'video-react';

import {
  PlayToggle,
  ProgressControl,
  VolumeMenuButton,
  FullscreenToggle,
} from 'components/Controls/VideoPlayerControls';
import { BigPlayButton } from 'components/Controls';

import './styles.scss';

export default class Video extends React.Component {
  render() {
    const { props } = this;
    const containerClassNames = classNames('file', 'media-video', { disabledVideo: props.disabled });
    const wrapperClassNames = classNames('video-wrapper', { disabledVideo: props.disabled });

    return (
      <div className={containerClassNames}>
        <div className={wrapperClassNames}>
          <Player width="100%" height={230} fluid={false} src={props.src} className="video-player">
            <Shortcut clickable={!props.disabled} />
            <BigPlayButton position="center" className="video-control-big-play-button" disable={props.disabled} />
            <ControlBar disableDefaultControls className="video-control show-always">
              <PlayToggle order={1} className="video-control-play-toggle" disable={props.disabled} />
              <CurrentTimeDisplay order={2} className="video-control-current-time" />
              <ProgressControl order={3} className="video-control-progress" disable={props.disabled} />
              <div order={4} className="video-control-empty" />
              <VolumeMenuButton order={5} className="video-control-volume-menu" disable={props.disabled} />
              <FullscreenToggle order={6} className="video-control-full-screen" disable={props.disabled} />
            </ControlBar>
          </Player>
        </div>
      </div>
    );
  }
}
