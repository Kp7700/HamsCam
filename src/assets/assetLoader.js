export function loadImageAsset(asset) {
  if (!asset || asset.type !== "image") {
    throw new Error("Invalid image asset.");
  }

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(
        new Error(`Failed to load image: ${asset.src}`),
      );
    };

    image.src = asset.src;
  });
}
