
document.getElementById('sign-btn').addEventListener('click', function(){
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    if(username.value === 'admin' && password.value === 'admin123'){
        window.location.replace('./home.html');
    }


})