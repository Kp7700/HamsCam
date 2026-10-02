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

const camera = document.querySelector("#camera");

const stream = await getCameraStream();

camera.srcObject = stream;

await camera.play();

const handTracker = await createHandTracker();

console.log("HamsCam hand tracking ready");

let frameCount = 0;

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

  const fingerTips = extractAllFingerTips(
    results.landmarks,
  );

  frameCount++;

  if (frameCount % 30 === 0) {
    console.log(`Detected hands: ${fingerTips.length}`);

    fingerTips.forEach((hand, index) => {
      console.log(`--- HAND ${index + 1} ---`);

      console.log(
        `THUMB  x=${hand.thumb_tip.x.toFixed(3)} ` +
        `y=${hand.thumb_tip.y.toFixed(3)} ` +
        `z=${hand.thumb_tip.z.toFixed(3)}`
      );

      console.log(
        `INDEX  x=${hand.index_tip.x.toFixed(3)} ` +
        `y=${hand.index_tip.y.toFixed(3)} ` +
        `z=${hand.index_tip.z.toFixed(3)}`
      );

      console.log(
        `MIDDLE x=${hand.middle_tip.x.toFixed(3)} ` +
        `y=${hand.middle_tip.y.toFixed(3)} ` +
        `z=${hand.middle_tip.z.toFixed(3)}`
      );

      console.log(
        `RING   x=${hand.ring_tip.x.toFixed(3)} ` +
        `y=${hand.ring_tip.y.toFixed(3)} ` +
        `z=${hand.ring_tip.z.toFixed(3)}`
      );

      console.log(
        `PINKY  x=${hand.pinky_tip.x.toFixed(3)} ` +
        `y=${hand.pinky_tip.y.toFixed(3)} ` +
        `z=${hand.pinky_tip.z.toFixed(3)}`
      );
    });
  }

  requestAnimationFrame(processFrame);
}

requestAnimationFrame(processFrame);