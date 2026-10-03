export function createPositionSmoother({
  smoothing = 0.25,
} = {}) {
  if (smoothing < 0 || smoothing > 1) {
    throw new Error(
      "Smoothing must be between 0 and 1.",
    );
  }

  let currentPosition = null;

  return {
    update(position) {
      if (!position) {
        currentPosition = null;
        return null;
      }

      if (!currentPosition) {
        currentPosition = {
          x: position.x,
          y: position.y,
        };

        return currentPosition;
      }

      currentPosition = {
        x:
          currentPosition.x +
          (position.x - currentPosition.x) *
            smoothing,

        y:
          currentPosition.y +
          (position.y - currentPosition.y) *
            smoothing,
      };

      return currentPosition;
    },

    reset() {
      currentPosition = null;
    },

    get() {
      return currentPosition;
    },
  };
}
