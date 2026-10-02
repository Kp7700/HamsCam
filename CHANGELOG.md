
### `CHANGELOG.md`

Keep this factual and boring. That's a good thing for a changelog.

```md
# Changelog

All notable changes to HamsCam are documented here.

The project is currently in early development, so the changelog focuses on completed implementation changes.

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