$(document).ready(function(){

    //Variáveis do formulário

    var currentStep = 0;

    const signUpInit = () =>{
        $('#form-step').eq(currentStep).fadeIn()
        $('#bar-nav-btn').eq(currentStep).addClass('selected')
    }

    signUpInit()

    //Função de validação de dados de inputs

    const nameValidation = (name) =>{
        /*
        
        if(){
            return true
        }
        else{
            return false
        }
        
        */
    }

    const emailValidation = (email) =>{
        
    }

    const passwordValidation = (password, passwordConfirm) =>{
        
    }

    //Funções referentes à modal de confirmação de cadastro

    const openModal = () =>{

    }

    const closeModal = () =>{

    }

    const confirmSignUp = () =>{

    }

})