const container = document.getElementById("recipe-list");
const addForm = document.getElementById('recipe-list2');


function renderRecipes() {
    fetch("php/get_recipes.php")
        .then(res => res.json())
        .then(recipes => {
            container.innerHTML = "";
            addForm.style.display = "none";

            recipes.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                    <img src="${recipe.image || 'pics/placeholder.jpg'}" alt="${recipe.title}" width="200">
                    <div class="card-textblock">
                        <div class="titles">
                            <h3>${recipe.title}</h3>
                            <h4 class="subtitle">${recipe.subtitle}</h4>
                              <!-- Блок с тегами -->
                        ${recipe.tags && recipe.tags.length > 0
                        ? `<div class="recipe-tags">${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
                        : ''
                    }
                        </div>

                       
                        <p class="recipe-desc">${recipe.description}</p>

                       
                    </div>
                `;
                card.addEventListener("click", () => showRecipe(recipe.id));
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Ошибка загрузки рецептов:", err);
        });
}

// Поиск по названию рецепта
document.getElementById('recipe-search').addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();

    // Получаем все рецепты снова (можно кэшировать, если часто используется)
    fetch("php/get_recipes.php")
        .then(res => res.json())
        .then(recipes => {
            // Фильтруем рецепты по совпадению в названии
            const filteredRecipes = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm)
            );

            // Очищаем контейнер
            container.innerHTML = "";

            // Рендерим только найденные рецепты
            filteredRecipes.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                    <img src="${recipe.image || 'pics/placeholder.jpg'}" alt="${recipe.title}" width="200">
                    <div class="card-textblock">
                        <div class="titles">
                            <h3>${recipe.title}</h3>
                            <h4 class="subtitle">${recipe.subtitle}</h4>
                        </div>

                        <!-- Блок с тегами -->
                        ${recipe.tags && recipe.tags.length > 0
                        ? `<div class="recipe-tags">${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
                        : ''
                    }

                        <p class="recipe-desc">${recipe.description}</p>
                    </div>
                `;
                card.addEventListener("click", () => showRecipe(recipe.id));
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Ошибка при поиске:", err);
        });
});

function filterByTag(tag) {
    fetch("php/get_recipes.php")
        .then(res => res.json())
        .then(recipes => {
            const filtered = recipes.filter(recipe =>
                recipe.tags && Array.isArray(recipe.tags) && recipe.tags.includes(tag)
            );

            container.innerHTML = "";
            addForm.style.display = "none";

            filtered.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                    <img src="${recipe.image || 'pics/placeholder.jpg'}" alt="${recipe.title}" width="200">
                    <div class="card-textblock">
                        <div class="titles">
                            <h3>${recipe.title}</h3>
                            <h4 class="subtitle">${recipe.subtitle}</h4>
                        </div>

                        <!-- Блок с тегами -->
                        ${recipe.tags && recipe.tags.length > 0
                        ? `<div class="recipe-tags">${recipe.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
                        : ''
                    }

                        <p class="recipe-desc">${recipe.description}</p>
                    </div>
                `;
                card.addEventListener("click", () => showRecipe(recipe.id));
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Ошибка при фильтрации:", err);
        });
}

// Обработчики кликов по меню фильтрации
document.getElementById('zozh').addEventListener('click', function (e) {
    e.preventDefault(); // отменяем переход по ссылке
    filterByTag('ЗОЖ');
});

document.getElementById('vegan').addEventListener('click', function (e) {
    e.preventDefault();
    filterByTag('Веган');
});

document.getElementById('drinks').addEventListener('click', function (e) {
    e.preventDefault();
    filterByTag('Напиток');
});

function formatAmount(amount) {
    const num = parseFloat(amount);
    return num.toString();
}

function showRecipe(id) {
    fetch(`php/get_recipe.php?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Ошибка загрузки');
            return res.json();
        })
        .then(recipe => {

            let ingredientsHTML = recipe.products.map(item => {
                // Предположим, item выглядит как "Сахар — 2.0 г"
                const [namePart, amountUnit] = item.split(' — ');
                const [amountStr, ...unitParts] = amountUnit.split(' ');
                const amount = parseFloat(amountStr);

                const formattedAmount = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(1);
                const unit = unitParts.join(' ');

                return `<p>${namePart} — ${formattedAmount} ${unit}</p>`;
            }).join("");


            let stepsHTML = recipe.steps.map((step, index) => {
                const imagePath = step.image ? step.image : 'pics/placeholder.jpg';
                return `
                    <div class="step-item">
                        <div class="steps-num"><p class="step-number">Шаг ${index + 1}:</p></div>
                        <img class="step-img" src="${imagePath}" alt="Шаг ${index + 1}">
                        <p class="recipe-descc">${step.description}</p>
                        <div class="border line"></div>
                    </div>
                `;
            }).join("");

            

            // Рендеринг
            container.innerHTML = `
                <div class="recipes-inner">
                    <div class="recipesShow">
                        <p class="recipe-name">${recipe.title}</p>
                        

                        <div class="border pbborder"></div>
                        
                        <img class="recipe-img" src="${recipe.image || 'pics/placeholder.jpg'}" >
                        
                        <p class="recipe-subtitle">Наиональная кухня: ${recipe.subtitle}</p>

                        <!-- Блок с тегами -->

                        

                        
                        <p class="recipe-descc">${recipe.description}</p>

                        <p class="recipe-name">Ингредиенты:</p>
                        <div class="border pbborder"></div>
                        <div class="add-container">
                            <div class="add-container-inner">
                                <p>${ingredientsHTML}</p>
                            </div>
                        </div>

                        <p class="recipe-name">Инструкция:</p>
                        <div class="border pbborder"></div>
                        <div class="steps-container">${stepsHTML}</div>
                    </div>
                </div>`;
        })
        .catch(err => {
            console.error("Ошибка загрузки рецепта:", err);
            container.innerHTML = `<p>Ошибка загрузки данных. Попробуйте позже.</p>`;
        });
}

document.getElementById('logoImg').addEventListener('click', renderRecipes);

document.addEventListener("DOMContentLoaded", function () {
    if (container) {
        renderRecipes();
    }
});

document.getElementById('main').addEventListener('click', renderRecipes);



document.getElementById('sendRecipe').addEventListener('click', function () {
    container.innerHTML = ``;
    addForm.style.display = 'block';
})