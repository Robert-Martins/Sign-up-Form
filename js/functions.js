$(document).ready(function(){

    $('.sign-in-container').fadeIn()
    $('.about-company').fadeIn()

    $('#sign-up-btn').click(function(e){
        e.preventDefault()
        $('input[name=email]').val("")
        $('input[name=password]').val("")
        location.href = 'screens/sign-up-screen/index.html'
    })

    //Funções para validação do formulário

    const emailValidation = (email) =>{
        if(email.match(/^[\w-\.]+@([\w-])/) == null){
            return false
        }
    }

    const passwordValidation = (password) =>{
        if(password.length < 8){
            return false
        }
    }

    const signInValidation = () =>{
        email = $('input[name=email]').val()
        password = $('input[name=password]').val()

        if(emailValidation(email) == false){
            $('input[name=email]').addClass('invalid')
        }
        else{
            $('input[name=email').removeClass('invalid')
            if(passwordValidation(password) == false){
                $('input[name=password]').addClass('invalid')
            }
            else{
                $('input[name=password]').removeClass('invalid')
            }
        }
    }

    $('#forgot-password-btn').click(function(e){
        e.preventDefault()
        location.href = 'screens/forgot-password-screen/index.html'
    })

    $('input[type=submit]').click(function(e){
        e.preventDefault()
        signInValidation()
    })


})