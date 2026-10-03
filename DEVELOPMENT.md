# HamsCam Development Guide

This document describes the development structure and architectural boundaries of HamsCam.

**Current version:** v0.0.2  
**Completed phases:** 1–7

## Development Philosophy

HamsCam is developed incrementally.

Each phase establishes a working foundation before the next layer is added.

The current implementation should remain understandable, testable, and separated into independent responsibilities.

## Core Architecture

The current project is organized around the following pipeline:

```text
Real-world movement
        ↓
Camera
        ↓
Hand Tracking
        ↓
Finger Landmarks
        ↓
Anchors
        ↓
Coordinate Transformation
        ↓
Motion / Smoothing
        ↓
Graphics
        ↓
Renderer
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
├── graphics/
│   └── renderer.js
│
├── motion/
│   ├── positionSmoother.js
│   └── testSmoother.js
│
├── tracking/
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
- Stopping camera tracks

The camera module does not handle tracking or graphics.

### Hand Tracking

`src/tracking/handTracker.js`

Handles MediaPipe Hand Landmarker.

Responsible for:

- Initializing the hand tracker
- Processing video frames
- Detecting up to two hands
- Returning MediaPipe hand landmark results

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

It also provides handedness information.

### Anchor System

`src/anchors/anchorSystem.js`

Converts tracked finger information into semantic anchors.

Examples:

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

### Mouth State

`src/tracking/mouthState.js`

Uses face landmarks to determine mouth state.

It currently calculates:

- Whether a face is detected
- Mouth openness
- Whether the mouth is considered open

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

### Coordinate Transformation

`src/coordinates/`

Handles conversion between normalized tracking coordinates and display coordinates.

The coordinate system also accounts for the mirrored camera view.

### Motion

`src/motion/positionSmoother.js`

Provides position smoothing for tracked coordinates.

The smoothing system is independent of the tracker and renderer.

`testSmoother.js` contains the current basic smoothing test.

### Graphics

`src/graphics/renderer.js`

Handles rendering graphical assets inside the graphics area.

The renderer is separate from the tracking system.

## Main Entry Point

`src/main.js` coordinates the different systems.

It is responsible for connecting:

```text
Camera
  ↓
Trackers
  ↓
Landmark extraction
  ↓
Anchors
  ↓
Application state
```

Individual subsystems should remain inside their respective modules rather than moving their implementation into `main.js`.

## Current Development Boundary

The current completed work includes:

```text
Camera
   ↓
Hand Tracking
   ↓
Finger Landmarks
   ↓
Anchors
   ↓
Assets
   ↓
Coordinates
   ↓
Smoothing
   ↓
Graphics
```

Face tracking and mouth-state detection are also present in the current codebase.

Gesture recognition is not part of the current implementation.

## Development Rules

1. Inspect the existing implementation before changing it.
2. Keep modules responsible for one clear subsystem.
3. Do not move tracking logic into the renderer.
4. Do not move rendering logic into tracking modules.
5. Keep coordinate conversion separate from tracking.
6. Keep smoothing separate from tracking.
7. Avoid unnecessary rewrites of working code.
8. Test each subsystem after making changes.
9. Keep `main.js` as the coordinator rather than turning it into a monolithic implementation.
10. Do not add future functionality until the current architecture requires it.
