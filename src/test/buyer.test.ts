import { formatCpf, formatPhone, isValidCpf, parseBuyer } from "../../api/_buyer";

const valid = {
  name: "Maria da Silva",
  email: "maria@email.com",
  cpf: "123.456.789-09",
  phone: "(98) 98765-4321",
};

describe("dados do comprador", () => {
  it("valida o dígito verificador do CPF", () => {
    expect(isValidCpf("123.456.789-09")).toBe(true);
    expect(isValidCpf("12345678900")).toBe(false);
    expect(isValidCpf("111.111.111-11")).toBe(false);
    expect(isValidCpf("1234567890")).toBe(false);
  });

  it("normaliza o que vai para a Mercado Pago", () => {
    expect(parseBuyer({ ...valid, email: " maria@email.com " })).toEqual({
      buyer: {
        firstName: "Maria",
        lastName: "da Silva",
        email: "maria@email.com",
        cpf: "12345678909",
        phone: "98987654321",
      },
    });
  });

  it("aceita telefone com 8 dígitos após o DDD", () => {
    expect(parseBuyer({ ...valid, phone: "(98) 3232-1234" })).toHaveProperty("buyer");
  });

  it("recusa campos incompletos com uma mensagem para a pessoa", () => {
    expect(parseBuyer({ ...valid, name: "Maria" })).toEqual({ error: "Informe seu nome completo." });
    expect(parseBuyer({ ...valid, email: "maria@" })).toEqual({ error: "Informe um e-mail válido." });
    expect(parseBuyer({ ...valid, cpf: "123.456.789-00" })).toEqual({ error: "Informe um CPF válido." });
    expect(parseBuyer({ ...valid, phone: "98765-4321" })).toEqual({
      error: "Informe um celular válido, com DDD.",
    });
    expect(parseBuyer({})).toHaveProperty("error");
  });

  it("aplica a máscara enquanto a pessoa digita", () => {
    expect(formatCpf("123")).toBe("123");
    expect(formatCpf("1234567")).toBe("123.456.7");
    expect(formatCpf("123456789091234")).toBe("123.456.789-09");
    expect(formatPhone("9")).toBe("(9");
    expect(formatPhone("989876")).toBe("(98) 9876");
    expect(formatPhone("9832321234")).toBe("(98) 3232-1234");
    expect(formatPhone("98987654321")).toBe("(98) 98765-4321");
  });
});
