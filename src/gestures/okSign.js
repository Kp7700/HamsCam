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

export function isOkSign(handLandmarks) {
  if (!handLandmarks || handLandmarks.length < 21) {
    return false;
  }

  const thumbTip = handLandmarks[4];
  const thumbIp = handLandmarks[3];

  const indexTip = handLandmarks[8];
  const indexPip = handLandmarks[6];

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

  const thumbIndexDistance = distance(
    thumbTip,
    indexTip,
  );

  const thumbIndexReference = distance(
    thumbIp,
    indexPip,
  );

  const thumbAndIndexTouching =
    thumbIndexDistance <
    thumbIndexReference * 0.7;

  const middleExtended =
    middleAngle > 150;

  const ringExtended =
    ringAngle > 150;

  const pinkyExtended =
    pinkyAngle > 150;

  return (
    thumbAndIndexTouching &&
    middleExtended &&
    ringExtended &&
    pinkyExtended
  );
}
