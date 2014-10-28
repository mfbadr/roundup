var cursors;
var score = 0;
var scoreText;
var timer;
var style = {fontSize: '32px', fill: '#000'};
var seconds = 0;

var playState = {
  //no preload needed
  create: function(){

    score = 0;
    seconds = 30;
    //map jump, up down left right to functions that move the player
    //create groups for ledges, X, Z

    //create timer for countdown
    this.gameTimer = game.time.events.loop(1000, this.updateTimer, this);

    //add sprites, give them physics, have them collide properly
     //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //timer
    timer = game.add.text(16, 40, style);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    //ledge = platforms.create(-150, 150, 'ground');
    //ledge.body.immovable = true;

    ledge = platforms.create(-150, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(220, 220, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(50, 150, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,3);

    ledge = platforms.create(390, 100, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,2);


    ledge = platforms.create(-150, 300, 'ground');
    ledge.body.immovable = true;

      // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //spawn 10 xs
    stars = game.add.group();
    stars.enableBody = true;

    for(var i = 0; i < 10; i++){
      var star = stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 60;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
      star.body.collideWorldBounds = true;
    };

    this.moveTimer = game.time.events.loop(1500, this.moveItems, this);
    //Add Game Sound
    this.gameSound = game.add.audio('game');
    this.gameSound.play();

    scoreText = game.add.text(16, 16, 'score: 0', style);

    diamonds = game.add.group();
    diamonds.enableBody = true;

  },

  moveItems: function(){
    //call this on a timer in create
    //will look like this:
    //this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    stars.forEach(function(star){
      var direction = Math.floor(Math.random() + .5);

      if(direction === 1){
        star.body.velocity.x += 100;
      }else if(direction === 0){
        star.body.velocity.x -= 100;
      };
    }, this)

    diamonds.forEach(function(diamond){
      var direction = Math.floor(Math.random() + .5);

      if(direction === 1){
        diamond.body.velocity.x += 100;
        diamond.body.velocity.y += 100;
      }else if(direction === 0){
        diamond.body.velocity.x -= 100;
        diamond.body.velocity.y -= 100;
      };
    }, this)
  },

  collectStar: function(player, star){

  // Removes the star from the screen
    star.kill();
    score += 20;
    scoreText.setText('Score: ' + score);


    var diamond = diamonds.create(game.world.randomX, 0, 'diamond');
    diamond.body.gravity.y = 60;
    diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    diamond.body.collideWorldBounds = true;


  //  Add and update the score
   score += 20;
  scoreText.text = 'Score: ' + score;

  },

  collectDiamond: function(player, diamond){

// Removes the star from the screen
    diamond.kill();
    score += 40;
    scoreText.setText('Score: ' + score);

  //  Add and update the score
  score += 40;
  scoreText.text = 'Score: ' + score;

  },

  update: function(){
    //this is the biggest part of the game
    //if players collide with x, kill x, play a sound, add to score, turn x into z
    //if player collides with z, kill z, play a sound, increase score

    //x moves randomly left and right
    //z moves randomly left right and up
    //bound player to screen

    //if timer reaches zero, play and animation and return to menu
    //stars collide with platforms
    game.physics.arcade.collide(stars, platforms)
    game.physics.arcade.collide(diamonds, platforms)
    game.physics.arcade.collide(stars, diamonds)

    game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);


    //player collision w/ platform
    game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;

    //Calling a different function to update the timer just cleans up the update loop if you have other code.
    //this.updateTimer();
    //Stops timer when all diamonds are collected
    //if (yourGroup.countLiving() > 0)
    //    updateTimer();

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    if(cursors.up.isDown && player.body.touching.down)
    {
      player.body.velocity.y = -350;
      //Add Game Sound
      this.jumpSound = game.add.audio('jump');
      this.jumpSound.play();
    }
  },

  updateTimer: function(){
    seconds -= 1;
    timer.setText('time: ' + seconds);

    //If any of the digits becomes a single digit number, pad it with a zero

    if (seconds === 0)
      game.state.start('menu');

    //timer.setText('time: ' + seconds);

    //if(seconds < 1);
    //{
    //  game.state.start('menu');
    //}
  }
};
