# HamsCam

HamsCam is a local-first, browser-based FOSS project for real-time camera and hand landmark tracking.

## Current Status

**Version:** v0.0.2 
**Completed:** Phases 1–7

## Implemented

- Browser webcam access
- Local camera stream
- Mirrored camera preview
- MediaPipe Hand Landmarker
- Detection of up to two hands
- 21 landmarks per detected hand
- Handedness detection
- Extraction of five fingertip landmarks:
  - Thumb
  - Index
  - Middle
  - Ring
  - Pinky
- Normalized landmark coordinates (`x`, `y`, `z`)
- Semantic hand and finger anchors
- Image asset loading
- Asset management
- Asset attachment system
- Camera-to-display coordinate transformation
- Mirrored coordinate transformation
- Position smoothing
- Face tracking
- Mouth state detection
- Separate camera and graphics areas

## Current Interface

The application currently displays the default image and live camera side by side:

```text
Default Image | Camera
```

The camera preview is mirrored.

Hand and face tracking run in the background and provide landmark data to the application.

## Architecture

```text
Camera
   ↓
Hand Tracking
   ↓
Finger Landmarks
   ↓
Anchor System
   ↓
Coordinate Transformation
   ↓
Motion / Smoothing
   ↓
Graphics
```

Face tracking is handled separately:

```text
Camera
   ↓
Face Tracking
   ↓
Face Landmarks
   ↓
Mouth State
```

## Technology

- JavaScript
- HTML
- CSS
- MediaPipe Tasks Vision
- Vite
- Browser Media APIs

## Project Structure

```text
HamsCam/
├── public/
│   └── models/
│
├── src/
│   ├── anchors/
│   │   └── anchorSystem.js
│   │
│   ├── assets/
│   │   ├── HamsCam Images/
│   │   │   ├── default.jpg
│   │   │   ├── eyebrow.jpg
│   │   │   ├── hand_on_ear.jpg
│   │   │   ├── mischievous.jpg
│   │   │   ├── ok_sign.jpg
│   │   │   ├── open_eye_mouth.jpg
│   │   │   ├── open_mouth_close_eye.jpg
│   │   │   ├── peace.jpg
│   │   │   ├── silence.jpg
│   │   │   └── thumbs_up.jpg
│   │   ├── asset.js
│   │   ├── assetAttachment.js
│   │   ├── assetLoader.js
│   │   └── assetManager.js
│   │
│   ├── camera/
│   │   └── camera.js
│   │
│   ├── coordinates/
│   │   ├── coordinateTransform.js
│   │   └── displayCoordinates.js
│   │
│   ├── graphics/
│   │   └── renderer.js
│   │
│   ├── motion/
│   │   ├── positionSmoother.js
│   │   └── testSmoother.js
│   │
│   ├── tracking/
│   │   ├── faceTracker.js
│   │   ├── fingerLandmarks.js
│   │   ├── handTracker.js
│   │   └── mouthState.js
│   │
│   └── main.js
│
├── .gitignore
├── CHANGELOG.md
├── DEVELOPMENT.md
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── styles.css
```

## Local-First

HamsCam currently runs locally in the browser.

No backend, database, authentication, telemetry, or cloud processing is used.
