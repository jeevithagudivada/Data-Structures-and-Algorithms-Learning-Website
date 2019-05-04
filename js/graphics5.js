
var density = 0.05;
var fColor = '#512';
var fHighlihtColor = '#f36';
var sColor = 'rgba(16,96,32,0.7)';

// yCanvas object for drawing
function yCanvas(cnv) {
	this.width = cnv.width;
	this.height = cnv.height;
	this.radius = Math.round(Math.sqrt(this.width * this.height / vertices.length) * density);
	if (this.radius < 1) this.radius = 1;
	this.context = cnv.getContext('2d');
	this.context.fillStyle = fColor;
	this.context.strokeStyle = sColor;
	this.context.lineWidth = this.radius / 3;
	this.context.clearRect(0, 0, this.width, this.height);
}

yCanvas.prototype.toString = function () {
	return this.width + "x" + this.height + ": radius = " + this.radius;
}
// Vertice 
function Edge(u, v) {
	this.v = new Array();
	this.v[0] = u;
	this.v[1] = v;
	this.weight = u.distance(v);
	u.setConnectionFlag();
	v.setConnectionFlag();
}

Edge.compareEdges = function(e1, e2) {
	if (e1.weight > e2.weight) return  1;
	if (e1.weight < e2.weight) return -1;
	else return 0;
}


// show the vertex (x,y) with parameters from cnv
Edge.prototype.draw = function(yCnv, highlight) {
	if (highlight) {
		var oldStroke = yCnv.context.strokeStyle;
		yCnv.context.strokeStyle = 'rgba(255,55,55,0.7)';
		var oldLineWidth = yCnv.context.lineWidth;
		yCnv.context.lineWidth = 3* yCnv.context.lineWidth;
	}
	yCnv.context.beginPath();
	yCnv.context.moveTo(this.v[0].x * yCnv.width, this.v[0].y * yCnv.height);
	yCnv.context.lineTo(this.v[1].x * yCnv.width, this.v[1].y * yCnv.height);
	yCnv.context.closePath();
	yCnv.context.stroke();
	if (highlight) {
		yCnv.context.strokeStyle = oldStroke;
		yCnv.context.lineWidth = oldLineWidth;
	}
}

Edge.prototype.exist = function(storage) {
	for (i in storage) {
		if  (
			(this.v[0].x == storage[i].v[0].x && this.v[0].y == storage[i].v[0].y && this.v[1].x == storage[i].v[1].x && this.v[1].y == storage[i].v[1].y)
			||
			(this.v[1].x == storage[i].v[0].x && this.v[1].y == storage[i].v[0].y && this.v[0].x == storage[i].v[1].x && this.v[0].y == storage[i].v[1].y)
			)
			return true;
	}
	return false;
};

Edge.prototype.toString = function() {
	return "(" + this.v[0].x + ";" + this.v[0].y + ") - (" + this.v[1].x + ";" + this.v[1].y + ") = " + this.weight;
};
var vertices = new Array();
var edges = new Array();
var distances = new Array();
var infinDist = 2;
var nullDist = 0.016; // will changed
var maxNumberOfVertices = 500;
var delay = 200;
var stop = true; // for stop animation

// Generate graph by chained edges
function yGenerate(nVert, nEdg, nextVert, refreshVertices) {
	stop = true;
	var nVertices = parseInt(nVert.value) || 0;
	if (nVertices > maxNumberOfVertices) {
		alert('To many vertices. Must be maximum ' + maxNumberOfVertices);
		nVertices = maxNumberOfVertices;
	}
	if (nVertices < 2) {
		alert("This is a very interesting choice, but let there be two vertices");
		nVertices = 2;
	}
	var nEdges =  parseInt(nEdg.value) || 0;
	if (nEdges > nVertices * (nVertices - 1) / 2) {
		alert('To many edges asked. Must be maximum ' + nVertices * (nVertices - 1) / 2);
		nEdges = nVertices * (nVertices - 1) / 2;
	}
	// generate a lot of vertices
	verticesGenerator(nVertices, refreshVertices);
	// generate a lot of edges
	edges.length = 0;
	var from = Math.round(Math.random() * nVertices) % nVertices;
	var i = 0;
	while (i < nEdges || !graphIsConnectedFastHeuristic()) {
		var to = window[nextVert](from);
		if (to < 0) { // no more way
			from = (from + 1) % nVertices;
			continue;
		}
		e = new Edge(vertices[from], vertices[to]);
		if (!e.exist(edges)) {
			edges[i++] = e;
		}
		from = to;
	}
	edges.sort(Edge.compareEdges);
}

function verticesGenerator(n, refreshVertices){
	if (vertices.length != n || refreshVertices) {
		vertices.length = 0;
		// generate a lot vertices
		for (i = 0; i < n; i++) {
			var minDist = 0; 
			while(minDist < nullDist) {
				var v = new Vertice(Math.random(), Math.random(), i);
				minDist = v.minDistance(vertices);
			}
			vertices[i] = v;
		}
	}
	distances.length = 0;
	for (i = 0; i < vertices.length; i++) {
		distances[i] = new Array(vertices.length);
		vertices[i].mark = i;
		vertices[i].connected = false;
	}
	for (i = 0; i < vertices.length; i++) {
		distances[i][i] = infinDist;
		for (j = i + 1; j < vertices.length; j++) {
			distances[i][j] = distances[j][i] = vertices[i].distance(vertices[j])
		}
	}
}

// generation of the next random vertex after from
function chain(from) {
	var to = from;
	while (from == to || to > vertices.length - 1) {
		to = Math.round(Math.random() * vertices.length);
	}
	return to;
}

// find nearest vertece conected with 'from'
function nearest(from) {
	var to = indexOfMin(distances[from]);
	if (distances[from][to] < infinDist) {
		distances[from][to] = distances[to][from]= infinDist;
		return to;
	}
	return -1;
}


// Show graph
function yShow(cnv) {
	var yCnvs = !cnv.context? new yCanvas(cnv): cnv; // Canvas or yCanvas?
	yShowEdges(yCnvs);
	yShowVertices(yCnvs);
}

function yShowEdges(cnv){
	var yCnvs = !cnv.context? new yCanvas(cnv): cnv; // Canvas or yCanvas?
	for (var i = 0; i < edges.length; i++) {
		edges[i].draw(yCnvs);
	}
}

function yShowVertices(cnv){
	var yCnvs = !cnv.context? new yCanvas(cnv): cnv; // Canvas or yCanvas?
	for (var i = 0; i < vertices.length; i++) {
		vertices[i].draw(yCnvs);
	}
}

// Play algorithm 'alg' for canvas 'cnv'
function yPlay(cnv, alg) {
	stop = false;
	var yCnvs = !cnv.context? new yCanvas(cnv): cnv; // Canvas or yCanvas?
	yShow(yCnvs);
	var solution = new Array();
	solution.length = 0;
	function next() {
		if (stop) return;
		var e = alg(solution);
		solution[solution.length] = e;
		e.draw(yCnvs, true);
		e.v[0].drawHighliht(yCnvs);
		e.v[1].drawHighliht(yCnvs);
		if(!stop && solution.length < vertices.length - 1){
			window.setTimeout(next, delay);
		}
	}
	next();
}

function clearConnectionFlag() {
	for (var i in vertices)
		vertices[i].clearConnectionFlag();
}


// Prim's algorithm
function aPrim(sol) {
	if (sol.length == 0) {
		return edges[0];
	} else {
		for (var i = 0; i < edges.length; i++) {
			var u = edges[i].v[0].exist(sol);
			var v = edges[i].v[1].exist(sol);
			if ((u && !v)||(!u && v)) {
				return edges[i];
			}
		}
	}
}

// Kruskal's algorithm
function aKruskal(sol) {
	if (sol.length == 0) {
		// Clear old marks of vertices
		for (var i in vertices) {	
			vertices[i].mark = i;
		}
		replaceMarks(edges[0].v[0].mark, edges[0].v[1].mark);
		return edges[0];
	} else {
		for (var i = 0; i < edges.length; i++) {
			if (edges[i].v[0].mark != edges[i].v[1].mark) {
				replaceMarks(edges[i].v[0].mark, edges[i].v[1].mark);
				return edges[i];
			}
		}
	}
}

// Need for join icelands in Kraskal's algorithm
function replaceMarks(from, to) {
	for(var i = 0; i < vertices.length; i++) {
		if (vertices[i].mark == from)
			vertices[i].mark = to;
	}
}

function graphIsConnected () {
	for (var i = 0; i < vertices.length; i++) {
		var connected = false;
		for (e in edges) {
			if (vertices[i].equals(edges[e].v[0]) || vertices[i].equals(edges[e].v[1])) {
				connected = true;
				break;
			}
		}
		if (!connected) return false;
	}
	return true;
}

function graphIsConnectedFastHeuristic () {
	for (var i = 0; i < vertices.length; i++) {
		if (!vertices[i].connected) return false;
	}
	return true;
}

// ----- utilities -----
// find index of minimal element in the array 'a'
function indexOfMin(a) {
	var nMin = 0;
	for (i in a) {
		if (a[i] < a[nMin])
			nMin = i;
	}
	return nMin;
}// 2015 (c) dr.Igor Mazurok: igor@mazurok.com
// Vertice 
function Vertice(x, y, id) {
  this.x = x || 0;
  this.y = y || 0;
  this.mark = id; // for future purpose
  this.connected = false;
}

// show the vertex (x,y) with parameters from cnv
Vertice.prototype.draw = function(yCnv) {
	yCnv.context.beginPath();
	yCnv.context.arc(this.x * yCnv.width, this.y * yCnv.height, yCnv.radius, 0, Math.PI*2, true);
	yCnv.context.closePath();
	yCnv.context.fill();
	yCnv.context.stroke();
}

Vertice.prototype.drawHighliht = function(yCnv) {
	yCnv.context.fillStyle = fHighlihtColor;
	this.draw(yCnv);
	yCnv.context.fillStyle = fColor;
}

Vertice.prototype.toString = function() {
	return "(" + this.x + ";" + this.y + "): " + this.mark;
};

Vertice.prototype.equals = function (v) {
	return this.x == v.x && this.y == v.y;
}

Vertice.prototype.distance = function (v) {
	return Math.sqrt(square(this.x - v.x) + square(this.y - v.y));
}

// 'this' vertice is exist in the 'storage' of the edges or the vertices?
Vertice.prototype.exist = function(storage) {
	for (i in storage) {
		if (   (this.x == storage[i].v[0].x && this.y == storage[i].v[0].y)
			|| (this.x == storage[i].v[1].x && this.y == storage[i].v[1].y) 
			|| (this.x == storage[i].x && this.y == storage[i].y) 
			)
			return true;
	}
	return false;
};

// Index in the 'storage' where 'this' vertice found
// -1 if not found anywhere
Vertice.prototype.where = function(storage) {
	for (i in storage) {
		if (this.exist(storage[i])) return i;
	}
	return -1;
}

// Find minimal distance from 'this' to another vertices from storage of the vertices
Vertice.prototype.minDistance = function(storage) {
	if (storage.length == 0) return 1./0.; // :)
	var min = this.distance(storage[0]);
	for (i = 1; i < storage.length; i++) {
		var d = this.distance(storage[i]);
		if (min > d) {
			min = d;
		}
	}
	return min;
};

Vertice.prototype.clearConnectionFlag  = function() {
	this.connected = false;
}

Vertice.prototype.setConnectionFlag  = function() {
	this.connected = true;
}


//==================== utils
function square(a) {   
	return a*a;   
}