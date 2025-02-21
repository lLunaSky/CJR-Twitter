async function procuraemail (Email){
    const response = await fetch("http://localhost:3000/procuraemail", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),

    })
    return response.json()
}

async function procuraimagem (Email){
    const response = await fetch("http://localhost:3000/imagem", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),

    })
    return response.json()
}

async function entrar (Email,Senha){
    const response = await fetch("http://localhost:3000/entrar", {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email: Email, senha: Senha})
    })
    return response.json()
}

async function cadastrar (Email,Senha,Nome,Genero,Cargo,Nucleo,Imagem){
    const response = await fetch("http://localhost:3000/cadastro", {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(
            {
                email: Email, 
                senha: Senha, 
                nome: Nome, 
                genero: Genero,
                cargo: Cargo,
                nucleo: Nucleo,
                imagem: Imagem
            }
        )
    })
    return response.json()
}

var time = new Date()
//importa os inputs por id
var emini = document.getElementById('emini')
var pasini = document.getElementById('pasini')
var nomeini = document.getElementById('nomeini')
var Idgenero = document.getElementById('Idgenero')
var cargoini = document.getElementById('cargoini')
var nucleoini = document.getElementById('nucleoini')
var imagini = document.getElementById('image')
//importa campo de registro por id
var regis = document.getElementById('regini')
//importa os textos por id
var emerro = document.getElementById('emerro')
var emerro2 = document.getElementById('emerro2')
var senerro = document.getElementById('senerro')
var nomerro = document.getElementById('nomerro')
var generro = document.getElementById('generro')
var carerro = document.getElementById('carerro')
var esqueci = document.getElementById('esqueci')
var esqueci2 = document.getElementById('esqueci2')
var imgerro = document.getElementById('imgerro')
//importa os botões por id
var abrirform = document.getElementById('abrirform')
var enviarform = document.getElementById('enviarform')
//importa os imagens por id
var carta = document.getElementById('cartaid')
var cadeado = document.getElementById('cadeadoid')
var busto = document.getElementById('bustoid')
var martelo = document.getElementById('marteloid')
//imgaem
var loginimg = document.getElementById('loginimg')
var imgini = document.getElementById('imgini')
//variaveis nescessarias
var botao = 'entrar'
//cores
var formulario = '#fff'
var corclara=  '#71D5E4'
var cormedia = '#00B6BC'
var corescura = '#29A0B1'
var corbordas = '#ccc'
var corerro = '#a00'
var corcerto = '#0a0'

console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())

//Visibilidade da senha

var SenhaCheckbox = document.getElementById('checkSen')

SenhaCheckbox.addEventListener('change', function() {
    if (SenhaCheckbox.checked) {
        pasini.type = 'text'
    } else {
        pasini.type = 'password'
    }
})

emini.addEventListener('input', function() {
    this.value = this.value.toLowerCase();
});

//Muda a outline do formulario quando esta no foco
emini.addEventListener('focus', () => {
    emini.style.borderColor = cormedia
    carta.style.borderColor = cormedia
})
pasini.addEventListener('focus', () => {
    pasini.style.borderColor = cormedia
    cadeado.style.borderColor = cormedia
})
nomeini.addEventListener('focus', () => {
    nomeini.style.borderColor = cormedia
    busto.style.borderColor = cormedia
})
Idgenero.addEventListener('focus', () => {
    Idgenero.style.borderColor = cormedia
})
cargoini.addEventListener('focus', () => {
    cargoini.style.borderColor = cormedia
    martelo.style.borderColor = cormedia
})
nucleoini.addEventListener('focus', () => {
    nucleoini.style.borderColor = cormedia
    martelo.style.borderColor = cormedia
})

//retorna a outline do formulario quando sai do foco
emini.addEventListener('blur', async () => {
    if (emini.value == "") { // volta os botões para como estavam no inicio
        emini.style.borderColor = corbordas // todos os styles estão comentados no staly.css
        carta.style.borderColor = corbordas
        emerro.style.display = 'none'
        botao = 'entrar'
        abrirform.style.width = '15%'
        abrirform.style.cursor = 'default'
        abrirform.style.background = corescura
        enviarform.style.width = '84%'
        enviarform.style.cursor = 'pointer'
        enviarform.style.background = cormedia
        emerro2.style.display = 'none'
        loginimg.src = 'images/login.svg'
        loginimg.style.display = 'block'
        imgini.style.display = 'none'
        return
    } else if (!EmailValido(emini.value)) { // valida o email para mudar a cor da caixa
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro.style.display = 'block'
        emerro2.style.display = 'none'
        loginimg.src = 'images/login.svg'
        loginimg.style.display = 'block'
        imgini.style.display = 'none'
        return
    } else {
        if(!await procuraemail(emini.value)){
            botao = 'registrar'                    // para verificar se o email ja esta cadastrado
            abrirform.style.width = '84%'          // caso não esteja ele muda a cor da caixa e os botões
            abrirform.style.cursor = 'pointer'
            abrirform.style.background = cormedia
            enviarform.style.width = '15%'
            enviarform.style.cursor = 'default'
            enviarform.style.background = corescura
            emini.style.borderColor = corcerto
            carta.style.borderColor = corcerto
            emerro.style.display = 'none'
            emerro2.style.display = 'none'
            loginimg.style.display = 'none'
            imgini.style.display = 'block'
        }
        else { //caso esteja ele deixa as cores padroes e o botão de entrar
            botao = 'entrar'
            abrirform.style.width = '15%'
            abrirform.style.cursor = 'default'
            abrirform.style.background = corescura
            enviarform.style.width = '84%'
            enviarform.style.cursor = 'pointer'
            enviarform.style.background = cormedia
            emini.style.borderColor = corbordas
            carta.style.borderColor = corbordas
            emerro.style.display = 'none'
            emerro2.style.display = 'none'
            let imagem = await procuraimagem(emini.value);
            if (imagem) { // existe imagem cadastrada pelo user
                loginimg.src = imagem
                loginimg.style.display = 'block'
                imgini.style.display = 'none'
            }   
        }
        return
    }
})

pasini.addEventListener('blur', () => { //blur da senha #vai ser alterado
    if (pasini.value == "") {
        pasini.style.borderColor = corbordas
        cadeado.style.borderColor = corbordas
        senerro.style.display = 'none'
        esqueci.style.display = 'none'
        return
    } else if (!tmvalido(pasini.value, 8, 250)) { // verifica se a senha é invalida para emitir um aviso 
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        senerro.style.display = 'block'
        esqueci.style.display = 'none'
        return
    } else if (tmvalido(pasini.value, 8, 250) && (botao === 'registrar' || botao == 'registrando')) {
        pasini.style.borderColor = corcerto
        cadeado.style.borderColor = corcerto
        senerro.style.display = 'none'
        esqueci.style.display = 'none'
        return
    } else {
        pasini.style.borderColor = corbordas
        cadeado.style.borderColor = corbordas
        senerro.style.display = 'none'
        esqueci.style.display = 'none'
    }
})

nomeini.addEventListener('blur', () => {
    if (nomeini.value == '') {
        nomeini.style.borderColor = corbordas
        busto.style.borderColor = corbordas
        nomerro.style.display = 'none'
        return
    } else if (!tmvalido(nomeini.value, 2, 50)) {
        nomeini.style.borderColor = corerro
        busto.style.borderColor = corerro
        nomerro.style.display = 'block'
        return
    } else {
        nomeini.style.borderColor = corcerto
        busto.style.borderColor = corcerto
        nomerro.style.display = 'none'
        return
    }
})

Idgenero.addEventListener('blur', () => {
    if (Idgenero.value == '') {
        Idgenero.style.borderColor = corerro
        generro.style.display = 'block'
        return
    } else {
        Idgenero.style.borderColor = corcerto
        generro.style.display = 'none'
        return
    }
})

cargoini.addEventListener('blur', () => {
    if (cargoini.value == '') {
        cargoini.style.borderColor = corerro
        martelo.style.borderColor = corerro
        carerro.style.display = 'block'
        return
    } else {
        cargoini.style.borderColor = corcerto
        martelo.style.borderColor = corcerto
        carerro.style.display = 'none'
        return
    }
})

nucleoini.addEventListener('blur', () => {
    if (nucleoini.value == '') {
        nucleoini.style.borderColor = corerro
        martelo.style.borderColor = corerro
        carerro.style.display = 'block'
        return
    } else {
        nucleoini.style.borderColor = corcerto
        martelo.style.borderColor = corcerto
        carerro.style.display = 'none'
        return
    }
})

const formlogin = document.getElementById('logini');

abrirform.addEventListener('click', async () => {
    if(await procuraemail(emini.value)){ // existe o email no bd
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro2.style.display = 'block'
    } else if (botao == 'entrar') { // quando campos estao vazios e o user clica em entrar
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro.style.display = 'block'
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        senerro.style.display = 'block'
    } else {
        if (botao == 'registrar') {
            regis.style.display = 'block'
            botao = 'registrando'
        } else {
            cont = true
            if (!tmvalido(pasini.value, 8, 250)) { // verifica se a senha é invalida para emitir um aviso 
                pasini.style.borderColor = corerro
                cadeado.style.borderColor = corerro
                senerro.style.display = 'block'
                cont = false
            }
            if (!EmailValido(emini.value)) {
                emini.style.borderColor = corerro
                carta.style.borderColor = corerro
                emerro.style.display = 'block'
                cont = false
            }
            if (!tmvalido(nomeini.value, 2, 50)) {
                nomeini.style.borderColor = corerro
                busto.style.borderColor = corerro
                nomerro.style.display = 'block'
                cont = false
            }
            if (Idgenero.value == '') {
                Idgenero.style.borderColor = corerro
                generro.style.display = 'block'
                cont = false
            }
            if (cargoini.value == '') {
                cargoini.style.borderColor = corerro
                martelo.style.borderColor = corerro
                carerro.style.display = 'block'
                cont = false
            }
            if (nucleoini.value == '') {
                nucleoini.style.borderColor = corerro
                martelo.style.borderColor = corerro
                carerro.style.display = 'block'
                cont = false
            }
            if (cont) {
                let novoUsuario = await cadastrar(emini.value, pasini.value, nomeini.value, Idgenero.value, cargoini.value, nucleoini.value, imagini.src)
                console.log(novoUsuario)
                alert("registrado com sucesso")
                const RespostaEntrar = await entrar(emini.value,pasini.value) //Faz o processo de entrar para o novo usuario
                localStorage.setItem('accessToken', RespostaEntrar.token); //Armazena o token
                window.location.href = 'http://localhost:3000/feed.html'
            } else {
                alert("Verifique o formulario")
            }
        }
    }
})

//Envia alerta de erro no fomulario
formlogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (botao == 'registrar' || botao == 'registrando'){ //ver se ta na tela de registro e invalida o botão submit
        return
    }
    if (!EmailValido(emini.value) || emini.value == "") { // verifica se o email é invalido ou esta vazio para emitir um aviso 
        alert("Verifique o formulario")
        emini.style.borderColor = corerro
        carta.style.borderColor = corerro
        emerro.style.display = 'block'
        return
    }
    //verificar a senha, se a senha tá certa ou não 
    const RespostaEntrar = await entrar(emini.value,pasini.value)
    if (!tmvalido(pasini.value, 8, 250)) { // verifica se a senha é invalida para emitir um aviso
        alert("Verifique o formulario")
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        senerro.style.display = 'block'
        return
    } else if (RespostaEntrar.message == "Senha incorreta") { //se a senha estiver errada, aparece no front imagens de erro 
        pasini.style.borderColor = corerro
        cadeado.style.borderColor = corerro
        esqueci.style.display = 'block'
        esqueci2.style.display = 'block'
        return
    } else { 
        localStorage.setItem('accessToken', RespostaEntrar.token); //Armazena o token no local strorage
        window.location.href = 'http://localhost:3000/feed.html' //Redireciona para a pagina feed
    }
})

//Valida o email
function EmailValido(email) {
    const rejeitar = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/ //formata o email
    )
    if(rejeitar.test(email)) { // testa o emais de acordo com a formatação
        if(email.length <= 250) {
            return true
        }
    }
    return false
}

//Valida Senha
function tmvalido(value, minimo, maximo) { // valida a senha de acordo com o tamanho
    if (value.length >= minimo && value.length <= maximo) {
        return true
    }
    return false
}

const inputFile = document.querySelector("#picture__input")
const pictureImage = document.querySelector(".picture__image")

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target
  const file = inputTarget.files[0]

  if (file) {
    if (file.size <= 45000){
        imgerro.style.display = 'none'
        const reader = new FileReader()

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target
            
            const img = document.getElementById('image')
            img.src = readerTarget.result
            
            pictureImage.innerHTML = ""
            pictureImage.appendChild(img)
        });

        reader.readAsDataURL(file)
    } else {
        imgerro.style.display = 'Block'
        return
    }
  } else {
    pictureImage.innerHTML = pictureImageTxt
  }
})