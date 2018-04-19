!function(t){var s={};function i(e){if(s[e])return s[e].exports;var h=s[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,i),h.l=!0,h.exports}i.m=t,i.c=s,i.d=function(t,s,e){i.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:e})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(s,"a",s),s},i.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},i.p="",i(i.s=0)}([function(t,s,i){"use strict";i.r(s);var e=class{constructor(t,s,i){this.ctx=t,this.fps=s,this.bindFunctions(),this.entities={},this.doodads={},this.nextId=0,this.endScene=i,this.init()}bindFunctions(){this.init=this.init.bind(this),this.eachEntity=this.eachEntity.bind(this),this.onTick=this.onTick.bind(this),this.run=this.run.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleMouseClick=this.handleMouseClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.addEntity=this.addEntity.bind(this),this.getNextId=this.getNextId.bind(this)}init(){}eachEntity(t){const s=Object.keys(this.entities);for(let i=0;i<s.length;i++){const e=s[i];t(this.entities[e]),!1===this.entities[e].shouldRender&&delete this.entities[e]}}onTick(){this.eachEntity(t=>{t.onTick(this.ctx)}),this.run()}addEntity(t){const s=this.getNextId();return this.entities[s]=t,t.setScene(this),s}getNextId(){return this.nextId++}run(){}handleMouseMove(t){this.eachEntity(s=>{void 0!==s.handleMouseMove&&s.handleMouseMove(t)})}handleMouseDown(t){this.eachEntity(s=>{void 0!==s.handleMouseDown&&s.handleMouseDown(t)})}handleMouseUp(t){this.eachEntity(s=>{void 0!==s.handleMouseUp&&s.handleMouseUp(t)})}handleMouseClick(t){this.eachEntity(s=>{void 0!==s.handleMouseClick&&s.handleMouseClick(t)})}handleKeyDown(t){this.eachEntity(s=>{void 0!==s.handleKeyDown&&s.handleKeyDown(t)})}handleKeyUp(t){this.eachEntity(s=>{void 0!==s.handleKeyUp&&s.handleKeyUp(t)})}};var h=class{constructor(t,s=0,i=0,e=0,h=1,n=1,a=0,o=0){this.scene=t,this.fps=this.scene.fps,this.x=s,this.y=i,this.orientation=e,this.hScale=h,this.vScale=n,this.hSkew=a,this.vSkew=o,this.shouldRender=!0,this.collisionType="circular",this.init()}setScene(t){this.scene=t,this.fps=t.fps}onTick(t){this.render(t),this.act(t)}init(t){}render(t){t.save(),t.transform(this.hScale,this.hSkew,this.vSkew,this.vScale,this.x,this.y),t.rotate(this.orientation),this.show(t),t.restore()}show(t){}act(t){}collidesWith(t){switch(this.collisionType){case"circular":switch(t.collisionType){case"circular":return this.checkCircularToCircularCollision(this,t);default:return!1}break;default:return!1}}bounce(t){const s=t.x-this.x,i=t.y-this.y,e=Math.atan(i/s)+(s<0?Math.PI:0)+2*Math.PI;this.x+=sin(e),this.y+=sin(e)}checkCircularToCircularCollision(t,s){const i=s.x-this.x,e=s.y-this.y;return Math.sqrt(i*i+e*e)<=t.radius+s.radius}receiveCollisionFrom(t){}};var n=class extends h{constructor(t){super(t),this.collisionType="background"}init(t){}show(t){t.beginPath(),t.globalAlpha=.2,t.fillStyle="black",t.rect(0,0,t.canvas.width,t.canvas.height),t.fill()}};const a=2;var o=class extends h{constructor(t=0,s,i=0,e=0,h=0,n){super(s,i,e,h),this.radius=a,this.velocity=t,this.move=this.move.bind(this),this.type="projectile"}init(){}show(t){t.beginPath(),t.fillStyle="white",t.arc(0,0,this.radius,0,2*Math.PI),t.fill()}act(t){this.move()}move(){this.x+=this.velocity*Math.cos(this.orientation),this.y+=this.velocity*Math.sin(this.orientation),this.isOffScreen()&&(this.shouldRender=!1)}isOffScreen(){return this.x<0-3*this.radius||this.y<0-3*this.radius||this.x>this.scene.ctx.canvas.width+3*this.radius||this.y>this.scene.ctx.canvas.height+3*this.radius}static get radius(){return a}receiveCollisionFrom(t){this.shouldRender=!1}};const r=new Image;r.src="./assets/blob_attack.png";const c=new Image;c.src="./assets/blob_idle.png";const d=new Image;d.src="./assets/blob_death.png";var l=class extends h{constructor(t,s=250,i=250,e=0){super(t,s,i,e),this.radius=10,this.moveSpeed=this.fps/40,this.wIsPressed=!1,this.aIsPressed=!1,this.sIsPressed=!1,this.dIsPressed=!1,this.mouseIsPressed=!1,this.type="player",this.firingRate=1024/this.fps,this.firingTick=0,this.animationCoord=0,this.animationClock=0,this.animationState="idle",this.animationFrameWidth=80,this.animationLength=8,this.notInTerminalAnimation=!0}init(){}showAbstract(t){t.beginPath(),t.fillStyle="#2246f9",t.arc(0,0,this.radius,0,2*Math.PI),t.fill(),t.strokeStyle="white",t.stroke(),t.beginPath(),t.fillStyle="#bf9c20",t.arc(0,0,this.radius/2,0,2*Math.PI),t.fill(),t.beginPath(),t.fillStyle="white",t.rect(-2,-10,4,10),t.fill()}show(t){t.rotate(Math.PI/2),t.drawImage(this.animationImage(),this.animationCoord,0,80,80,-32,-33,60,60),this.animationClock++}animationImage(){switch(this.animationState){case"idle":return c;case"attack":return r;case"death":return d;default:return c}}setAnimationState(t,s,i){this.notInTerminalAnimation&&(this.animationCoord=0,this.animationClock=0,this.animationFrameWidth=s,this.animationLength=i,this.animationState=t)}enterTerminalAnimationState(t,s,i){this.setAnimationState(t,s,i),this.notInTerminalAnimation=!1}animate(){this.animationClock%3==0&&(this.animationCoord+=this.animationFrameWidth),this.animationCoord>=this.animationLength*this.animationFrameWidth&&(this.animationCoord=0,this.notInTerminalAnimation||(this.shouldRender=!1))}act(t){this.notInTerminalAnimation&&(this.move(),this.shoot()),this.animate()}move(){this.wIsPressed&&this.y>=2*this.radius+this.moveSpeed&&(this.y-=this.moveSpeed),this.sIsPressed&&this.y<=this.scene.ctx.canvas.height-(2*this.radius+this.moveSpeed)&&(this.y+=this.moveSpeed),this.aIsPressed&&this.x>=2*this.radius+this.moveSpeed&&(this.x-=this.moveSpeed),this.dIsPressed&&this.x<=this.scene.ctx.canvas.width-(2*this.radius+this.moveSpeed)&&(this.x+=this.moveSpeed)}shoot(){if(!0===this.mouseIsPressed&&this.firingTick<=0){const t=Math.sin(this.orientation)*(this.radius+o.radius+1),s=Math.cos(this.orientation)*(this.radius+o.radius+1),i=new o(this.fps/15,this.scene,this.x+t,this.y-s,this.orientation-Math.PI/2);this.scene.addEntity(i),this.firingTick=this.firingRate}this.firingTick>0&&this.firingTick--}handleMouseMove(t){this.notInTerminalAnimation&&this.face(t.layerX,t.layerY)}face(t,s){const i=t-this.x,e=s-this.y;this.orientation=Math.atan(e/i)+Math.PI/2,i<0&&(this.orientation+=Math.PI)}handleMouseDown(t){this.mouseIsPressed=!0,this.setAnimationState("attack",80,10)}handleMouseUp(t){this.mouseIsPressed=!1,this.setAnimationState("idle",80,8)}handleKeyDown(t){switch(t.key){case"ArrowUp":case"W":case"w":this.wIsPressed=!0;break;case"ArrowLeft":case"A":case"a":this.aIsPressed=!0;break;case"ArrowDown":case"S":case"s":this.sIsPressed=!0;break;case"ArrowRight":case"D":case"d":this.dIsPressed=!0}}handleKeyUp(t){switch(t.key){case"ArrowUp":case"W":case"w":this.wIsPressed=!1;break;case"ArrowLeft":case"A":case"a":this.aIsPressed=!1;break;case"ArrowDown":case"S":case"s":this.sIsPressed=!1;break;case"ArrowRight":case"D":case"d":this.dIsPressed=!1}}receiveCollisionFrom(t){if(this.notInTerminalAnimation){const s=t.x-this.x,i=t.y-this.y,e=Math.atan(i/s)+(s<0?Math.PI:0);this.orientation=e+Math.PI,this.enterTerminalAnimationState("death",80,8)}}};const u=10,m=1;var y=class extends h{constructor(t=0,s,i=0,e=0,h=0){super(s,i,e,h),this.speed=t,this.radius=u,this.color="#28d347",this.outline="red",this.type="enemy"}show(t){t.beginPath(),t.fillStyle=this.color,t.arc(0,0,this.radius,0,2*Math.PI),t.fill(),t.strokeStyle=this.outline,t.stroke()}act(){this.move()}move(){this.x+=this.speed*Math.cos(this.orientation),this.y+=this.speed*Math.sin(this.orientation),this.isOffScreen()&&(this.shouldRender=!1)}isOffScreen(){return this.x<0-3*this.radius||this.y<0-3*this.radius||this.x>this.scene.ctx.canvas.width+3*this.radius||this.y>this.scene.ctx.canvas.height+3*this.radius}static get radius(){return u}static get speed(){return m}receiveCollisionFrom(t){switch(t.type){case"projectile":this.shouldRender=!1;break;case"enemy":this.x-=this.speed*Math.cos(this.orientation),this.y-=this.speed*Math.sin(this.orientation),this.orientation+=Math.PI}}};const p=15;var M=class extends y{constructor(t=0,s,i=0,e=0,h=0){super(t,s,i,e,h),this.speed=t,this.radius=p,this.color="#1cb235",this.outline="red",this.turnRadius=1.25,this.type="enemy"}act(){this.steerToPlayer(),this.move()}normaliseAngle(t){for(;t<0||t>=2*Math.PI;)t<0&&(t+=2*Math.PI),t>=2*Math.PI&&(t-=2*Math.PI)}steerToPlayer(){const t=this.scene.player.x,s=this.scene.player.y,i=t-this.x,e=s-this.y,h=Math.atan(e/i)+(i<0?Math.PI:0),n=h-this.orientation;Math.abs(n)<this.turnRadius*Math.PI/180?this.orientation=h:this.orientation+=(this.shouldTurnRight(this.scene.player)?1:-1)*this.turnRadius*Math.PI/180,this.orientation>2*Math.PI&&(this.orientation-=2*Math.PI),this.orientation<-2*Math.PI&&(this.orientation+=2*Math.PI)}shouldTurnRight(t){const s=t.x-this.x,i=t.y-this.y;return Math.cos(this.orientation)*i-Math.sin(this.orientation)*s>0}};const v=8;var w=class extends y{constructor(t=0,s,i=0,e=0,h=0){super(t,s,i,e,h),this.speed=t,this.radius=v,this.color="#1c15d8",this.outline="red",this.xMomentum=0,this.yMomentum=0,this.velocity=.1,this.turnRadius=2,this.type="enemy"}act(){this.move()}move(){this.x+=this.xMomentum,this.y+=this.yMomentum;const t=this.scene.player.x-this.x,s=this.scene.player.y-this.y,i=Math.atan(s/t)+(t<0?Math.PI:0);this.xMomentum+=Math.cos(i)*this.velocity/this.scene.fps,this.yMomentum+=Math.sin(i)*this.velocity/this.scene.fps,this.velocity<this.fps/10&&(this.velocity+=.01),this.isOffScreen()&&(this.shouldRender=!1)}receiveCollisionFrom(t){switch(t.type){case"projectile":this.shouldRender=!1;break;case"enemy":this.x-=this.xMomentum,this.y-=this.yMomentum,this.xMomentum/=-2,this.yMomentum/=-2}}};var f=class extends e{constructor(t,s,i){super(t,s,i),this.count=1,this.spawnRate=1}init(){const t=new n(this);this.player=new l(this,this.ctx.canvas.width/2,this.ctx.canvas.height/2),this.addEntity(t),this.addEntity(this.player)}playerIsAlive(){return this.player.shouldRender}run(){this.playerIsAlive()?(this.count%(60/this.fps*(120/this.spawnRate))==0&&this.spawnRandomChaser(),this.count%(60/this.fps*(240/this.spawnRate))==0&&this.spawnRandomWalker(),this.count%(60/this.fps*(60/this.spawnRate))==0&&this.spawnRandomAmbler(),this.count++):this.endScene()}randomInt(t){return Math.floor(Math.random()*t)}spawnRandomlyPositionedEnemy(t){const s=this.randomInt(4);let i=this.randomInt(this.ctx.canvas.width),e=this.randomInt(this.ctx.canvas.height),h=Math.random()*Math.PI/2-Math.PI/4;switch(s){case 0:e=0-2*t.radius,h+=Math.PI/2;break;case 1:i=this.ctx.canvas.width+2*t.radius,h+=Math.PI;break;case 2:e=this.ctx.canvas.height+2*t.radius,h-=Math.PI/2;break;case 3:i=0-2*t.radius;break;default:console.log("error")}const n=new t(t.speed,this,i,e,h);n.type&&this.addEntity(n)}spawnRandomAmbler(){this.spawnRandomlyPositionedEnemy(y)}spawnRandomWalker(){this.spawnRandomlyPositionedEnemy(M)}spawnRandomChaser(){this.spawnRandomlyPositionedEnemy(w)}};var x=class{constructor(t=document.getElementById("game"),s=30,i=[f]){this.bindFunctions(),this.ctx=t.getContext("2d"),this.fps=s,this.scenes=i,this.currentScene=new i[0](this.ctx,this.fps,this.endCurrentScene),this.sceneIndex=0,window.setInterval(this.tick,1e3/s),t.addEventListener("mousedown",this.handleMouseDown),t.addEventListener("mouseup",this.handleMouseUp),t.addEventListener("click",this.handleClick),t.addEventListener("mousemove",this.handleMouseMove),t.addEventListener("keydown",this.handleKeyDown),t.addEventListener("keyup",this.handleKeyUp)}bindFunctions(){this.endCurrentScene=this.endCurrentScene.bind(this),this.tick=this.tick.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleClick=this.handleClick.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}endCurrentScene(){this.transitionToNextScene()}transitionToNextScene(){this.sceneIndex++,this.sceneIndex>=this.scenes.length&&(this.sceneIndex=0),this.currentScene=new this.scenes[this.sceneIndex](this.ctx,this.fps,this.endCurrentScene)}tick(){this.currentScene.onTick(),this.checkCollisions()}handleMouseDown(t){void 0!==this.currentScene.handleMouseDown&&this.currentScene.handleMouseDown(t)}handleMouseUp(t){void 0!==this.currentScene.handleMouseUp&&this.currentScene.handleMouseUp(t)}handleClick(t){void 0!==this.currentScene.handleMouseClick&&this.currentScene.handleMouseClick(t)}handleMouseMove(t){void 0!==this.currentScene.handleMouseMove&&this.currentScene.handleMouseMove(t)}handleKeyDown(t){void 0!==this.currentScene.handleKeyDown&&(this.currentScene.handleKeyDown(t),t.preventDefault())}handleKeyUp(t){void 0!==this.currentScene.handleKeyUp&&(this.currentScene.handleKeyUp(t),t.preventDefault())}checkCollisions(){const t=[];this.currentScene.eachEntity(s=>t.push(s));for(let s=0;s<t.length;s++)for(let i=s+1;i<t.length;i++){const e=t[s],h=t[i];e.collidesWith(h)&&(e.receiveCollisionFrom(h),h.receiveCollisionFrom(e))}}};var I=class extends h{constructor(t,s,i,e,h,n,a,o,r,c,d,l,u,m,y){super(t,s,i,e),this.width=h,this.height=n,this.text=a,this.fontFill=o,this.fontSize=r,this.font=c,this.fill=d,this.hoverFill=l,this.stroke=u,this.strokeWeight=m,this.action=y,this.mouseX=-10,this.mouseY=-10}show(t){t.fillStyle=this.mouseHover()?this.hoverFill:this.fill,t.fillRect(-this.width/2,-this.height/2,this.width,this.height),t.rect(-this.width/2,-this.height/2,this.width,this.height),t.strokeStyle=this.stroke,t.strokeWeight=this.strokeWeight,t.stroke(),t.font=`${this.fontSize}px ${this.font}`,t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontFill,t.fillText(this.text,0,0)}act(){}mouseHover(){return!(this.mouseX<this.x-this.width/2||this.mouseX>this.x+this.width/2||this.mouseY<this.y-this.height/2||this.mouseY>this.y+this.height/2)}handleMouseMove(t){this.mouseX=t.layerX,this.mouseY=t.layerY}handleMouseDown(t){this.mouseHover()&&this.action()}};var k=class extends e{constructor(t,s,i){super(t,s,i),this.count=0}init(){this.addEntity(new n(this));let t=new I(this,250,250,0,200,80,"Play","#ef3e6c",48,"Helvetica","#1a68b0","#2f7b2f","#ded6d8",5,this.endScene);this.addEntity(t)}run(){}};window.onload=(()=>{const t=document.getElementById("game");new x(t,60,[k,f])})}]);
//# sourceMappingURL=bundle.js.map