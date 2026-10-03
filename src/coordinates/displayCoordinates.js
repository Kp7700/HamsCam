import {
  createCoordinateTransformer,
} from "./coordinateTransform.js";

export function createDisplayCoordinateTransformer(
  camera,
) {
  return createCoordinateTransformer({
    sourceWidth: camera.videoWidth,
    sourceHeight: camera.videoHeight,
    targetWidth: camera.clientWidth,
    targetHeight: camera.clientHeight,
    mirrored: true,
  });
}
