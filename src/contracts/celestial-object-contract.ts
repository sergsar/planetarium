export interface CelestialObjectsContract {
    objects: CelestialObjectContract[]
}

export interface CelestialObjectContract {
    name: string
    radius_km: number
    radius_multiplier: number
    symbolic_distance: number
    earth_mass: number
}
