var loadState = {
  preload: function(){
    //load player spritesheet, x and x images
    //sounds
    //make
    game.load.image('sky', '/roundup/img/sky.png');
    game.load.image('ground', '/roundup/img/platform.png');
    game.load.image('star', '/roundup/img/star.png');
    game.load.image('diamond', '/roundup/img/diamond.png');
    game.load.spritesheet('dude', '/roundup/img/dude.png', 32, 48);
    //Game Sound
    game.load.audio('game', '/roundup/assets/audio/Totta - Hero Quest - Pophousedub remix.mp3', '/roundup/assets/audio/Totta_-_Hero_Quest_-_Pophousedub_remix.ogg');
    //Load in the jump sound
    game.load.audio('jump', '/roundup/assets/audio/SoundEffects/alien_death1.wav');
    //Sound for Stars
    game.load.audio('star', '/roundup/assets/audio/SoundEffects/key.wav');
    //Sound for Diamonds
    game.load.audio('diamond', '/roundup/assets/audio/SoundEffects/p-ping.mp3')
  },

  create: function(){
    //when all assets are loaded, go to the menu state
    this.game.state.start('menu');
  }
};
