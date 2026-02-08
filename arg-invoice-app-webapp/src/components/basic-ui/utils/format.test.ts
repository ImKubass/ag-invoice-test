import { describe, expect, it } from "vitest";
import { formatDate, formatPrice } from "./format";

describe("format.formatPrice", () => {
	it("formats GBP correctly", () => {
		expect(formatPrice(180090, "GBP")).toBe("£ 1,800.90");
		expect(formatPrice(55600, "GBP")).toBe("£ 556.00");
		expect(formatPrice(1400233, "GBP")).toBe("£ 14,002.33");
		expect(formatPrice(0, "GBP")).toBe("£ 0.00");
	});
});

describe("format.formatDate", () => {
	it("formats date passed as a Date object correctly", () => {
		expect(formatDate(new Date("2021-08-19"))).toBe("19 Aug 2021");
	});

	it("formats date passed as a string correctly", () => {
		expect(formatDate("2021-08-19")).toBe("19 Aug 2021");
	});
});
