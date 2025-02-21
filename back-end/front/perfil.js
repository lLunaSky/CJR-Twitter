async function info (accessToken){
    const response = await fetch("http://localhost:3000/info", {
            method: "get", 
            headers: {"Content-type": "application/json",
            "authorization": "Bearer "+ accessToken}
    })
    return response.json()
}

async function procuraUsario (Id){
    const response = await fetch("http://localhost:3000/perfil", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({id : Id}),
    
    })
    return response.json()
}

async function MostraPots(){
    const response = await fetch("http://localhost:3000/post", {
            method: "get", 
            headers: {"Content-type": "application/json"}
    })
    return response.json()
}

async function criaPost(accessToken, post) {
    const response = await fetch("http://localhost:3000/post", {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "authorization": "Bearer "+ accessToken
        },
        body: JSON.stringify({ content: post })
    })
    return response.json();
}

async function procuraimagem (Email){
    const response = await fetch("http://localhost:3000/imagem", {
            method: "post", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email : Email}),
    })
    return response.json()
}

var img = document.getElementById('imagemlogin')
var nome = document.getElementById('nome')
var nucleo = document.getElementById('nucleo')
var cargo = document.getElementById('cargo')
var email = document.getElementById('email')
var botão_sair = document.getElementById('botão-sair')
var nome_nave = document.getElementById('nome-nave')
var imagem_nave = document.getElementById('imagemUser')
var criar_conta = document.getElementById('criar-conta')
var entrar_conta = document.getElementById('entrar-conta')
var botão_publicar = document.getElementById('publicar')

async function nave(){
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    if((accessToken)){ //Verifica se tem algum token 
        try{
            const usuario_info = await info(accessToken)
            if(usuario_info.id){
                entrar_conta.style.display='none'
                criar_conta.style.display='none'
                const usuario_nave = await procuraUsario(usuario_info.id)
                nome_nave.innerHTML = usuario_nave.nome
                imagem_nave.src = usuario_nave.imagem
                imagem_nave.style.display='block'
                botão_sair.style.display='block'
                let link_perfil = document.getElementById('perfil-logado')
                let link_perfil2 = document.getElementById('perfil-logado2')
                link_perfil.href = 'http://localhost:3000/perfil.html?perfil=' + usuario_info.id;
                link_perfil2.href = 'http://localhost:3000/perfil.html?perfil=' + usuario_info.id;
            }else if(usuario_info.message){
                nome_nave.style.display='none'
                imagem_nave.style.display='none'
                alert(usuario_info.message)
            }
        }catch(err){
            alert(err)
        }
    }
    if(!accessToken){
        botão_publicar.style.display='none'
    }
}

botão_sair.addEventListener("click",async(event)=> {
    event.preventDefault();
    localStorage.clear();
    alert("Deslogado")
    window.location.href = 'http://localhost:3000/index.html'
})


async function padrao (id){
    let usuario = await procuraUsario(id)
    nome.innerHTML = usuario.nome
    nucleo.innerHTML = usuario.nucleo.nome
    cargo.innerHTML = usuario.cargo
    email.innerHTML = usuario.email
    img.src = usuario.imagem 
}

let ID_PERFIL = window.location.href.split('?perfil=')[1];

padrao(ID_PERFIL)

const publicacoes = document.getElementById('posts')

function gmessageheader(foto, nome, criado,endereco){
    var messageheader = document.createElement('div')
    messageheader.className = 'message-header'

    var link = document.createElement('a')
    link.href = 'http://localhost:3000/perfil.html?perfil=' + endereco;

    var profileImage = document.createElement('img')
    profileImage.id = 'profile-image'
    profileImage.src = foto
    link.appendChild(profileImage)
    
    var h3 = document.createElement('h3')
    h3.className = 'header-text'
    h3.textContent = nome

    var h5 = document.createElement('h5')
    h5.className = 'header-text'
    h5.textContent = criado

    messageheader.appendChild(link)
    messageheader.appendChild(h3)
    messageheader.appendChild(h5)
    return messageheader
}

function gmessagebodymessagetext(conteudo) {
    var messageBodyText = document.createElement("div")
    messageBodyText.className = "message-body message-text"

    var p = document.createElement("p")
    p.className = "feed-text"
    p.textContent = conteudo

    messageBodyText.appendChild(p)
    return messageBodyText
}

function gmessagebodymessagecomment(id) {
    var messageBodyComment = document.createElement("div");
    messageBodyComment.className = "message-body message-comment"

    var commentIcon = document.createElement("img")
    commentIcon.id = "comment-button"
    commentIcon.src = "images/comment icon.svg"
    commentIcon.alt = "comment icon"
    commentIcon.onclick = postarModal;
    commentIcon.idpost = id
    messageBodyComment.appendChild(commentIcon)
    return messageBodyComment
}

function gmessagebody() {
    var messageBody = document.createElement("div")
    messageBody.className = "message-body"

    var hr = document.createElement("hr")
    messageBody.appendChild(hr)
    return messageBody
}

function gerarpost(foto, nome, criado, conteudo, idpost, endereco){
    var messageBox = document.createElement('div')
    messageBox.className = 'message-box'
    messageBox.appendChild(gmessageheader(foto, nome, criado, endereco))
    messageBox.appendChild(gmessagebodymessagetext(conteudo))
    messageBox.appendChild(gmessagebodymessagecomment(idpost))
    messageBox.appendChild(gmessagebody())
    publicacoes.appendChild(messageBox)
}

async function geraFeed(){
    const posts = await MostraPots();
    for (let post of posts) {
        let idUserAuthor = post.user_id;
        if(idUserAuthor == ID_PERFIL){
            let idPost = post.id;
            let postDataProv = post.created_at;
            postDataList = postDataProv.split("T")[0].split("-");
            postData = postDataList[2] + "/" + postDataList[1] + "/" + postDataList[0];
            let postContent = post.content;
            let userInfo = await procuraUsario(idUserAuthor);
            let nome = userInfo.nome;
            let imagem = userInfo.imagem;
            gerarpost(imagem, nome, postData, postContent, idPost, idUserAuthor);            
        }
    }
}

function fechaModal(event) {
    event.preventDefault();
    let publishContent = document.querySelector(".modal-overlay");
    publishContent.classList.remove("modal-visible")
};

async function postarModal(event){
    var botaoClicado = event.target
    var idbotao = botaoClicado.idpost
    if (idbotao){
        comentar(idbotao)
    } else {
        event.preventDefault();
        let publishContent = document.querySelector(".modal-overlay");
        publishContent.classList.add("modal-visible");
    }
}
var simplemde = new SimpleMDE({
    element: document.getElementById("md"),
    placeholder: "Converse com a gente...",
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "link", "image", "|", "guide"]
});

const submitButton = document.getElementById("enviar");

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    post = simplemde.value();
    const accessToken = localStorage.getItem('accessToken'); //Pega o token de acesso 
    if (accessToken) {
        await criaPost(accessToken, post);
        alert("Post enviado!")
        location.reload();
    }
});

geraFeed()
nave()