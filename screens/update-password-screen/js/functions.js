$(document).ready(function(){

    $('.sign-in-container').fadeIn()
    $('.about-company').fadeIn()

    $('#update-password-btn').click(function(e){
        e.preventDefault()
        if(checkPasswordValidation()){
            $('input[name=password]').val("")
            $('input[name=password-repeat]').val("")
            location.href = '../../index.html'
        }
    })

    //Funções para validação do formulário

    const passwordValidation = (password, repeatedPassword) =>{
        if(password.length < 8 || password != repeatedPassword)
            return false
        return true
    }

    const checkPasswordValidation = () =>{
        var password = $('input[name=password]').val()
        var repeatedPassword = $('input[name=password-repeat]').val()
        if(!passwordValidation(password, repeatedPassword)){
            $('input[name=password]').addClass('invalid')
            $('input[name=password-repeat]').addClass('invalid')
            return false
        }
        $('input[name=password]').removeClass('invalid')
        $('input[name=password-repeat]').removeClass('invalid')
        return true
    }

})