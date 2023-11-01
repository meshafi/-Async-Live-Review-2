async function initializeArray(){
  const response = await fetch("http://localhost:3000/initialize");
  const data=await response.json();
  return data.size;
}

async function fetchValue(size){
  const array=[];
  for(let row=0;row<size;row++){
    const rowArray=[];
    for(let col=0;col<size-1;col=col+2){
      try{
      const res1= await fetch(`http://localhost:3000/value?rowIndex=${row}&colIndex=${col}`);
      const res2= await fetch(`http://localhost:3000/value?rowIndex=${row}&colIndex=${col+1}`);

      const value1=await res1.json();
      const value2=await res2.json();
      rowArray.push(value1.value)
      rowArray.push(value2.value);
      }
      catch(error){
        console.log('Error fetching value',error);
      }
    }
    array.push(rowArray);
  }
 console.log(array);
}


async function main() {
  try{
  const size=await initializeArray();
  fetchValue(size);
  }
  catch(error){
    console.log('Error occured',error);
  }
}
main();
