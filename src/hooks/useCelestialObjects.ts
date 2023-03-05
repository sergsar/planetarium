import {CelestialObjectModel} from "../models/celestial-objects-model";
import {useEffect, useState} from "react";
import {convertObjectToModel} from "../utils/celestial-objects";
import {CelestialObjectsContract} from "../contracts/celestial-object-contract";

export const useCelestialObjects = (): { data: CelestialObjectModel[] | undefined } => {
    const [data, setData] = useState<CelestialObjectModel[]>()

    useEffect(() => {
        fetch(`data/planets-data.json`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then((res) => res.json())
            .then((json: CelestialObjectsContract) => {
                const data = json.objects.map((item) =>
                    convertObjectToModel(item)
                )
                setData(data)
            })
    }, [])
    return {
        data
    }
}
