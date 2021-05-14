class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    background(rgb(255,255,0));
    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result of the quiz",425,50);
    Contestant.getPlayerInfo();
    if(allContestants!==undefined){
      fill("blue");
      textSize(20);
      text("Note:The contestants who answered correct are highlighted in green",130,240);
      var display_position=255;

  for(var con in allContestants){
    var correctans="2";
      if(correctans===allContestants[con].answer){
          fill("green");
      }
      else{
          fill("red");
      }
  display_position=display_position+20;
  textSize(15);
  text(allContestants[con].name+":"+allContestants[con].answer,120,display_position)
  }
}
  }
}
