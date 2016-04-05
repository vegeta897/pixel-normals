'use strict';

module.exports = Sprite;

function Sprite() {
    this.data = {
        sheet: null, // Must be defined
        sheetX: 0,
        sheetY: 0,
        sheetW: 0, // Must be more than 0
        sheetH: 0, // Must be more than 0
        x: 0,
        y: 0,
        zDepth: 0,
        w: 10,
        h: 10,
        color: '#ffffff'
    };
}