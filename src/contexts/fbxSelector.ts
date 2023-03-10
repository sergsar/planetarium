import {selectorFamily} from "recoil";
import {FBXLoader} from "three-stdlib";
import {Group} from "three";

const fbxSelector = selectorFamily<{ group: Group }, string>({
    key: 'FbxSelector',
    get: (url) => async () => {
        const fbxLoader = new FBXLoader()
        const group = await fbxLoader.loadAsync(url)
        return { group }
    },
    dangerouslyAllowMutability: true
})

export default fbxSelector
