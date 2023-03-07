import {CelestialObjectModel} from "../models/celestial-objects-model";
import * as Astronomy from "astronomy-engine";
import {Body} from "astronomy-engine";
import {CelestialObjectPlaced} from "../models/celestial-object-placed";

export class BarycentricSolarSystem {
    private time = 0
    constructor(private data: CelestialObjectModel[]) {
    }

    getNextState() {
        this.time += 5000000
        return getBarycentricData(this.data, this.time)
    }
}

const getBarycentricData = (objects: CelestialObjectModel[], time: number) => {
    const sun = objects.find((item) => item.name === 'Sun')
    if (!sun) {
        console.error('cannot find sun in the sequence')
        return []
    }
    const sunMass = sun.mass
    const planets = objects.filter((item) => item.name !== 'Sun')
    const placed: CelestialObjectPlaced[] = []
    let ssb = { x: 0, y: 0, z: 0 }
    planets.forEach((curr) => {
        const astronomyTime = Astronomy.MakeTime(new Date(time))
        const pmass = curr.mass
        const shift = pmass / (pmass + sunMass);
        const { x, y, z } = Astronomy.HelioVector(curr.name as unknown as Body, astronomyTime)

        ssb.x += shift * x;
        ssb.y += shift * y;
        ssb.z += shift * z;

        placed.push({
            ...curr,
            position: { x, y, z }
        })
    })
    placed.forEach((curr) => {
        curr.position.x -= ssb.x
        curr.position.y -= ssb.y
        curr.position.z -= ssb.z
        curr.position = normalize(curr.position)

        // curr.position = { x: 1, y: 0, z: 0} // this could stop planets rotation

        curr.position.x *= curr.distance
        curr.position.y *= curr.distance
        curr.position.z *= curr.distance
    })

    // increase sun moving effect
    const sunRotateFx = {
        x: Math.cos(time * 0.0000000002),
        y: Math.sin(time * 0.0000000002),
    }
    ssb.x += sunRotateFx.x
    ssb.y += sunRotateFx.y

    ssb = normalize(ssb)

    // ssb = { x: 1, y: 0, z: 0} // this could stop sun rotation

    ssb.x *= sun.distance
    ssb.y *= sun.distance
    ssb.z *= sun.distance

    placed.push({
        position: ssb,
        ...sun
    })

    return placed
}

const normalize = ({ x, y, z }: { x: number, y: number, z: number }) => {
    const magnitude = Math.sqrt(x * x + y * y + z * z) || 1

    return { x: x / magnitude, y: y / magnitude, z: z / magnitude }
}
