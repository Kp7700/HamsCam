export function createImageAsset(src) {
  return {
    type: "image",
    src,
  };
}

export function createSvgAsset(src) {
  return {
    type: "svg",
    src,
  };
}
