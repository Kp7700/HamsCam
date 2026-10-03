# Changelog

All notable changes to HamsCam are documented here.

The project is currently in early development, so the changelog focuses on completed implementation changes.

## [v0.0.2] - 2026-10-03

### Added

- Tracked anchor system for semantic finger landmarks
- Image asset definitions
- Image asset loading
- Asset manager
- Asset attachment system
- Coordinate transformation system
- Display coordinate transformation
- Mirrored coordinate handling
- Position smoothing
- Face Landmarker integration
- Mouth state detection
- Separate camera and graphics areas
- HamsCam image asset collection

### Project Structure

Added separate modules for:

- Anchor management
- Asset management
- Coordinate transformation
- Graphics rendering
- Motion smoothing
- Face tracking
- Mouth state detection

### Notes

This release extends the initial camera and hand-tracking foundation with the completed systems currently present in the project.

## [v0.0.1] - 2026-10-02

### Added

- Initial HamsCam browser application
- Webcam access through the browser MediaDevices API
- Local MediaPipe Tasks Vision integration
- Hand Landmarker model
- Support for detecting up to two hands
- Video-mode hand inference
- Hand landmark extraction
- Fingertip extraction for:
  - Thumb
  - Index
  - Middle
  - Ring
  - Pinky
- Normalized `x`, `y`, and `z` fingertip coordinates
- Basic development logging for detected hands and fingertip landmarks

### Project Structure

Established separate modules for:

- Camera input
- Hand tracking
- Finger landmark extraction

### Notes

This release covers the initial camera, hand-tracking, and fingertip-landmark foundation.

Interactive graphics, anchors, coordinate transformation, smoothing, gesture recognition, face tracking, and avatar behavior are not part of this release.