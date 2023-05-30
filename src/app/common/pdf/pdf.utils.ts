export const FILE_TYPE_PDF = 'pdf'

export function getPdfTemplatePath(fileName: string): string {
	return `assets/pdfs/${fileName}.${FILE_TYPE_PDF}`
}

export function downloadPdf(pdf: Blob, fileName: string): void {
	const link = document.createElement('a')
	link.download = fileName + '.' + FILE_TYPE_PDF
	link.href = URL.createObjectURL(pdf)
	link.click()
}
