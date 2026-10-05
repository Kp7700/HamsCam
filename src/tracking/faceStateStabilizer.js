export function createFaceStateStabilizer({
  requiredFrames = 1,
} = {}) {
  let candidate = "no_face";
  let candidateFrames = 0;
  let current = "no_face";

  return {
    update(faceState) {
      if (faceState === candidate) {
        candidateFrames++;
      } else {
        candidate = faceState;
        candidateFrames = 1;
      }

      if (
        candidateFrames >= requiredFrames &&
        candidate !== current
      ) {
        current = candidate;
      }

      return current;
    },

    reset() {
      candidate = "no_face";
      candidateFrames = 0;
      current = "no_face";
    },

    getCurrent() {
      return current;
    },
  };
}
