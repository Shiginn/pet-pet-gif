const path = require('path')
const _ = require('lodash')

const Jimp = require("jimp")
const Gifwrap = require("gifwrap")

const FRAMES = 10

const defaultOptions = {
    resolution: 128,
    delay: 2.5,
}

module.exports = async (avatarURL, options = {}) => {
    options = _.defaults(options, defaultOptions) // Fill in the default option values

    let gifFrames = []

    const avatar = await Jimp.read(avatarURL)

    for (let i = 0; i < FRAMES; i++) {
        
        const j = i < FRAMES / 2 ? i : FRAMES - i
        
        const width = 0.8 + j * 0.02
        const height = 0.8 - j * 0.05
        const offsetX = (1 - width) * 0.5 + 0.1
        const offsetY = (1 - height) - 0.08
        
        const frame = await Jimp.read(path.resolve(__dirname, `img/pet${i}.gif`))

        avatar.resize(options.resolution * width, options.resolution * height)

        frame.resize(options.resolution, options.resolution)
        .composite(avatar, options.resolution * offsetX, options.resolution * offsetY, {
            mode: Jimp.BLEND_DESTINATION_OVER
        })

        const gifFrame = new Gifwrap.GifFrame(frame.bitmap , {
            delayCentisecs : options.delay
        })
        gifFrames.push(gifFrame)
    }

    Gifwrap.GifUtil.quantizeDekker(gifFrames)

    const codec = new Gifwrap.GifCodec()
    const gif = await codec.encodeGif(gifFrames)
    return gif.buffer
}