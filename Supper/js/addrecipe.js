document.querySelectorAll(".recipe-textArea").forEach((textarea) => {
	textarea.addEventListener("input", function () {
		this.style.height = "30px";
		this.style.height = Math.min(this.scrollHeight, 200) + "px";
	});
});

document.getElementById("plus-btn").addEventListener("click", function () {
	document.getElementById("coverUpload").click();
});

document
	.querySelector(".custom-number-input")
	.addEventListener("click", function (e) {
		const input = this.querySelector('input[type="number"]');
		let currentValue = parseInt(input.value) || 0;

		if (e.target.classList.contains("increase")) {
			input.value = currentValue + 1;
		} else if (e.target.classList.contains("decrease")) {
			input.value = Math.max(currentValue - 1, 1);
		}

		input.dispatchEvent(new Event("change"));
	});

document
	.getElementById("add-ingredient")
	.addEventListener("click", function () {
		const nameInput = document.getElementById("ingNameInput");
		const amountInput = document.getElementById("amount-input");
		const unitInput = document.getElementById("unit-input");

		const name = nameInput.value.trim();
		const amount = amountInput.value.trim();
		const unit = unitInput.value.trim();

		if (!name || !amount || !unit) {
			alert("Пожалуйста, заполните все поля");
			return;
		}

		const itemHTML = `
      <div class="ingredient-item">
        <div class="ingredient-item-inner">
          <p class="ingredient-name">${name}</p>
          <div class="ingredient-item-inner">
            <p class="ingredient-amount">${amount}</p>
            <span class="ingredient-unit">${unit}</span>
            <img class="deleteBtn" src="pics/photo_2025-05-19_02-23-31.jpg" alt="Удалить" style="cursor: pointer;">
          </div>
        </div>
        <div class="border line"></div>
      </div>
    `;

		const list = document.getElementById("ingridients-userList");
		list.insertAdjacentHTML("beforeend", itemHTML);

		nameInput.value = "";
		amountInput.value = "1";
		unitInput.value = "";
	});

document
	.getElementById("ingridients-userList")
	.addEventListener("click", function (e) {
		if (e.target.classList.contains("deleteBtn")) {
			const item = e.target.closest(".ingredient-item");
			if (item) {
				item.remove();
			}
		}
	});

let counterStep =
	document.querySelectorAll("#step-container .step").length || 3;

function addStep() {
	const stepContainer = document.getElementById("step-container");
	const stepCount = stepContainer.querySelectorAll(".step").length + 1;

	const newStep = document.createElement("div");
	newStep.className = "step";
	newStep.innerHTML = `
        <div class="heading-con">
            <p class="add-heading">ШАГ ${stepCount}</p>
            <div class="border"></div>
        </div>

        <div class="ingredients-container">
            <div class="add-container">

                <div class="add-container__item">
                    <div class="addFile-container">
                        <p class="local-heading">Загрузить фото</p>
                        <!-- Скрытый input -->
                        <input style="display: none" type="file" name="stepImage[]">
                        <!-- Кнопка '+' для вызова файла -->
                        <button type="button" class="plus-icon-btn__steps">+</button>
                        <!-- Галочка -->
                        <span class="upload-success" style="display: none; color: green; font-size: 20px;">✅</span>
                    </div>
                    <div style="margin-bottom: 10px;" class="border"></div>
                    <p>Описание шага</p>
                    <textarea class="recipe-textArea desc" name="stepDescription[]"></textarea>
                </div>
            </div>
        </div>
    `;

	stepContainer.appendChild(newStep);
	counterStep++;

	const newTextArea = newStep.querySelector(".recipe-textArea");

	newTextArea.addEventListener("input", function () {
		this.style.height = "30px";
		this.style.height = Math.min(this.scrollHeight, 200) + "px";
	});

	// Добавляем обработчик change к новому input[type="file"]
	const fileInput = newStep.querySelector('input[type="file"]');
	const successIcon = newStep.querySelector(".upload-success");

	if (fileInput && successIcon) {
		fileInput.addEventListener("change", function () {
			if (fileInput.files.length > 0) {
				successIcon.style.display = "inline";
			} else {
				successIcon.style.display = "none";
			}
		});
	}
}

document.getElementById("addStep").addEventListener("click", addStep);

document.addEventListener("click", function (e) {
	if (e.target && e.target.classList.contains("plus-icon-btn__steps")) {
		const fileInput = e.target.previousElementSibling;
		if (fileInput && fileInput.type === "file") {
			fileInput.click();
		}
	}
});

document.querySelectorAll("#step-container .step").forEach((stepEl) => {
	const fileInput = stepEl.querySelector('input[type="file"]');
	const plusBtn = stepEl.querySelector(".plus-icon-btn__steps");

	const successIcon = document.createElement("span");
	successIcon.className = "upload-success";
	successIcon.textContent = "✅";
	successIcon.style.cssText = `
        display: none;
        color: green;
        font-size: 20px;
        margin-left: 8px;
    `;

	plusBtn.insertAdjacentElement("afterend", successIcon);

	fileInput.addEventListener("change", function () {
		if (fileInput.files.length > 0) {
			successIcon.style.display = "inline";
		} else {
			successIcon.style.display = "none";
		}
	});
});

document.getElementById("removeStep").addEventListener("click", function () {
	const stepContainer = document.getElementById("step-container");
	const steps = stepContainer.querySelectorAll(".step");

	if (steps.length > 3) {
		steps[steps.length - 1].remove();
		counterStep--;

		const remainingSteps = stepContainer.querySelectorAll(".step");
		remainingSteps.forEach((step, index) => {
			const heading = step.querySelector(".add-heading");
			heading.textContent = `ШАГ ${index + 1}`;
		});
	} else {
		alert("Рецепт должен состоять минимум из 3 шагов");
	}
});
