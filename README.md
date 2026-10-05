# HamsCam

HamsCam is a local-first, browser-based FOSS project for real-time camera, hand, and face landmark tracking with gesture-driven visual reactions.

The project uses the device camera and local computer-vision models to detect hand and face states directly in the browser. No backend or cloud processing is required.

## Features

- Browser webcam access
- Local camera stream
- Mirrored camera preview
- MediaPipe Hand Landmarker
- Detection of up to two hands
- 21 landmarks per detected hand
- Handedness detection
- Five fingertip landmarks:
  - Thumb
  - Index
  - Middle
  - Ring
  - Pinky
- Normalized landmark coordinates (`x`, `y`, `z`)
- Semantic hand and finger anchors
- Face tracking
- Mouth state detection
- Eye state detection
- Gesture recognition
- Gesture stabilization
- Face-state stabilization
- Gesture-priority reaction handling
- Image asset loading and management
- Asset attachment system
- Camera-to-display coordinate transformation
- Mirrored coordinate transformation
- Position smoothing
- Responsive interface
- Light and dark themes

## How It Works

HamsCam uses the camera as an input source for local computer-vision processing.

Hand tracking follows this pipeline:

```text
Camera
  ↓
Hand Tracking
  ↓
Finger Landmarks
  ↓
Gesture Detection
  ↓
Gesture Stabilization
  ↓
Avatar Reaction
```

Face tracking is handled separately:

```text
Camera
  ↓
Face Tracking
  ↓
Face Landmarks
  ↓
Mouth / Eye State Detection
  ↓
Face-State Stabilization
  ↓
Avatar Reaction
```

When both hand and face reactions are available, hand gestures take priority over face-based reactions.

The avatar itself remains a graphical element in the interface. The user's hands and face act as control signals rather than directly moving the avatar.

## Interface

The application provides:

- A live camera preview
- An avatar/reaction area
- Tracking status
- Number of detected hands
- Face detection status
- Current reaction state
- A gesture reference guide
- Light and dark theme switching

The interface is responsive and supports both desktop and mobile layouts.

## Technology

- JavaScript
- HTML
- CSS
- MediaPipe Tasks Vision
- Vite
- Browser Media APIs

## Architecture

The project is organized into small modules responsible for individual parts of the system:

```text
Camera
  ↓
Tracking
  ↓
Landmark Extraction
  ↓
Gesture / Face-State Detection
  ↓
Stabilization
  ↓
Asset Management
  ↓
Rendering
```

This separation keeps camera access, computer vision, interaction logic, assets, and rendering independent and easier to understand.

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
│   │   │   ├── hand_on_ear.jpg
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
│   ├── gestures/
│   │   ├── gestureStabilizer.js
│   │   ├── gestureSystem.js
│   │   ├── handOnEar.js
│   │   ├── okSign.js
│   │   ├── peace.js
│   │   ├── silence.js
│   │   └── thumbsUp.js
│   │
│   ├── graphics/
│   │   └── renderer.js
│   │
│   ├── motion/
│   │   ├── positionSmoother.js
│   │   └── testSmoother.js
│   │
│   ├── tracking/
│   │   ├── faceLandmarks.js
│   │   ├── faceState.js
│   │   ├── faceStateStabilizer.js
│   │   ├── faceTracker.js
│   │   ├── fingerLandmarks.js
│   │   ├── handTracker.js
│   │   ├── mouthState.js
│   │   └── eyeState.js
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

HamsCam is designed to run locally in the browser.

The project currently uses:

- No backend
- No database
- No authentication
- No telemetry
- No cloud computer-vision processing

Camera data is processed locally by the browser using the included computer-vision models.

## Privacy

HamsCam is designed around local processing. Camera input is used by the browser for real-time tracking and is not sent to a project backend.

Users should still review the permissions granted to their browser and device when allowing camera access.

## Development

HamsCam is intended to remain a small, understandable FOSS project.

The codebase separates computer-vision processing from interaction logic, asset management, and rendering so that individual components can be developed and tested independently.

## License

HamsCam is released under the MIT License.

See the [`LICENSE`](LICENSE) file for the complete license text.
