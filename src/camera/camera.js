export async function getCameraStream() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  return stream;
}

export function stopCameraStream(stream) {
  if (!stream) {
    return;
  }

  stream.getTracks().forEach((track) => {
    track.stop();
  });
}
