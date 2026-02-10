const form = document.getElementById("formulario");
        const resultado = document.getElementById("resultado");
        const range = document.getElementById("range");
        const refresh = document.querySelector(".refresh");
        const copy = document.querySelector(".copy")

        const plus = document.getElementById("plus");
        const minus = document.getElementById("minus");
        const number = document.getElementById("number");
        const simbols = document.getElementById("simbols");

        const successMsg = document.getElementById("successMsg")
        const erroMsg = document.getElementById("erroMsg")

        const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
        const numeros = "0123456789";
        const simbolos = "!@#$%^&*()_+[]{}<>?/|";

        function gerarSenha() {
            let caracteres = ""

            if (plus.checked) caracteres += letrasMaiusculas;
            if (minus.checked) caracteres += letrasMinusculas;
            if (number.checked) caracteres += numeros;
            if (simbols.checked) caracteres += simbolos;

            if (caracteres === "") {
                erroMsg.style.display = "block";
                setTimeout(() => erroMsg.style.display = "none", 2000);
                return;
            }

            let senha ="";
            const tamanho = parseInt(range.value);

            for (let i=0; i < tamanho; i++) {
                const randomIndex = Math.floor(Math.random() * caracteres.length);
                senha += caracteres[randomIndex];
            }

            resultado.value = senha
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault(); 
            gerarSenha();
        });

        copy.addEventListener("click", function () {
            if (resultado.value) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(resultado.value)
                        .then(() => {
                            successMsg.style.display = "block";
                            setTimeout(() => successMsg.style.display = "none", 2000);
                        })
                        .catch(err => {
                            console.error("Erro ao copiar com clipboard API:", err);
                            resultado.select();
                            document.execCommand("copy");
                            successMsg.style.display = "block";
                            setTimeout(() => successMsg.style.display = "none", 2000);
                        });
                } else {
                    // Fallback para navegadores antigos
                    resultado.select();
                    document.execCommand("copy");
                    successMsg.style.display = "block";
                    setTimeout(() => successMsg.style.display = "none", 2000);
                }
            } else {
                erroMsg.style.display = "block";
                setTimeout(() => erroMsg.style.display = "none", 2000);
            }
        });
        refresh.addEventListener("click", function () { resultado.value = ""; });