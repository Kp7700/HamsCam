export function getFaceState(
  faceDetected,
  mouthState,
  eyeState,
) {
  if (!faceDetected) {
    return "no_face";
  }

  const mouthOpen =
    mouthState?.open ?? false;

  const leftEyeOpen =
    eyeState?.screenLeftOpen ?? false;

  const rightEyeOpen =
    eyeState?.screenRightOpen ?? false;

  const bothEyesOpen =
    leftEyeOpen && rightEyeOpen;

  const bothEyesClosed =
    !leftEyeOpen && !rightEyeOpen;

  const oneEyeClosed =
    leftEyeOpen !== rightEyeOpen;

  if (mouthOpen && bothEyesOpen) {
    return "mouth_open_eyes_open";
  }

  if (mouthOpen && bothEyesClosed) {
    return "mouth_open_eyes_closed";
  }

  if (mouthOpen && oneEyeClosed) {
    return "mouth_open_one_eye_closed";
  }

  if (!mouthOpen && bothEyesClosed) {
    return "eyes_closed";
  }

  if (!mouthOpen && oneEyeClosed) {
    return "one_eye_closed";
  }

  return "neutral";
}
