angular.module('mathsGame',['ngMaterial'])
.controller('Change', function ($scope, $mdDialog) {

	var playing = false;
	var score;
	var maxNumber;
	var minNumber;
	var timeLeft;
	var timeLeftCopy;
	var wrongGuesses = 0;

				 $scope.range = function(ev) {
						 $mdDialog.show({
								 controller: DialogController,
								 templateUrl: 'templates/changeRange.html',
								 parent: angular.element(document.body),
								 targetEvent: ev,
								 clickOutsideToClose:true// Only for -xs, -sm breakpoints.
						 })

				 };

				 $scope.time = function(ev) {
						 $mdDialog.show({
								 controller: DialogController,
								 templateUrl: 'templates/changeTime.html',
								 parent: angular.element(document.body),
								 targetEvent: ev,
								 clickOutsideToClose:true// Only for -xs, -sm breakpoints.
						 })

				 };

				 function DialogController($scope, $mdDialog) {
						 $scope.close = function() {
								 $mdDialog.cancel();
						 };
						 $scope.cancel = function() {
								 $mdDialog.cancel();
						 };
						 $scope.confirmRange = function() {
								 sessionStorage.startNumber = Number($scope.startNumber);
								 sessionStorage.endNumber = Number($scope.endNumber);
								 minNumber =  $scope.startNumber;
								 maxNumber = 	$scope.endNumber;
								 	score = 0;
								 	$(".score_value").html(score);
								 	generateQuesAns();
								 $scope.close();
						 }
						 $scope.confirmTime = function() {
								 sessionStorage.time = $scope.time;
								 timeLeft = $scope.time;
								 timeLeftCopy = timeLeft
								 	score = 0;
								 	$(".score_value").html(score);
								 	generateQuesAns();
								 $scope.close();

						 }

				 }



if(sessionStorage.time){
	timeLeft = Number(sessionStorage.time);
}
else{
	timeLeft = 10;
}
timeLeftCopy = timeLeft;

if(sessionStorage.startNumber){
	minNumber = Number(sessionStorage.startNumber);
}
else{
	minNumber = 1;
}

if(sessionStorage.endNumber){
	maxNumber = Number(sessionStorage.endNumber);
}
else{
	maxNumber = 10;
}


$("#start_button_content").click(function(){
	if(playing){
		location.reload();
	}
	else{

		playing = true;
		$(".start_game_button").html("Restart Game");
		score = 0;
		$(".score_value").html(score);
		$(".game_over").addClass("hidden");
		$(".time_left").removeClass("hidden");
		$("#time_value").html(timeLeft + " sec");
		var zz = setTimeout(timer, 500);
		generateQuesAns();

	}
});

updateScore = function(){
	score +=1;
	$(".score_value").html(score);

}

var timer =  function(){
		var clock =  setInterval(function(){
		     timeLeft -=1;
		     $("#time_value").html(timeLeft+" sec")
		     if(timeLeft == 0){
		       playing = false;
		        $("#wrongNumber").html(wrongGuesses);
		       	$(".game_over").removeClass("hidden");
				$(".time_left").addClass("hidden");
				timeLeft = timeLeftCopy;
		       clearInterval(clock);

		     }}, 1000);
}

var generateQuesAns = function(){
	var multiplicand = minNumber + (Math.round(Math.random()*(maxNumber - minNumber)));
	var multiplier = 1 + Math.round(9*Math.random());
	var correctAnswer = multiplicand*multiplier;
	$(".multiplicand").html(multiplicand);
	$(".multiplier").html(multiplier);
	var allAnswers = [];
	allAnswers.push(correctAnswer);
    correctOption = '#option'+ (1 + Math.round(3*Math.random()));
	$(correctOption).html(correctAnswer);
	while(allAnswers.length < 4)
    {
	  wrongAnswer = (minNumber + (Math.round(Math.random()*(maxNumber - minNumber))))*(1 + Math.round(9*Math.random()));
      if((allAnswers.indexOf(wrongAnswer)) == -1)
      {allAnswers.push(wrongAnswer);
      }
    }
    j = 1;
    for(i=1;i<4;i++){
       for(;j<5;j++){
            option = '#option'+ j;
            if(option != correctOption){
       	       $(option).html(allAnswers[i]);
       	       j++;
       	       break;
            }
       }
    }

}
		$(".option1").click(function(){
			if(correctOption == "#option1"){
				updateScore();
				$(".option1").css("background-color", "green");
				var b = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);
				generateQuesAns();
			}

			else{
				$(".option1").css("background-color", "red");
				wrongGuesses+=1;
				var a = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);


			}
		})
		$(".option2").click(function(){
			if(correctOption == "#option2"){
				updateScore();
				$(".option2").css("background-color", "green");
				b = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);
				generateQuesAns();

			}

			else{
				wrongGuesses+=1;
				$(".option2").css("background-color", "red");
				a = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);


			}
		})
		$(".option3").click(function(){
			if(correctOption == "#option3"){
				updateScore();
				$(".option3").css("background-color", "green");
				b = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);
				generateQuesAns();


			}

			else{
				wrongGuesses+=1;
				$(".option3").css("background-color", "red");
				a = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);


			}
		})
		$(".option4").click(function(){
			if(correctOption == "#option4"){
				updateScore();
				$(".option4").css("background-color", "green");
				b = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);
				generateQuesAns();


			}

			else{
				wrongGuesses+=1;
				$(".option4").css("background-color", "red");
				a = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);


			}
		})



});


// shows red color sometimes even when clicked on wrong answer, though score incereases by 1 and ques changes
