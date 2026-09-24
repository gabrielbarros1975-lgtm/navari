import { parseBuyer } from "../../api/_buyer";

const valid = { name: "Maria da Silva", email: "maria@email.com" };

describe("dados do comprador", () => {
  it("normaliza o que vai para a Mercado Pago e para o certificado", () => {
    expect(parseBuyer({ name: "  Maria   da Silva ", email: " maria@email.com " })).toEqual({
      buyer: {
        name: "Maria da Silva",
        firstName: "Maria",
        lastName: "da Silva",
        email: "maria@email.com",
      },
    });
  });

  it("recusa campos incompletos com uma mensagem para a pessoa", () => {
    expect(parseBuyer({ ...valid, name: "Maria" })).toEqual({ error: "Informe seu nome completo." });
    expect(parseBuyer({ ...valid, email: "maria@" })).toEqual({ error: "Informe um e-mail válido." });
    expect(parseBuyer({})).toHaveProperty("error");
  });
});
