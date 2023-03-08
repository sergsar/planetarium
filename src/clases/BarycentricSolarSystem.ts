import {CelestialObjectModel} from "../models/celestial-objects-model";
import * as Astronomy from "astronomy-engine";
import {Body} from "astronomy-engine";
import {CelestialObjectSnapshot} from "../models/celestial-object-snapshot";
import {TIME_PER_FRAME} from "../constants/solar-system-parameters";

export class BarycentricSolarSystem {
    private time = new Date().getTime()
    constructor(private data: CelestialObjectModel[]) {
        // buildOrbitPaths(data)
    }

    getNextState() {
        this.time += TIME_PER_FRAME
        return getSnapshotData(this.data, this.time)
    }
}

const buildOrbitPaths = (objects: CelestialObjectModel[]) => {
    const points = 36
    const sampleTime = 100000
    let startAngle = 0
    let endAngle = 0
    let time = 0
    const result = []
    let counter = 0

    while (endAngle < 360 && counter < 1000) {
        const data = getSnapshotData(objects, time)
        let minAngle = endAngle
        for (let item of data) {
            const position = item.position
            const angle = Math.atan2(position.x, position.y)
            minAngle = Math.min(minAngle, angle)
        }
        startAngle = Math.min(startAngle, minAngle)
        endAngle = minAngle - startAngle
        time += sampleTime
        counter++
        console.log(startAngle)
    }
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

const normalize = ({ x, y, z }: { x: number, y: number, z: number }) => {
    const magnitude = Math.sqrt(x * x + y * y + z * z) || 1

    return { x: x / magnitude, y: y / magnitude, z: z / magnitude }
}
