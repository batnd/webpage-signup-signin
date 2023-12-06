window.onload = function() {
    // Поиск элементов формы, pop-up элементов
    let formFullName = document.getElementById("form-fullName");
    let formYourUserName = document.getElementById("your-user-name");
    let formEMail = document.getElementById("e-mail");
    let formPassword = document.getElementById("password");
    let formPasswordRepeat = document.getElementById("password-repeat");
    let formAgreeCheckbox = document.getElementById("agreeCheckbox");
    let formButtonSignUp = document.getElementById("button-sign-up");
    let popupWindow = document.getElementById("popup");
    let popupButton = document.getElementById("popup-button");
    let formAlreadyHaveAnAccount = document.querySelector(".registration-form__form__alreadyHaveAnAccount a");

    // 2. В поле "Full Name" запретите вводить цифры:
    formFullName.onkeydown = function(e) {
        let forbiddenNumbers = [0,1,2,3,4,5,6,7,8,9];
        for (let i = 0; i < forbiddenNumbers.length; i++) {
            if(parseInt(e.key) === forbiddenNumbers[i]) {
                return false;
            }
        }
    }

    // 3. В поле "Your username" запретите вводить точки и запятые:
    formYourUserName.onkeydown = function(e) {
        if(e.key === "." || e.key === ",") {
            return false;
        }
    }

    // 4. При изменении значения чекбокса выводите в консоль соответствующее сообщение: “Согласен” или “Не согласен”:
    formAgreeCheckbox.onchange = function(e) {
        if (e.target.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен");
        }
    }

    // 5. Обработка нажатия на кнопку “Sign Up”:
    formButtonSignUp.onclick = function() {
        // Переменные со значениями полей формы в момент нажатия кнопки "Sign Up"
        let formFullNameValue = formFullName.value;
        let formYourUserNameValue = formYourUserName.value;
        let formEMailValue = formEMail.value;
        let formPasswordValue = formPassword.value;
        let formPasswordRepeatValue = formPasswordRepeat.value;
        let formAgreeCheckboxValue = formAgreeCheckbox.checked;

        // Проверка на существование значения в каждом текстовом поле
        if(!formFullNameValue) {
            alert("Заполните поле Full Name");
            return;
        }
        if(!formYourUserNameValue) {
            alert("Заполните поле Your username");
            return;
        }
        if(!formEMailValue) {
            alert("Заполните поле E-mail");
            return;
        }
        if(!formPasswordValue) {
            alert("Заполните поле Password");
            return;
        }
        if(!formPasswordRepeatValue) {
            alert("Заполните поле Repeat Password");
            return;
        }

        // Проверка длины пароля
        if(formPasswordValue.length < 8) {
            alert("Пароль должен содержать не менее 8 символов");
            return;
        }

        // Проверка совпадения паролей
        if(formPasswordValue !== formPasswordRepeatValue) {
            alert("Введенные пароли в полях Password и Repeat Password не совпадают");
            return;
        }

        // Проверка выбран ли чекбокс
        if(!formAgreeCheckboxValue) {
            alert("Ошибка! Пользователь не согласился с условиями предоставления услуг и условиями конфиденциальности");
            return;
        }

        // Если все поля заполнены верно - вызвать модальное окно
        popupWindow.style.display = "flex";
    }

    // Обработка нажатия кнопки "ОК" в модальном окне:
    popupButton.onclick = function() {
        // Модальное окно закрывается
        popupWindow.style.display = "none";

        // Вызов функции очистки формы, перехода на страницу логина
        logIn();
    }

    // Обработка нажатия на ссылку Already have an account?:
    formAlreadyHaveAnAccount.onclick = function() {
        // Вызов функции очистки формы, перехода на страницу логина
        logIn();
    }

    // Функция очистки формы и имитации перехода на страницу логина:
    function logIn() {
        // Очистка полей формы
        formFullName.value = null;
        formYourUserName.value = null;
        formEMail.value = null;
        formPassword.value = null;
        formPasswordRepeat.value = null;
        formAgreeCheckbox.checked = false;

        // Имитация перехода на страницу логина
        setTimeout(() => {
            // Поиск элементов, которые нужно удалить или изменить значение и присваивание их переменным
            let logInText = document.getElementsByClassName("registration-form__getYourFreeAccount")[0];
            let formFullNameDel = document.getElementsByClassName("fullName")[0];
            let formEMailDel = document.getElementsByClassName("eMail")[0];
            let formPasswordRepeatDel = document.getElementsByClassName("passwordRepeat")[0];
            let formAgreeCheckboxDel = document.getElementsByClassName("registration-form__form__agree")[0];
            let formAlreadyHaveAnAccountDel = document.getElementsByClassName("registration-form__form__alreadyHaveAnAccount")[0];

            // Изменение текста заголовка и кнопки
            logInText.innerText = "Log in to the system";
            formButtonSignUp.innerText = "Sign In";

            // Удаление неиспользуемых полей формы
            formFullNameDel.remove();
            formEMailDel.remove();
            formPasswordRepeatDel.remove();
            formAgreeCheckboxDel.remove();
            formAlreadyHaveAnAccountDel.remove();

            // Изменение размера высоты блока с полями формы
            document.getElementsByClassName("registration-form__form__wrapper")[0].style.height = "150px";

            // Обработка нажатия на кнопку "Sign In" на странице логина:
            formButtonSignUp.onclick = function() {
                // Переменные со значениями полей формы
                let formYourUserNameValue = formYourUserName.value;
                let formPasswordValue = formPassword.value;

                // Проверка на существование значения в полях
                if(!formYourUserNameValue) {
                    alert("Заполните поле Your username");
                    return;
                }
                if(!formPasswordValue) {
                    alert("Заполните поле Password");
                    return;
                }

                // Проверка длины пароля
                if(formPasswordValue.length < 8) {
                    alert("Пароль должен содержать не менее 8 символов");
                    return;
                }

                // Если все поля заполнены верно
                alert("Добро пожаловать, " + formYourUserNameValue + "!");

                // Перезагрузка страницы
                setTimeout(() => {
                    location.reload();
                }, 250);
            }
        }, 500);
    }
}