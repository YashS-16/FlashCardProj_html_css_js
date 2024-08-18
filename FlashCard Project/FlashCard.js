const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card")
const cardButton = document.getElementById("save-btn")
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const errorMessage = document.getElementById("error")
const addQuestion = document.getElementById("add-flashcard")
const closeBtn = document.getElementById("close-btn")

let editBool = false;

//Add QUestion when user clicks the 'Add Flashacard' button
addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

// Hiding the Created FlashCard
closeBtn.addEventListener("click", () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
        editBool = false;
        submitQuestion()
    }
});

// Submiting the Question 
cardButton.addEventListener("click", () => {

    editBool = false
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hide");
    } else {
        container.classList.remove("hide");
        errorMessage.classList.add("hide");
        viewlist(tempQuestion, tempAnswer);
        question.value = "";
        answer.value = "";
    }
});

// Generating a Card
function viewlist() {
    var listCard = document.getElementsByClassName("card-list-container");

    var div = document.createElement("div");
    div.classList.add("card");

    //Question
    div.innerHTML += `<p class = "question-div"> ${tempQuestion} </p>`

    //Answer
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.innerText = tempAnswer;
    div.appendChild(displayAnswer);

    //Link to show/hide answer
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide");
    });
    div.appendChild(link);

    // Editing the Show/Hide Button
    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("button-con");
    var editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click", ()=>{
        editBool = true;
        modifyElement(editButton, true)
        addQuestionCard.classList.remove("hide");
    });
    buttonsCon.appendChild(editButton);

    disableButtons(false);

    //Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
    deleteButton.addEventListener("click", ()=>{
        modifyElement(deleteButton);
    });
    buttonsCon.appendChild(deleteButton);


    div.appendChild(buttonsCon);

    listCard[0].appendChild(div);
    hideQuestion();
}

// Function to Hide question card
function hideQuestion() {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
}

// Modify Elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    if (edit) {
        let parentAns = parentDiv.querySelector(".answer-div").innerText;
        answer.value = parentAns
        question.value = parentQuestion
        disableButtons(true);
    }
    parentDiv.remove();
};

// Disable edit and delete buttons
const disableButtons = (value)=>{
    let editButtons = document.getElementsByClassName("edit");

    Array.from(editButtons).forEach((element) =>{
        element.disabled = value;
    });
};