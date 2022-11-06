import {Box3, Object3D, Vector3} from "three";

export function fitCameraToObject(object: Object3D, hFov: number, aspect: number) {
    const boundingBox = new Box3();
    boundingBox.setFromObject(object);

    let size = new Vector3();
    boundingBox.getSize(size);

    // get the max side of the bounding box
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = hFov * (Math.PI / 180);
    const fovh = 2 * Math.atan(Math.tan(fov / 2) * aspect);
    return Math.min(Math.abs(maxDim / 4 * Math.tan(fov * 2)), Math.abs(maxDim / 4 * Math.tan(fovh * 2)));

}
