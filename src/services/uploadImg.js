export default function uploadImg(username, file) {
  //need accesstoken
  const dropboxToken =
    "cjIr0_-l1IkAAAAAAAAATyip01UKY7QYj04vxBvGes4OtKs-jlsIZcC4acHNG_JD";
  var xhr = new XMLHttpRequest();

  let safeName = username
    .replace("ø", "%C3%B5")
    .replace("å", "%C3%A5")
    .replace("æ", "%C3%A6")
    .replace("Ø", "%C3%98")
    .replace("Å", "%C3%85")
    .replace("Æ", "%C3%86");

  xhr.upload.onprogress = function(evt) {
    var percentComplete = parseInt((100.0 * evt.loaded) / evt.total);
    // Upload in progress. Do something here with the percent complete.
  };

  xhr.onload = function() {
    if (xhr.status === 200) {
      var fileInfo = JSON.parse(xhr.response);
      // Upload succeeded. Do something here with the file info.
      console.log(fileInfo);
    } else {
      var errorMessage = xhr.response || "Unable to upload file";
      // Upload failed. Do something here with the error.
    }
  };

  xhr.open("POST", "https://content.dropboxapi.com/2/files/upload");
  xhr.setRequestHeader("Authorization", "Bearer " + dropboxToken);
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.setRequestHeader(
    "Dropbox-API-Arg",
    JSON.stringify({
      path: "/" + safeName + ".jpeg",
      mode: "add",
      autorename: true,
      mute: false
    })
  );

  xhr.send(file);
}
