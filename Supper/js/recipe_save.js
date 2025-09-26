document.getElementById("saveBtn").addEventListener("click", function () {
	const formData = new FormData();

	const selectedTags = [];
	document.querySelectorAll(".tag-btn.active").forEach((btn) => {
		selectedTags.push(btn.dataset.tag);
	});

	formData.append("tags", JSON.stringify(selectedTags));

	formData.append("title", document.querySelector("[name=recipeName]").value);
	formData.append(
		"description",
		document.querySelector("[name=recipeDesc]").value
	);
	formData.append("cuisine", document.querySelector("[name=cuisine]").value);

	const coverInput = document.getElementById("coverUpload");
	const coverFile = coverInput.files[0];

	if (coverFile) {
		formData.append("coverImage", coverFile);
	}

	const ingredients = [];
	document
		.querySelectorAll("#ingridients-userList .ingredient-item")
		.forEach((item) => {
			const nameEl = item.querySelector(".ingredient-name");
			const amountEl = item.querySelector(".ingredient-amount");
			const unitEl = item.querySelector(".ingredient-unit");

			if (!nameEl || !amountEl || !unitEl) return;

			const name = nameEl.textContent.trim();
			const amount = amountEl.textContent.trim();
			const unit = unitEl.textContent.trim();

			ingredients.push({ name, amount, unit });
		});

	formData.append("ingredients", JSON.stringify(ingredients));

	document
		.querySelectorAll(".step-container .step")
		.forEach((stepEl, index) => {
			const description = stepEl.querySelector(".desc").value;
			const imageInput = stepEl.querySelector("input[type='file']");
			const imageFile = imageInput?.files[0]; // защита от null

			formData.append(`stepDescription[]`, description);

			if (imageFile) {
				formData.append(`stepImage[]`, imageFile);
			} else {
				formData.append(`stepImage[]`, "");
			}
		});

	fetch("php/recipe_save.php", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.text())
		.then((text) => {
			try {
				const data = JSON.parse(text);
				console.log("Успешно:", data);
			} catch (e) {
				console.error("Не JSON:", text);
			}
		})
		.catch((error) => {
			console.error("Ошибка запроса:", error);
		});
	location.reload();
});

document.querySelectorAll(".tag-btn").forEach((button) => {
	button.addEventListener("click", function () {
		this.classList.toggle("active");
	});
});
