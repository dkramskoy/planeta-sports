
let form = new FormValidation({
    idForm: '#registrationform',
})

function FormValidation(settings) {

    let idForm = document.querySelector(settings.idForm);

    let inputs = idForm.querySelectorAll('input[type=text]');

    this.errors = [];

    this.rulesPattern = [];

    for(let input of inputs) {
        input.addEventListener('input', ()=>{
            for(let input of inputs) {
                input.nextElementSibling.innerHTML = '';
                input.nextElementSibling.classList.remove('error');
            }
            this.checkValidity(input);
        })
        input.addEventListener('invalid', (event)=>{
            console.log(1)
            event.preventDefault();
            if(event.target.value.length === 0) {
                event.target.nextElementSibling.classList.add('error');
                event.target.nextElementSibling.innerHTML = '<li>Это поле обязательно для заполнения.</li>';
                /* --- left only one error message --- */
                let divs = idForm.querySelectorAll('.message.error');
                if(divs.length !== 0) {
                    for(let i = 1; i < divs.length; i++) {
                        divs[i].classList.remove('error');
                        divs[i].innerHTML = '';
                    }
                }
                return;
            }
        })
    };

    idForm.addEventListener('submit', (event) => {
        console.log(2)
        event.preventDefault();

        for(let input of inputs) {

            this.checkValidity(input);

            if( this.errors.length !== 0 ) {
                input.nextElementSibling.innerHTML = this.errors.join(' ');
                input.nextElementSibling.classList.add('error');
                return;
            }
        }

        let div = document.createElement('div');
        event.currentTarget.style.display = 'none';
        event.currentTarget.parentNode.appendChild(div);
        event.currentTarget.parentNode.classList.add('dataSent');

        let dataToSend = new FormData(event.currentTarget); 
        fetch('action.php', {
            method: 'POST',
            headers: {  
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
              }, 
            body: dataToSend,
            mode: 'same-origin'
        })
        .then(function(response) {
            if(response.status === 200) {
                div.innerHTML = 'Ваша заявка принята. В ближайшее время мы вышлем вам письмо с необходимой информацией на почту.';
                return;
            }
            else {
                div.innerHTML = 'Заявка не была отправлена. Попробуйте отправить заново, либо свяжитесь с администратором.';
                console.log(response.status);
            }
        })
        .catch(function(response) {
            div.innerHTML = 'Произошел сбой сети.';
            console.log(response.status);
            return;
        })
    });

    this.checkValidity = function(input) {
        
        this.rulesPattern = [];

        this.errors = [];

        if(input.id === 'userName') {
            this.rulesPattern = this.nameValidationMethods;
        }
        else if(input.id === 'userEmail') {
            this.rulesPattern = this.emailValidationMethods;
        }
        else if(input.id === 'userPhone') {
            this.rulesPattern = this.phoneValidationMethods;
        }
        else return;

        for(let i = 0; i < this.rulesPattern.length; i++) {
            if( this.rulesPattern[i].isValid(input) ) {
                continue;
            }
            else {
                this.showError(input);
                this.errors.push( this.rulesPattern[i].message );
            }
        }
        if(this.errors.length === 0) {
            this.showSuccess(input);
            input.nextElementSibling.innerText = '';
        }
    };

    this.showError = function(el) {
        el.parentNode.classList.add('error');
        el.parentNode.classList.remove('success');
    };

    this.showSuccess = function(el) {
        el.parentNode.classList.remove('error');
        el.parentNode.classList.add('success');
    };
    
    this.nameValidationMethods = [
        {
            isValid: function(input) {
                let inputElem = input.value.trim()
                return inputElem.length > 2;
            },
            message: '<li>Укажите не менее трех букв.</li>'
        },
        {
            isValid: function(input) {
                let regExp = /^[A-ZА-Я]\w{0,}$/;
                return regExp.test(input.value);
            },
            message: '<li>Укажите в начале имени заглавную букву.</li>'
        },
        {
            isValid: function(input) {
                let regExp = /[^а-яa-z]/i;
                return !regExp.test(input.value)
            },
            message: '<li>Имя должно состоять только из букв.</li>'
        }
    ];
    this.emailValidationMethods = [
        {
            isValid: function(input) {
                let regExp = /^\w[\w|\d]{1,}@\w{1,}\.com|ua|ru$/;
                return input.value.match(regExp)
            },
            message: '<li>Укажите правильный адрес электронной почты.</li>'
        }
    ];  
    this.phoneValidationMethods = [
        {
            isValid: function(input) {
                let regExp = /^0\d{9}|80\d{9}|380\d{9}$/;
                return input.value.match(regExp)
            },
            message: '<li>Укажите правильный мобильный номер.</li>'
        },
        {
            isValid: function(input) {
                let regExp = /[^\d]/;
                return !regExp.test(input.value);
            },
            message: '<li>Мобильный номер должен состоять только из цифр.</li>'
        }
    ]

}

/* ------  effects ---- */

window.addEventListener('scroll', (event)=>{
    /* ---- hide button -----*/
    subscribeButton.hidden = (window.innerHeight - 100 > subscribeForm.getBoundingClientRect().top);
});
subscribeButton.addEventListener('click', (event)=>{
    window.scrollTo({
        top: subscribeForm.getBoundingClientRect().top + pageYOffset,
        behavior: "smooth"
    });
});
closeForm.addEventListener('click', () => {
    document.body.style.overflow = "";
    subscribeWindow.style.transform = 'scale(0) translateY(-1000px) translateX(-1000px)';
    setTimeout(()=>{
        subscribeWindow.classList.add('hidden');
    }, 500)
    
});
openForm.addEventListener('click', () => {
    document.body.style.overflow = "hidden";
    subscribeWindow.classList.remove('hidden');
    setTimeout(()=>{
        subscribeWindow.style.transform = 'scale(1) translateY(0px) translateX(0px)';
    }, 250)
    
});
