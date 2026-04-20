import { Spec } from '@shared/lll.lll'

@Spec('Represents one editable frequency-shaping band for the image equalizer UI and processor.')
export type EqualizerBand = {
	id: number
	label: string
	color: string
	center: number
	gain: number
	q: number
}
