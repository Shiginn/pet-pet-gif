# pet-pet-gif


Given a square avatar, generate a petting gif (known as "petpet" or "pet the") using [Jimp](https://www.npmjs.com/package/jimp) and [Gifwrap](https://www.npmjs.com/package/gifwrap) instead of Canvas and Gifencoder.

The avatar will bounce up and down to simulate the petting.

Inspired by [benisland](https://benisland.neocities.org/petpet/) and forked from [aDu](https://github.com/aDu/pet-pet-gif).

Further meme info: https://knowyourmeme.com/memes/pet-the-x-petthe-emotes

## Demo

![Input](/example/input.png) → ![Output](/example/output.gif)

You can also try it out on https://hellist.com/discord (with the `;pet` command).

## Usage

`npm i https://github.com/Shiginn/pet-pet-gif.git`

Two examples in one (using [Eris](https://www.npmjs.com/package/eris) in the example but should be similar for other Discord Bot API wrappers).

```
const petPetGif = require('pet-pet-gif')

...

const petCommandExample = async (param) => {
    let animatedGif = await petPetGif(param.member.avatarURL)

    // Example #1: Reply with the image attached
    bot.createMessage(param.channel.id,
        {
          "embed": {
            "image": {
              "url": 'attachment://pet.gif',
            }
          }
        },
        {
            file: animatedGif,
            name: 'pet.gif'
        })

    // Example #2: Or you could save it somewhere.
    fs.writeFile('idi_nahui.gif', animatedGif, function (err) {
        console.log('Cyka blyat! An error occurred!')
    })
}
```

## Options
You can optionally specify the `options` argument (each field in the `options` field is optional).

```
let animatedGif = await petPetGif(param.member.avatarURL, {
    resolution: 128, // The width (or height) of the generated gif
    delay: 2.5, // Delay between each frame in centiseconds (1 cs = 10 ms). Defaults to 2.5 (~40 fps).
})
```


## Feature requests

Feel free to submit feature requests by [clicking here](https://github.com/Shiginn/pet-pet-gif/issues/new?assignees=aDu&labels=&template=feature_request.md&title=i+has+big+idea+for+u%2C+pls+implement) - I'd probably be happy to implement them!

Or make a pull request :).
