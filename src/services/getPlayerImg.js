
export default function getplayerImages(username) {
  require("dotenv").config();
  const dpxAccess = process.env.REACT_APP_DPX_TOKEN;
  

  let fetch = require("isomorphic-fetch");
  let Dropbox = require("dropbox").Dropbox;
  const imgPath = "/" + username + ".jpeg";
  let dbx = new Dropbox({
    accessToken:
      dpxAccess,
    fetch: fetch
  });
  return dbx.filesDownload({ path: imgPath });
}
