const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: ["Jupiter", "Saturn", "Mars", "Venus"],
      correctAnswer: "Jupiter"
    },
    {
      question: "What year did the Titanic sink?",
      answers: ["1912", "1921", "1905", "1933"],
      correctAnswer: "1912"
    }
  ];
  
  const questionContainer = document.getElementById("question-container");
  const submitButton = document.getElementById("submit-btn");
  
  // Function to display questions
  function displayQuestions() {
    questions.forEach((q, index) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        <div class="answers">
          ${q.answers.map((a) => `<input type="radio" name="question${index}" value="${a}"> <span class="answer">${a}</span><br>`).join("")}
        </div>
      `;
      questionContainer.appendChild(questionElement);
    });
  }
  
  // Function to check answers
  function checkAnswers() {
    const selectedAnswers = [];
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption) {
        selectedAnswers.push(selectedOption.value);
      }
    });
  
    // Example: Display selected answers in console
    console.log("Selected answers:", selectedAnswers);
  }
  
  // Event listener for submit button
  submitButton.addEventListener("click", checkAnswers);
  
  // Call function to display questions
  displayQuestions();
  