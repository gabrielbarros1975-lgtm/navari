import { PRODUCTS } from "../../api/_products";
import { mockWorkshop } from "@/data/mockData";

describe("catálogo do checkout", () => {
  it("cobra o mesmo valor exibido em cada ingresso da página", () => {
    for (const tier of mockWorkshop.tiers) {
      const product = PRODUCTS[tier.id];
      expect(product, `ingresso ${tier.id} sem produto no checkout`).toBeDefined();
      expect(product.price).toBe(tier.price);
      expect(product.installments).toBe(tier.installments);
    }
    expect(Object.keys(PRODUCTS)).toHaveLength(mockWorkshop.tiers.length);
  });
});
