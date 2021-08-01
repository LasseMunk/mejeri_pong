"use strict";

// https://iro.js.org/

let pickerColor = "#ff0000";

let colorPicker = new iro.ColorPicker("#colorpicker", {
  // Set the size of the color picker
  width: Math.round(window.innerWidth * 0.5),
  // Set the initial color to pure red
  color: pickerColor
});

// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
  console.log(color.rgb);
});

// colorPicker.resize(350);

// console.log(document.getElementById('colorpicker'));