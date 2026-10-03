const FINGERTIP_INDICES = {
  thumb_tip: 4,
  index_tip: 8,
  middle_tip: 12,
  ring_tip: 16,
  pinky_tip: 20,
};

function getHandednessLabel(handedness) {
  if (!handedness || handedness.length === 0) {
    return null;
  }

  return handedness[0].categoryName?.toLowerCase() ?? null;
}

export function extractFingerTips(handLandmarks, handedness) {
  if (!handLandmarks || handLandmarks.length < 21) {
    return null;
  }

  return {
    handedness: getHandednessLabel(handedness),

    thumb_tip: handLandmarks[FINGERTIP_INDICES.thumb_tip],
    index_tip: handLandmarks[FINGERTIP_INDICES.index_tip],
    middle_tip: handLandmarks[FINGERTIP_INDICES.middle_tip],
    ring_tip: handLandmarks[FINGERTIP_INDICES.ring_tip],
    pinky_tip: handLandmarks[FINGERTIP_INDICES.pinky_tip],
  };
}

export function extractAllFingerTips(handsLandmarks, handednesses = []) {
  return handsLandmarks
    .map((handLandmarks, index) =>
      extractFingerTips(
        handLandmarks,
        handednesses[index],
      )
    )
    .filter(Boolean);
}
