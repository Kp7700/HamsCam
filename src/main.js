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
  createImageAsset,
} from "./assets/asset.js";

import {
  createAssetManager,
} from "./assets/assetManager.js";

import {
  createRenderer,
} from "./graphics/renderer.js";

import defaultImageUrl from "./assets/HamsCam Images/default.jpg";

import thumbsUpImageUrl from "./assets/HamsCam Images/thumbs_up.jpg";

import peaceImageUrl from "./assets/HamsCam Images/peace.jpg";

import okSignImageUrl from "./assets/HamsCam Images/ok_sign.jpg";

import {
  detectGesture,
  detectFullFrameGesture,
} from "./gestures/gestureSystem.js";

import {
  createGestureStabilizer,
} from "./gestures/gestureStabilizer.js";

import silenceImageUrl from "./assets/HamsCam Images/silence.jpg";

import {
  createFaceTracker,
  detectFace,
} from "./tracking/faceTracker.js";

import {
  getMouthState,
} from "./tracking/mouthState.js";

import openEyeMouthImageUrl from "./assets/HamsCam Images/open_eye_mouth.jpg";

import { getEyeState } from "./tracking/eyeState.js";

import { getFaceState } from "./tracking/faceState.js";

import openMouthCloseEyeImageUrl from "./assets/HamsCam Images/open_mouth_close_eye.jpg";

import {
  createFaceStateStabilizer,
} from "./tracking/faceStateStabilizer.js";

import handOnEarImageUrl from "./assets/HamsCam Images/hand_on_ear.jpg";

const camera = document.querySelector("#camera");

const graphics = document.querySelector("#graphics");

const trackingStatus = document.querySelector("#tracking-status");
const handsStatus = document.querySelector("#hands-status");
const faceStatus = document.querySelector("#face-status");
const reactionStatus = document.querySelector("#reaction-status");

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  themeToggle.textContent = isDark ? "Light" : "Dark";

  themeToggle.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light theme"
      : "Switch to dark theme",
  );
});

const renderer = createRenderer(graphics);

const assetManager = createAssetManager();


const defaultAsset = createImageAsset(
  defaultImageUrl,
);

const thumbsUpAsset = createImageAsset(
  thumbsUpImageUrl,
);

const peaceAsset = createImageAsset(
  peaceImageUrl,
);

const okSignAsset = createImageAsset(
  okSignImageUrl,
);

const silenceAsset = createImageAsset(
  silenceImageUrl,
);

const handOnEarAsset = createImageAsset(
  handOnEarImageUrl,
);

const openEyeMouthAsset = createImageAsset(
  openEyeMouthImageUrl,
);

const openMouthCloseEyeAsset = createImageAsset(
  openMouthCloseEyeImageUrl,
);

const faceStateStabilizer =
  createFaceStateStabilizer({
    requiredFrames: 2,
  });

const handOnEarAvatar = {
  asset: handOnEarAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "hand-on-ear-avatar",
  handOnEarAvatar,
);

const openMouthCloseEyeAvatar = {
  asset: openMouthCloseEyeAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "open-mouth-close-eye-avatar",
  openMouthCloseEyeAvatar,
);

const silenceAvatar = {
  asset: silenceAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "silence-avatar",
  silenceAvatar,
);

const openEyeMouthAvatar = {
  asset: openEyeMouthAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "open-eye-mouth-avatar",
  openEyeMouthAvatar,
);

const okSignAvatar = {
  asset: okSignAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "ok-sign-avatar",
  okSignAvatar,
);


const peaceAvatar = {
  asset: peaceAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "peace-avatar",
  peaceAvatar,
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


const thumbsUpAvatar = {
  asset: thumbsUpAsset,
  visible: true,
  active: true,
  width: 400,
  height: 400,
};

assetManager.add(
  "thumbs-up-avatar",
  thumbsUpAvatar,
);


renderer.render(
  "default-avatar",
  defaultAvatar,
);


const gestureAvatars = {
  hand_on_ear: handOnEarAvatar,
  thumbs_up: thumbsUpAvatar,
  peace: peaceAvatar,
  ok_sign: okSignAvatar,
  silence: silenceAvatar,
};

const faceAvatars = {
  mouth_open_eyes_open: openEyeMouthAvatar,
  mouth_open_eyes_closed: openMouthCloseEyeAvatar,
};

const stream = await getCameraStream();

camera.srcObject = stream;

await camera.play();


const handTracker = await createHandTracker();

const faceTracker = await createFaceTracker();

const anchorSystem = createAnchorSystem();

const gestureStabilizer = createGestureStabilizer({
  requiredFrames: 5,
});


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

  const mouthState =
    getMouthState(faceLandmarks);

  const eyeState =
    getEyeState(faceLandmarks);

  const faceState = getFaceState(
    faceResults.faceLandmarks?.length > 0,
    mouthState,
    eyeState,
  );

  const stableFaceState =
  faceStateStabilizer.update(
    faceState,
  );


  const fingerTips = extractAllFingerTips(
    results.landmarks,
    results.handednesses,
  );

  handsStatus.textContent = fingerTips.length;

  faceStatus.textContent =
    faceResults.faceLandmarks?.length > 0
      ? "Detected"
      : "Not detected";

  trackingStatus.textContent = "Active";


  anchorSystem.update(
    fingerTips,
    timestamp,
  );


  const gesture =
    results.landmarks
      ?.map((handLandmarks) =>
        detectGesture(handLandmarks),
      )
      .find(
        (gesture) => gesture !== "none",
      ) ?? "none";

  const fullFrameGesture = detectFullFrameGesture(
    faceLandmarks,
    results.landmarks,
  );

  const detectedGesture =
    fullFrameGesture !== "none"
      ? fullFrameGesture
      : gesture;

  const stableGesture =
    gestureStabilizer.update(detectedGesture);

  let avatar = defaultAvatar;

  if (stableGesture !== "none") {
    avatar =
      gestureAvatars[stableGesture] ??
      defaultAvatar;
  } else {
    avatar =
      faceAvatars[stableFaceState] ??
      defaultAvatar;
  }

  if (stableGesture !== "none") {
    reactionStatus.textContent = stableGesture;
  } else {
    reactionStatus.textContent = stableFaceState;
  }

  renderer.render(
    "default-avatar",
    {
      ...avatar,
      visible: true,
    },
  );


  requestAnimationFrame(
    processFrame,
  );
}


requestAnimationFrame(
  processFrame,
);
