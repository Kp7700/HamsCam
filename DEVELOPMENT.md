# HamsCam Development Guide

This document describes the development structure, architectural boundaries, and responsibilities of the HamsCam codebase.

## Development Philosophy

HamsCam is developed incrementally.

The project is organized into independent subsystems so that camera access, computer vision, interaction logic, assets, and rendering remain understandable and testable.

Changes should preserve the existing architecture unless there is a concrete reason to modify it.

## Core Architecture

HamsCam processes camera input through separate hand and face tracking pipelines.

### Hand and Gesture Pipeline

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
Reaction Selection
  ↓
Graphics
```

### Face Pipeline

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
Reaction Selection
  ↓
Graphics
```

When both systems produce a reaction, hand gestures take priority over face-based reactions.

## Project Structure

```text
src/
├── anchors/
│   └── anchorSystem.js
│
├── assets/
│   ├── HamsCam Images/
│   ├── asset.js
│   ├── assetAttachment.js
│   ├── assetLoader.js
│   └── assetManager.js
│
├── camera/
│   └── camera.js
│
├── coordinates/
│   ├── coordinateTransform.js
│   └── displayCoordinates.js
│
├── gestures/
│   ├── gestureStabilizer.js
│   ├── gestureSystem.js
│   ├── handOnEar.js
│   ├── okSign.js
│   ├── peace.js
│   ├── silence.js
│   └── thumbsUp.js
│
├── graphics/
│   └── renderer.js
│
├── motion/
│   ├── positionSmoother.js
│   └── testSmoother.js
│
├── tracking/
│   ├── eyeState.js
│   ├── faceLandmarks.js
│   ├── faceState.js
│   ├── faceStateStabilizer.js
│   ├── faceTracker.js
│   ├── fingerLandmarks.js
│   ├── handTracker.js
│   └── mouthState.js
│
└── main.js
```

## Module Responsibilities

### Camera

`src/camera/camera.js`

Handles browser camera access.

Responsible for:

- Requesting the webcam stream
- Returning the local video stream
- Managing camera tracks

The camera module does not perform tracking or rendering.

### Hand Tracking

`src/tracking/handTracker.js`

Handles MediaPipe Hand Landmarker.

Responsible for:

- Initializing the hand tracker
- Processing video frames
- Detecting up to two hands
- Returning hand landmark results

### Finger Landmarks

`src/tracking/fingerLandmarks.js`

Extracts the five fingertip landmarks from detected hands:

```text
thumb_tip
index_tip
middle_tip
ring_tip
pinky_tip
```

It also preserves handedness information.

### Anchor System

`src/anchors/anchorSystem.js`

Converts tracked finger information into semantic anchors.

Examples include:

```text
left_index_tip
right_index_tip
left_thumb_tip
right_thumb_tip
```

The anchor system provides a stable interface between tracking data and other systems.

### Face Tracking

`src/tracking/faceTracker.js`

Handles MediaPipe Face Landmarker.

It provides face landmark data independently from the hand tracking system.

### Face State

The face-tracking modules determine states from facial landmarks.

`src/tracking/mouthState.js` handles mouth openness.

`src/tracking/eyeState.js` handles eye state information.

`src/tracking/faceState.js` combines the relevant facial states into application-level face states.

`src/tracking/faceStateStabilizer.js` prevents short-lived changes from immediately becoming reactions.

### Gestures

`src/gestures/`

Contains gesture detection and stabilization.

Current gesture modules include:

- Thumbs Up
- Peace
- OK Sign
- Silence
- Both Hands on Ear

`gestureSystem.js` coordinates gesture detection.

`gestureStabilizer.js` reduces unstable frame-to-frame gesture changes.

Gesture recognition remains separate from the tracking modules. Tracking provides landmarks; gesture modules interpret those landmarks.

### Assets

The asset modules handle graphical assets.

```text
asset.js
assetAttachment.js
assetLoader.js
assetManager.js
```

They provide:

- Asset definitions
- Asset loading
- Asset management
- Attachment information
- Visibility and activation state

### Coordinate Transformation

`src/coordinates/`

Handles conversion between normalized tracking coordinates and display coordinates.

The coordinate system also accounts for the mirrored camera view.

### Motion

`src/motion/positionSmoother.js`

Provides position smoothing for tracked coordinates.

The smoothing system remains independent of the tracker and renderer.

`testSmoother.js` contains the current basic smoothing test.

### Graphics

`src/graphics/renderer.js`

Handles rendering graphical assets inside the graphics area.

The renderer receives attachment information and places the corresponding graphical elements.

The renderer does not perform tracking, gesture recognition, or face analysis.

## Main Entry Point

`src/main.js` coordinates the different systems.

It connects the major application stages:

```text
Camera
  ↓
Trackers
  ↓
Landmark Extraction
  ↓
Gesture / Face-State Detection
  ↓
Stabilization
  ↓
Reaction Selection
  ↓
Asset Rendering
```

`main.js` acts as the application coordinator. Individual subsystem implementations should remain inside their respective modules rather than being moved into `main.js`.

## Reaction System

HamsCam uses detected gestures and face states as control signals for graphical reactions.

The current priority is:

```text
Hand Gesture
     ↓
Face State
     ↓
Default Reaction
```

A stable hand gesture therefore takes precedence over a stable face reaction.

The avatar remains a graphical element in the interface. Tracking data determines the reaction state rather than directly moving the avatar according to the user's hand position.

## Development Boundaries

The following boundaries should be preserved:

1. Camera access belongs in the camera module.
2. Tracking belongs in the tracking modules.
3. Landmark extraction belongs in landmark-processing modules.
4. Gesture interpretation belongs in the gesture modules.
5. Face-state interpretation belongs in the face-state modules.
6. Coordinate conversion remains separate from tracking.
7. Smoothing remains separate from tracking.
8. Asset management remains separate from rendering.
9. Rendering belongs in the graphics module.
10. `main.js` coordinates systems but should not become a monolithic implementation.

## Development Rules

1. Inspect the existing implementation before changing it.
2. Keep modules responsible for one clear subsystem.
3. Do not move tracking logic into the renderer.
4. Do not move rendering logic into tracking modules.
5. Keep coordinate conversion separate from tracking.
6. Keep smoothing separate from tracking.
7. Keep gesture recognition separate from raw landmark detection.
8. Avoid unnecessary rewrites of working code.
9. Test the affected subsystem after making changes.
10. Preserve working behavior when making architectural changes.
11. Prefer small, understandable changes over large refactors.
12. Do not add functionality unless there is a concrete requirement for it.
