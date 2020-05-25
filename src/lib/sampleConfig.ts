import { ExperimentConfig } from "./types";

const sampleConfig: ExperimentConfig = {
  paradigm: "self",
  videos: [
    { id: "314909286/3623e43bae", timepoints: [] },
    { id: "318377318/cbb45794ea", timepoints: [] },
  ],
  shuffleVideos: true,
  instructionScreens: [
    "Welcome to the empathy study, and thanks for participating! On the following screen, you will see more instructions on what you will be asked to do.",
    "In this study, you will be shown a video and asked a set of questions about the video. You can answer these questions at any point. To be shown the questions, just pause the video. Click next to continue to the experiment.",
  ],
  instructionsOverlay: "these are the offline instructions",
  questions: [
    {
      type: "mc",
      label: "Is this cool?",
      choices: ["No", "Yes", "Somewhat"],
    },
    {
      type: "scale",
      label: "How cool?",
      choices: [
        "Not at all cool",
        "A little cool",
        "Super cool",
        "vvvv cool",
        "yuck",
      ],
    },
    {
      type: "open",
      label: "Other comments: ",
    },
    {
      type: "grid",
      label: "Grid",
    },
  ],
  shuffleQuestions: true,
  completionLink: "https://sandboxneu.com",
};

export default sampleConfig;