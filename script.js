const editProfileButton = document.getElementById("pen")
const closePopupButton = document.getElementById("cross")
let popup = document.getElementById("popup");
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__capture');
let userName = document.querySelector('.intro__name');
let userCapture = document.querySelector('.intro__capture');

editProfileButton.addEventListener('click', function(mouseEvent) {
    
    nameInput.value = userName.textContent;
    jobInput.value = userCapture.textContent;

    popup.classList.add("popup_opened");
})

closePopupButton.addEventListener('click', function(mouseEvent) {
    popup.classList.remove("popup_opened");

})



// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
 
    userName.textContent = nameInput.value
    userCapture.textContent = jobInput.value
    popup.classList.remove("popup_opened");
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
 
    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
