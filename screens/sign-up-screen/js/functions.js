$(document).ready(function(){

    //Variáveis do formulário

    var currentStep = 0;
    var concludedStep = 0;

    const signUpInit = () =>{
        $('#form-container #form-step').eq(currentStep).stop().fadeIn()
        $('#bar-nav-container #bar-nav-btn').eq(currentStep).addClass('selected')
    }

    const updateStep = () =>{
        $('#form-container #form-step').eq(currentStep).stop().fadeOut(100)
        $('#bar-nav-container #bar-nav-btn').eq(currentStep).removeClass('selected')
        currentStep += 1
        concludedStep += 1
        $('#form-container #form-step').eq(currentStep).stop().fadeIn(2000)
        $('#bar-nav-container #bar-nav-btn').eq(currentStep).addClass('selected')
    }

    signUpInit()

    //Inserindo máscara em inputs utilizando o jQueryMask plugin

    $('input[name=cep]').mask('00000-000')

    //Integração com via CEP para preenchimento automático de input

    $('#cep').change(function(){
        getAdressData($(this).val())
    })

    const changeAdressData = (data) =>{
        var uf = $('#uf')
        var city = $('#city')

        uf.val(data.uf)
        city.val(data.localidade)
    }

    const getAdressData = (cep) =>{
        const url = `https://viacep.com.br/ws/${cep}/json`

        fetch(url, {
            method: 'GET'
        }).then(response=>{
            return response.json()
        }).then(data=>{
            changeAdressData(data)
        })
    }

    //Função de validação de dados de inputs

    const nameValidation = (name) =>{
        if(name.match(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/) == null){
            return false
        }
    }

    const emailValidation = (email) =>{
        if(email.match(/^[\w-\.]+@([\w-])/) == null){
            return false
        }
    }

    const passwordValidation = (password, passwordConfirm) =>{
        if(password.length < 8){
            return false
        }
        else{
            if(password == passwordConfirm){
                return true
            }
            else{
                console.log('senhas n conferem')
                return false
            }
        }
    }

    const firstStepValidation = () =>{
        var name = $('input[name=name]').val()
        var email = $('input[name=email]').val()

        if(name.length > 0 && email.length > 0){
            if(nameValidation(name) == false){
                $('input[name=name]').addClass('invalid')
            }
            else{
                $('input[name=name]').removeClass('invalid')
                if(emailValidation(email) == false){
                    $('input[name=email]').addClass('invalid')
                }
                else{
                    return true
                }
            }
        }
    }

    const secondStepValidation = () =>{
        var password = $('input[name=password]').val()
        var passwordConfirm = $('input[name=password-confirm]').val()

        if(password.length > 0 && passwordConfirm.length > 0){
            if(passwordValidation(password, passwordConfirm) == false){
                $('input#password').addClass('invalid')
                $('input#password-confirm').addClass('invalid')
            }
            else{
                $('input#password').removeClass('invalid')
                $('input#password-confirm').removeClass('invalid')
                return true
            }
        }
    }

    //Função para checagem de força de senha inserida

    const checkPasswordStrength = (val) =>{
        var passwordStrength = $('h6.password-strength')
        var message = $('h5.password-strength-message')
        var meter = $('div.strength-meter')
        if(val.length < 7){
            passwordStrength.html(`Senha inválida`)
            message.html(`A senha deve possuir no mínimo 8 caracteres`)
        }
        else if(val.length > 8){
            if(!val.match(/\d/)){
                passwordStrength.html(`Senha fraca`)
                passwordStrength.css('color', 'red')
                message.html(`A senha deve conter números`)
                meter.animate({"width": "40%", "background-color": "red"})
            }
            else if(!val.match(/([a-z])/) && val.match(/\d/)){
                passwordStrength.html(`Senha média`)
                passwordStrength.css('color', 'orange')
                message.html(`A senha deve conter letras minúsculas e maiúsculas`)
                meter.animate({"width": "75%", "background-color": "orange"})
            }
            else if(val.match(/([a-zA-Z])/) && val.match(/\d/)){
                passwordStrength.html(`Senha forte`)
                passwordStrength.css('color', 'green')
                message.html(``)
                meter.animate({"width": "100%", "background-color": "green"})
            }
        }
        
    }

    $('input[name=password]').change(function(){
        console.log($(this).val().length)
        checkPasswordStrength($(this).val())
    })

    const signUpConfirm = () =>{
        closeModal()
        //window.location.replace("signUpComplete.html")
    }

    $('button#first-step-submit').click(function(e){
        e.preventDefault()
        if(firstStepValidation() == true){
            updateStep()
        }
    })

    $('button#second-step-submit').click(function(e){
        e.preventDefault()
        if(secondStepValidation() == true)
        {
            updateStep()
        }
    })

    $('button#third-step-submit').click(function(e){
        e.preventDefault()
        updateStep()
    })

    $('input#signup-submit').click(function(e){
        e.preventDefault()
        openModal()
    })

    $('#modal-container #no-submit').click(function(){
        closeModal()
    })

    $('#modal-container #submit').click(function(){
        signUpConfirm()
    })

    //Funções de navegação entre steps

    const stepNavigation = (index) =>{
        if(index != currentStep && index <= concludedStep){
            $('#form-container #form-step').eq(currentStep).stop().fadeOut(100)
            $('#bar-nav-container #bar-nav-btn').eq(currentStep).removeClass('selected')
            currentStep = index
            $('#form-container #form-step').eq(currentStep).stop().fadeIn(2000)
            $('#bar-nav-container #bar-nav-btn').eq(currentStep).addClass('selected')
        }
    }

    $('#steps-indicator #step-indicator-btn').click(function(){
        var index = $(this).index()
        stepNavigation(index)
    })

    $('#bar-nav-container #bar-nav-btn').click(function(){
        var index = $(this).index()
        stepNavigation(index)
    })

    //Funções referentes à modal de confirmação de cadastro

    //Inserindo a modal de cadastro dinamicamente

    $('body').append(`
    <!--Modal de confirmação de cadastro-->
    <div class="modal-container" id="modal-container">
        <div class="modal">
            <div class="modal-header">
                <h2>
                    Deseja concluir seu cadastro?
                </h2>
                <h4>
                    Ao pressionar 'Sim' os seus dados serão registrados e 
                    só poderão ser editados no seu perfil em nossa plataforma.
                </h4>
            </div><!--modal-header-->
            <div class="modal-body">
                <h5>
                    Deseja continuar?
                </h5>
                <button class="step-submit" id="not-submit">
                    Ainda não
                </button>
                <button class="step-submit" id="submit">
                    Continuar
                </button> 
            </div><!--modal-body-->
        </div><!--modal-->
    </div><!--modal-container-->
    `)

    const openModal = () =>{
        $('#modal-container').fadeIn()
    }

    const closeModal = () =>{
        $('#modal-container').fadeOut()
    }

    $('#modal-container').on('click',function(e){
        if(!(($(e.target).closest("#modal").length > 0))){
            closeModal()
        }
    })

})