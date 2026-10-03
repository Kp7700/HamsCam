const FINGER_NAMES = [
  "thumb_tip",
  "index_tip",
  "middle_tip",
  "ring_tip",
  "pinky_tip",
];

const HANDEDNESS = ["left", "right"];

function createAnchorId(handedness, fingerName) {
  return `${handedness}_${fingerName}`;
}

function createEmptyAnchor(handedness, fingerName, timestamp) {
  return {
    id: createAnchorId(handedness, fingerName),
    source: {
      handedness,
      landmark: fingerName,
    },
    position: null,
    tracked: false,
    timestamp,
  };
}

function createAnchor(
  handedness,
  fingerName,
  landmark,
  timestamp,
) {
  return {
    id: createAnchorId(handedness, fingerName),
    source: {
      handedness,
      landmark: fingerName,
    },
    position: {
      x: landmark.x,
      y: landmark.y,
      z: landmark.z,
    },
    tracked: true,
    timestamp,
  };
}

export function createAnchorSystem() {
  let anchors = {};

  return {
    update(fingerTips, timestamp) {
      const nextAnchors = {};

      // Start with every possible anchor as untracked.
      HANDEDNESS.forEach((handedness) => {
        FINGER_NAMES.forEach((fingerName) => {
          nextAnchors[
            createAnchorId(handedness, fingerName)
          ] = createEmptyAnchor(
            handedness,
            fingerName,
            timestamp,
          );
        });
      });

      // Replace available anchors with current tracking data.
      fingerTips.forEach((hand) => {
        if (!HANDEDNESS.includes(hand.handedness)) {
          return;
        }

        FINGER_NAMES.forEach((fingerName) => {
          const landmark = hand[fingerName];

          if (!landmark) {
            return;
          }

          const id = createAnchorId(
            hand.handedness,
            fingerName,
          );

          nextAnchors[id] = createAnchor(
            hand.handedness,
            fingerName,
            landmark,
            timestamp,
          );
        });
      });

      anchors = nextAnchors;

      return anchors;
    },

    getAll() {
      return anchors;
    },

    get(id) {
      return anchors[id] ?? null;
    },
  };
}
