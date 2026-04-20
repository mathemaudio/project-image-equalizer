import { Spec } from '@shared/lll.lll'

@Spec('Describes the latest visible processed-image status shown in the equalizer UI.')
export type ProcessedImageSummary = {
	sourceLabel: string
	workingWidth: number
	workingHeight: number
	energyDeltaPercent: number
	gainExtremesText: string
	bandSnapshotText: string
}
