'use strict';

var bullets;

var fireRate = 1000;
var nextFire = 0;

var Bullet = function(game, x, y, player) {
  Phaser.Sprite.call(this, game, x, y, 'orangespin');

  this.game.bullets.add(this);

  // this.visible = false;

  this.animations.add('spin',[0,1, 2, 3, 4, 5, 6, 7, 8, 9], 60, true);
  this.alive = true;
  //this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.player = player
  this.game.physics.arcade.enableBody(this);
  // player.body.allowRotation = false;

  // this.checkWorldBounds = true;
  // this.outOfBoundsKill = true;
  // this.body.collideWorldBounds = true;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){

  if (this.game.input.activePointer.isDown) {
    if (this.game.time.now > nextFire && this.game.bullets.countDead() > 0) {
      nextFire = this.game.time.now + fireRate;
      var bullet = this.game.bullets.getFirstDead();

      setTimeout(function() {bullet.kill();}, 5000);

      //animate when fire(click)
      bullet.animations.add('spin');

      bullet.scale.setTo(0.5, 0.5);

      bullet.animations.play('spin', 60, true);

      if (this.player.body.direction === 'left'){
        bullet.reset(this.player.x - 70, this.player.y - 42);
        this.scale.x = -0.5;
       }else if (this.player.body.direction === 'right'){
        bullet.reset(this.player.x + 30, this.player.y - 42);
        this.scale.x = 0.5;
       };
      //bullet.anchor.setTo(this.player.x, this.player.y);

      //bullet.reset(this.player.x+ 150, this.player.y -25);
      // console.log("Player: (", this.player.position.x, ",", this.player.position.y, ")");
      // console.log("Bullet: (", this.x, ",", this.y, ")");
      // console.log("------");
      this.game.physics.arcade.moveToPointer(bullet, 1000);
     }
  };

}


  module.exports = Bullet;
