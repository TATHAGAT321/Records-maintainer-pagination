let row = document.querySelector(".tuples");
let pages = document.querySelector(".page");
let inner = row.innerHTML;
let paging = pages.innerHTML;
let rowsize = document.querySelector(".rowsize");
let result,d;
var k;
// Generating html of table using response data from api server
function generatehtml(result,low,high){
	let htmlstring="";
	for(let i=low;i<=high;i++)
	{
		let htmlobject = `<tr>
		                    <td> ${i+1}</td>
		                    <td> ${result[i].name}</td>
		                    <td> ${result[i].capital}</td>
		                    <td> <img src="${result[i].flag}" style="height:16px; width:16px;"> </td>
		                    <td> ${result[i].region}</td>
		                    <td> ${result[i].nativeName}</td>
		                    <td> ${result[i].area}</td>
		                    <td> ${result[i].population}</td>
		                    </tr>` ;
        htmlstring += htmlobject ;
	} 
	return htmlstring;
}
// Fetching of data using api
async function data(k=10) {
	try{
		let url = "https://restcountries.eu/rest/v2/all";
		let response = await fetch(url);
		let data =  await response.json();
		let rowhtml = await pagination(data,k);
		row.innerHTML = inner + rowhtml; 
	}
	catch(error){
		console.log("error");
	}
};

// function to create button and add event to button appeared in pagination
function pagination(d,k){
	let l = d.length;
    let content = generatehtml(d,0,k-1);
    let addend = 2;
    let index=0;
    var low=0;
    var high=0;
    // left Navigation button
    let dummyleft = document.createElement("button");
    let subpages = document.createTextNode("...");
    dummyleft.appendChild(subpages);
    pages.appendChild(dummyleft);
    dummyleft.classList.add("hide");

    // Page button Event
	for(let i=0;i<Math.ceil(l/k);i++)
	{
		let button = document.createElement("button");
		let pg = document.createTextNode(i+1 + "  ");
		button.appendChild(pg);
		pages.appendChild(button);
		 low = i*k;
         if(low+k-1 < l)
          high = low + k - 1;
         else 
          high = l-1;
        let x = low;
        let y = high;
        let z = i;
     
        button.style.background = "white";
        button.addEventListener("click",function(){
             low = x;
             high = y;
             button.style.background = "blue";
             button.style.color = "white";
             let bg = document.querySelectorAll("button");
             bg[index+2].style.background = "white";
             bg[index+2].style.color = "black";
    		 let html = generatehtml(d,x,y);
    		 row.innerHTML = inner + html;  
             index = z; 
             if(bg[bg.length - 1].classList[0] === "disable")
                bg[bg.length - 1].classList.remove("disable");
             if(bg[0].classList[1] === "disable")
                bg[0].classList.remove("disable");
        }); 
        // console.log(low,high); 
        if(i>4) 
        button.classList.add("hide"); 
        
	}  
    document.querySelectorAll("button")[2].style.background = "blue";
    document.querySelectorAll("button")[2].style.color = "white";
    
    //shows 5 previous pages
    dummyleft.addEventListener("click",function(){
        let button = document.querySelectorAll("button");
            if(addend < Math.ceil(l/k)+1){
            button[button.length-2].classList.remove("hide");
            }
            else{
            button[button.length-2].classList.add("hide");
            }
            if(addend <= 6)
            {
               button[1].classList.add("hide");
               // if(addend+5 <= l-2)
               //  addend = addend + 5;
            } 

            else{
                for(let i=2;i<=Math.ceil(l/k)+1;i++)
                {
                   if(i<addend && i>=addend-5)
                    button[i].classList.remove("hide");
                   else
                    button[i].classList.add("hide");
                }
                button[index+2].style.background = "white";
                button[index+2].style.color= "black";
                button[addend-5].style.background  = "blue";
                button[addend-5].style.color  = "white";
                addend = addend - 5;
                index = addend - 2;
                low = index*10;
                if(low + 9 <= l-1)
                 high = low+9;
                else
                 high = l-1; 
                let html = generatehtml(d,low,high); 
                row.innerHTML = inner + html; 
                if(addend <= 6)
                {
                  button[1].classList.add("hide");
                } 
            } 
           if(button[button.length-1].classList[0] === "disable")
             button[button.length-1].classList.remove("disable");


    });
      
    // right Navigation button
    let dummy = document.createElement("button");
    let addpages = document.createTextNode("...");
    dummy.appendChild(addpages); 
    pages.appendChild(dummy);

    // shows next 5 pages
    dummy.addEventListener("click",function(){
        let button = document.querySelectorAll("button");
        if(addend+5 <= Math.ceil(l/k)+1)
           addend = addend + 5; 
        else{
            button[button.length-2].classList.add("hide");
        }
        for(let i=2;i<=Math.ceil(l/k)+1;i++)
        {
             if((i >= addend) && i <= (addend+4))
                button[i].classList.remove("hide");
             else  
                button[i].classList.add("hide");  
        }
        button[index+2].style.background = "white";
        button[index+2].style.color= "black";
        button[addend].style.background  = "blue";
        button[addend].style.color  = "white";
        index = addend - 2;
        low = index*k;
        if(low + k <= l-1)
          high = low+k;
        else
          high = l-1; 
        let html = generatehtml(d,low,high);
        row.innerHTML = inner + html;
    // console.log(addend); 
        if(addend+5 > button.length-3)
         button[button.length-2].classList.add("hide");
        if(addend > 6){
         button[1].classList.remove("hide");
        }
        else{
         button[1].classList.add("hide");
        }
        if(button[0].classList[1] === "disable")
          button[0].classList.remove("disable");
         
    });

    // Next button Event
	let button = document.createElement("button");
	let pg = document.createTextNode("next");
	button.appendChild(pg)
	pages.appendChild(button);
    button.style.background = "white";
	low = 0;
	high = k-1;	 

    button.addEventListener("click",
    	function(){
            if(high == l-1){
    			low = low; 
    		}
    		else{
               if(high+k > l-1){
               	 low = high+1; high = l-1;
               	}
               	else{
               		low = low + k; high = high + k;
               	}
    		}
    		let html = generatehtml(d,low,high);
    		row.innerHTML = inner;
    		row.innerHTML = inner + html;
            
            let bg = document.querySelectorAll("button");
            if(index+3 <= ((Math.ceil(l/k)) + 1)) {
              bg[index+2].style.background = "white";
              bg[index+2].style.color= "black";
              bg[index+3].style.background  = "blue";
              bg[index+3].style.color  = "white";

              if(index+3 >= addend){
                let button = document.querySelectorAll("button");
                
                if(addend+5 <= (Math.ceil(l/k)+1)){
                   
                   for(let i=2;i<=Math.ceil(l/k)+1;i++){
                     
                     if((i >= addend) && i <= (addend+4))
                        button[i].classList.remove("hide");
                     else  
                        button[i].classList.add("hide");  
                   } 
                   if(addend > 6)
                    button[1].classList.remove("hide");
                   addend = addend + 5;
                   // console.log(addend);
                }
                else{
                   for(let i=2;i<=Math.ceil(l/k)+1;i++){
                     if((i >= addend) && i <= (Math.ceil(l/k)+1))
                        button[i].classList.remove("hide");
                     else  
                        button[i].classList.add("hide");  
                   } 
                   button[button.length-2].classList.add("hide");
                   button[1].classList.remove("hide");
                }
              }
                index = index+1;  
            } 
            else{ 
                bg[index+4].classList.add("disable");
            }

            if(bg[0].classList[1] == 'disable')
             bg[0].classList.remove("disable");
    		  		
    });
    
    // Prev button Event
    let prev = document.querySelector(".prev");
    prev.addEventListener("click",function(){
     	  if(low == 0)
     	  {
     	  	low = 0;
     	  	high = k-1;
     	  }
     	  else if((low - k) < 0)
     	  {
     	  	low = 0;
     	  	high = k-1;
     	  } 
     	  else
     	  {
            high = low-1;
     	  	low = low - k;
     	  	
     	  } 
     	  let html = generatehtml(d,low,high);
     	  row.innerHTML = inner + html;
             let bg = document.querySelectorAll("button");
             if(index >= 1)
             {
                 bg[index+2].style.background = "white";
                 bg[index+2].style.color = "black";
                 bg[index+1].style.background = "blue";
                 bg[index+1].style.color = "white";
                 
                 if(index+1 < addend)
                 {
                    for(let i=2;i<=Math.ceil(l/k)+1;i++)
                    {
                        if((i>=(addend-5)) && (i<addend))
                            bg[i].classList.remove("hide");
                        else
                            bg[i].classList.add("hide");
                    }
                    addend = addend - 5;
                    if(addend <= 6)
                     bg[1].classList.add("hide");

                    bg[bg.length-2].classList.remove("hide");
                    
                 }

                 index = index-1;
             }
             else{
                 bg[0].classList.add("disable");
             }
     	  if(bg[bg.length - 1].classList[0] === "disable")
             bg[bg.length - 1].classList.remove("disable");

     }); 

     
    return content;  
};

// Function to show a given number of column 
function customizetable(){
	rowsize.addEventListener("keypress",(event)=>{
		if(event.keyCode===13 && rowsize.value.length>0 
              && Number(rowsize.value) > 0)
		{
			pages.innerHTML = paging;
            if(Number(rowsize.value) < 250 )
             data(Number(rowsize.value));
            else 
             data(Number("250"));

            rowsize.value="";
		}
	});
}; 
data(); 
customizetable(); 