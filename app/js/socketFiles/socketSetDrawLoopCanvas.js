setDrawLoopContent: 
"use strict";

exports.setDrawLoopContent = (drawLoop, data) => {
  // her bliver sat en string ikke objectet som skal tegnes
  drawLoop.setDrawLoopContent(data.content);
}


