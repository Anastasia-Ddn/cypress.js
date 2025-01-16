describe('Автотесты для формы логина и пароля', function () {

    it('Верный логин и верный пароль', function () {
         cy.visit('https://login.qa.studio/'); // зашла на сайт 
         cy.get('#forgotEmailButton').should ('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цыет кнопки восст пароль 
         
         cy.get('#mail').type('german@dolnikov.ru '); // ввела верный логин 
         cy.get('#pass').type('iLoveqastudio1'); // ввела верный пароль 
         cy.get('#loginButton').click(); // Нажала войти 

         cy.get('#messageHeader').contains ('Авторизация прошла успешно'); // проверяю, что после авт. вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст виден пользователю 
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователей    
     })
    it('Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // зашла на сайт 
        cy.get('#forgotEmailButton').should ('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цыет кнопки восст пароль 

        cy.get('#forgotEmailButton').click (); // нажала на кнопку "восстановить пароль"

        cy.get('#mailForgot').type('german@dolnikov.ru '); // ввела почту для восстановления  
        cy.get('#restoreEmailButton').click (); // нажала отправить код 

        cy.get('#messageHeader').contains ('Успешно отправили пароль на e-mail'); // проверяю на совпадение текст 
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден для пользователю 
    })
    it('Верный логин и НЕверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // зашла на сайт 
        cy.get('#mail').type('german@dolnikov.ru '); // ввела верный логин
        cy.get('#pass').type('iLoveqastudio2'); // ввела НЕверный пароль
        cy.get('#loginButton').click(); // Нажала войти

        cy.get('#messageHeader').contains ('Такого логина или пароля нет'); // проверяю, что после авт. вижу текст 
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
    })
    it('Логин без @', function () {
        cy.visit('https://login.qa.studio/'); // зашла на сайт 
        cy.get('#mail').type('germandolnikov.ru'); // ввела логин без @ 
        cy.get('#pass').type('iLoveqastudio1'); // ввела правильный пароль 
        cy.get('#loginButton').click (); // нажала войти 

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю, что после авт. вижу текст 
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю 
    })
    it('Строчные буквы в логине', function () {
        cy.visit('https://login.qa.studio/'); // зашла на сайт 
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // ввела логин 
        cy.get('#pass').type('iLoveqastudio1'); //ввела правильный пароль 
        cy.get('#loginButton').click (); // нажала войти 

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авт. вижу текст 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователю
    })
})

describe('Покупка аватара', function () {            
    it('тест на покупку нового аватара для своего тренера', function () {   
        cy.visit('https://pokemonbattle.ru/'); // вошла на сайт 
         cy.get('input[type="email"]').type('USER_LOGIN');                   // ввела логин
         cy.get('input[type="password"]').type('USER_PASSWORD');                     // ввела пароль
         cy.get('button[type="submit"]').click();                                       // нажимаю кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true });             // Кликаю в шапке на аву тренера
         cy.get('[href="/shop"]').click();                                              // нажимаю кнопку Магазин
         cy.get('.available > button').first().click({ force: true });                  // кликаю Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                                   // ввожу номер карты
         cy.get('.k_input_ccv').type('125');                                           // ввожу CVV карты
         cy.get('.k_input_date').type('1225');                                         // ввожу срок действия карты
         cy.get('.k_input_name').type('NAME');                                         // ввожу имя владельца действия карты
         cy.get('.pay-btn').click();                                                   // нажимаю кнопку Оплатить
         cy.get('#cardnumber').type('56456');                                          // ввожу код подтверждения СМС
         cy.get('.payment__submit-button').click();                                    // нажимаю кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');                   // проверяю наличие и видимость сообщения о успешной покупке
     })
})
