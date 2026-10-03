export function createCoordinateTransformer({
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  mirrored = false,
}) {
  return {
    transform(position) {
      if (!position) {
        return null;
      }

      let x = position.x;
      const y = position.y;

      if (mirrored) {
        x = 1 - x;
      }

      return {
        x: x * targetWidth,
        y: y * targetHeight,
      };
    },
  };
}
