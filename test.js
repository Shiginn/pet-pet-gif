const fs = require("fs")
const petpetgif = require("./index")

async function petpetCommand() {
    const gif = await petpetgif("./example/input.png")

    fs.writeFileSync("./example/output_test.gif", gif, err => {
        console.log(err)
    })
    console.log("Succesfully generated gif")

}

petpetCommand()