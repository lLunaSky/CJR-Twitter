//Função do Back 


// Password check functions
function inPwRange(pw) {
    return pw.length >= 8 && pw.length <= 250; // checks range
};

function correctLength(pw1, pw2) {
    return inPwRange(pw1) && inPwRange(pw2); // checks range for both pws
};

function validatePw() { // function called when user clicks button-box element in html
    let pw = document.getElementById('pw').value;
    let confirm = document.getElementById('confirm-pw').value;
    let pwErrorCharsText = document.getElementById('erro-chars');
    let pwErrorEqualText = document.getElementById('erro-igual');

    // setting default error message styles
    pwErrorCharsText.style.display = "none";
    pwErrorEqualText.style.display = "none";

    if (!correctLength(pw, confirm)) { 
        pwErrorCharsText.style.display = "inline";
        return false;
    } if (pw !== confirm) {
        pwErrorEqualText.style.display = "inline";
        return false;
    }
    return true;
};

let inputSenha = document.getElementById("pw");
let confirmarSenha = document.getElementById('confirm-pw');
let checkSenha = document.getElementById('check-pw');

checkSenha.addEventListener('change', function() {
    if (checkSenha.checked) {
        inputSenha.type = "text";
        confirmarSenha.type = "text";
    } else {
        inputSenha.type = "password";
        confirmarSenha.type = "password";
    }
});

async function procuraemail (Email){
    const response = await fetch("http://localhost:3000/procuraemail", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),

    })
    return response.json()
}

async function trocarSenha (Email, NovaSenha) {
    const response = await fetch("http://localhost:3000/trocasenha", {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email: Email, novaSenha: NovaSenha})
    })
    return response.json();
}

const formTroca = document.getElementById("troca-form");


formTroca.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = document.getElementById("email")
    let inputSenha = document.getElementById("pw");
    console.log(email.value)
    if (validatePw()) {
        if (await procuraemail(email.value)) {
            await trocarSenha(email.value,inputSenha.value);
            alert("senha atualizada com sucesso");
            window.location.href = 'http://localhost:3000/index.html'
        } else {
            alert("email não cadastrado")
        }
    }
})