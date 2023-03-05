import {CelestialObjectModel} from "./celestial-objects-model";

export interface CelestialObjectPlaced extends CelestialObjectModel {
    position: { x: number, y: number, z: number }
}
