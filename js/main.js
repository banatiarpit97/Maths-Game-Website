angular.module('mathsGame',['ngMaterial'])
.controller('Change', function ($scope, $mdDialog) {

  if(!sessionStorage.startNumber){
            sessionStorage.startNumber = 1;
  }
  if(!sessionStorage.endNumber){
            sessionStorage.endNumber = 10;
  }
  if(!sessionStorage.time){
            sessionStorage.time = 60;
  }

	var playing = false;
	var score;
	var maxNumber;
	var minNumber;
	var timeLeft;
	var timeLeftCopy;
	var wrongGuesses = 0;
	var correctOption= null;


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
						});

				};

				function DialogController($scope, $mdDialog) {
          if(sessionStorage.startNumber){
            $scope.startNumber = Number(sessionStorage.startNumber);
            // console.log("hh", typeof $scope.startNumber)
          }
          else{
            $scope.startNumber = 1;
          }
          if(sessionStorage.endNumber){
            $scope.endNumber = Number(sessionStorage.endNumber);
          }
          else{
            $scope.endNumber = 10;
          }
          if(sessionStorage.time){
            $scope.time = Number(sessionStorage.time);
          }
          else{
            $scope.time = 60;
          }
          // $scope.startNumber = minNumber;
          // $scope.endNumber = 10;

        //    if(sessionStorage.startNumber && sessionStorage.endNumber){
        //      console.log('aa');
        //      console.log(sessionStorage.startNumber)
        //    $scope.startNumber = (sessionStorage.startNumber);
        //    $(".endNumber").html(sessionStorage.endNumber);
        //  }
        //    else{
        //      $(".startNumber").html(1);
        //      $(".endNumber").html(10);
        //    }

        $scope.timeError = function(){
          $scope.timeMessage = "";
          if(isNaN($scope.time) || ($scope.time == null) ){
            $scope.timeMessage += "Enter time in seconds";
            $(".timeMessage").html($scope.timeMessage);
            $(".timeError").removeClass("hidden");
            $scope.timeokay = 0;
          }
          else if($scope.time <= 0){
            $scope.timeMessage += "Enter value greater than 0";
            $(".timeMessage").html($scope.timeMessage);
            $(".timeError").removeClass("hidden");
            $scope.timeokay = 0;
          }
          else {
            $scope.timeokay = 1;
          }
        }
					$scope.rangeError = function(){
						$scope.rangeMessage1 = "";
						$scope.rangeMessage2 = "";
						if(isNaN($scope.startNumber) || ($scope.startNumber == null) ){
							$scope.rangeMessage1 += "Enter a Number";
							$(".rangeMessage1").html($scope.rangeMessage1);
							$(".rangeError1").removeClass("hidden");
							$scope.okay1 = 0;
						}
						else if($scope.startNumber <= 0){
							$scope.rangeMessage1 += "Enter a Number greater than 0";
							$(".rangeMessage1").html($scope.rangeMessage1);
							$(".rangeError1").removeClass("hidden");
							$scope.okay1 = 0;
						}
						else if (!isNaN($scope.startNumber)) {

							$(".rangeMessage1").html($scope.rangeMessage1);
							$(".rangeError1").addClass("hidden");
							$scope.okay1 = 1;
						}
						if(isNaN($scope.endNumber) || ($scope.endNumber == null) ){
							$scope.rangeMessage2 += "Enter a Number";
							$(".rangeMessage2").html($scope.rangeMessage2);
							$(".rangeError2").removeClass("hidden");
							$scope.okay2 = 0;

						}
						else if($scope.endNumber <= 0){
							$scope.rangeMessage2 += "Enter a Number greater than 0";
							$(".rangeMessage2").html($scope.rangeMessage2);
							$(".rangeError2").removeClass("hidden");
							$scope.okay2 = 0;
						}
						else if (!isNaN($scope.endNumber)) {
							$(".rangeMessage2").html($scope.rangeMessage2);
							$(".rangeError2").addClass("hidden");
							$scope.okay2 = 1;
						}
						if(($scope.okay1 + $scope.okay2 == 2) && ($scope.endNumber < $scope.startNumber)){
							$(".greaterMessage").removeClass("hidden");
							$scope.okay3 = 0;
						}
						else{
							$(".greaterMessage").addClass("hidden");
							$scope.okay3 = 1;
						}

					}
						$scope.close = function() {
								$mdDialog.cancel();
						};
						$scope.cancel = function() {
								$mdDialog.cancel();
						};
						$scope.confirmRange = function() {
							$scope.rangeError();

							if($scope.okay1 + $scope.okay2 + $scope.okay3 == 3)
							{
								sessionStorage.startNumber = Number($scope.startNumber);
								sessionStorage.endNumber = Number($scope.endNumber);
								minNumber =  $scope.startNumber;
								maxNumber = 	$scope.endNumber;
								// score = 0;
								$(".score_value").html(score);
								generateQuesAns();
								$scope.close();
						}
						}
						$scope.confirmTime = function() {
							$scope.timeError();
							if($scope.timeokay == 1){
								sessionStorage.time = $scope.time;
								timeLeft = $scope.time;
								timeLeftCopy = timeLeft;
								score = 0;
								$(".score_value").html(score);
								wrongGuesses = 0;
								generateQuesAns();
								$scope.close();
							}
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


$("#start_button_content").click(function(){
	if(playing){
		score = 0;
    $(".score_value").html(score);
    timeLeft = sessionStorage.time;
    $("#time_value").html(timeLeft + " sec");
    generateQuesAns();

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
			if(correctOption == "#option1" && playing){
				updateScore();
				$(".option1").css("background-color", "green");
				var b = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);
				generateQuesAns();
			}
			else if (playing){
				$(".option1").css("background-color", "red");
				wrongGuesses+=1;
				var a = setTimeout(function(){$(".option1").css("background-color", "white")}, 300);
			}
		})
		$(".option2").click(function(){
			if (correctOption == "#option2" && playing){
				updateScore();
				$(".option2").css("background-color", "green");
				b = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);
				generateQuesAns();
			}
			else if(playing){
				wrongGuesses+=1;
				$(".option2").css("background-color", "red");
				a = setTimeout(function(){$(".option2").css("background-color", "white")}, 300);
			}
		})
		$(".option3").click(function(){
			if (correctOption == "#option3" && playing){
				updateScore();
				$(".option3").css("background-color", "green");
				b = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);
				generateQuesAns();
			}
			else if (playing){
				wrongGuesses+=1;
				$(".option3").css("background-color", "red");
				a = setTimeout(function(){$(".option3").css("background-color", "white")}, 300);
			}
		})
		$(".option4").click(function(){
			if (correctOption == "#option4" && playing){
				updateScore();
				$(".option4").css("background-color", "green");
				b = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);
				generateQuesAns();
			}
			else if (playing){
				wrongGuesses+=1;
				$(".option4").css("background-color", "red");
				a = setTimeout(function(){$(".option4").css("background-color", "white")}, 300);
			}
		})



});


// shows red color sometimes even when clicked on wrong answer, though score incereases by 1 and ques changes
