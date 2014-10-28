var b;
var menuState = {
  create: function(){
    b = game.add.tileSprite(0, 0, 600, 600, 'sky');
    // Call the 'start' function when pressing the spacebar
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.start, this);
    // Defining variables
    var style = {font: "30px Arial", fill: "#ffffff"};
    var x = game.world.width/2, y = game.world.height/2;
    // Adding a text centered on the screen
    var text = this.game.add.text(x, y-0, "Press space to start", style);
    var text2 = this.game.add.text(x, y-80, "Use < Left, ^ Up, > Right Keys", style);
    var text3 = this.game.add.text(x, y-40, "to move character", style);
    text.anchor.setTo(0.5, 0.5);
    text2.anchor.setTo(0.5, 0.5);
    text3.anchor.setTo(0.5, 0.5);
    // If the user already played
    if(score > 0){
      // Display its score
      var scoreText = this.game.add.text(x, y+50, "Last score: " + score, style);
      scoreText.anchor.setTo(0.5, 0.5);
    }
  },
  // Start the actual game
  start: function(){
      this.game.state.start('play');
  }
};
