<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supper</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/addrecipe.css">
    <link rel="stylesheet" href="css/recipe.css">
</head>

<body>
    <div class="wrapper">
        <div class="header">
            <div class="container">
                <div class="header-inner">
                    <a id="logoImg" href="#">
                        <img src="pics/logo2.png" alt="">
                    </a>
                    <button id="sendRecipe" class="btn-send">
                        Отправить рецепт
                    </button>
                    <input id="recipe-search" type="text" class="recipe-serach">
                    <div id="userContainer"></div>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="container">
                <div class="main-inner">
                    <div class="menu">
                        <a id="main" class="menu-link" href="#">Главная</a>
                        <a id="zozh" class="menu-link" href="#">ЗОЖ</a>
                        <a id="vegan" class="menu-link" href="#">Веган</a>
                        <a id="drinks" class="menu-link" href="#">Напитки</a>
                        <div class="border">

                        </div>
                    </div>
                    <div class="recipes" id="recipe-list"></div>
                    <div class="addRecipe" id="recipe-list2">
                        <div class="mainImage">
                            <div class="addFile-container">
                                <p>Загрузите обложку рецепта</p>
                                <input id="coverUpload" style="display: none" type="file">
                                <button id="plus-btn" class="plus-icon-btn">+</button>
                                <span id="cover-success" style="display: none; color: green; font-size: 20px;">✅</span>
                            </div>
                            <div class="border"></div>
                        </div>




                        <div class="add-container">
                            <div class="add-container__item">
                                <p>Название рецепта</p>
                                <input class="recipe-input" type="text" name="recipeName">
                            </div>
                            <div class="add-container__item">
                                <p>Описание</p>
                                <textarea class="recipe-textArea desc" name="recipeDesc"></textarea>
                            </div>
                            <div style="padding-bottom: 20px;" class="add-container__item">
                                <p>Национальная кухня</p>
                                <input name="cuisine" class="recipe-input" type="text">
                            </div>
                        </div>
                        <div class="heading-con">
                            <p class="add-heading">ТЕГИ</p>
                            <div class="border"></div>
                        </div>

                        <div class="custom-selector">
                            <button type="button" class="tag-btn" data-tag="ЗОЖ">ЗОЖ</button>
                            <button type="button" class="tag-btn" data-tag="Веган">Веган</button>
                            <button type="button" class="tag-btn" data-tag="Напиток">Напиток</button>
                        </div>
                        <div class="heading-con">
                            <p class="add-heading">ИНГРЕДИЕНТЫ</p>
                            <div class="border"></div>
                        </div>
                        <div style="margin-bottom: 10px;" class="add-container">
                            <div class="add-container__item">
                                <p>Название ингредиента</p>
                                <input id="ingNameInput" class="recipe-input" type="text" name="recipeDesc">
                            </div>

                            <div class="ing-inner">
                                <div class="add-container__item ingredients">
                                    <p>Кол-во</p>
                                    <div class="custom-number-input">
                                        <button type="button" class="spin-btn decrease"> ← </button>
                                        <input id="amount-input" style="width:70px" class="recipe-input amount-input" type="number" name="recipeDesc" value="1" min="1">

                                        <button type="button" class="spin-btn increase"> → </button>
                                    </div>
                                </div>
                                <div style="padding-bottom: 20px;" class="add-container__item ingredients ">
                                    <p>Ед. измерения</p>
                                    <input id="unit-input" style="width:70px" class="recipe-input" type="text" name="recipeDesc">
                                </div>
                            </div>

                        </div>
                        <button id="add-ingredient" style="cursor: pointer; margin-left: 10px; margin-bottom: 40px;" class="btn-send">Добавить</button>

                        <div id="ingridients-userList" class="ingridients-list">

                        </div>

                        <div id="step-container" class="step-container">
                            <div class="step">
                                <div class="heading-con">
                                    <p class="add-heading">ШАГ 1</p>
                                    <div class="border"></div>
                                </div>

                                <div class="ingredients-container">
                                    <div class="add-container">

                                        <div class="add-container__item">
                                            <div class="addFile-container">
                                                <p class="local-heading">Загрузить фото</p>
                                                <input style="display: none" type="file">
                                                <button style="cursor: pointer;" class="plus-icon-btn__steps">+</button>
                                            </div>
                                            <div style="margin-bottom: 10px;" class="border"></div>
                                            <p>Описание шага</p>
                                            <textarea class="recipe-textArea desc" name="stepDescription[]"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="step">
                                <div class="heading-con">
                                    <p class="add-heading">ШАГ 2</p>
                                    <div class="border"></div>
                                </div>

                                <div class="ingredients-container">
                                    <div class="add-container">

                                        <div class="add-container__item">
                                            <div class="addFile-container">
                                                <p class="local-heading">Загрузить фото</p>
                                                <input style="display: none" type="file">
                                                <button style="cursor: pointer;" class="plus-icon-btn__steps">+</button>
                                            </div>
                                            <div style="margin-bottom: 10px;" class="border"></div>
                                            <p>Описание шага</p>
                                            <textarea class="recipe-textArea desc" name="stepDescription[]"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="step">
                                <div class="heading-con">
                                    <p class="add-heading">ШАГ 3</p>
                                    <div class="border"></div>
                                </div>

                                <div class="ingredients-container">
                                    <div class="add-container">

                                        <div class="add-container__item">
                                            <div class="addFile-container">
                                                <p class="local-heading">Загрузить фото</p>
                                                <input style="display: none" type="file">
                                                <button style="cursor: pointer;" class="plus-icon-btn__steps">+</button>
                                            </div>
                                            <div style="margin-bottom: 10px;" class="border"></div>
                                            <p>Описание шага</p>
                                            <textarea class="recipe-textArea desc" name="stepDescription[]"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="recipeadd-bnts">
                            <button id="addStep" style="cursor: pointer; margin-bottom: 20px;" class="btn-send">Добавить шаг</button>
                            <button id="removeStep" style="cursor: pointer; margin-bottom: 20px;" class="btn-send">Убрать шаг</button>

                        </div>
                        <div class="border line"></div>

                        <div class="save-button-container">
                            <button id="saveBtn" style="cursor: pointer;" class="btn-send save">Сохранить</button>
                        </div>

                    </div>
                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <div class="inputs">
                                <form id="loginForm" class="inputs-inner formLog">
                                    <span id="closeForm" class="close">&times;</span>
                                    <h2>Войти в аккаунт</h2>
                                    <p>Email</p>
                                    <input id="email" name="emailLog" type="email">
                                    <p>Логин</p>
                                    <input id="username" name="usernameLog" type="text">
                                    <p>Пароль</p>
                                    <input id="password" name="passwordLog" type="password">
                                    <div id="captchaBox" style="display:none;">
                                        <div class="g-recaptcha" data-sitekey="6LcPD0QrAAAAABzq-raomtULdiTZsiddPY-Uys-2"></div>
                                    </div>
                                    <p id="errorMessageLog" name="errormessage" class="error-message"></p>

                                    <div class="modal-buttons">
                                        <button type="submit" id="modalSinginBtn">Войти</button>
                                        <a id="modalLinkLog">У меня нет аккаунта</a>
                                    </div>
                                </form>

                                <form id="registrationForm" class="inputs-inner formReg">
                                    <span id="closeForm" class="close">&times;</span>
                                    <h2>Регистрация</h2>
                                    <p>Email</p>
                                    <input id="emailReg" name="emailReg" type="text">
                                    <p>Логин</p>
                                    <input id="usernameReg" name="usernameReg" type="text">
                                    <p>Пароль</p>
                                    <input id="passwordReg" name="passwordReg" type="password">
                                    <p>Повторите пароль</p>
                                    <input id="passwordConfirmReg" name="passwordConfirmReg" type="password">
                                    <p id="errorMessageReg" class="error-message"></p>

                                    <div class="modal-buttons">
                                        <button type="submit" id="modalRegBtn">Создать аккаунт</button>
                                        <a id="modalLinkReg">У меня уже есть аккаунта</a>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>



        <script src="js/recipes.js"></script>
        <script src="js/recipesfunc.js"></script>
        <script src="js/registration.js"></script>
        <script src="js/addrecipe.js"></script>
        <script src="js/recipe_save.js"></script>
</body>

</html>