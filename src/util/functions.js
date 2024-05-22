export function checkCPF(cpf) {
    cpf = cpf.replace(/\D+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}
  