var game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

var score = 0;

//load all the states
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);

//start with the load state
game.state.start('load',);
