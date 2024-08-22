export function downloadWithProgress(file) {
    const startTime = new Date().getTime();
    const IMG_URL=file.datei;
    const FILE_NAME=file.name;
    let request = new XMLHttpRequest();

    request.responseType = "blob";
    request.open("get", IMG_URL, true);
    request.send();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const imageURL = window.URL.createObjectURL(this.response);

            const anchor = document.createElement("a");
            anchor.href = imageURL;
            anchor.download = FILE_NAME;
            document.body.appendChild(anchor);
            anchor.click();
        }
    };

    request.onprogress = function (e) {
        const percent_complete = Math.floor((e.loaded / e.total) * 100);

        const duration = (new Date().getTime() - startTime) / 1000;
        const bps = e.loaded / duration;

        const kbps = Math.floor(bps / 1024);

        const time = (e.total - e.loaded) / bps;
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);

        console.log(
            `${percent_complete}% - ${kbps} Kbps - ${minutes} min ${seconds} sec remaining`
        );
    };
}

export function downloadUsingAnchorElement(file) {
    const IMG_URL=file.datei;
    const FILE_NAME=file.name;
    const anchor = document.createElement("a");
    anchor.href = IMG_URL;
    anchor.download = FILE_NAME;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
export function downloadUsingAnchorElementNewTab(file) {
    window.open(file.datei, '_blank');
}