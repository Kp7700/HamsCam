const FINGERTIP_INDICES = {
  thumb_tip: 4,
  index_tip: 8,
  middle_tip: 12,
  ring_tip: 16,
  pinky_tip: 20,
};

export function extractFingerTips(handLandmarks) {
  if (!handLandmarks || handLandmarks.length < 21) {
    return null;
  }

  return {
    thumb_tip: handLandmarks[FINGERTIP_INDICES.thumb_tip],
    index_tip: handLandmarks[FINGERTIP_INDICES.index_tip],
    middle_tip: handLandmarks[FINGERTIP_INDICES.middle_tip],
    ring_tip: handLandmarks[FINGERTIP_INDICES.ring_tip],
    pinky_tip: handLandmarks[FINGERTIP_INDICES.pinky_tip],
  };
}

export function extractAllFingerTips(handsLandmarks) {
  return handsLandmarks
    .map(extractFingerTips)
    .filter(Boolean);
}
