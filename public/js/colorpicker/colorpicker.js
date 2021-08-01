"use strict";

// https://iro.js.org/

let pickerColor = "#ff0000";

let colorPicker = new iro.ColorPicker("#colorpicker", {
  // Set the size of the color picker
  width: Math.round(window.innerWidth * 0.5),
  // Set the initial color to pure red
  color: pickerColor,
  layoutDirection: "horizontal",
  wheelDirection: "clockwise",
  handleRadius: 20,
  borderColor: '#000000'
});

// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
  emitMyRGB(color.rgb);
});

// colorPicker.resize(350);