const FACE = {
  anatomicalLeftSide: 234,
  anatomicalRightSide: 454,

  leftFaceWidth: {
    left: 234,
    right: 454,
  },
};

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z ?? 0) - (b.z ?? 0);

  return Math.sqrt(
    dx * dx +
    dy * dy +
    dz * dz,
  );
}

function averagePoint(points) {
  return {
    x:
      points.reduce(
        (sum, point) => sum + point.x,
        0,
      ) / points.length,

    y:
      points.reduce(
        (sum, point) => sum + point.y,
        0,
      ) / points.length,

    z:
      points.reduce(
        (sum, point) =>
          sum + (point.z ?? 0),
        0,
      ) / points.length,
  };
}

function getHandCenter(hand) {
  return averagePoint([
    hand[0],  // wrist
    hand[5],  // index MCP
    hand[9],  // middle MCP
    hand[13], // ring MCP
    hand[17], // pinky MCP
  ]);
}

function isNearSide(distanceValue) {
  return distanceValue < 0.85;
}

function isFarFromSide(distanceValue) {
  return distanceValue > 1.0;
}

export function detectHandOnEar(
  faceLandmarks,
  handLandmarks,
) {
  if (
    !faceLandmarks ||
    faceLandmarks.length === 0 ||
    !handLandmarks ||
    handLandmarks.length < 2
  ) {
    return {
      detected: false,
      leftDistance: null,
      rightDistance: null,
    };
  }

  const faceWidth = distance(
    faceLandmarks[234],
    faceLandmarks[454],
  );

  if (faceWidth === 0) {
    return {
      detected: false,
      leftDistance: null,
      rightDistance: null,
    };
  }

  const handCenters =
    handLandmarks.map(getHandCenter);

  const measurements =
    handCenters.map((handCenter) => ({
      left:
        distance(
          handCenter,
          faceLandmarks[234],
        ) / faceWidth,

      right:
        distance(
          handCenter,
          faceLandmarks[454],
        ) / faceWidth,
    }));

  const handA = measurements[0];
  const handB = measurements[1];

  const handANearLeft =
    isNearSide(handA.left) &&
    isFarFromSide(handA.right);

  const handANearRight =
    isNearSide(handA.right) &&
    isFarFromSide(handA.left);

  const handBNearLeft =
    isNearSide(handB.left) &&
    isFarFromSide(handB.right);

  const handBNearRight =
    isNearSide(handB.right) &&
    isFarFromSide(handB.left);

  const detected =
    (handANearLeft && handBNearRight) ||
    (handANearRight && handBNearLeft);

  return {
    detected,

    leftDistance:
      Math.min(
        handA.left,
        handB.left,
      ),

    rightDistance:
      Math.min(
        handA.right,
        handB.right,
      ),
  };
}
