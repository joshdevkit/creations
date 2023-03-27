 $(document).ready(function() {
    var choices = ["rock", "paper", "scissors"];
    var resultDiv = $("#result");
    var scoreDiv = $("#score");
    var playerScore = 0;
    var computerScore = 0;
    var isProcessing = false;

    $("#rock, #paper, #scissors").click(function() {
      if (isProcessing) {
        return;
      }
      isProcessing = true;

      var playerChoice = $(this).attr("id");
      var computerChoice = choices[Math.floor(Math.random() * choices.length)];
      var result;

      var $button = $(this);
      var buttonText = $button.text();
      $button.prop("disabled", true).html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>');

      setTimeout(function() {
        if (playerChoice === computerChoice) {
          result = "It's a tie!";
        } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
                   (playerChoice === "paper" && computerChoice === "rock") ||
                   (playerChoice === "scissors" && computerChoice === "paper")) {
          playerScore++;
          result = "You win!";
        } else {
          computerScore++;
          result = "You lose!";
        }

        resultDiv.html("You chose " + playerChoice + ". The computer chose " + computerChoice + ". " + result);
        scoreDiv.html("Score: " + playerScore + " - " + computerScore);

        if (computerScore >= 5) {
          Swal.fire({
            icon: 'error',
            title: 'You lose!! Game Over!!',
            showConfirmButton: false,
            timer: 1500
          })
          playerScore = 0;
          computerScore = 0;
          scoreDiv.html("Score: 0 - 0");
          setTimeout(function() {
            location.reload();
          }, 1500);
        } else if (playerScore >= 5) {
          Swal.fire({
            icon: 'success',
            title: 'You Win!',
            showConfirmButton: false,
            timer: 1500
          })
          playerScore = 0;
          computerScore = 0;
          scoreDiv.html("Score: 0 - 0");
          setTimeout(function() {
            location.reload();
          }, 1500);
        }

        $button.prop("disabled", false).html(buttonText);
        isProcessing = false;
      }, 1000);
    });

    $("#Reset").click(function() {
      if (playerScore === 0 && computerScore === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No score yet!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        playerScore = 0;
        computerScore = 0;
        scoreDiv.html("Score: 0 - 0");
      }
    });
  });
