
export default function getAllPlayerImages() {
    let fetch = require('isomorphic-fetch');
    let Dropbox = require('dropbox').Dropbox;
    const path =  "";
    let dbx = new Dropbox({ accessToken: "cjIr0_-l1IkAAAAAAAAAF15RI8jXaBQJeb-2tgTyhSlwnYInynbnpoxHOLyfILfO", fetch: fetch });
    return dbx.filesListFolder({path: path })
    
}

