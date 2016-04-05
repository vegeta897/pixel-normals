'use strict';
var System = require('./system');
var CM = require('./../managers/manager-canvas');
var RenderManager = require('./../managers/manager-render');
var SpriteManager = require('./../managers/manager-sprite');
var requestAnimationFrame = require('raf');

var render = new System('render',[
    require('./../components/component-sprite')
]);
var zBuffer, currentFrame, previousFrame;
var backgroundColor = '#1d171f', bgImage;

render.update = function() { // Overrides update method to wait for browser animation frame
    zBuffer = RenderManager.getZBuffer();
    // Insert loading screen here
};

SpriteManager.waitForLoaded(function() { // Wait for sprites to load
    render.update = update; // Change update method
});

function update() { // Real update method once sprites are loaded
    zBuffer = RenderManager.getZBuffer();
    requestAnimationFrame.cancel(currentFrame); // Cancel previous frame request
    currentFrame = requestAnimationFrame(onFrameReady);
}

// var renderTime = 0;
// var frameCount = 0;

function onFrameReady() {
    //var framesSkipped = currentFrame - previousFrame - 1;
    //if(framesSkipped) console.log('Skipped',framesSkipped,'frames');
    // frameCount++;
    // var renderStart = performance.now();
    CM.canvas.fill(backgroundColor);
    if(bgImage) CM.canvas.drawImage(bgImage,0,0,bgImage.width,bgImage.height,
        CM.pan.x,CM.pan.y); // Make separate bg CM.CM.canvas?
    for(var s = 0; s < zBuffer.length; s++) {
        renderSprite(zBuffer[s]);
    }
    // renderTime += performance.now() - renderStart;
    // if(frameCount == 500) { frameCount = 0; console.log(renderTime/500); renderTime = 0; }
    //previousFrame = currentFrame;
}

function renderSprite(sprite) {
    CM.canvas.fillRect(sprite.color,sprite.x,sprite.y,sprite.w,sprite.h);
}

render.onEntityAdded = function(entity) {
    var sprite = this.componentData[0][entity];
    sprite.zDepth = sprite.x + sprite.y;
    RenderManager.setZBuffer(render.componentData[0].slice(0));
};

render.onEntityRemoved = function() {
    RenderManager.setZBuffer(render.componentData[0].slice(0));
};

render.setWorld = function(world) {
    bgImage = world.image;
    CM.pan.x = Math.round(CM.canvas.width / 2 - world.imageCenter.x);
    CM.pan.y = Math.round(CM.canvas.height / 2 - world.imageCenter.y - 8);
};

module.exports = render;