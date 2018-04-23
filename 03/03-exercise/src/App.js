/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
const rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import './index.css'
import React from 'react'
import * as PropTypes from 'prop-types'
import podcast from './podcast.mp3'
import mario from './mariobros.mp3'
import FaPause from 'react-icons/lib/fa/pause'
import FaPlay from 'react-icons/lib/fa/play'
import FaRepeat from 'react-icons/lib/fa/repeat'
import FaRotateLeft from 'react-icons/lib/fa/rotate-left'

class AudioPlayer extends React.Component {

  static childContextTypes = {
    play: PropTypes.bool.isRequired,
    pause: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,

    handleAudio: PropTypes.func.isRequired,
    handleProgressBar: PropTypes.func.isRequired,
    jumForward: PropTypes.func.isRequired,
    jumpBack: PropTypes.func.isRequired
  }
  state = {
    play: false,
    pause: true,
    duration: 0,
    currentTime: 0
  }


  getChildContext() {
    return {
      ...this.state,
      handleProgressBar: this.handleProgressBar,
      handleAudio: this.handleAudio,
      jumpBack: this.jumpBack,
      jumForward: this.jumForward
    }
  }




  handleEnd = () => {
    this.setState({
      play: false,
      pause: true
    })
  }

  handleTime = () => {
    this.setState({
      currentTime: this.audio.currentTime
    })
  }


  jumForward = () => {
    this.audio.currentTime = this.state.currentTime + 10
  }

  jumpBack = () => {
    this.audio.currentTime = this.state.currentTime - 30
  }

  handleProgressBar = (event) => {
    let rect = event.currentTarget.getBoundingClientRect();
    let newTime = this.state.duration * ((event.clientX - rect.left) / rect.width);
    this.audio.currentTime = newTime;
  }

  handleAudio = (event) => {
    event.preventDefault();
    console.log(event);
    const { title } = event.currentTarget;

    if (title === 'play') {
      this.setState({
        play: true,
        pause: false
      },
        () => this.audio.play()
      )

    }
    else if (title === 'pause') {
      this.setState({
        play: false,
        pause: true
      },
        () => this.audio.pause()
      )

    }
  }

  setDuration = () => {
    this.setState({
      duration: this.audio.duration
    })
  }


  render() {
    const { source } = this.props;
    return (
      <div className="audio-player">
        <audio
          src={source}
          onTimeUpdate={this.handleTime}
          onLoadedData={this.setDuration}
          onEnded={this.handleEnd}
          ref={n => this.audio = n}
        />
        {this.props.children}
      </div>
    )
  }
}

class Play extends React.Component {

  static contextTypes = {
    play: PropTypes.bool.isRequired,
    handleAudio: PropTypes.func.isRequired
  }
  render() {
    const { play, handleAudio } = this.context;
    return (
      <button
        className="icon-button"
        onClick={handleAudio}
        disabled={play}
        title="play"
      ><FaPlay /></button>
    )
  }
}

class Pause extends React.Component {

  static contextTypes = {
    pause: PropTypes.bool.isRequired,
    handleAudio: PropTypes.func.isRequired
  }


  render() {
    const { pause, handleAudio } = this.context;
    return (
      <button
        className="icon-button"
        onClick={handleAudio}
        disabled={pause}
        title="pause"
      ><FaPause /></button>
    )
  }
}

class PlayPause extends React.Component {
  static contextTypes = {
    pause: PropTypes.bool.isRequired,
    play: PropTypes.bool.isRequired
  }

  getBody = () => {
    const { pause, play } = this.context;
    if (!pause) return <Pause />
    else if (!play) return <Play />
  }

  render() {
    return this.getBody()
  }
}

class JumpForward extends React.Component {
  static contextTypes = {
    jumForward: PropTypes.func.isRequired,
    pause: PropTypes.bool.isRequired
  }

  render() {
    const { jumForward, pause } = this.context;
    return (
      <button
        className="icon-button"
        onClick={jumForward}
        disabled={pause}
        title="Forward 10 Seconds"
      ><FaRepeat /></button>
    )
  }
}

class JumpBack extends React.Component {
  static contextTypes = {
    jumpBack: PropTypes.func.isRequired,
    pause: PropTypes.bool.isRequired
  }
  render() {
    const { jumpBack, pause } = this.context;
    return (
      <button
        className="icon-button"
        onClick={jumpBack}
        disabled={pause}
        title="Back 10 Seconds"
      ><FaRotateLeft /></button>
    )
  }
}

class Progress extends React.Component {

  static contextTypes = {
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    handleProgressBar: PropTypes.func.isRequired
  }


  getWidth = () => {
    const { duration, currentTime } = this.context;
    if (duration && currentTime) return currentTime / (duration / 100);
    return 0

  }
  render() {
    const { handleProgressBar } = this.context;
    return (
      <div
        className="progress"
        onClick={handleProgressBar}
      >
        <div
          className="progress-bar"
          style={{
            width: `${this.getWidth()}%`
          }}
        />
      </div>
    )
  }
}

const Exercise = () => (
  <div className="exercise">
    {/*  <AudioPlayer source={mario}>
      <Play /> <Pause />{' '}
      <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer> */}

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward /> {' '}
      <span className="player-text">React30 Episode 010: React Virtualized</span>
      <Progress />
    </AudioPlayer>
  </div>
)

export default Exercise
