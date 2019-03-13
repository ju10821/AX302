var game = new Phaser.Game(800, 600, Phaser.AUTO, ''
, {preload: preload, create:create, update:update});
var score = 0;
var life = 3;

function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	game.load.image('health', 'assets/firstaid.png');
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0,0, 'sky');

	platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;

	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	var style = {font: "bold 32px Arial", fill: "#fff"};
	scorelabel = game.add.text(300,560, "Score: ", style);
	scoretext = game.add.text(420,560, score, style);
	scorelabel.setShadow(3,3, 'rgba(0,0,0,0.5)', 2);
	scoretext.setShadow(3,3, 'rgba(0,0,0,0.5', 2);

	lifelabel = game.add.text(10,5, "Lives: ", style);
	lifetext = game.add.text(120,5, life,style);
	lifelabel.setShadow(3,3, 'rgba(0,0,0,0.5)',2);
	lifetext.setShadow(3,3, 'rgba(0,0,0,0.5)',2);

	player = game.add.sprite(32, 400, 'dude');
		player.animations.add('left', [0,1,2,3], 10, true);
		player.animations.add('right', [5,6,7,8], 10, true);
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

	enemy1 = game.add.sprite(760, 20, 'baddie');
		enemy1.animations.add('left', [0,1], 10, true);
		enemy1.animations.add('right', [2,3], 10, true);
		game.physics.arcade.enable(enemy1);
		enemy1.body.bounce.y = 0.2;
		enemy1.body.gravity.y = 300;
		enemy1.body.collideWorldBounds = true;

	stars = game.add.physicsGroup();
	stars.enableBody = true;

	for (var i = 0; i < 12; i++){
		var star = stars.create(i*70, 0, 'star'); 
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	cursors = game.input.keyboard.createCursorKeys();
	//lesson10
	healths = game.add.physicsGroup();
	healths.enableBody = true;

}

function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemy1, platforms);
	//lesson 10
	game.physics,arcade.collide(healths, platforms);
	
	//reset the player's velocity if no events.
	player.body.velocity.x = 0;
	
	//player movement with keys
	if(cursors.left.isDown){
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if (cursors.right.isDown){
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	//Making player jump
	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300;
	}

	//Start of lesson 9
	game.physics.arcade.overlap(player, stars, collectStar);
	game.physics.arcade.overlap(player, enemy1, loseLife);

	//lesson 10
	game.physics.arcade.overlap(player, healths, collectHealth);
	
	moveEnemy();

	if(life < 0){
		endGame();
	}
}

function collectStar(player, star){
	score += 1;
	scoretext.setText(score);
	star.kill();
	star.reset(Math.floor(Math.random() * 750), 0);
}

function collectHealth(player,health){
	life += 1;
	lifetext.setText(life);
	health.kill();
}

//define loseLife
function loseLife(player, enemy){
	//lose life
	life -= 1;
	lifetext.setText(life);
	
	enemy.kill();
	enemy.reset(10, 20);
}

function moveEnemy(){
	//enemy AI
	if(enemy1.x > 759){
		enemy1.animations.play('left');
		enemy1.body.velocity.x = -120;
	} else if (enemy1.x < 405){
		enemy1.animations.play('right');
		enemy1.body.velocity.x = 120;
	}

}

function endGame(){
	player.kill();
	lifelabel.visible = false;
	lifetext.visible = false;
	scoretext.visible = false;
	scorelabel.text = `Game over! You scored: ${score}`;
}
