function CPFMask(cpf) {
    const rx = new RegExp(/\d{3}\.\d{3}\.\d{3}\-\d{2}/);
    return rx.test(cpf);
}

function format(e) {
    const value = e.target.value.replace(/\D/g, "");
    const len = value.length;
    counter(len);
    if (len > 14 || e.data == null) return;
    let cpfFormatted = "";
    for (let i = 0; i < len; i++) {
        cpfFormatted += value[i];
        i === 2 || i === 5 ? (cpfFormatted += ".") : i === 8 ? (cpfFormatted += "-") : cpfFormatted;
    }
    e.target.value = cpfFormatted;
    return cpfFormatted;
}

function counter(count) {
    let showCount = document.getElementById("countercpf");
    showCount.textContent = count + "/11";
}

function digitValidator(Ncpf, times, charAt) {
    if (!CPFMask(Ncpf)) return null;
    const cpf = Ncpf.replace(/\D/g, "");
    let soma = 0;
    let digit = 0;
    for (let m = times, i = charAt; m >= 2; m--, i++) {
        soma += cpf.charAt(i) * m;
    }
    const rest = soma % 11;
    rest < 2 ? (digit = 0) : (digit = 11 - rest);
    return digit == cpf.charAt(times - 1);
}

function cpfValidator() {
    const cpf = document.getElementById("cpf").value;
    const firstDigit = digitValidator(cpf, 10, 0);
    const secondDigit = digitValidator(cpf, 11, 0);
    return { cpf: cpf, status: firstDigit && secondDigit };
}
const cpfAlreadyValidated = [];
function listRegister() {
    const { cpf, status } = cpfValidator();
    const has = cpfAlreadyValidated.find((e) => {
        if (e == cpf) return true;
    });
    if (status != null && has === undefined) {
        cpfAlreadyValidated.push(cpf);
        document.getElementById("verified-cpf-list").insertAdjacentHTML(
            "afterbegin",
            `<li>
                <p>CPF:</p>${cpf} 
                <p class='status'>status:</p>${
                    status ? '<span style="color: green">Válido</span>' : '<p style="color: red">Inválido</p>'
                }
            </li>`
        );
    }
}
