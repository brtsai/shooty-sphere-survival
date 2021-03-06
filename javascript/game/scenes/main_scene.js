import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Player from '../entities/player-entities/player';
import Ambler from '../entities/enemies/ambler';
import Walker from '../entities/enemies/walker';
import Chaser from '../entities/enemies/chaser';
import Cloaker from '../entities/enemies/cloaker';

class MainScene extends GameScene {
  constructor (ctx, fps, endScene) {
    super(ctx, fps, endScene);
    this.count = 1;
    this.spawnRate = 1;

  }
 
  init () {
    const background = new BlackBackground(this);
    this.player = new Player(this, this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    this.addEntity(background);
    this.addEntity(this.player);
  }

  playerIsAlive () {
    return this.player.shouldRender;
  }

  run () {
    if (this.playerIsAlive()) {
      if (this.count % ((60/this.fps) * (360/this.spawnRate)) === 0) {
        this.spawnRandomCloaker();
      }
      if (this.count % ((60/this.fps) * (120/this.spawnRate)) === 0) {
        this.spawnRandomChaser();
      }
      if (this.count % ((60/this.fps) * (240/this.spawnRate)) === 0) {
        this.spawnRandomWalker();
      }
      if (this.count % ((60/this.fps) * (60/this.spawnRate)) === 0) {
        this.spawnRandomAmbler();
      }
      /**
      if (this.count === 2) {
        this.spawnRandomCloaker();
      }
      **/
      
      this.count++;
    } else {
      this.endScene();
    }
  }

  randomInt (max) {
    return Math.floor(Math.random() * max);
  }

  spawnRandomlyPositionedEnemy (Enemy) {
    const spawningSide = this.randomInt(4);
    let x = this.randomInt(this.ctx.canvas.width);
    let y = this.randomInt(this.ctx.canvas.height);
    let orientation = Math.random() * Math.PI/2 - Math.PI/4;
    
    switch(spawningSide) {
      case 0:
        y = 0 - 2 * Enemy.radius;
        orientation += Math.PI/2;
        break;

      case 1:
        x = this.ctx.canvas.width + 2 * Enemy.radius
        orientation += Math.PI;
        break;

      case 2:
        y = this.ctx.canvas.height + 2 * Enemy.radius
        orientation -= Math.PI/2;
        break;

      case 3:
        x = 0 - 2 * Enemy.radius;
        break;

      default:
        console.log('error');
        break;
    }
    const e = new Enemy(Enemy.speed, this, x, y, orientation);
    if (e.type)
    this.addEntity(e);

  }

  spawnRandomAmbler () {
    this.spawnRandomlyPositionedEnemy(Ambler);
  }

  spawnRandomWalker () {
    this.spawnRandomlyPositionedEnemy(Walker);
  }

  spawnRandomChaser () {
    this.spawnRandomlyPositionedEnemy(Chaser);
  }

  spawnRandomCloaker () {
    this.spawnRandomlyPositionedEnemy(Cloaker);
  }
}

export default MainScene;
