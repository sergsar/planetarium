import {CelestialObjectModel} from "../models/celestial-objects-model";
import * as Astronomy from "astronomy-engine";
import {Body} from "astronomy-engine";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import {getAngle, normalize} from "../utils/math";
import {ASTRONOMY_TIME_MULTIPLIER} from "../constants/astronomy-engine";

export class BarycentricSolarSystem {
    public readonly paths

    private time = Date.now()
    private moment = Date.now()

    constructor(private data: CelestialObjectModel[]) {
        this.paths = collectOrbitPaths(data, this.time)
    }

    // speed - in hours per second
    getNextState(speed: number) {
        const now = Date.now()
        const delta = now - this.moment
        this.moment = now

        this.time += delta * 1000 * 60 * 60 * speed * ASTRONOMY_TIME_MULTIPLIER
        return getSnapshotData(this.data, this.time)
    }
}

const collectOrbitPaths = (objects: CelestialObjectModel[], time: number) => {
    const PI2 = Math.PI * 2
    const points = 128
    const stepAngle = Math.PI * 2 / points
    const sampleTimes = [10000000, 100000000, 500000000, 1000000000, 10000000000, 100000000000]
    const paths = new Array(objects.length).fill(0).map(() => [] as Array<{ x: number, y: number, z: number}>)
    const angles = paths.map((item) => 0)
    const names = []
    for (let sampleTime of sampleTimes) {
        let counter = 0
        let minPoints = 0
        angles.forEach((angle, index) => {
            if (angle < PI2) {
                paths[index] = []
                angles[index] = 0
            }
        })
        while (minPoints < points && counter < 500) {
            const data = getSnapshotData(objects, time)
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                const position = item.position
                const positions = paths[i]
                if (angles[i] >= PI2) {
                    continue
                }
                if (positions.length >= points) {
                    continue
                }
                const previous = positions[positions.length - 1]
                if (!previous) {
                    positions.push(position)
                    names[i] = item.name
                    continue
                }
                const angle = getAngle(previous, position)
                if (angle > stepAngle) {
                    angles[i] += angle
                    positions.push(position)
                }
                if (PI2 - angles[i] < stepAngle) {
                    angles[i] = PI2
                }
            }
            minPoints = Math.min(...paths.map((item) => item.length))
            time += sampleTime
            counter++
        }
    }
    paths.forEach((item) => {
        // item.push(item[0])
        Object.freeze(item)
    })
    console.log('paths: ', paths)
    const result = names.map((name, index) => ({ name, path: paths[index]}))
    Object.freeze(result)
    return result
}

const getSnapshotData = (objects: CelestialObjectModel[], time: number) => {
    const sun = objects.find((item) => item.name === 'Sun')
    if (!sun) {
        console.error('cannot find sun in the sequence')
        return []
    }
    const astronomyTime = Astronomy.MakeTime(new Date(time))
    const sunMass = sun.mass
    const planets = objects.filter((item) => item.name !== 'Sun')
    const placed: CelestialObjectSnapshot[] = []
    let ssb = { x: 0, y: 0, z: 0 }
    planets.forEach((curr) => {
        const pmass = curr.mass
        const shift = pmass / (pmass + sunMass);
        const { x, y, z } = Astronomy.HelioVector(curr.name as Body, astronomyTime)
        const { north: { x: rx, y: ry, z: rz }, spin } = Astronomy.RotationAxis(curr.name as Body, astronomyTime)

        ssb.x += shift * x;
        ssb.y += shift * y;
        ssb.z += shift * z;

        placed.push({
            ...curr,
            position: { x, y, z },
            rotationAxis: { x: rx, y: ry, z: rz },
            rotationAngle: spin
        })
    })
    placed.forEach((curr) => {
        curr.position.x -= ssb.x
        curr.position.y -= ssb.y
        curr.position.z -= ssb.z
        curr.position = normalize(curr.position)

        // curr.position = { x: 1, y: 0, z: 0} // this could stop planets rotation around the sun

        curr.position.x *= curr.distance
        curr.position.y *= curr.distance
        curr.position.z *= curr.distance
    })

    // increase sun moving(self rotation move) effect
    const sunSelfRotateFx = {
        x: Math.cos(time * 0.0000000002),
        y: Math.sin(time * 0.0000000002),
    }
    ssb.x += sunSelfRotateFx.x
    ssb.y += sunSelfRotateFx.y

    ssb = normalize(ssb)

    // ssb = { x: 1, y: 0, z: 0} // this could stop sun rotation around self

    ssb.x *= sun.distance
    ssb.y *= sun.distance
    ssb.z *= sun.distance

    const { north: { x: rx, y: ry, z: rz }, spin } = Astronomy.RotationAxis(sun.name as Body, astronomyTime)

    placed.push({
        position: ssb,
        rotationAxis: { x: rx, y: ry, z: rz },
        rotationAngle: spin,
        ...sun
    })

    return placed
}
