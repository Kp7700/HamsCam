import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

const WASM_PATH =
  "/node_modules/@mediapipe/tasks-vision/wasm";

const MODEL_PATH =
  "/models/hand_landmarker.task";

export async function createHandTracker() {
  const vision = await FilesetResolver.forVisionTasks(WASM_PATH);

  const handLandmarker = await HandLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath: MODEL_PATH,
        delegate: "CPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
      minHandDetectionConfidence: 0.3,
      minHandPresenceConfidence: 0.3,
      minTrackingConfidence: 0.3,
    },
  );

  return handLandmarker;
}

export function detectHands(handTracker, video, timestamp) {
  return handTracker.detectForVideo(
    video,
    timestamp,
  );
}
