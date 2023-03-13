export const normalize = ({ x, y, z }: { x: number, y: number, z: number }) => {
    const magnitude = Math.sqrt(x * x + y * y + z * z) || 1

    return { x: x / magnitude, y: y / magnitude, z: z / magnitude }
}

export const getAngle = (pos1: { x: number, y: number, z: number}, pos2: { x: number, y: number, z: number}) => {
    const dot = pos1.x * pos2.x + pos1.y * pos2.y + pos1.z * pos2.z
    const magnitude1 = Math.sqrt(pos1.x * pos1.x + pos1.y * pos1.y + pos1.z * pos1.z)
    const magnitude2 = Math.sqrt(pos2.x * pos2.x + pos2.y * pos2.y + pos2.z * pos2.z)
    return Math.acos(dot / (magnitude1 * magnitude2))
}

