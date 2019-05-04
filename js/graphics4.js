function keyboard()
				{
				var total=["o","A8","B8","C8","D8","E8","F8","G8","H8","o", "A7","B7","C7","D7","E7","F7","G7","H7","o","A6","B6","C6","D6","E6","F6","G6","H6","o","A5","B5","C5","D5","E5","F5","G5","H5","o","A4","B4","C4","D4","E4","F4","G4","H4","o","A3","B3","C3","D3","E3","F3","G3","H3","o","A2","B2","C2","D2","E2","F2","G2","H2","o","A1","B1","C1","D1","E1","F1","G1","H1"]			
				var i=1;
				while(i<72)
					{
					var button=document.createElement("INPUT");
					button.setAttribute("type", "submit");
					button.setAttribute("value",total[i]);
					button.setAttribute("id",total[i]);
					button.setAttribute("onclick","temp(this)");
					if (i%2==1)
						{
						button.setAttribute("class","white");
						}
					else
						{
						button.setAttribute("class","black");
						}
					document.getElementById("div").appendChild(button);
					if(i==8 || i==17 || i==26 || i==35 || i==44 || i==53 || i==62)
						{
						var br=document.createElement("br");
						i+=1
						document.getElementById("div").appendChild(br);
						}
					i=i+1
					} 
				}
function bishop(input)
    {
    var temp=input.charCodeAt(0);
	var temp1=input[1];
	var out=[]
	var inp=inp2=parseInt(temp);
	var inp1=inp3=parseInt(temp1);
	for (i=1;i<9;i++)
	{
	inp+=1
	inp1+=1
	if (inp>64 && inp<73 && inp1>0 && inp1<9)
		{
		out.push(String.fromCharCode(inp)+inp1.toString())
		}
	inp2-=1
	inp3-=1
	if (inp2>64 && inp2<73 && inp3>0 && inp3<9)
		{
		out.push(String.fromCharCode(inp2)+inp3.toString())
		}
	}
	var inp=inp2=parseInt(temp);
	var inp1=inp3=parseInt(temp1);
	for (i=1;i<9;i++)
	{
	inp+=1
	inp1-=1
	if (inp>64 && inp<73 && inp1>0 && inp1<9)
		{
		out.push(String.fromCharCode(inp)+inp1.toString())
		}
	inp2-=1
	inp3+=1
	if (inp2>64 && inp2<73 && inp3>0 && inp3<9)
		{
		out.push(String.fromCharCode(inp2)+inp3.toString())
		}
	}
	return out
	}
function rookMove(input)
    {
	var out=[]
	var temp=input.charCodeAt(0);
	var temp1=parseInt(input[1]);
	for (i=65;i<temp;i++)
	{out.push(String.fromCharCode(i)+input[1])}
	for (i=temp+1;i<73;i++)
	{out.push(String.fromCharCode(i)+input[1])}
	for (i=1;i<temp1;i++)
	{out.push(input[0]+i.toString())}
	for (i=temp1+1;i<9;i++)
	{out.push(input[0]+i.toString())}
	return out
	}
function queen(input)
    {
	var out=[]
	out1=rookMove(input)
	out2=bishop(input)
    for (i=0;i<out1.length;i++)
    {
        out.push(out1[i])
    }
    for (i=0;i<out2.length;i++)
    {
        out.push(out2[i])
    }
	return out
    }
var chess=['A8','C8','E8','G8','B7', 'D7', 'F7', 'H7', 'A6', 'C6', 'E6', 'G6', 'B5', 'D5', 'F5', 'H5', 'A4', 'C4', 'E4', 'G4', 'B3', 'D3', 'F3', 'H3', 'A2', 'C2', 'E2', 'G2', 'B1', 'D1', 'F1', 'H1','B8', 'D8', 'F8', 'H8','A7', 'C7', 'E7', 'G7', 'B6', 'D6', 'F6', 'H6', 'A5', 'C5', 'E5', 'G5', 'B4', 'D4', 'F4', 'H4', 'A3', 'C3', 'E3', 'G3', 'B2', 'D2', 'F2', 'H2', 'A1', 'C1', 'E1', 'G1']
var move=['A8','C8','E8','G8','B7', 'D7', 'F7', 'H7', 'A6', 'C6', 'E6', 'G6', 'B5', 'D5', 'F5', 'H5', 'A4', 'C4', 'E4', 'G4', 'B3', 'D3', 'F3', 'H3', 'A2', 'C2', 'E2', 'G2', 'B1', 'D1', 'F1', 'H1','B8', 'D8', 'F8', 'H8','A7', 'C7', 'E7', 'G7', 'B6', 'D6', 'F6', 'H6', 'A5', 'C5', 'E5', 'G5', 'B4', 'D4', 'F4', 'H4', 'A3', 'C3', 'E3', 'G3', 'B2', 'D2', 'F2', 'H2', 'A1', 'C1', 'E1', 'G1']
var out=[]
var e=m=0
function rando(ches)
    {
	var i=parseInt(Math.random()*ches.length)
	return ches[i]
    }
function nQueens(input)
	{
	if (chess.length==0)
	{
		for (i=0;i<move.length;i++)
		{
			chess.push(move[i])
		}
	m=0
	out=[]
	e+=1
	}
	if (m==0)
	{
	a=input
	m=1
	}
	else
	{
	a=rando(chess)
	}
	var temp=chess.indexOf(a)
	chess.splice(temp,1)
	var q=queen(a)
	out.push(a)
	for(i=0;i<q.length;i++)
	{
	var temp1=q[i]
	var index=chess.indexOf(temp1)
	if (index!=-1)
	{
	chess.splice(index,1)
	}
	}
	if (out.length!=8)
	{
	nQueens(input)
	return out
	}
	else
	{
	return out
	}	
	}
function temp(input)
	{
	col=['A8','C8','E8','G8','B7', 'D7', 'F7', 'H7', 'A6', 'C6', 'E6', 'G6', 'B5', 'D5', 'F5', 'H5', 'A4', 'C4', 'E4', 'G4', 'B3', 'D3', 'F3', 'H3', 'A2', 'C2', 'E2', 'G2', 'B1', 'D1', 'F1', 'H1','B8', 'D8', 'F8', 'H8','A7', 'C7', 'E7', 'G7', 'B6', 'D6', 'F6', 'H6', 'A5', 'C5', 'E5', 'G5', 'B4', 'D4', 'F4', 'H4', 'A3', 'C3', 'E3', 'G3', 'B2', 'D2', 'F2', 'H2', 'A1', 'C1', 'E1', 'G1']
	for (i in col)
	{
	document.getElementById(col[i]).style.backgroundImage="none"
	document.getElementById(col[i]).style.color="black"
	}
	var a=input.id
	s=nQueens(a)
	for (i=0;i<s.length;i++)
	{
	var screen=s[i]
	document.getElementById(screen).style.backgroundImage="url('https://cdn0.iconfinder.com/data/icons/online-shopping-3/78/Shopping_icons_vector-11-512.png')"
	document.getElementById(screen).style.backgroundSize="100% 100%"
	document.getElementById(screen).style.color="transparent"
	}
	document.getElementById("out").innerHTML=s
	}