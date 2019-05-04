function download(filename, text1,text2,text3,text4,text5) {
    var createDl = document.createElement('a');
    createDl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text1)+ encodeURIComponent(text2)+ encodeURIComponent(text3)+ encodeURIComponent(text4)+ encodeURIComponent(text5));
    createDl.setAttribute('download', filename);
    createDl.style.display = 'none';
    document.body.appendChild(createDl);
    createDl.click();
    document.body.removeChild(createDl);
}


document.getElementById("downloadMe").onclick = function(){
	download('HelloWorld.java', 'public class HelloWorld {\n','public static void main(String[] args) {\n' ,'System.out.print("Hello world");\n','}\n','}\n');
}