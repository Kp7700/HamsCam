import { isThumbsUp } from "./thumbsUp.js";
import { isPeace } from "./peace.js";
import { isOkSign } from "./okSign.js";
import { isSilence } from "./silence.js";
import { detectHandOnEar } from "./handOnEar.js";

const gestures = [
  {
    name: "thumbs_up",
    detector: isThumbsUp,
  },
  {
    name: "peace",
    detector: isPeace,
  },
  {
    name: "ok_sign",
    detector: isOkSign,
  },
  {
    name: "silence",
    detector: isSilence,
  },
];

export function detectGesture(handLandmarks) {
  if (!handLandmarks) {
    return "none";
  }

  for (const gesture of gestures) {
    if (gesture.detector(handLandmarks)) {
      return gesture.name;
    }
  }

  return "none";
}

export function detectFullFrameGesture(faceLandmarks, handLandmarks) {
  if (!faceLandmarks || !handLandmarks) {
    return "none";
  }

  if (detectHandOnEar(faceLandmarks, handLandmarks).detected) {
    return "hand_on_ear";
  }

  return "none";
}
