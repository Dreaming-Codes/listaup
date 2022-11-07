import {Box3, Object3D, Vector3} from "three";

export function fitCameraToObject(object: Object3D, hFov: number, aspect: number) {
    const boundingBox = new Box3();
    boundingBox.expandByObject(object);

    let size = boundingBox.getSize(new Vector3());

    console.log(size);

    const maxSize = Math.max(size.x, size.y, size.z);

    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * hFov) / 360));
    const fitWidthDistance = fitHeightDistance / aspect;

    return Math.max(fitHeightDistance, fitWidthDistance);
}
