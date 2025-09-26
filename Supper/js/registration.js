const userRegistrationForm = document.getElementById("registrationForm");
const userLoginForm = document.getElementById("loginForm");
const userInfoContainer = document.getElementById("userContainer");
const modalWindow = document.getElementById("myModal");
const errorMessageRegModal = document.getElementById("errorMessageReg");
const errorMessageLogModal = document.getElementById("errorMessageLog");

updateLoginButton();
checkUserSession();

document.getElementById("btnSing-in").addEventListener("click", function () {
	modalWindow.style.display = "block";
});

document.querySelectorAll("#closeForm").forEach(function (element) {
	element.addEventListener("click", closeModal);
});

function clearErrors() {
	errorMessageRegModal.textContent = "";
	errorMessageLogModal.textContent = "";
}

function closeModal() {
	modalWindow.style.display = "none";
	resetForms();
}

document.getElementById("modalLinkLog").addEventListener("click", switchToReg);

document
	.getElementById("modalLinkReg")
	.addEventListener("click", switchToLogin);

function switchToReg() {
	userRegistrationForm.style.display = "block";
	userLoginForm.style.display = "none";
	resetForms();
}

function switchToLogin() {
	userRegistrationForm.style.display = "none";
	userLoginForm.style.display = "block";
	resetForms();
}

function resetForms() {
	let inputs = document.querySelectorAll(".modal input");
	inputs.forEach(function (input) {
		input.value = "";
	});
	clearErrors();
}

userRegistrationForm.addEventListener("submit", validateReg);

function validateReg(event) {
	event.preventDefault();

	const email = document.getElementById("emailReg").value;
	const password = document.getElementById("passwordReg").value;
	const passwordConfirm = document.getElementById("passwordConfirmReg").value;

	const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;

	let isValid = true;
	errorMessageRegModal.textContent = "";

	if (!emailPattern.test(email)) {
		errorMessageRegModal.textContent = "Введите корректную почту";
		isValid = false;
	}

	if (!(password === passwordConfirm)) {
		errorMessageRegModal.textContent = "Пароли не совпадают";
		isValid = false;
	}

	if (isValid) {
		dataFetch(event);
	}
}

function renderUserInfo(text) {
	userInfoContainer.innerHTML = `
        <div class="login-user">
            <p>${text}</p>
            <button id="btnLog-out" class="btn-sing">
                Выйти из аккаунта
            </button>
        </div>
    `;
}

userLoginForm.addEventListener("submit", function (event) {
	event.preventDefault();

	errorMessageLogModal.textContent = "";

	const formData = new FormData(this);

	fetch("php/login.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.text())
		.then((data) => {
			console.log(data);
			if (data === "success") {
				resetForms();
				closeModal();

				checkUserSession();
			} else if (data === "captcha_required") {
				document.getElementById("captchaBox").style.display = "block";
				errorField.textContent = "Подтвердите, что вы не робот";
			} else {
				errorMessageLogModal.textContent = data;
			}
		});
});

function dataFetch(event) {
	const form = event.target;
	const formData = new FormData(form);

	fetch("php/register.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.text())
		.then((data) => {
			console.log(data);
			if (data === "success") {
				switchToLogin();
				resetForms();
			} else {
				errorMessageRegModal.textContent = data;
			}
		})
		.catch((error) => {
			console.error(error);
			errorMessageRegModal.textContent =
				"Произошла ошибка при регистрации";
		});
}

document.addEventListener("click", function (event) {
	if (event.target && event.target.id === "btnLog-out") {
		fetch("php/logout.php")
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				resetForms();
				updateLoginButton();
				checkUserSession();
			});
	}
});

function updateLoginButton() {
	userInfoContainer.innerHTML = `
        <button id="btnSing-in" class="btn-sing">Войти</button>
    `;

	document
		.getElementById("btnSing-in")
		.addEventListener("click", function () {
			modalWindow.style.display = "block";
		});
}

// function checkUserSession() {
//     fetch('php/check_session.php')
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'authenticated') {
//                 console.log(data);
//                 renderUserInfo(data.user.login);
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка при проверке сессии:', error);
//         });
// }

function checkUserSession() {
	fetch("php/check_session.php")
		.then((response) => response.json())
		.then((data) => {
			const sendButton = document.getElementById("sendRecipe");

			if (data.status === "authenticated") {
				sendButton.disabled = false;
				sendButton.style.opacity = 1;
				renderUserInfo(data.user.login);
				renderRecipeButton;
			} else {
				sendButton.disabled = true;
				sendButton.style.opacity = 0.5;
			}

			return data;
		})
		.catch((error) => {
			console.error("Ошибка при проверке сессии:", error);
			return { status: "guest" };
		});
}

document.getElementById("sendRecipe").addEventListener("click", function () {
	fetch("php/check_session.php")
		.then((response) => response.json())
		.then((data) => {
			if (data.status === "authenticated") {
				const addForm = document.querySelector(
					".main-inner .recipes#recipe-list2"
				);
				const container = document.getElementById("recipe-list");

				if (addForm) {
					container.innerHTML = "";
					addForm.style.display = "block";
				}
			} else {
				alert("Вы должны войти, чтобы добавлять рецепты");
			}
		})
		.catch((err) => {
			console.error("Ошибка проверки сессии:", err);
			alert("Произошла ошибка. Попробуйте позже.");
		});
});

checkUserSession();
