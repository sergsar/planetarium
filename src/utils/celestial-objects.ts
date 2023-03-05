import {CelestialObjectContract} from "../contracts/celestial-object-contract";
import {CelestialObjectModel} from "../models/celestial-objects-model";

export const convertObjectToModel = (item: CelestialObjectContract): CelestialObjectModel => {
    return {
        name: item.name,
        radius: item.radius_km,
        mass: item.earth_mass,
        radiusMultiplier: item.radius_multiplier,
        timeMultiplier: item.time_multiplier,
        distance: item.symbolic_distance
    }
}
