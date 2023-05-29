import { fromEvent, map } from 'rxjs'
import { HemisphereLight, Light } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

export function parseStlToGeometry(file: File) {
	const reader = new FileReader()
	const loader = new STLLoader()
	reader.readAsArrayBuffer(file)
	return fromEvent(reader, 'load').pipe(
		map(() => {
			return loader.parse(reader.result as ArrayBuffer | string)
		})
	)
}

export function initLight(): Light {
	const skyColor = 0xffffff
	const groundColor = 0x555555
	const lightIntensity = 1

	return new HemisphereLight(skyColor, groundColor, lightIntensity)
}
