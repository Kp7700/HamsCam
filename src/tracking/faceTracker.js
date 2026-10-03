import {
  FilesetResolver,
  FaceLandmarker,
} from "@mediapipe/tasks-vision";

const WASM_PATH =
  "/node_modules/@mediapipe/tasks-vision/wasm";

const MODEL_PATH =
  "/models/face_landmarker.task";

export async function createFaceTracker() {
  const vision = await FilesetResolver.forVisionTasks(
    WASM_PATH,
  );

  const faceLandmarker =
    await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: MODEL_PATH,
          delegate: "CPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
        minFaceDetectionConfidence: 0.3,
        minFacePresenceConfidence: 0.3,
        minTrackingConfidence: 0.3,
      },
    );

  return faceLandmarker;
}

export function detectFace(
  faceTracker,
  video,
  timestamp,
) {
  return faceTracker.detectForVideo(
    video,
    timestamp,
  );
}
