const fs = require('fs');

const width = 25;
const height = 6;

const memory = fs.readFileSync(`${__dirname}/input`, {encoding: 'UTF-8'});
const digitsMemory = memory.split('').map(Number);

function constructLayer(pointer, currentMemory) {
    const layer = [];
    for(let i = 0; i < height; i++) {
        layer.push([]);
        for(let j = 0; j < width; j++) {
            layer[i][j] = currentMemory[pointer + (i * width + j)];
        }
    }
    return layer;
}

function getLayers(currentMemory) {
    const maxLayers = currentMemory.length / (width * height);
    const layers = [];
    for (let i=0; i<maxLayers; i++) {
        layers.push(constructLayer(i * width * height, currentMemory));
    }
    const layerInfos = layers.map(layer => getLayerInfo(layer));
    layerInfos.sort((a, b) => a.zero - b.zero);
    console.log(layerInfos[0].one * layerInfos[0].two);
    return layers;
}

function getLayerInfo(layer) {
    let noOfZero = 0;
    let noOfOne = 0;
    let noOfTwo = 0;
    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++) {
            if (layer[j][i] === 0) {
                noOfZero++;
            } else if (layer[j][i] === 1) {
                noOfOne++;
            } else if (layer[j][i] === 2) {
                noOfTwo++
            }
        }
    }
    return {
        zero: noOfZero,
        one: noOfOne,
        two: noOfTwo
    }
}

function reconstructImage(layers) {
    const image = [];
    for(let i = 0; i < height; i++) {
        image.push([]);
        for(let j = 0; j < width; j++) {
            let pixelValue = -1;
            layers.forEach((layer) => {
                if (pixelValue === -1 && layer[i][j] !== 2) {
                    pixelValue = layer[i][j];
                }
            })
            image[i][j] = pixelValue;
        }
    }
    return image;
}

function previewImage(image) {
    for(let i = 0; i < height; i++) {
        let str = '';
        for(let j = 0; j < width; j++) {
            str = `${str}${image[i][j] === 0 ? ' ' : '+'}`;
        }
        console.log(str);
    }
}

previewImage(reconstructImage(getLayers(digitsMemory)))