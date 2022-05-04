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
        console.log(currentStep)
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