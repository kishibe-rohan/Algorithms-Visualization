var cols,rows;    
var w = 10; //width and height of squares (lay around)

var grid =[];   //using 1-D array for easier access and avoiding nested loops
var current;    //current cell being explored

var stack = [];   //unvisited cells



function setup() {
    createCanvas(400, 400);
    frameRate(5);     //play around
    
    cols = floor(width/w);
    rows = floor(height/w);
    
    for(var j=0;j<rows;j++)
    {
      for(var i=0;i<cols;i++)
      {
        var cell = new Cell(i,j);     //initialize cells
        grid.push(cell);
      }
    }
    
    current = grid[0];          //set starting point(play around)
  }
  
  function draw() {
    
    background(50);
    for(var i=0;i<grid.length;i++)
    {
      grid[i].show();
    }

    //DFS main algorithm
    
    current.visited = true;    //1.mark current cell as visited
    
    current.highlight();
    
    var next = current.checkNeighbours();    //2.explore (unvisited) neighbours of current cell
    
    if(next)                       
    {
      next.visited = true;        
      
      stack.push(current);        //push current cell to stack
      
      removeWalls(current,next);
      current = next;            //visit the neighbouring cell
    }
    
    
    else if(stack.length >0)       //3. no unvisited neighours? 
    {
      current = stack.pop();    //use stack to backtrack
      current.highlight2();
    }
  }
  
  


//utility function to remove walls when visiting neighbours
function removeWalls(a,b)
{
  var x = a.i - b.i;
  
  if(x===1)  //right neighbour
  {
    a.walls[3]=false;
    b.walls[1]=false;
  }
  else if(x === -1)
  {
    a.walls[1]=false;
    b.walls[3]=false;
  }
  
  var y = a.j - b.j;
  
  
  if(y===1)  //bottom neighbour
  {
    a.walls[0]=false;
    b.walls[2]=false;
  }
  else if(y === -1)
  {
    a.walls[2]=false;
    b.walls[0]=false;
  }
}


//utility function to get cell index for 1D array
function index(i,j)
{
  if(i<0 || j<0 || i>cols-1 || j>rows-1)
    return -1;
    
  return i+j*cols;
}


//Constructor for Cell
function Cell(i,j)
{
  this.i = i;
  this.j = j;
  this.walls = [true,true,true,true];   //top,right,bottom,left
  this.visited = false;
  
  this.checkNeighbours = function()
  {
    var neighbours = [];

    var top = grid[index(i,j-1)];
    var right = grid[index(i+1,j)];
    var bottom = grid[index(i,j+1)];
    var left = grid[index(i-1,j)];
    
    if(top && !top.visited)
    {
      neighbours.push(top);
    }
    
     if(bottom && !bottom.visited)
    {
      neighbours.push(bottom);
    }
    
     if(left && !left.visited)
    {
      neighbours.push(left);
    }
    
     if(right && !right.visited)
    {
      neighbours.push(right);
    }
    
    if(neighbours.length >0)
    {
      var r = floor(random(0,neighbours.length));
      return neighbours[r];
    }
    else
    {
      return undefined;
    }
  }
  
  
  this.show = function()
  {
    var x= this.i*w;
    var y= this.j*w;
    stroke(255);
    
    if(this.walls[0]) line(x,y,x+w,y); //right
    if(this.walls[1]) line(x+w,y,x+w,y+w);//down
    if(this.walls[2]) line(x+w,y+w,x,y+w); //left
    if(this.walls[3]) line(x,y+w,x,y); //up
  
  if(this.visited)
  {
    noStroke();
    fill(255,0,255);
    rect(x,y,w,w);
  }
  
  
  }
  
this.highlight = function()      //highlight current cell being visited
{
    var x= this.i*w;
    var y= this.j*w;
    noStroke();
  fill(0,255,0);
  rect(x,y,w,w);
    
}
  
  this.highlight2 = function()   //highlight while backtracking
{
    var x= this.i*w;
    var y= this.j*w;
    noStroke();
  fill(255,0,0);
  rect(x,y,w,w);
    
}

  
  
}
