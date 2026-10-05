# Changelog

All notable changes to HamsCam are documented here.

The changelog records completed implementation and release changes.

## [v0.1.0] - 2026-10-05

### Added

- Gesture recognition system
- Gesture stabilization
- Thumbs Up gesture
- Peace gesture
- OK Sign gesture
- Silence gesture
- Both Hands on Ear gesture
- Face-state detection
- Eye-state detection
- Face-state stabilization
- Gesture-priority reaction handling
- Avatar reaction system
- Responsive application interface
- Light and dark theme support
- Tracking status display
- Hand detection status display
- Face detection status display
- Current reaction status display
- Gesture reference guide
- Mobile layout support
- Avatar scaling for different display sizes

### Improved

- Avatar rendering across different screen sizes
- Avatar centering and positioning
- Support for differently sized avatar assets
- Mobile visibility of graphical assets
- Separation between tracking, gesture detection, face-state detection, asset management, and rendering
- User interface organization and readability

### Cleanup

- Removed temporary camera geometry debugging
- Removed temporary hand-tracking logging
- Removed temporary face-tracking logging
- Removed frame-by-frame diagnostic logging
- Removed temporary frame-count debugging

### Documentation

- Updated `README.md`
- Updated `DEVELOPMENT.md`
- Added project license documentation
- Documented current architecture and module responsibilities

### Notes

This release represents the current completed HamsCam implementation, including real-time hand and face tracking, gesture and face-state reactions, avatar rendering, responsive UI behavior, and light/dark themes.

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
