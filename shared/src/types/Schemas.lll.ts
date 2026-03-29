import { z } from 'zod'
import { Spec } from '../lll.lll'

@Spec('Defines shared request and response schemas used by typed API endpoints.')
export class Schemas {
	static readonly HelloRequest = z.object({
		name: z.string().min(1, 'Please share a name')
	})

	static readonly HelloResponse = z.string()

	static readonly MultiplyRequest = z.object({
		a: z.number(),
		b: z.number()
	})

	static readonly MultiplyResponse = z.object({
		product: z.number()
	})
}
