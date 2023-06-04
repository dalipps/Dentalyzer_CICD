/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */

interface Triangle {
	0: [number, number, number]
	1: [number, number, number]
	2: [number, number, number]
	p1: string
	p2: string
	p3: string
	normal: [number, number, number]
}

interface TriangleCollection {
	[key: number]: Triangle
}
interface TupleOutput {
	one: TriangleCollection
	two: TriangleCollection
	ascii?: true
}

interface GroupedASCIIOutput {
	one: { normal: Float32Array; position: Float32Array }
	two: { normal: Float32Array; position: Float32Array }
	ascii?: true
}

const isGroupedASCIIOutput = (data: TupleOutput | GroupedASCIIOutput): data is GroupedASCIIOutput => {
	return 'position' in data.one
}

import { fromEvent, map } from 'rxjs'
import { BufferAttribute, BufferGeometry, HemisphereLight, Light } from 'three'
import { parseStl } from '../loader/stl-loader'

export function parseStlToGeometry(file: File) {
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)
	return fromEvent(reader, 'load').pipe(
		map(() => {
			const result = parseStl(reader.result as ArrayBuffer | string)
			if (isGroupedASCIIOutput(result)) return makeBufferGeometryFromGroupedASCII(result)

			return { upper: makeBufferGeometry(result.one), lower: makeBufferGeometry(result.two) }
		})
	)
}

function makeBufferGeometry(trianglesObject: TriangleCollection): BufferGeometry {
	const triangles = Object.values(trianglesObject)
	const { length } = triangles
	const positionArray = new Float32Array(length * 9)
	const normalArray = new Float32Array(length * 9)
	for (let i = 0; i < triangles.length; i++) {
		const triangle = triangles[i]
		positionArray.set(triangle[0], i * 9)
		positionArray.set(triangle[1], i * 9 + 3)
		positionArray.set(triangle[2], i * 9 + 6)

		normalArray.set(triangle.normal, i * 9)
		normalArray.set(triangle.normal, i * 9 + 3)
		normalArray.set(triangle.normal, i * 9 + 6)
	}
	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new BufferAttribute(positionArray, 3))
	geometry.setAttribute('normal', new BufferAttribute(normalArray, 3))
	return geometry
}

function makeBufferGeometryFromGroupedASCII(jaw: GroupedASCIIOutput) {
	return { upper: groupedToGeometry(jaw.one), lower: groupedToGeometry(jaw.two) }
}

function groupedToGeometry(grouped: { normal: Float32Array; position: Float32Array }): BufferGeometry {
	const geometry = new BufferGeometry()
	geometry.setAttribute('position', new BufferAttribute(grouped.position, 3))
	geometry.setAttribute('normal', new BufferAttribute(grouped.normal, 3))
	return geometry
}

export function initLight(): Light {
	const skyColor = 0xffffff
	const groundColor = 0x555555
	const lightIntensity = 1

	return new HemisphereLight(skyColor, groundColor, lightIntensity)
}
