# HamsCam

HamsCam is a local-first, browser-based FOSS system for connecting real-world movement to interactive graphics.

The project is being developed incrementally, starting with camera input and hand landmark tracking and gradually building toward a reusable interaction system.

## Current Status

**Version:** v0.0.1  
**Current phase:** Phases 1–3 complete

### Currently implemented

- Browser webcam access
- Local camera stream
- MediaPipe Hand Landmarker
- Detection of up to two hands
- 21 landmarks per detected hand
- Extraction of five fingertip landmarks:
  - Thumb
  - Index
  - Middle
  - Ring
  - Pinky
- Normalized landmark coordinates (`x`, `y`, `z`)

The current version outputs fingertip landmark data to the browser console.

## Architecture

The intended architecture is:

```text
Real-world movement
        ↓
Camera
        ↓
Tracking
        ↓
Landmarks
        ↓
Anchors
        ↓
Interactive graphics
        ↓
Motion / interaction
        ↓
Renderer