export default function getplayerImages(username) {
  const dpxAccess = process.env.DPX_TOKEN;

  let fetch = require("isomorphic-fetch");
  let Dropbox = require("dropbox").Dropbox;
  const imgPath = "/" + username + ".jpeg";
  let dbx = new Dropbox({
    accessToken:
      "cjIr0_-l1IkAAAAAAAAATyip01UKY7QYj04vxBvGes4OtKs-jlsIZcC4acHNG_JD",
    fetch: fetch
  });
  return dbx.filesDownload({ path: imgPath });
}
