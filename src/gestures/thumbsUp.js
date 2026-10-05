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

export function isThumbsUp(handLandmarks) {
  if (!handLandmarks || handLandmarks.length < 21) {
    return false;
  }

  const wrist = handLandmarks[0];

  const thumbCmc = handLandmarks[1];
  const thumbMcp = handLandmarks[2];
  const thumbIp = handLandmarks[3];
  const thumbTip = handLandmarks[4];

  const indexMcp = handLandmarks[5];
  const indexPip = handLandmarks[6];
  const indexTip = handLandmarks[8];

  const middleMcp = handLandmarks[9];
  const middlePip = handLandmarks[10];
  const middleTip = handLandmarks[12];

  const ringMcp = handLandmarks[13];
  const ringPip = handLandmarks[14];
  const ringTip = handLandmarks[16];

  const pinkyMcp = handLandmarks[17];
  const pinkyPip = handLandmarks[18];
  const pinkyTip = handLandmarks[20];

  const thumbAngle = angle(
    thumbMcp,
    thumbIp,
    thumbTip,
  );

  const indexAngle = angle(
    indexMcp,
    indexPip,
    indexTip,
  );

  const middleAngle = angle(
    middleMcp,
    middlePip,
    middleTip,
  );

  const ringAngle = angle(
    ringMcp,
    ringPip,
    ringTip,
  );

  const pinkyAngle = angle(
    pinkyMcp,
    pinkyPip,
    pinkyTip,
  );

  const thumbExtended =
    thumbAngle > 150 &&
    distance(thumbTip, wrist) >
      distance(thumbMcp, wrist);

  const indexFolded = indexAngle < 140;
  const middleFolded = middleAngle < 140;
  const ringFolded = ringAngle < 140;
  const pinkyFolded = pinkyAngle < 140;

  return (
    thumbExtended &&
    indexFolded &&
    middleFolded &&
    ringFolded &&
    pinkyFolded
  );
}
