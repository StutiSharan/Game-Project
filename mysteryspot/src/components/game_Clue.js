// const myClues = {
//   1: [
//     { id: 1, top: "15%", left: "75%", found: false, hint: "A colorful flyer dances in the sky." }, // Kite
//     { id: 2, top: "28%", left: "80%", found: false, hint: "A red orb floats near the green giants." }, // Red Balloon
//     { id: 3, top: "42%", left: "50%", found: false, hint: "A blue ring awaits a splash." }, // Inflatable Pool
//     { id: 4, top: "48%", left: "37%", found: false, hint: "A sphere of many hues rests by the wood." }, // Beach Ball
//     { id: 5, top: "67%", left: "40%", found: false, hint: "A blue disk ready for flight." }, // Blue Frisbee
//     { id: 6, top: "54%", left: "45%", found: false, hint: "A yellow fowl, not real, but cute." }, // Yellow Duck (toy)
//     { id: 7, top: "46%", left: "67%", found: false, hint: "A red fruit, dropped from the hand." }, // Red Apple (on the ground)
//     { id: 8, top: "60%", left: "75%", found: false, hint: "Bound pages lie under ancient shade." }, // Book (under the tree)
//     { id: 9, top: "70%", left: "60%", found: false, hint: "Dark lenses shield eyes on checkered cloth." }, // Sunglasses (on blanket)
//     { id: 10, top: "58%", left: "71%", found: false, hint: "A small tool of digging, near the sand." }, // Shovel (by sandpit)
//   ],
//   2: [
//     { id: 1, top: "59%", left: "71%", found: false, hint: "A watchful gaze from a furry friend." }, // Cat
//     { id: 2, top: "80%", left: "20%", found: false, hint: "Four strings once sang a mournful tune." }, // Violin
//     { id: 3, top: "58%", left: "28%", found: false, hint: "A world in miniature, spinning slow." }, // Globe
//     { id: 4, top: "60%", left: "35%", found: false, hint: "Time's keeper, with a silent bell." }, // Alarm Clock
//     { id: 5, top: "35%", left: "80%", found: false, hint: "A small bird's home, now empty." }, // Birdcage
//     { id: 6, top: "10%", left: "70%", found: false, hint: "A blue circle tells where wheels may roll." }, // Blue Bicycle Sign
//     { id: 7, top: "25%", left: "67%", found: false, hint: "A crimson reward hangs by silver." }, // Red Ribbon (on trophy)
//     { id: 8, top: "20%", left: "45%", found: false, hint: "A carved soldier, motionless." }, // Chess piece (white, on shelf)
//     { id: 9, top: "45%", left: "55%", found: false, hint: "An eye to capture hidden scenes." }, // Camera
//     { id: 10, top: "25%", left: "50%", found: false, hint: "Sand falls through time's narrow neck." }, // Hourglass (on shelf)
//   ],
//   3: [
//     { id: 1, top: "60%", left: "34%", found: false, hint: "A clear eye for tiny details." }, // Magnifying Glass
//     { id: 2, top: "68%", left: "60%", found: false, hint: "A single dark heart, laid upon the table." }, // Ace of Spades card
//     { id: 3, top: "80%", left: "28%", found: false, hint: "Numbered cubes wait for fate's roll." }, // Dice
//     { id: 4, top: "72%", left: "15%", found: false, hint: "A blooming red passion in a white vase." }, // Red Rose
//     { id: 5, top: "75%", left: "10%", found: false, hint: "A beam of light in the dark." }, // Flashlight
//     { id: 6, top: "75%", left: "68%", found: false, hint: "A jingle of secrets, held together." }, // Keys
//     { id: 7, top: "60%", left: "55%", found: false, hint: "Time enclosed in a metallic face." }, // Pocket Watch
//     { id: 8, top: "58%", left: "45%", found: false, hint: "A spiny sentinel in a red pot." }, // Cactus plant
//     { id: 9, top: "55%", left: "20%", found: false, hint: "Sand descends, marking moments passed." }, // Hourglass (small)
//     { id: 10, top: "67%", left: "50%", found: false, hint: "A tube of color for a final touch." }, // Lipstick
//   ],
// };

// export default myClues;

const myClues = {
  1: [
    { id: 1, x: 1440, y: 160, found: false, hint: "A colorful flyer dances in the sky." }, // Kite
    { id: 2, x: 1536, y: 302, found: false, hint: "A red orb floats near the green giants." }, // Red Balloon
    { id: 3, x: 960,  y: 450, found: false, hint: "A blue ring awaits a splash." }, // Inflatable Pool
    { id: 4, x: 710,  y: 518, found: false, hint: "A sphere of many hues rests by the wood." }, // Beach Ball
    { id: 5, x: 768,  y: 724, found: false, hint: "A blue disk ready for flight." }, // Frisbee
    { id: 6, x: 864,  y: 580, found: false, hint: "A yellow fowl, not real, but cute." }, // Duck
    { id: 7, x: 1286, y: 500, found: false, hint: "A red fruit, dropped from the hand." }, // Apple
    { id: 8, x: 1440, y: 650, found: false, hint: "Bound pages lie under ancient shade." }, // Book
    { id: 9, x: 1152, y: 756, found: false, hint: "Dark lenses shield eyes on checkered cloth." }, // Sunglasses
    { id: 10, x: 1363, y: 626, found: false, hint: "A small tool of digging, near the sand." }, // Shovel
  ],
  2: [
    { id: 1, x: 1363, y: 638, found: false, hint: "A watchful gaze from a furry friend." }, // Cat
    { id: 2, x: 384,  y: 864, found: false, hint: "Four strings once sang a mournful tune." }, // Violin
    { id: 3, x: 538,  y: 626, found: false, hint: "A world in miniature, spinning slow." }, // Globe
    { id: 4, x: 672,  y: 648, found: false, hint: "Time's keeper, with a silent bell." }, // Clock
    { id: 5, x: 1536, y: 378, found: false, hint: "A small bird's home, now empty." }, // Birdcage
    { id: 6, x: 1344, y: 108, found: false, hint: "A blue circle tells where wheels may roll." }, // Bicycle Sign
    { id: 7, x: 1286, y: 270, found: false, hint: "A crimson reward hangs by silver." }, // Ribbon
    { id: 8, x: 864,  y: 216, found: false, hint: "A carved soldier, motionless." }, // Chess Piece
    { id: 9, x: 1056, y: 486, found: false, hint: "An eye to capture hidden scenes." }, // Camera
    { id: 10, x: 960,  y: 270, found: false, hint: "Sand falls through time's narrow neck." }, // Hourglass
  ],
  3: [
    { id: 1, x: 653,  y: 648, found: false, hint: "A clear eye for tiny details." }, // Magnifying Glass
    { id: 2, x: 1152, y: 734, found: false, hint: "A single dark heart, laid upon the table." }, // Ace of Spades
    { id: 3, x: 538,  y: 864, found: false, hint: "Numbered cubes wait for fate's roll." }, // Dice
    { id: 4, x: 288,  y: 778, found: false, hint: "A blooming red passion in a white vase." }, // Rose
    { id: 5, x: 192,  y: 810, found: false, hint: "A beam of light in the dark." }, // Flashlight
    { id: 6, x: 1305, y: 810, found: false, hint: "A jingle of secrets, held together." }, // Keys
    { id: 7, x: 1056, y: 648, found: false, hint: "Time enclosed in a metallic face." }, // Pocket Watch
    { id: 8, x: 864,  y: 626, found: false, hint: "A spiny sentinel in a red pot." }, // Cactus
    { id: 9, x: 384,  y: 594, found: false, hint: "Sand descends, marking moments passed." }, // Hourglass
    { id: 10, x: 960,  y: 724, found: false, hint: "A tube of color for a final touch." }, // Lipstick
  ],
};

export default myClues;
