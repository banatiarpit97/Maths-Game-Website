angular.module('mathsGame',['ngMaterial'])
.controller('Change', function ($scope, $mdDialog) {

	var playing = false;
	var score;
	var maxNumber;
	var minNumber;
	var timeLeft;
	var timeLeftCopy;

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
								 console.log($scope.startNumber, $scope.endNumber);
								 sessionStorage.startNumber = Number($scope.startNumber);
								 sessionStorage.endNumber = Number($scope.endNumber);
								 minNumber =  $scope.startNumber;
								 maxNumber = 	$scope.endNumber;
								 	score = 0;
								 	$(".score_value").html(score);
								 	generateQuesAns();
								 console.log(sessionStorage.startNumber, sessionStorage.endNumber);
								 console.log(minNumber, maxNumber);
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
	timeLeft = 60;
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

console.log(minNumber, maxNumber);
// $(".range").click(function(){
// 	minNumber = prompt("Enter Minimum number for range");
// 	maxNumber = prompt("Enter Maximum number for range");
// 	score = 0;
// 	$(".score_value").html(score);
// 	generateQuesAns();
// })

// $(".time").click(function(){
// 	timeLeft = prompt("Enter Time Duration of the Game");
// 	timeLeftCopy = timeLeft;
// 	$("#time_value").html(timeLeft + " sec")
// 	score = 0;
// 	$(".score_value").html(score);
// 	generateQuesAns();
// })

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
    console.log(allAnswers)
    j = 1;
    for(i=1;i<4;i++){
       for(;j<5;j++){
            option = '#option'+ j;
            if($(option).html() != correctAnswer){
       	       $(option).html(allAnswers[i]);
       	       j++;
       	       break;
            }
       }
    }


		$(".option1").click(function(){
			if((($("#option1").html()) == correctAnswer) && (playing == true)){
				updateScore();
				$(".option1").css("background-color", "green");
				var b = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);

				generateQuesAns();
			}

			else if (playing){
				$(".option1").css("background-color", "red");
				var a = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);


			}
		})
		$(".option2").click(function(){
			if((($("#option2").html()) == correctAnswer) && (playing == true)){
				updateScore();
				$(".option2").css("background-color", "green");
				b = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);
				generateQuesAns();

			}

			else if (playing){
				$(".option2").css("background-color", "red");
				a = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);


			}
		})
		$(".option3").click(function(){
			if((($("#option3").html()) == correctAnswer) && (playing == true)){
				updateScore();
				$(".option3").css("background-color", "green");
				b = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);

				generateQuesAns();


			}

			else if (playing){
				$(".option3").css("background-color", "red");
				a = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);


			}
		})
		$(".option4").click(function(){
			if((($("#option4").html()) == correctAnswer) && (playing == true)){
				updateScore();
				$(".option4").css("background-color", "green");
				b = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);

				generateQuesAns();


			}

			else if (playing){
				$(".option4").css("background-color", "red");
				a = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);


			}
		})


}
});


// shows red color sometimes even when clicked on wrong answer, though score incereases by 1 and ques changes
// 2 same options sometimes thogh the allAnswers array have all different values when i print it in console
