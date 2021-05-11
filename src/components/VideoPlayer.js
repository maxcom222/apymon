import ReactPlayer from 'react-player'

const VideoPlayer = ({
  url,
  autostart = true,
  controls = true,
  ...rest
}) => {
  return (
    <ReactPlayer
      url={url}
      playing={autostart}
      controls={controls}
      {...rest}
    />
  )
}

export default VideoPlayer