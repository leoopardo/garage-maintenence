export const cellphone = (value: string) => {
  if (!value) return value;
  value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  value = value.substring(0, 11); // Garante que só há no máximo 11 dígitos

  if (value.length <= 10) {
    // Formato (XX) XXXX-XXXX
    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else if (value.length === 11) {
    // Formato (XX) XXXXX-XXXX
    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return value;
};

export const rg = (value: string | number) => {
  if (!value) return "-";
  value = `${value}`.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
  value = `${value}`.substring(0, 9); // Garante que só há no máximo 9 dígitos
  if (value.length <= 9) {
    return value
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value;
};

export const cpf = (value: string | number) => {
  value = `${value}`.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
  value = `${value}`.substring(0, 11); // Garante que só há no máximo 11 dígitos
  if (value.length <= 11) {
    return value
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value;
};

export function cnpj(CNPJ?: string | number) {
  const cleanedCNPJ = `${CNPJ}`?.replace(/\D/g, "");
  return cleanedCNPJ?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
}

export function cpfCnpj(value: string | number) {
  let cleanValue: string | number = `${value}`.replace(/\D/g, "");

  if (cleanValue.length < 12) {
    cleanValue = cpf(value);
  } else {
    cleanValue = cnpj(value);
  }

  return cleanValue;
}

export const percent = (value: string | number) => {
  if (!value && value !== 0) return "-";

  // Remove caracteres não numéricos, exceto ponto decimal
  let cleanedValue = `${value}`.replace(/[^\d.]/g, "");

  // Limita a um máximo de 5 dígitos antes do ponto decimal e 2 após o ponto decimal
  cleanedValue = cleanedValue.substring(0, 8);

  // Adiciona .00 se o valor não tiver casas decimais
  if (!cleanedValue.includes(".")) {
    cleanedValue = `${cleanedValue}.00`;
  }

  // Transforma o valor para ter sempre duas casas decimais
  const numericValue = parseFloat(cleanedValue).toFixed(2);

  return `${numericValue}%`;
};

export const currency = (value: number) => {
  if (`${value}`.includes("e-")) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(0); // Retorna "0,00" se for notação científica
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    value
      ? `${value}`.split(".")[1]
        ? +`${`${value}`.split(".")[0]}.${`${value}`
            ?.split(".")[1]
            ?.substring(0, 2)}` //remove todos as casas decimais depois da segunda
        : value
      : 0,
  );
};

export const formatter = {
  currency,
  cpf,
  rg,
  cellphone,
  percent,
  cpfCnpj,
  cnpj,
};
