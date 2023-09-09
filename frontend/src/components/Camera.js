import './Camera.css'
const Camera = ({ videoRef, width, height }) => {
  return (
    <div className="camera">
      <video
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Camera;
