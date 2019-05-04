function download(filename, text1,text2,text3,text4,text5,text6,text7,text8,text9,text10,text11,text12,text13,text14,text15,text16,text17,text18,text19,text20,text21,text22) {
    var createDl = document.createElement('a');
    createDl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text1)+ encodeURIComponent(text2)+ encodeURIComponent(text3)+ encodeURIComponent(text4)+ encodeURIComponent(text5)+ encodeURIComponent(text6)+ encodeURIComponent(text7)+ encodeURIComponent(text8)+ encodeURIComponent(text9)+ encodeURIComponent(text10)+ encodeURIComponent(text11)+ encodeURIComponent(text12)+ encodeURIComponent(text13)+ encodeURIComponent(text14)+ encodeURIComponent(text15)+ encodeURIComponent(text16)+ encodeURIComponent(text17)+ encodeURIComponent(text18)+ encodeURIComponent(text19) + encodeURIComponent(text20)+ encodeURIComponent(text21)+ encodeURIComponent(text22));
    createDl.setAttribute('download', filename);
    createDl.style.display = 'none';
    document.body.appendChild(createDl);
    createDl.click();
    document.body.removeChild(createDl);
}


document.getElementById("downloadMe").onclick = function(){
	download('TowersOfHanoi.java','import java.util.Scanner;\n','\n','public class TowersOfHanoi {\n','\n','public static void main(String[] args) {\n','TowersOfHanoi towersOfHanoi = new TowersOfHanoi();\n','System.out.print("Enter number of discs: ");\n','Scanner scanner = new Scanner(System.in);\n','int discs = scanner.nextInt();\n','towersOfHanoi.solve(discs, "A", "B", "C");\n','}\n','\n', 'public void solve(int n, String start, String auxiliary, String end) {\n','if (n == 1) {\n', 'System.out.println(start + " -> " + end);\n','} else {\n','solve(n - 1, start, end, auxiliary);\n','System.out.println(start + " -> " + end);\n','solve(n - 1, auxiliary, start, end);\n','}\n','}\n','}\n');
}