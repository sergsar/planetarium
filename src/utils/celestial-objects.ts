import { CelestialObjectContract } from '../contracts/celestial-object-contract'
import { CelestialObjectModel } from '../models/celestial-objects-model'

export const convertObjectToModel = (
  item: CelestialObjectContract
): CelestialObjectModel => {
  return {
    name: item.name,
    radius: item.radius_km,
    mass: item.earth_mass,
    radiusMultiplier: item.radius_multiplier,
    rotationMultiplier: item.self_rotation_multiplier,
    distance: item.symbolic_distance,
    eqImageUrl: item.eq_image_url
  }
}
