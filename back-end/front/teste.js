const form = () => {
  const elements = {
    emailInput: document.getElementById("email-input"),
    senhaInput: document.getElementById("senha-input"),
    nomeInput: document.getElementById("nome-input"),
    generoInput: document.getElementById("genero-input"),
    cargoInput: document.getElementById("cargo-input"),
    nucleoInput: document.getElementById("nucleo-input"),
    rootForm: document.querySelector("form"),
    btn: document.querySelector("button"),
  };

  let state = {
    emailInput: "", 
    senhaInput: "",
    nomeInput: "",
    generoInput: "",
    cargoInput: "",
    nucleoInput: "",
  }

  let setEventHandlers = () => {

    elements.emailInput.addEventListener("change", () => {
      console.log(elements.emailInput.value);
      state.emailInput = elements.emailInput.value;
    });

    elements.senhaInput.addEventListener("change", () => {
      console.log(elements.senhaInput.value);
      state.senhaInput = elements.senhaInput.value;
    });

    elements.nomeInput.addEventListener("change", () => {
      console.log(elements.nomeInput.value);
      state.nomeInput = elements.nomeInput.value;
    });

    elements.generoInput.addEventListener("change", () => {
      console.log(elements.generoInput.value);
      state.generoInput = elements.generoInput.value;
    });

    elements.cargoInput.addEventListener("change", () => {
      console.log(elements.cargoInput.value);
      state.cargoInput = elements.cargoInput.value;
    });

    elements.nucleoInput.addEventListener("change", () => {
      console.log(elements.nucleoInput.value);
      state.nucleoInput = elements.nucleoInput.value;
    });

    elements.rootForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = {
        email: state.emailInput,
        senha: state.senhaInput,
        nome: state.nomeInput,
        genero: state.generoInput,
        cargo: state.cargoInput,
        nucleo: state.nucleoInput,
      };

      console.log(body);

      const res = await fetch("http://localhost:3000/cadastro", {
        method: "post", 
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body),
      });
    });
  };

  return {setEventHandlers};
};

async function procuraemail (Email){
  const res = await fetch("http://localhost:3000/procuraemail", {
          method: "post", 
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({email : Email}),
  })
}



form().setEventHandlers();

/*
import { getEnvironmentData } from "worker_threads";

clickLogin = (e) => {
    e.preventDefault();
    fetch ("/back-end/autentificacao.cntroll.js", {
       method: "post",
       body: JSON.stringify({
         email: this.state.emailValue,
         senha: this.state.senhaValue,
         nome: this.state.nomeValue,
         genero: this.state.generoValue,
         cargo: this.state.cargoValue,
         nucleo: this.state.nucleoValue
      }),
  })
    .then((response) => response.json())
    .then((result) => {
      if(result.message === "Email já cadastrado"){
            alert("Please check your login information.");
       } else {
            alert("You are logged in.");
            this.goToMain();
       }
    });
  }
*/