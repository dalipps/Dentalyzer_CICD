import { fromEvent, map } from 'rxjs'
import { Mesh, MeshPhongMaterial } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const pkmMaterial = {
	color: 0xcccccc,
	opacity: 0.8,
	transparent: true,
}

export function loadPkmFromFile(file: File) {
	const reader = new FileReader()
	const loader = new STLLoader()
	reader.readAsArrayBuffer(file)
	return fromEvent(reader, 'load').pipe(
		map(() => {
			const geometry = loader.parse(reader.result as ArrayBuffer | string)
			const matirial = new MeshPhongMaterial(pkmMaterial)
			return new Mesh(geometry, matirial)
		})
	)
}
