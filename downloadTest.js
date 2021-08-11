const fs = require('fs');
const download = require('download');

const testTruc = async () =>{
    //await download('https://www.herobrine.fr/pics/quad_root.png', './dist');

    const test = await fs.writeFileSync('./dist/foo.png', await download("https://www.herobrine.fr/pics/quad_root.png"));
    console.log(test)
    /*download('herobrine.fr/pics/quad_root.png').pipe(fs.createWriteStream("dist/foo.jpg"));

    await Promise.all([
        "herobrine.fr/pics/quad_root.png"
    ].map(url => download(url, './dist')));
*/
}

testTruc();