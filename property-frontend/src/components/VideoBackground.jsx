import React, { useRef, useEffect } from 'react';

const VideoBackground = ({ srcMp4, srcWebm, poster, overlay=true, className='' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = async () => {
      try {
        await v.play();
      } catch (_) {}
    };
    v.addEventListener('loadeddata', play);
    play();
    return () => v.removeEventListener('loadeddata', play);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={poster}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        {srcMp4 && <source src={srcMp4} type="video/mp4" />}
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </div>
  );
};

export default VideoBackground;