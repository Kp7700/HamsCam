const MOUTH = {
  upperLip: 13,
  lowerLip: 14,
  leftMouth: 61,
  rightMouth: 291,
};

const FACE_HEIGHT = {
  forehead: 10,
  chin: 152,
};

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return Math.sqrt(
    dx * dx +
    dy * dy +
    dz * dz,
  );
}

export function getMouthState(faceLandmarks) {
  if (
    !faceLandmarks ||
    faceLandmarks.length < 468
  ) {
    return {
      detected: false,
      open: false,
      openness: 0,
    };
  }

  const upperLip = faceLandmarks[MOUTH.upperLip];
  const lowerLip = faceLandmarks[MOUTH.lowerLip];

  const leftMouth = faceLandmarks[MOUTH.leftMouth];
  const rightMouth = faceLandmarks[MOUTH.rightMouth];

  const forehead = faceLandmarks[FACE_HEIGHT.forehead];
  const chin = faceLandmarks[FACE_HEIGHT.chin];

  const mouthOpening = distance(
    upperLip,
    lowerLip,
  );

  const mouthWidth = distance(
    leftMouth,
    rightMouth,
  );

  const faceHeight = distance(
    forehead,
    chin,
  );

  if (mouthWidth === 0 || faceHeight === 0) {
    return {
      detected: true,
      open: false,
      openness: 0,
    };
  }

  const normalizedOpening =
    mouthOpening / faceHeight;

  const openness =
    normalizedOpening / 0.05;

  return {
    detected: true,
    open: openness > 1,
    openness,
  };
}
