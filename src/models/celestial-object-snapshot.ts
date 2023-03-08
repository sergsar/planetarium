import {CelestialObjectModel} from "./celestial-objects-model";

export interface CelestialObjectSnapshot extends CelestialObjectModel {
    position: { x: number, y: number, z: number }
    rotationAxis: { x: number, y: number, z: number }
    rotationAngle: number

}
