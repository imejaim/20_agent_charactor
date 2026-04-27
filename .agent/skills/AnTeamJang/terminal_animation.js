const palette = {
  0: null,
  1: [63, 81, 181],   // Main Indigo
  2: [48, 63, 159],   // Shadow
  3: [26, 35, 126],   // Outline
  4: [197, 202, 233], // Highlight
  5: [255, 255, 255], // Eye glint
  6: [255, 213, 79],  // Eyes (Golden)
};

const base = [
  [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
  [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,4,4,1,1,1,1,1,1,4,4,1,1],
  [1,1,6,3,1,1,1,1,1,1,6,3,1,1],
  [1,1,3,5,1,1,1,1,1,1,3,5,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,3,3,3,3,1,1,1,0,0],
  [0,0,0,1,1,3,3,3,3,1,1,0,0,0],
  [0,0,0,0,2,1,1,1,1,2,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,3,1,1,3,1,1,1,0,0],
  [0,0,1,1,1,1,3,3,1,1,1,1,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,2,2,0,0,0,0,2,2,0,0,0],
];

function getFrame(n) {
  const frame = base.map(row => [...row]);
  
  // Breathing (Chest expansion)
  if (n % 4 === 1 || n % 4 === 2) {
    frame[11] = [0,0,0,1,1,1,1,1,1,1,1,0,0,0]; // Expand slightly
    frame[12] = [0,0,1,1,1,1,1,1,1,1,1,1,0,0]; 
  }

  // Ear Twitch (Randomly)
  if (n % 10 === 0) {
    frame[0] = [0,1,1,0,0,0,0,0,0,0,1,1,0,0]; // Left ear up
  } else if (n % 10 === 5) {
    frame[0] = [0,0,1,1,0,0,0,0,0,0,0,1,1,0]; // Right ear up
  }

  // Blinking
  if (n % 15 === 0) {
    frame[5] = [1,1,3,3,1,1,1,1,1,1,3,3,1,1]; // Eyes closed
    frame[6] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 
  }

  return frame;
}

function renderFrame(frame) {
  let output = '\x1b[H'; // Move cursor to top-left
  output += '\n';
  for (let y = 0; y < frame.length; y++) {
    let line = '    ';
    for (let x = 0; x < frame[y].length; x++) {
      const val = frame[y][x];
      if (val === 0) line += '  ';
      else {
        const [r, g, b] = palette[val];
        line += `\x1b[48;2;${r};${g};${b}m  \x1b[0m`;
      }
    }
    output += line + '\n';
  }
  process.stdout.write(output);
  process.stdout.write(`     \x1b[1m\x1b[38;2;63;81;181m[ AnTeamJang - ANIMATING... ]\x1b[0m\n`);
}

let frameCount = 0;
console.clear();
setInterval(() => {
  const frame = getFrame(frameCount++);
  renderFrame(frame);
  if (frameCount > 60) process.exit(); // Run for ~6 seconds
}, 100);
