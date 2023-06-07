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

const isGroupedASCIIOutput = (data: TriangleCollection | GroupedASCIIOutput): data is GroupedASCIIOutput => {
	return 'one' in data
}

const dataOffset = 84
const faceLength = 12 * 4 + 2
let faces: number

export function parseStl(data: ArrayBuffer | string) {
	const arrayBuffer = ensureArrayBuffer(data)

	if (isBinary(arrayBuffer)) {
		const triangles = parseBinary(new DataView(arrayBuffer))
		return splitMesh(triangles)
	}
	const dataString = ensureString(data)
	const parsedASCI = parseASCII(dataString)
	if (isGroupedASCIIOutput(parsedASCI)) {
		return parsedASCI
	}
	//@ts-ignore
	const tupleOutput = splitMesh(parseASCII)
	tupleOutput.ascii = true
	return tupleOutput
}

function ensureArrayBuffer(buffer: ArrayBuffer | string): ArrayBuffer {
	if (typeof buffer === 'string') {
		const arrayBuffer = new Uint8Array(buffer.length)
		for (let i = 0; i < buffer.length; i++) {
			arrayBuffer[i] = buffer.charCodeAt(i) & 0xff
		}

		return arrayBuffer.buffer ?? arrayBuffer
	}
	return buffer
}

function isBinary(data: ArrayBuffer) {
	const reader = new DataView(data)
	const faceSize = (32 / 8) * 3 + (32 / 8) * 3 * 3 + 16 / 8
	const nFace = reader.getUint32(80, true)
	const expect = 80 + 32 / 8 + nFace * faceSize

	if (expect === reader.byteLength) {
		return true
	}

	const solid = [115, 111, 108, 105, 100]
	for (let off = 0; off < 5; off++) {
		if (matchDataViewAt(solid, reader, off)) return false
	}

	return true
}

function matchDataViewAt(query: number[], reader: DataView, offset: number) {
	for (let i = 0, il = query.length; i < il; i++) {
		if (query[i] !== reader.getUint8(offset + i)) return false
	}
	return true
}

function parseBinary(data: DataView) {
	const triangles: TriangleCollection = {}

	faces = data.getUint32(80, true)

	for (let face = 0; face < faces; face++) {
		const triangle: Partial<Triangle> = {
			0: [0, 0, 0],
			1: [0, 0, 0],
			2: [0, 0, 0],
			normal: [0, 0, 0],
		}
		const start = dataOffset + face * faceLength
		// @ts-ignore
		triangle.normal[0] = data.getFloat32(start, true)
		// @ts-ignore
		triangle.normal[1] = data.getFloat32(start + 4, true)
		// @ts-ignore
		triangle.normal[2] = data.getFloat32(start + 8, true)

		for (let i = 1; i <= 3; i++) {
			const vertexstart = start + i * 12
			// @ts-ignore
			const vertex = triangle[i - 1]
			vertex[0] = data.getFloat32(vertexstart, true)
			vertex[1] = data.getFloat32(vertexstart + 4, true)
			vertex[2] = data.getFloat32(vertexstart + 8, true)
		}
		// @ts-ignore
		triangle.p1 = triangleToString(triangle[0])
		// @ts-ignore
		triangle.p2 = triangleToString(triangle[1])
		// @ts-ignore
		triangle.p3 = triangleToString(triangle[2])

		triangles[face] = triangle as Triangle
	}

	return triangles
}

function triangleToString(vertex: [number, number, number]) {
	return `${vertex[0].toString(16)}:${vertex[1].toString(16)}:${vertex[2].toString(16)}`
}

function splitMesh(triangles: TriangleCollection): TupleOutput {
	let meshes: any[] = []
	const triangleList = Object.values(triangles)
	triangleList.sort((triangleA, triangleB) => {
		const a = triangleA[0][0]
		const b = triangleB[0][0]
		return a < b ? -1 : a > b ? 1 : 0
	})
	triangleList.forEach((triangle, index) => {
		let matchDict: { points: any; triangles: any } | undefined = undefined

		const point1 = triangle.p1
		const point2 = triangle.p2
		const point3 = triangle.p3
		meshes = meshes.filter((mesh) => {
			if (
				mesh.points.hasOwnProperty(point1) ||
				mesh.points.hasOwnProperty(point2) ||
				mesh.points.hasOwnProperty(point3)
			) {
				if (matchDict === undefined) {
					matchDict = mesh

					// @ts-ignore
					matchDict.points[point1] = true
					// @ts-ignore-start
					matchDict.points[point2] = true
					// @ts-ignore-start
					matchDict.points[point3] = true
				} else {
					Object.assign(matchDict.points, mesh.points)
					Object.assign(matchDict.triangles, mesh.triangles)

					matchDict.points[point1] = true
					matchDict.points[point2] = true
					matchDict.points[point3] = true
					return false
				}
				return true
			} else {
				return true
			}
		})

		if (matchDict === undefined) {
			matchDict = { points: {}, triangles: {} }
			matchDict.points[point1] = true
			matchDict.points[point2] = true
			matchDict.points[point3] = true
			meshes.push(matchDict)
		}
		matchDict.triangles[index] = triangle
	})
	const allSplitMeshes = { one: meshes[0]?.triangles, two: meshes[1]?.triangles }
	meshes = []
	return allSplitMeshes
}

/*-------------------------------------------------------------------------*/

function ensureString(buffer: ArrayBuffer | string) {
	if (typeof buffer !== 'string') {
		return decodeText(new Uint8Array(buffer))
	}

	return buffer
}

function decodeText(array: Uint8Array) {
	if (typeof TextDecoder !== 'undefined') {
		return new TextDecoder().decode(array)
	}

	let s = ''

	for (let i = 0, il = array.length; i < il; i++) {
		// Implicitly assumes little-endian.
		s += String.fromCharCode(array[i])
	}

	try {
		return decodeURIComponent(escape(s))
	} catch (e) {
		return s
	}
}

function parseASCII(data: string): TriangleCollection | GroupedASCIIOutput {
	const patternSolid = /solid([\s\S]*?endsolid)/g
	const solids: string[] = []
	const one = patternSolid.exec(data)
	if (one) solids.push(one[0])
	const two = patternSolid.exec(data)
	if (two) solids.push(two[0])

	if (solids.length === 2) {
		const result = parseGroupedASCII(solids)
		return result
	}

	const patternFace = /facet([\s\S]*?)endfacet/g
	let faceCounter = 0

	const patternFloat = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]*\d+)?)/.source
	const patternVertex = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g')
	const patternNormal = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g')

	const triangles = {}
	let result
	const solid = solids[0]
	while ((result = patternFace.exec(solid)) !== null) {
		let vertexCountPerFace = 0
		let normalCountPerFace = 0

		const triangle: Partial<Triangle> = {
			0: [0, 0, 0],
			1: [0, 0, 0],
			2: [0, 0, 0],
			normal: [0, 0, 0],
		}

		const text = result[0]

		while ((result = patternNormal.exec(text)) !== null) {
			const { normal } = triangle
			//@ts-ignore
			normal[0] = parseFloat(result[1])
			//@ts-ignore
			normal[1] = parseFloat(result[2])
			//@ts-ignore
			normal[2] = parseFloat(result[3])
			normalCountPerFace++
		}
		while ((result = patternVertex.exec(text)) !== null) {
			//@ts-ignore
			triangle[vertexCountPerFace] = [parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])]
			vertexCountPerFace++
		}
		//@ts-ignore
		triangle.p1 = triangleToString(triangle[0])
		//@ts-ignore
		triangle.p2 = triangleToString(triangle[1])
		//@ts-ignore
		triangle.p3 = triangleToString(triangle[2])

		//@ts-ignore
		triangles[faceCounter] = triangle

		if (normalCountPerFace !== 1) {
			console.log('invalid ASCII normals')
		}

		if (vertexCountPerFace !== 3) {
			console.log('invalid ASCII vertices')
		}
		faceCounter++
	}

	faces = faceCounter

	return triangles
}

function parseGroupedASCII(stringSolids: string[]) {
	const patternFace = /facet([\s\S]*?)endfacet/g
	let faceCounter = 0

	const patternFloat = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]*\d+)?)/.source
	const patternVertex = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g')
	const patternNormal = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g')

	const solids: any[] = []
	let result
	stringSolids.forEach((solid) => {
		const vertices = []
		const normals = []
		while ((result = patternFace.exec(solid)) !== null) {
			let vertexCountPerFace = 0
			let normalCountPerFace = 0

			const text = result[0]

			const normal = { x: 0, y: 0, z: 0 }

			while ((result = patternNormal.exec(text)) !== null) {
				normal.x = parseFloat(result[1])
				normal.y = parseFloat(result[2])
				normal.z = parseFloat(result[3])
				normalCountPerFace++
			}
			while ((result = patternVertex.exec(text)) !== null) {
				vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]))
				normals.push(normal.x, normal.y, normal.z)
				vertexCountPerFace++
			}

			if (normalCountPerFace !== 1) {
				console.log('invalid ASCII normals')
			}

			if (vertexCountPerFace !== 3) {
				console.log('invalid ASCII vertices')
			}
			faceCounter++
		}
		solids.push({ position: new Float32Array(vertices), normal: new Float32Array(normals) })
	})
	faces = faceCounter

	return { one: solids[0], two: solids[1], ascii: true }
}
