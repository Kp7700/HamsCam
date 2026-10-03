import {
  getCameraStream,
} from "./camera/camera.js";

import {
  createHandTracker,
  detectHands,
} from "./tracking/handTracker.js";

import {
  extractAllFingerTips,
} from "./tracking/fingerLandmarks.js";

import {
  createAnchorSystem,
} from "./anchors/anchorSystem.js";

import {
  createFaceTracker,
  detectFace,
} from "./tracking/faceTracker.js";

import {
  getMouthState,
} from "./tracking/mouthState.js";

import {
  createImageAsset,
} from "./assets/asset.js";

import {
  createAssetManager,
} from "./assets/assetManager.js";

import {
  createRenderer,
} from "./graphics/renderer.js";

import defaultImageUrl from "./assets/HamsCam Images/default.jpg";

const camera = document.querySelector("#camera");

const graphics = document.querySelector("#graphics");

const renderer = createRenderer(graphics);

const assetManager = createAssetManager();

const defaultAsset = createImageAsset(
  defaultImageUrl,
);

const defaultAvatar = {
  asset: defaultAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "default-avatar",
  defaultAvatar,
);

renderer.render(
  "default-avatar",
  defaultAvatar,
);

const stream = await getCameraStream();

camera.srcObject = stream;

camera.addEventListener("loadedmetadata", () => {
  console.log("Camera geometry:", {
    videoWidth: camera.videoWidth,
    videoHeight: camera.videoHeight,
    clientWidth: camera.clientWidth,
    clientHeight: camera.clientHeight,
    offsetWidth: camera.offsetWidth,
    offsetHeight: camera.offsetHeight,
  });
});

await camera.play();

const handTracker = await createHandTracker();

console.log("HamsCam hand tracking ready");

const faceTracker = await createFaceTracker();

console.log("HamsCam face tracking ready");

let frameCount = 0;

const anchorSystem = createAnchorSystem();

function processFrame() {
  if (camera.readyState < 2) {
    requestAnimationFrame(processFrame);
    return;
  }

  const timestamp = performance.now();

  const results = detectHands(
    handTracker,
    camera,
    timestamp,
  );

  const faceResults = detectFace(
    faceTracker,
    camera,
    timestamp,
  );

  const faceLandmarks =
    faceResults.faceLandmarks?.[0] ?? null;

  const mouthState = getMouthState(
    faceLandmarks,
  );

  const fingerTips = extractAllFingerTips(
    results.landmarks,
    results.handednesses,
  );

  const anchors = anchorSystem.update(
    fingerTips,
    timestamp,
  );

  frameCount++;

  if (frameCount % 30 === 0) {
    console.log(
      `Detected hands: ${fingerTips.length}`,
    );

    fingerTips.forEach((hand, index) => {
      console.log(`--- HAND ${index + 1} ---`);

      console.log(
        `THUMB  x=${hand.thumb_tip.x.toFixed(3)} ` +
        `y=${hand.thumb_tip.y.toFixed(3)} ` +
        `z=${hand.thumb_tip.z.toFixed(3)}`,
      );

      console.log(
        `INDEX  x=${hand.index_tip.x.toFixed(3)} ` +
        `y=${hand.index_tip.y.toFixed(3)} ` +
        `z=${hand.index_tip.z.toFixed(3)}`,
      );

      console.log(
        `MIDDLE x=${hand.middle_tip.x.toFixed(3)} ` +
        `y=${hand.middle_tip.y.toFixed(3)} ` +
        `z=${hand.middle_tip.z.toFixed(3)}`,
      );

      console.log(
        `RING   x=${hand.ring_tip.x.toFixed(3)} ` +
        `y=${hand.ring_tip.y.toFixed(3)} ` +
        `z=${hand.ring_tip.z.toFixed(3)}`,
      );

      console.log(
        `PINKY  x=${hand.pinky_tip.x.toFixed(3)} ` +
        `y=${hand.pinky_tip.y.toFixed(3)} ` +
        `z=${hand.pinky_tip.z.toFixed(3)}`,
      );
    });
  }

  requestAnimationFrame(processFrame);
}

requestAnimationFrame(processFrame);
