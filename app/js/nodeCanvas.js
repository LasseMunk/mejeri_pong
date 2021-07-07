const {createCanvas} = require('canvas');
const canvas = createCanvas(8, 180);
const ctx = canvas.getContext('2d');

ctx.font = '8px Impact';
ctx.fillText('Awesome!', 0, 0);

module.exports = {canvas, ctx};


