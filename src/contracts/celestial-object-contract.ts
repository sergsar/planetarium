export interface CelestialObjectsContract {
    objects: CelestialObjectContract[]
}

export interface CelestialObjectContract {
    name: string
    radius_km: number
    radius_multiplier: number
    self_rotation_multiplier: number
    symbolic_distance: number
    earth_mass: number
    eq_image_url: string
}
