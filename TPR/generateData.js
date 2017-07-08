const _ = require('lodash');
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writer = csvWriter({ headers: ['id', 'imgfilename', 'imgtimestamp', 'imgfps', 'emotionapi', 'participant', 'block', 'calm', 'surprise', 'joy', 'others'] })

function random (low, high) {
    return Math.random() * (high - low) + low;
}

function nNorRandom () {
    let numbers = new Array(4), sum;
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = random(0, 100)
    }
    sum = _.sum(numbers);
    numbers = _.map(numbers, (i) => _.round(i / sum, 2));
    return numbers
}

let aemotion = [];

const fpsL = {
    '1fp2s': 2,
    '1fps': 1,
    '2fps': 1 / 2,
    '3fps': 1 / 3,
};



let lght;
_.each(fpsL, (val, fps) => {

    lght = 900 / val;

    console.log('l', lght);
    

    _.each(['ms-emotion', 'google-vision', 'aws-rekognition'], (api, index) => {


        Array.from({ length: lght }, (v, k) => {
            aemotion = nNorRandom();
            writer.write([k + lght * index, 'neutral-' + fps  + '-' + k + '.jpg', 'imgtimestamp', fps, api, 1, 1, aemotion[0], aemotion[1], aemotion[2], aemotion[3]])
        });

    });

})



writer.end()