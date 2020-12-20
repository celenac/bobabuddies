// @pjs preload="backgrounds/home1.png, backgrounds/home2.png, backgrounds/instructionsPage0000.png, backgrounds/instructionsPage0001.png, backgrounds/instructionsPage0002.png, backgrounds/instructionsPage0003.png, backgrounds/instructionsPage0004.png, characters/bobaboy1-1.png, characters/bobaboy1-2.png, characters/bobaboy1-jumping.png, characters/bobaboy2-1.png, characters/bobaboy2-2.png, characters/bobaboy2-jumping.png, characters/bobagirl1-1.png, characters/bobagirl1-2.png, characters/bobagirl1-jumping.png, characters/bobagirl2-1.png, characters/bobagirl2-2.png, characters/bobagirl2-jumping.png, backgrounds/gameOver.png, backgrounds/pause.png, otherimages/sidewalk.png, otherimages/sidewalk2.png, otherimages/skyline.png, otherimages/skyline2.png, otherimages/trashcan3.png, otherimages/trashcan4.png, buttons/backButton.png, buttons/backButton2.png, buttons/creditsButton.png, buttons/creditsButton2.png, buttons/howtoplayButton.png, buttons/howtoplayButton2.png, buttons/mainmenuButton.png, buttons/mainmenuButton2.png, buttons/pauseButton.png, buttons/pauseButton2.png, buttons/resumeButton.png, buttons/resumeButton2.png, buttons/startButton.png, buttons/startButton2.png, buttons/tryagainButton.png, buttons/tryagainButton2.png";  
//objects
var person = []; // characters list 
var skyline;
var ground;
var trashcan;
var trashcan2;
var randomTrashX;

var keys = []; //for the key pressing for boba buddies

var score;
var counter=0; //counts the number of times draw loop has ran (for changing frames)- increments in draw loop
var gameSpeed=3; //speeds up the game

var state; //game state

//declare game images
var bobagirl1;
var bobaboy1;
var bobaboy2;
var bobagirl2;
var bobagirl1_2;
var bobaboy1_2;
var bobagirl2_2;
var bobaboy2_2;
var bobagirl1_jump;
var bobagirl2_jump;
var bobaboy1_jump;
var bobaboy2_jump;
var street1;
var street2;
var city1;
var city2;
var mute;
var unmute;

//declare button images
var back1;
var back2;
var credits1;
var credits2;
var howtoplay1;
var howtoplay2;
var mainmenu1;
var mainmenu2;
var pause1;
var pause2;
var resume1;
var resume2;
var start1;
var start2;
var tryagain1;
var tryagain2;

var gameFont;

//declares all of the sounds
var buttonSound = new buzz.sound ("buttonClickSound.mp3");
var buttonSound2 = new buzz.sound ("buttonClickSound2.mp3");
var backgroundSound = new buzz.sound("backgroundSoundFinal.mp3");
var homeMusic= new buzz.sound ("homepageSound.mp3");
var jumpSound = new buzz.sound("jumpSound.wav");
	
//allows playing with buzz API
function playWithLoop(soundToPlay) {
	soundToPlay.play();
	soundToPlay.loop();
}

function setup(){
	var canvas = createCanvas(650,450, P2D);
	canvas.parent('mycanvas');
	imageMode(CENTER); 
	strokeWeight(4);
	
	state=new GameState(0); //set to homepage
	
	score=0;
	
	buttonSound.setVolume(45);
	buttonSound2.setVolume(45);
	backgroundSound.setVolume(15);
	homeMusic.setVolume(20);
	jumpSound.setVolume(20);

	//boba buddies' images
	bobagirl1=loadImage("characters/bobagirl1-1.png");
	bobagirl2=loadImage("characters/bobagirl2-1.png");
	bobaboy1=loadImage("characters/bobaboy1-1.png");
	bobaboy2=loadImage("characters/bobaboy2-1.png");
	bobagirl1_2=loadImage("characters/bobagirl1-2.png");
	bobaboy1_2=loadImage("characters/bobaboy1-2.png");
	bobagirl2_2=loadImage("characters/bobagirl2-2.png");
	bobaboy2_2=loadImage("characters/bobaboy2-2.png");
	bobagirl1_jump=loadImage("characters/bobagirl1-jumping.png");
	bobagirl2_jump=loadImage("characters/bobagirl2-jumping.png");
	bobaboy1_jump=loadImage("characters/bobaboy1-jumping.png");
	bobaboy2_jump=loadImage("characters/bobaboy2-jumping.png");
	
	//street images
	street1=loadImage("otherimages/sidewalk.png");
	street2=loadImage("otherimages/sidewalk2.png");
	
	//two trashcans' images
	trashcan=loadImage("otherimages/trashcan3.png");
	trashcan2=loadImage("otherimages/trashcan4.png");
	
	//city background images
	city1=loadImage("otherimages/skyline.png");
	city2=loadImage("otherimages/skyline2.png");

	//button images
	back1=loadImage("buttons/backButton.png");
	back2=loadImage("buttons/backButton2.png");
	credits1=loadImage("buttons/creditsButton.png");
	credits2=loadImage("buttons/creditsButton2.png");
	howtoplay1=loadImage("buttons/howtoplayButton.png");
	howtoplay2=loadImage("buttons/howtoplayButton2.png");
	mainmenu1=loadImage("buttons/mainmenuButton.png");
	mainmenu2=loadImage("buttons//mainmenuButton2.png");
	pause1=loadImage("buttons/pauseButton.png");
	pause2=loadImage("buttons/pauseButton2.png");
	resume1=loadImage("buttons/resumeButton.png");
	resume2=loadImage("buttons/resumeButton2.png");
	start1=loadImage("buttons/startButton.png");
	start2=loadImage("buttons/startButton2.png");
	tryagain1=loadImage("buttons/tryagainButton.png");
	tryagain2=loadImage("buttons/tryagainButton2.png");

	//speaker icons
	unmute=loadImage("otherimages/unmute.png");
	mute=loadImage("otherimages/mute.png");
	
	gameFont=textFont("Impact");
	
	//initializing objects
	person.push(new Person(240, bobagirl1, bobagirl1_2, bobagirl1_jump));
	person.push(new Person(180, bobaboy1, bobaboy1_2, bobaboy1_jump));
	person.push(new Person(120, bobagirl2, bobagirl2_2, bobagirl2_jump));
	person.push(new Person(60, bobaboy2, bobaboy2_2, bobaboy2_jump));
	ground=new Scroller(street1, street2,1731,370,170, 0);
	randomTrashX = 0;
	trashcan=new Obstacle(trashcan, randomTrashX, 265);
	trashcan2=new Obstacle(trashcan2, randomTrashX+random(350,700), 265);
	randomTrashX=random(500,width+500); //random trashcan position
	skyline=new Scroller(city1,city2,1661,130,height-80, -1);
	
	//keys for controling the four boba buddies
	for (let i = 0; i <= 4; i++) {
		keys.push(false)
	}
}

function draw(){
	counter++; //counter incrementing for frame change
	gameEnd();
	state.show();
}

function mouseClicked(){
	//changing states
	if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415 && state.page==0){ //if 'start' is pressed
		buttonSound2.play();
		homeMusic.stop();
		state.page=2; //go to game
	}
	else if (homeMusic.isMuted()==false && mouseX>5 && mouseX<50 && mouseY>5 && mouseY<35 && state.page==0){ //if speaker for music button is pressed and speaker is unmuted
		buttonSound2.play();
		homeMusic.mute();
		backgroundSound.mute();
	}
	else if (homeMusic.isMuted()==true && mouseX>5 && mouseX<50 && mouseY>5 && mouseY<35 && state.page==0){ //if speaker for music button is pressed and speaker is muted
		buttonSound2.play();
		homeMusic.unmute();
		backgroundSound.unmute();
	}
	else if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25 && state.page==0){ //if 'how to play' is pressed
		buttonSound2.play();
		state.page=1; //go to instructions
	}
	else if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50 && state.page==1){ //if 'back' button pressed in how to play
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25 && state.page==0) {//if 'credits' is pressed
		buttonSound2.play();
		state.page=5;
	}
	else if(mouseX>width/2-40 && mouseX<width/2+40 && mouseY>400-20 && mouseY<400+20 && state.page==5){ //if 'back' is pressed in the credits 
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>290 && mouseY<340 && state.page==3){ //if 'main menu' button pressed
		buttonSound2.play();
		state.page=0;
	}
	else if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>360 && mouseY<410 && state.page==3){ //if 'try again' button pressed
		buttonSound2.play();
		score=0;
		gameSpeed=3;
		state.page=2;
	}
	else if(mouseX>(width/2)-70 && mouseX<width && mouseY>0 && mouseY<50 && state.page==2){ //if 'pause' button pressed
		buttonSound2.play();
		state.page=4;
	}
	else if(mouseX>(width/2-90) && mouseX<(width/2-90+150) && mouseY>250-30 && mouseY<250+20 && state.page==4){
		buttonSound2.play();
		backgroundSound.play();
		state.page=2;//go back to game
	}
	
	//mobile buttons in game
	if(mouseX>10 && mouseX<90+70 && mouseY>300 && mouseY<440){keys[0]=true;}
	if(mouseX>220-60 && mouseX<220+70 && mouseY>300 && mouseY<440){keys[1]=true;}
	if(mouseX>430-70 && mouseX<430+70 && mouseY>300 && mouseY<440){keys[2]=true;}
	if(mouseX>560-70 && mouseX<560+70 && mouseY>300 && mouseY<440){keys[3]=true;}

}

class GameState {

	constructor(p){
		this.page=p;
		this.homepage1=loadImage("backgrounds/home1.png");
		this.homepage2=loadImage("backgrounds/home2.png");
		this.instructionsp1=loadImage("backgrounds/instructionsPage0000.png");
		this.instructionsp2=loadImage("backgrounds/instructionsPage0001.png");
		this.instructionsp3=loadImage("backgrounds/instructionsPage0002.png");
		this.instructionsp4=loadImage("backgrounds/instructionsPage0003.png");
		this.instructionsp5=loadImage("backgrounds/instructionsPage0004.png");
		this.credits=loadImage("backgrounds/credits.png");
		this.gameover=loadImage("backgrounds/gameOver.png");
		this.pause=loadImage("backgrounds/pause.png");
		this.jumpButton1=loadImage("otherimages/jumpButton-1.png");
		this.jumpButton2=loadImage("otherimages/jumpButton-2.png");
		this.jumpButton3=loadImage("otherimages/jumpButton-3.png");
		this.jumpButton4=loadImage("otherimages/jumpButton-4.png");
		this.jumpButton1p=loadImage("otherimages/jumpButton-1-2.png");
		this.jumpButton2p=loadImage("otherimages/jumpButton-2-2.png");
		this.jumpButton3p=loadImage("otherimages/jumpButton-3-2.png");
		this.jumpButton4p=loadImage("otherimages/jumpButton-4-2.png");
	}
	
	show(){
		if(this.page==0){
			this.homePage();
		}
		else if (this.page==1){
			this.instructions();
		}
		else if (this.page==2){
			this.startGame();
		}
		else if (this.page==3){
			this.gameOver();
		}
		else if(this.page==4){
			this.pausePage();
		}
		else if (this.page==5){
			this.creditsPage();
		}
	}
	
	homePage(){
		score=0;
		gameSpeed=3;
		textFont(gameFont,35);
		playWithLoop(homeMusic);
		if(counter%20<=10){
			image(this.homepage1,width/2,height/2); //background for the page
				//mouse hovers start button
			if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415){
				image(start2, width/2-130, 340, 250,150);
			}
			else{
				image(start1, width/2-130, 340, 250, 150);
			}
				//mouse hovers how to play button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25){
				image(howtoplay2, width/2+150, 300);
			}
			else{
				image(howtoplay1, width/2+150, 300);
			}
				//mouse hovers credits button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25){
				image(credits2,width/2+150, 380);
			}
			else{
				image(credits1,width/2+150, 380);
			}
				//speaker icon for muting music
			if(homeMusic.isMuted()){
				image(mute,30,20,50,36);

			}
			else{
				image(unmute,30,20,50,36);
			}
		}
		else{
			image(this.homepage2,width/2,height/2);
				//mouse hovers start button
			if(mouseX>width/2-255 && mouseX<width/2-5 && mouseY>265 && mouseY<415){
				image(start2, width/2-130, 340, 250,150);
			}
			else{
				image(start1, width/2-130, 340, 250, 150);
			}
				//mouse hovers how to play button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>300-25 && mouseY<300+25){
				image(howtoplay2, width/2+150, 300);
			}
			else{
				image(howtoplay1, width/2+150, 300);
			}
				//mouse hovers credits button
			if(mouseX>width/2-20 && mouseX<width/2+300 && mouseY>380-25 && mouseY<380+25){
				image(credits2,width/2+150, 380);
			}
			else{
				image(credits1,width/2+150, 380);
			}
				//speaker icon for muting music
			if(homeMusic.isMuted()){
				image(mute,30,20,50,36);
			}
			else{
				image(unmute,30,20,50,36);
			}
		}
	}
	
	instructions(){
		textFont(gameFont,30);
		if(counter%60>=50){
			image(this.instructionsp5,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=40){
			image(this.instructionsp4,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=30){
			image(this.instructionsp3,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=20){
			image(this.instructionsp2,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
		else if(counter%60>=10){
			image(this.instructionsp1,width/2,height/2);
			//back button
			if(mouseX>0 && mouseX<100 && mouseY>0 && mouseY<50){
				image(back2, 50,25);
			}
			else{
				image(back1, 50,25);
			}
		}
	}
	
	startGame(){
		playWithLoop(backgroundSound);
		background(145, 181, 255);
		skyline.show();
		skyline.move();
		ground.show();
		ground.move();
		
		trashcan.show();
		trashcan.move();
		trashcan2.show();
		trashcan2.move();
	
		//speeding up the game
		if(counter%500==0){ //counter increases every 500th time the draw loop runs
			gameSpeed++;
		}
		if(gameSpeed>=14){ //after speed gets to 10, it slows all the way day 
			gameSpeed=14;
		}
	
		//score display
		textAlign(CENTER);
		fill(0);
		textFont(gameFont,45);
		text(score, width/2, 80);
		
		//score increasing
		fill(255,0,0);
		if(trashcan.getX()<person[3].getX() && trashcan.getX()>=person[3].getX()-gameSpeed){
			jumpSound.setTime(.03);
			jumpSound.play();
			score=score+10;
		}
		if(trashcan2.getX()<person[3].getX() && trashcan2.getX()>=person[3].getX()-gameSpeed){
			jumpSound.setTime(.03);
			jumpSound.play();
			score=score+10;
		}
		
		//key pressing for boba buddies
		if(keys[3]==true){
			person[0].showJump();
			person[0].jump(3);
			image(this.jumpButton4p,560, 375,100,100);
		}
		else{
			person[0].show();
			image(this.jumpButton4,560, 375,100,100);
		}
		if(keys[2]==true){
			person[1].showJump();
			person[1].jump(2);
			image(this.jumpButton3p,430, 375,100,100);
		}
		else{
			person[1].show();
			image(this.jumpButton3,430, 375,100,100);
		}
		if(keys[1]==true){
			person[2].showJump();
			person[2].jump(1); 
			image(this.jumpButton2p,220, 375,100,100);
		}
		else{
			person[2].show();
			image(this.jumpButton2,220, 375,100,100);
		}
		if(keys[0]==true){
			person[3].showJump();
			person[3].jump(0); 
			image(this.jumpButton1p,90, 375,100,100);
		}
		else{
			person[3].show();
			image(this.jumpButton1,90, 375,100,100);
		}
		
		//clicking the 'pause' button
		if(mouseX>(width/2)-50 && mouseX<width && mouseY>0 && mouseY<50){
			image(pause2,width-50,25);
		}
		else{
			image(pause1,width-50,25);
		}
	}
	
	gameOver(){
		fill(0);
		backgroundSound.stop();
		textFont(gameFont,40);
		image(this.gameover,width/2,height/2);
		text(score,width/2-5,260);
			//'main menu' button
		if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>290 && mouseY<340){
			image(mainmenu2, width/2,315);
		}
		else{
			image(mainmenu1, width/2,315);;
		}
			//'try again' button
		if(mouseX>(width/2-100) && mouseX<(width/2+100) && mouseY>360 && mouseY<410){
			image(tryagain2, width/2,385);
		}
		else{
			image(tryagain1, width/2,385);
		}
	}
	
	pausePage(){
		backgroundSound.pause(); //pauses background music
		backgroundSound.pause();
		image(this.pause,width/2,height/2);
		if(mouseX>(width/2-90) && mouseX<(width/2-90+150) && mouseY>250-30 && mouseY<250+20){
				image(resume2, width/2,260);
			}
		else{
			image(resume1, width/2,260);
		}
	}

	creditsPage(){
		image(this.credits,width/2,height/2);
		//back button
		if(mouseX>width/2-40 && mouseX<width/2+40 && mouseY>400-20 && mouseY<400+20){
				image(back2, width/2,400);
			}
		else{
			image(back1, width/2,400);
		}
	}
}

class Scroller{

	constructor(picture1,picture2, pictureWidth, yPosition, imageSizeY, speed){
		this.picWidth=pictureWidth;
		this.y=yPosition;
		this.x1=-(this.picWidth/2)-50;
		this.x2= this.x1 + this.picWidth;
		this.pic1=picture1;
		this.pic2=picture2;
		this.size=imageSizeY;
		this.scrollSpeed = gameSpeed + speed;
	}
	
	show(){
		image(this.pic1, this.x1, this.y,this.picWidth,this.size);
		image(this.pic2, this.x2, this.y,this.picWidth,this.size);
	}
	
	move(){
		this.x1 = this.x1 - this.scrollSpeed;
		this.x2 = this.x2 - this.scrollSpeed;
		//city scroller
		if(this.x1 + this.picWidth <= 0){ 
			this.x1 = this.x2 + this.picWidth - 50;
		}
		if(this.x2 + this.picWidth <= 0){
			this.x2 = this.x1 + this.picWidth - 50;
		}
	}
}

class Obstacle{

	constructor(picture, xPosition, yPosition){
		this.x=xPosition;
		this.y=yPosition;
		this.sizeX=15;
		this.sizeY=30;
		this.pic=picture;
	}
	
	show(){
		image(this.pic, this.x, this.y, 50, 50);
	}
	
	move(){
		this.x = this.x - gameSpeed;
		if(this.x < random(-150,-50)){
			this.x = random(width+100, width+400);
		}
	}
	
	getX(){ //used to make other functions have access to obstacle's x position
		return this.x;
	}
	
	getY(){ //used to make other functions have access to obstacle's y position
		return this.y;
	}
	
	setX(newX){ //used to give trashcans new x positions when game is restarted
		this.x=newX;
	}
}
 
class Person{

	constructor(xPosition, picture1, picture2, picture3){
		this.x=xPosition;
		//y=347; //previous y position
		this.y=260;
		this.isjumping=false;
		this.yinc = 0;
		this.pic1=picture1;
		this.pic2=picture2;
		this.pic3=picture3; //jumping picture
	}

	show(){
		if(counter%20<=10){
			image(this.pic1, this.x, this.y, 80,80);
		}
		else{
			image(this.pic2, this.x, this.y, 80, 80);
		}
	}
	
	showJump(){
		image(this.pic3, this.x, this.y,80, 80);
	}
	
	jump(number){
		if(this.isjumping==false && keys[number]==true)
		{
			jumpSound.setTime(0.1);
			jumpSound.play();
		    this.isjumping=true;
		    this.yinc=15;
		}
		if(this.isjumping==true) //if character is jumping
		{	
		    this.y = this.y-this.yinc; //add thrust to current y position
		    this.yinc -=1 ; 
		}
		if(this.y >= 260) //if character's y reaches the ground
		{
		    this.isjumping=false;
		    keys[number]=false;
		}
	}
	
	getX(){
		return this.x;
	}
	
	getY(){
		return this.y;
	}
	
	setY(newY){
		this.y=newY;
	}
}

function keyPressed(){
	if (key=='1') {keys[0]=true;}
  	if (key=='2') {keys[1]=true;}
  	if (key=='3') {keys[2]=true;}
  	if (key=='4') {keys[3]=true;}
}

function gameEnd(){
	//if any of the buddies touching the 1st trashcan
	if(person[0].getX()>=trashcan.getX()-25 && person[0].getX()<=trashcan.getX()+30 && person[0].getY()>=trashcan.getY()-15 && person[0].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));	
	}
	if(person[1].getX()>=trashcan.getX()-25 && person[1].getX()<=trashcan.getX()+30 && person[1].getY()>=trashcan.getY()-15 && person[1].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));	
	}
	if(person[2].getX()>=trashcan.getX()-25 && person[2].getX()<=trashcan.getX()+30 && person[2].getY()>=trashcan.getY()-15 && person[2].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));	
	}
	if(person[3].getX()>=trashcan.getX()-25 && person[3].getX()<=trashcan.getX()+30 && person[3].getY()>=trashcan.getY()-15 && person[3].getY()<=trashcan.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));	
	}
	
	//if any of the buddies touching the 2nd trashcan
	if(person[0].getX()>=trashcan2.getX()-25 && person[0].getX()<=trashcan2.getX()+30 && person[0].getY()>=trashcan2.getY()-15 && person[0].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[1].getX()>=trashcan2.getX()-25 && person[1].getX()<=trashcan2.getX()+30 && person[1].getY()>=trashcan2.getY()-15 && person[1].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[2].getX()>=trashcan2.getX()-25 && person[2].getX()<=trashcan2.getX()+30 && person[2].getY()>=trashcan2.getY()-15 && person[2].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
	if(person[3].getX()>=trashcan2.getX()-25 && person[3].getX()<=trashcan2.getX()+30 && person[3].getY()>=trashcan2.getY()-15 && person[3].getY()<=trashcan2.getY()+15){
		state.page=3;
		trashcan.setX(randomTrashX);
		trashcan2.setX(randomTrashX+random(350,700));
	}
}