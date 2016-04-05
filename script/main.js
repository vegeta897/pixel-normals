'use strict';
var util = require('./common/util');

var components = [
    require('./components/component-sprite')
];
var systems = [
    require('./systems/system-render')
];

var GameManager = require('./managers/manager-game');
var EntityManager = require('./managers/manager-entity');
var ComponentManager = require('./managers/manager-component');
var SpriteManager = require('./managers/manager-sprite');
var CanvasManager = require('./managers/manager-canvas');

// Initialize managers
SpriteManager.init([]);
CanvasManager.init({ id: 'main', initialScale: 3 });
GameManager.init(systems);
ComponentManager.init(components,systems);