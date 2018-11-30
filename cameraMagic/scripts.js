document.addEventListener('DOMContentLoaded', appStart)

let camera, video
let ctx, canvas

function appStart() {
    video = document.querySelector('#player');
    canvas = document.querySelector('#magicCanvas')
    ctx = canvas.getContext('2d')


    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
            camera = mediaStream
            video.srcObject = camera
            video.addEventListener('loadedmetadata', () => {
                video.play()
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                animate()
            })

        })

}

function animate() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0, 0, width, height)
    // pixels = blueBox(pixels)
    // pixels = darker(pixels);
    // pixels = bw(pixels);
    // pixels = contrast(pixels);
    // pixels = blur(pixels);
    pixels = blueBox(pixels);
    ctx.putImageData(pixels, 0, 0)
    requestAnimationFrame(animate)
}

function darker(pixels) {
    let correction = -50;
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += correction; //R
        pixels.data[i + 1] += correction; //G
        pixels.data[i + 2] += correction; //B
    }
    return pixels;
}

function bw(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];
        const avg = (r + g + b) / 3;
        pixels.data[i] = avg; //R
        pixels.data[i + 1] = avg; //G
        pixels.data[i + 2] = avg; //B
    }
    return pixels;
}


function blur(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];

        const r2 = pixels.data[i + 4];
        const g2 = pixels.data[i + 5];
        const b2 = pixels.data[i + 6];

        const r3 = pixels.data[i + 8];
        const g3 = pixels.data[i + 9];
        const b3 = pixels.data[i + 10];

        const avgRed = (r + r2 + r3) / 3;
        const avgGreen = (g + g2 + g3) / 3;
        const avgBlue = (b + b2 + b3) / 3;


        pixels.data[i] = avgRed; //R
        pixels.data[i + 1] = avgGreen; //G
        pixels.data[i + 2] = avgBlue; //B

        pixels.data[i + 4] = avgRed; //R
        pixels.data[i + 5] = avgGreen; //G
        pixels.data[i + 6] = avgBlue; //B

        pixels.data[i + 8] = avgRed; //R
        pixels.data[i + 9] = avgGreen; //G
        pixels.data[i + 10] = avgBlue; //B
    }
    return pixels;
}

function blueBox(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];

        const avg = (r + g + b) / 3;

        if (avg > 190) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

function contrast(pixels, amount = 40) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i];
        const g = pixels.data[i + 1];
        const b = pixels.data[i + 2];
        const avg = (r + g + b) / 3;

        if (avg >= 127) {
            pixels.data[i] += amount; //R
            pixels.data[i + 1] += amount; //G
            pixels.data[i + 2] += amount; //B
        }
        else {
            pixels.data[i] -= amount; //R
            pixels.data[i - 1] -= amount; //G
            pixels.data[i + 2] -= amount; //B-
        }
    }
    return pixels;
}

// function blueBox(pixels) {
//     for (let i = 0; i < pixels.data.length; i += 4) {
//         pixels.data[i] += 50
//         pixels.data[i + 1] -= 50
//         pixels.data[i + 2] = 0
//         pixels.data[i + 3] = 120
//     }
//     return pixels
// }