import {
  createPositionSmoother,
} from "./positionSmoother.js";

const smoother = createPositionSmoother({
  smoothing: 0.25,
});

console.log(
  "Smoothing test 1:",
  smoother.update({
    x: 100,
    y: 100,
  }),
);

console.log(
  "Smoothing test 2:",
  smoother.update({
    x: 200,
    y: 100,
  }),
);

console.log(
  "Smoothing test 3:",
  smoother.update(null),
);

console.log(
  "Smoothing test 4:",
  smoother.update({
    x: 500,
    y: 300,
  }),
);
