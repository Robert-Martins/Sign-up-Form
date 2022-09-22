$(document).ready(function(){
    
    $('.sign-in-container').fadeIn()
    $('.about-company').fadeIn()

    $('#forgot-password-btn').click(function(e){
        e.preventDefault()
        var email = $('input[name=email]').val()
        $('input[name=email]').val("")
        if(checkEmailValidation(email))
            location.href = '../update-password-screen/index.html'
    })

    //Funções para validação do formulário

    const emailValidation = (email) =>{
        if(email.match(/^[\w-\.]+@([\w-])/) == null)
            return false
        return true
    }

    const checkEmailValidation = (email) =>{
        if(!emailValidation(email)){
            $('input[name=email]').addClass('invalid')
            return false
        }
        $('input[name=email]').removeClass('invalid')
        return true
    }

})