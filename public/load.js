var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('sky', '/img/sky.png');
    game.load.image('ground', '/img/platform.png');
    game.load.image('star', '/img/star.png');
    game.load.image('diamond', '/img/diamond.png');
    game.load.spritesheet('dude', '/img/dude.png', 32, 48);
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
