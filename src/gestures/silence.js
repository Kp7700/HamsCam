function angle(a, b, c) {
  const ab = {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };

  const cb = {
    x: c.x - b.x,
    y: c.y - b.y,
    z: c.z - b.z,
  };

  const dot =
    ab.x * cb.x +
    ab.y * cb.y +
    ab.z * cb.z;

  const abLength = Math.sqrt(
    ab.x * ab.x +
    ab.y * ab.y +
    ab.z * ab.z,
  );

  const cbLength = Math.sqrt(
    cb.x * cb.x +
    cb.y * cb.y +
    cb.z * cb.z,
  );

  if (abLength === 0 || cbLength === 0) {
    return 0;
  }

  const cosine = Math.min(
    1,
    Math.max(-1, dot / (abLength * cbLength)),
  );

  return Math.acos(cosine) * (180 / Math.PI);
}

export function isSilence(handLandmarks) {
  if (!handLandmarks || handLandmarks.length < 21) {
    return false;
  }

  const indexAngle = angle(
    handLandmarks[5],
    handLandmarks[6],
    handLandmarks[8],
  );

  const middleAngle = angle(
    handLandmarks[9],
    handLandmarks[10],
    handLandmarks[12],
  );

  const ringAngle = angle(
    handLandmarks[13],
    handLandmarks[14],
    handLandmarks[16],
  );

  const pinkyAngle = angle(
    handLandmarks[17],
    handLandmarks[18],
    handLandmarks[20],
  );

  const indexExtended =
    indexAngle > 150;

  const middleFolded =
    middleAngle < 140;

  const ringFolded =
    ringAngle < 140;

  const pinkyFolded =
    pinkyAngle < 140;

  return (
    indexExtended &&
    middleFolded &&
    ringFolded &&
    pinkyFolded
  );
}
