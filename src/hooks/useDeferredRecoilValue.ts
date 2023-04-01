import {RecoilValue, useRecoilValue} from "recoil";
import {useDeferredValue} from "react";

const useDeferredRecoilValue = <T>(recoil: RecoilValue<T>) => {
    const value = useRecoilValue(recoil)
    return useDeferredValue(value)
}

export default useDeferredRecoilValue
