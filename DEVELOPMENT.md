# HamsCam Development Guide

This document describes the development structure and architectural boundaries of HamsCam.

## Development Philosophy

HamsCam is developed incrementally.

Each phase should establish a working foundation before the next layer is added.

Do not implement future systems prematurely.

The goal is to keep each subsystem understandable, testable, and replaceable.

## Core Architecture

The project follows this pipeline:

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