export const PROTOCOL_VERSION = "0.1";

export type ProtocolTest = {
  id: string;
  name: string;
  description: string;
  instructions: string[];
};

export const protocolTests: ProtocolTest[] = [
  {
    id: "fit-comfort",
    name: "Fit & Comfort",
    description: "Assess seal, pressure, stability, heat, and extended-wear comfort.",
    instructions: [
      "Fit the product as you normally would.",
      "Check seal and stability while sitting and walking.",
      "Note pressure, heat, irritation, or loosening.",
      "Rate the overall fit and comfort."
    ]
  },
  {
    id: "sound",
    name: "Sound Quality",
    description: "Evaluate bass, mids, treble, detail, separation, and imaging.",
    instructions: [
      "Use the same reference material whenever possible.",
      "Listen at a comfortable, repeatable volume.",
      "Consider bass control, vocal clarity, treble, detail, separation, and imaging.",
      "Record anything unusually strong or weak."
    ]
  },
  {
    id: "channels",
    name: "Channels & Stereo",
    description: "Verify left/right operation, balance, and stereo orientation.",
    instructions: [
      "Verify both left and right channels produce sound.",
      "Check that left and right are oriented correctly.",
      "Listen for obvious channel imbalance.",
      "Record any intermittent or unusual behavior."
    ]
  },
  {
    id: "anc",
    name: "Noise Cancellation",
    description: "Assess ANC against steady noise, voices, and changing environments.",
    instructions: [
      "Enable the strongest normal ANC mode.",
      "Compare ANC off versus on with steady low-frequency noise.",
      "Check reduction of voices and irregular environmental sounds.",
      "Note pressure sensation or changes to sound quality."
    ]
  },
  {
    id: "transparency",
    name: "Transparency",
    description: "Assess ambient-mode naturalness, speech, hiss, and own-voice effect.",
    instructions: [
      "Enable transparency or ambient mode.",
      "Have a normal conversation.",
      "Listen for hiss, coloration, delay, or unnatural amplification.",
      "Speak aloud and note how natural your own voice sounds."
    ]
  },
  {
    id: "microphone",
    name: "Microphone",
    description: "Evaluate recorded speech clarity and background-noise handling.",
    instructions: [
      "Record the same spoken phrase for each product.",
      "Play the recording back through a separate reference device if possible.",
      "Check clarity, level, compression, and noise suppression.",
      "Repeat later in a noisy environment when practical."
    ]
  },
  {
    id: "connectivity",
    name: "Connectivity",
    description: "Test pairing, stability, range, multipoint, and device switching.",
    instructions: [
      "Pair from a fresh or known state.",
      "Use the product normally and watch for dropouts.",
      "Test practical range and obstruction behavior.",
      "Test multipoint and switching if supported."
    ]
  },
  {
    id: "latency",
    name: "Latency",
    description: "Assess audio/video synchronization and interactive delay.",
    instructions: [
      "Play speech or video with clearly visible synchronization cues.",
      "Check whether lips and audio appear synchronized.",
      "Try an interactive or gaming source if relevant.",
      "Record any low-latency mode and whether it helps."
    ]
  },
  {
    id: "battery",
    name: "Battery",
    description: "Record real runtime and the conditions under which it was measured.",
    instructions: [
      "Record starting charge and test conditions.",
      "Note ANC mode, approximate volume, and codec when known.",
      "Record elapsed runtime rather than relying only on the manufacturer claim.",
      "For earbuds, distinguish single-charge runtime from case recharges."
    ]
  },
  {
    id: "controls-usability",
    name: "Controls & Usability",
    description: "Assess controls, app behavior, charging, build, and daily friction.",
    instructions: [
      "Try every primary control.",
      "Check accidental inputs and responsiveness.",
      "Inspect charging, case or cable behavior, and build quality.",
      "Record app requirements, annoying prompts, resets, or other daily friction."
    ]
  }
];
