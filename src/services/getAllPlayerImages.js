

export default function getAllPlayerImages() {
    require("dotenv").config();
    const dpxAccess = process.env.REACT_APP_DPX_TOKEN;
    
    let fetch = require('isomorphic-fetch');
    let Dropbox = require('dropbox').Dropbox;
    const path =  "";
    let dbx = new Dropbox({ accessToken: dpxAccess, fetch: fetch });
    return dbx.filesListFolder({path: path })
    
}

