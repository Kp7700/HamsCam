const EYES = {
  left: {
    outer: 33,
    inner: 133,
    upper1: 160,
    lower1: 144,
    upper2: 158,
    lower2: 153,
  },

  right: {
    outer: 362,
    inner: 263,
    upper1: 385,
    lower1: 380,
    upper2: 387,
    lower2: 373,
  },
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

function getEyeOpenness(faceLandmarks, eye) {
  const outer = faceLandmarks[eye.outer];
  const inner = faceLandmarks[eye.inner];

  const upper1 = faceLandmarks[eye.upper1];
  const lower1 = faceLandmarks[eye.lower1];

  const upper2 = faceLandmarks[eye.upper2];
  const lower2 = faceLandmarks[eye.lower2];

  const eyeWidth = distance(
    outer,
    inner,
  );

  if (eyeWidth === 0) {
    return 0;
  }

  const vertical1 = distance(
    upper1,
    lower1,
  );

  const vertical2 = distance(
    upper2,
    lower2,
  );

  return (
    (vertical1 + vertical2) /
    (2 * eyeWidth)
  );
}

export function getEyeState(faceLandmarks) {
  if (
    !faceLandmarks ||
    faceLandmarks.length < 468
  ) {
    return {
        detected: false,

        screenLeftOpen: false,
        screenRightOpen: false,

        bothOpen: false,

        openness: {
            screenLeft: 0,
            screenRight: 0,
        },
    };
  }

  const left = getEyeOpenness(
    faceLandmarks,
    EYES.left,
  );

  const right = getEyeOpenness(
    faceLandmarks,
    EYES.right,
  );

  const threshold = 0.20;

  const leftOpen = left > threshold;
  const rightOpen = right > threshold;

  return {
    detected: true,

    screenLeftOpen: rightOpen,
    screenRightOpen: leftOpen,
    bothOpen:
    leftOpen && rightOpen,

    openness: {
        screenLeft: right,
        screenRight: left,
    },
  };
}
