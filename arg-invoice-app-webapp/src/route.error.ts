type ErrorCode = 403;

export class RouteError extends Error {
	public code: ErrorCode;

	constructor(message: string, code: ErrorCode) {
		super(message);
		this.code = code;

		// Set the prototype explicitly (fixes issues with instanceof checks in some JS environments)
		Object.setPrototypeOf(this, RouteError.prototype);
	}
}
