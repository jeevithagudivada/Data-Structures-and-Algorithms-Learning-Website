function download(filename,text1,text2) {
    var createDl = document.createElement('a');
    createDl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text1)+encodeURIComponent(text2));
    createDl.setAttribute('download', filename);
    createDl.style.display = 'none';
    document.body.appendChild(createDl);
    createDl.click();
    document.body.removeChild(createDl);
}


document.getElementById("downloadMe").onclick = function(){
	download("bubblesort.txt", "hi bye\n","jee");
}