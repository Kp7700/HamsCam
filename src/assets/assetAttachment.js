export function createAssetAttachment({
  asset,
  anchorId,
  width = null,
  height = null,
  scale = 1,
  visible = true,
}) {
  return {
    asset,
    anchorId,
    width,
    height,
    scale,
    visible,
    active: true,
  };
}
