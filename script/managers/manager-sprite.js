'use strict';
var Canvas = require('./../common/canvas');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var imageList, imagesLoaded = 0, loaded = false;

var spriteManager = {
    init: function(imgList) {
        imageList = imgList;
        imageList.forEach(function(imgName) {
            var image = new Image;
            image.addEventListener('load', onImageLoad.bind(this, image, imgName));
            image.src = './img/' + imgName + '.png';
        });
    },
    sprites: {},
    events: events,
    waitForLoaded: function(cb) {
        if(spriteManager.loaded) cb();
        else events.once('loaded',cb);
    }
};

function onImageLoad(image, imageName) {
    var canvas = new Canvas(image.width,image.height);
    spriteManager.sprites[imageName] = canvas.canvas;
    canvas.drawImage(image,0,0,image.width,image.height,0,0,image.width,image.height);
    imagesLoaded++;
    spriteManager.loaded = imagesLoaded == imageList.length;
    if(spriteManager.loaded) events.emit('loaded');
}

module.exports = spriteManager;