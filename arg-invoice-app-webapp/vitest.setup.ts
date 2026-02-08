import { vi } from "vitest";

const REAL_NumberFormat = Intl.NumberFormat;

// mock the default locale of the Intl.NumberFormat object
// biome-ignore lint/complexity/useArrowFunction: we can't use arrow function here because it is not constructable
vi.spyOn(Intl, "NumberFormat").mockImplementation(function (locales, options) {
	return new REAL_NumberFormat(locales ?? "en-GB", options);
});

const REAL_toLocaleDateString = Date.prototype.toLocaleDateString;

// mock the default locale of the date.toLocaleDateString function
vi.spyOn(Date.prototype, "toLocaleDateString").mockImplementation(function (
	this: Date,
	locales,
	options,
) {
	return REAL_toLocaleDateString.call(this, locales ?? "en-GB", options);
});
