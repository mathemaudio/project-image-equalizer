export type BridgeJsonResponse = {
	error: string
	details: string | Array<{
		path: string
		message: string
		code: string
	}>
}
