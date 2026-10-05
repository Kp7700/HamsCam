export function createGestureStabilizer({
  requiredFrames = 1,
} = {}) {
  let candidate = "none";
  let candidateFrames = 0;
  let current = "none";

  return {
    update(gesture) {
      if (gesture === candidate) {
        candidateFrames++;
      } else {
        candidate = gesture;
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
      candidate = "none";
      candidateFrames = 0;
      current = "none";
    },

    getCurrent() {
      return current;
    },
  };
}
