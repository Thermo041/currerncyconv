
//countrylist is an javascript object
// for (const key in countryList) {
//         const value = countryList[key];
//         console.log(key,value)
// }

let x=""
let y=""
let final=document.querySelector(".final")

function convertCurrency(from, to, amount) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${from}.json`;

  if (isNaN(amount) || amount<=0) { 
  final.innerText="Please enter a valid positive amount."
  return
  }


  fetch(url) 
    .then(res => {
    return res.json();  
    })  //res.json() is equal to data
    // res is response onject 
    //res.json in javascript object
    .then(data => {
      const rate = data[from][to];   //here data is an javascript object
      const convertedAmount = amount * rate;
      console.log(`${amount} ${from.toUpperCase()} = ${convertedAmount.toFixed(2)} ${to.toUpperCase()}`)
      
      final.innerText=`${amount} ${from.toUpperCase()} = ${convertedAmount.toFixed(2)} ${to.toUpperCase()}`

    })
    .catch(() => {
      console.log("Conversion failed — check currency codes or network.");
    });
}

//convertCurrency("usd", "inr", 4);


const selects=document.querySelectorAll("select")
//there are two selects

selects.forEach((i)=>{
      for (const opt in countryList) { 
        let newopt=document.createElement("option")
        newopt.innerText=opt
        newopt.value=opt
        if(i.name==="from" && opt==="USD")
        {
            newopt.selected=true
            x=opt.toLowerCase()
        }
        else if(i.name==="to" && opt==="INR")
        {
           newopt.selected=true
           y=opt.toLowerCase()

        }
        i.append(newopt)
      }

      i.addEventListener("change",(evt)=>{
        // console.log(evt)
        updateflag(evt.target)
        //evt.target is the element where the event occurred (your select/i is element here)
      })
})

const updateflag=(i)=>{    //here i=<select>
    // console.log(i.options) //no use
    // array of options   //no use
    // console.log(i.options[i.selectedIndex])  //no use

    //console.log(i.options[i.selectedIndex].innerText)
    //or
    console.log(i.value)

    if(i.value!=="" && i.name==="from")
    {
      x=i.value
      x=x.toLowerCase()
    }
    if(i.value!=="" && i.name==="to"){
      y=i.value
      y=y.toLowerCase()
    }

    //i.value means every <select> element has a .value property, which is the value of the currently selected <option>.
    //i.value means the value attribute of the currently selected <option> inside a <select> element  (newopt.value=opt)
    //If you skip the value attribute in your <option>, then by default the browser will treat the innerText as its value.
    
    let image=countryList[i.value]
    //this will give eg for INR->IN and USD->US


    let imgupdt=i.parentElement.querySelector("img")
    imgupdt.src=`https://flagsapi.com/${image}/flat/64.png`

}



let btn=document.querySelector("button")


btn.addEventListener("click",(evt)=>{
  evt.preventDefault()

  let text=document.querySelector("input").value   //here value=" " initially
      // console.log(text)
     
      convertCurrency(x, y, text);
})

let input = document.querySelector("input")

input.addEventListener("keydown",(evt)=>{
  // console.log(evt)
  if(evt.key==="Enter")
  {
    evt.preventDefault()

  let text=document.querySelector("input").value 
  convertCurrency(x, y, text);

  }
})


