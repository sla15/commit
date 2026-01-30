// Simple in-memory flag to allow animations to run once per page load/reload.
// We keep this in module scope so it resets on a full page reload (as requested).

let animationsPlayed = false;

export const shouldRunAnimations = () => !animationsPlayed;
export const markAnimationsPlayed = () => {
  animationsPlayed = true;
};

export const resetAnimations = () => {
  animationsPlayed = false;
};
