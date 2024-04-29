import React from 'react'

const Screenshot = () => {
  const takeScreenShot = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('getDisplayMedia is not supported in this environment');
      return null;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        //@ts-ignore
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: '',
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720,
        },
      },
    });
    const track = stream.getVideoTracks()[0];
    //@ts-ignore
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();
    track.stop();
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    context?.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
    const image = canvas.toDataURL();
    const res = await fetch(image);
    const buff = await res.arrayBuffer();
    const file = [
      new File([buff], `photo_${new Date()}.jpg`, {
        type: 'image/jpeg',
      }),
    ];
    return file;
  };
  takeScreenShot();
}

export default Screenshot;