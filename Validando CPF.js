// para teste: 705.484.450-52  070.987.720-03
/*
    7x 0x 5x 4x 8x 4x 4x 5x 0x
    10 9  8  7  6  5  4  3  2
    70 0  40 28 48 20 16 15 0 = 237

    11 - (237 % 11) = 5 (Primeiro dígito)
    Se o numero digito for maior que 9, consideram 0.

    7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
    10 9  8  7  6  5  4  3  2  2
    70 0  40 28 48 20 16 15 0  10 = 284

    11 - (284 % 11) = 2 (Primeiro dígito)
    Se o numero digito for maior que 9, consideram 0.
*/

//função construtora que vai receber o número de cpf
function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', { //definido propriedade para o método cpfLimpo para tirar pontos e traço do cpf
        enumerable: true, //aparecer cpfLimpo no console
        get: function () {
            return cpfEnviado.replace(/\D+/g, ''); //método replace para pegar uma expressão regular de tudo que nao for número, e trocar por nada.
        }
    });
}

//criando o método valida no prototype de ValidaCPF
ValidaCPF.prototype.valida = function () {
    //se não for enviado um cpf válido vai retornar false
    if (typeof this.cpfLimpo === 'undefined') return false;
    //se o cpf enviado for diferente de 11 dígitos retornar false 
    if (this.cpfLimpo.length !== 11) return false;
    //chamada do método para verficar se tem sequência de números repetidos se o método retornar true, aqui retorna false e não passa no resto da validação.
    if (this.isSequencia()) return false; 

    //pegando o cpf sem os dois ultimos digito de verificação
    const cpfParcial = this.cpfLimpo.slice(0, -2);

    //Primeiro digito de verificação
    const digito1 = this.criaDigito(cpfParcial);

    //Segundo digito de verificação
    const digito2 = this.criaDigito(cpfParcial + digito1);

    //junção do cpf parcial mais os dois digitos de verficação xxx.xxx.xxx(cpf parcial) - xx(digito de verificação)
    const novoCPF = cpfParcial + digito1 + digito2;

    //vai retornar true se meu cpf checado for igual ao digitado e passado por toda a validação
    return novoCPF === this.cpfLimpo;
};

//criando o método criaDigito no prototype de ValidaCPF
ValidaCPF.prototype.criaDigito = function (cpfParcial) { 
const cpfArray = Array.from(cpfParcial); //transformando meu cpf em um array para trabalhar com cada digito separado

    //como a contagem regressiva começa de 10 e o meu array parcial so tem tamanho 9, acrescentar mais 1 ao tamanho
    let regressivo = cpfArray.length + 1;

    //usando o reduce para fazer a multiplicação da contagem regressiva de cada digito do cpf
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val)); //passando val como Number so pra ter certeza que vai retornar um number
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11); //calculo do digito verificador
    return digito > 9 ? '0' : String(digito); //digito maior que 9 retorna string de '0' se menor vai me retornar o numero passado em string

};

//metódo criado para pegar sequencia de números, aqui tem que me retornar true 
ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

//instância criada apartir da função ValidaCPF passar tudo como string
const cpf = new ValidaCPF('070.987.720-03');

//Se passar em todas as checagens quero que me mostre se é válido, caso contrário, inválido.
if (cpf.valida()) {
    console.log('CPF Válido');
} else {
    console.log('CPF inválido');
}