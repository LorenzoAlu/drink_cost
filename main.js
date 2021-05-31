let calculate = document.querySelector("#calculate");
let addIngredient = document.querySelector("#addIngredient");
let addIngredientWrapper = document.querySelector("#addIngredientWrapper");
let totalPrice = document.querySelector("#totalPrice");
let deleteIngredient = document.querySelector("#deleteIngredient");
let addAlcolFree = document.querySelector("#addAlcolFree");
let alcoolFreeIngredient = document.querySelector("#alcoolFreeIngredient");
let informationWrapper = document.querySelector("#informationWrapper");

addIngredient.addEventListener("click", () => {
  let div = document.createElement("div");
  div.classList.add("col-12", "col-md-10");
  div.innerHTML = `
            <div class="d-flex justify-content-around card-custom my-3">
                    <div class="col-5 col-md-5 ">
                        <div class="mb-3">
                            <label for="nameIngredient" class="form-label">Nome Ingrediente ricetta / soft drink</label>
                            <input type="text" class="form-control" id="nameIngredient">
                        </div>
                        <div class="mb-3">
                          <label for="qLiquor" class="form-label"> Dose ingrediente / quantità </label>
                          <div class="d-flex">
                            <input type="number" class="form-control w-50" id="qLiquor" min="0" step=".01">
                            <select id="UM" class="form-select w-50" aria-label="Default select example">
                              <option selected value="cl">cl</option>
                              <option value="oz">oz</option>
                              <option value="mm">ml</option>
                              <option value="drop">drop</option>
                              <option value="dash">dash</option>
                              <option value="tsp">tsp</option>
                              <option value="tbsp">tbsp</option>
                              <option value="pz">pz</option>
                            </select>
                          </div> 
                        </div>
                        <div class="mb-3">
                        <label for="gradoAlcolico" class="form-label">Grado alcolica (%)</label>
                        <input type="number" class="form-control" id="gradoAlcolico" min="0" step=".01">
                        </div>
                    </div>
                    <div class="col-5 col-md-5 ">
                        <div class="mb-3">
                            <label for="priceBottle" class="form-label">Prezzo della bottiglia / cassa</label>
                            <input type="number" class="form-control" id="priceBottle" min="0" step=".01">
                        </div>
                        <div class="mb-3">
                            <label for="qBottle" class="form-label">Capienza bottiglia (cl) / quantità cassa</label>
                            <input type="number" class="form-control" id="qBottle" min="0" step=".01">
                        </div>
                    </div>  
            </div>
    `;
  addIngredientWrapper.appendChild(div);

  deleteIngredient.addEventListener("click", () => {
    div.innerHTML = ``;
  });
});

deleteIngredient.addEventListener("click", () => {
  informationWrapper.innerHTML = "";
  totalPrice.innerHTML =
    "Inizia subito a calcolare il prezzo dei tuoi cocktail ;)";
});

calculate.addEventListener("click", () => {

  informationWrapper.innerHTML = "";

  let qLiquor = document.querySelectorAll("#qLiquor");
  let priceBottle = document.querySelectorAll("#priceBottle");
  let qBottle = document.querySelectorAll("#qBottle");
  let UM = document.querySelectorAll("#UM");
  let gradoAlcolico=document.querySelectorAll('#gradoAlcolico')
  let pesoSpecificoA = 0.79
  let nameIngredient = document.querySelectorAll("#nameIngredient");
    console.log(nameIngredient)
    console.log(qLiquor)
    console.log(priceBottle)
 

  let totalPriceIngredient = 0;
  let volumeAlcolicoCocktail= 0;
  let volumeCocktail = 0 
  for (let i = 0; i < qLiquor.length; i++) {

    let qL = parseFloat(qLiquor[i].value);
    let pB = parseFloat(priceBottle[i].value);
    let qB = parseFloat(qBottle[i].value);
    let UMi = UM[i].value;
    let gA = parseFloat(gradoAlcolico[i].value)
    let nI = nameIngredient[i].value
    console.log(nI)
    console.log(qL)
    console.log(pB)

    if(isNaN(qL) || isNaN(pB) || isNaN(qB) || isNaN(gA) || nI.trim() == ''){
      alert("Attenzione! E' presente un campo vuoto!");
      totalPrice.innerHTML= ""
      totalPrice.innerHTML=
      `
      Non lasciare campi vuoti, se aggiungi un ingrediente devi compilare tutti i form!
      `
      break
      
    }else{

    if (UMi == "cl" || UMi == "pz") {

      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = qL*10
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv
      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "oz") {

      let oz = 0.3381402255891948;
      qL = qL / oz;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = qL*29.5735*oz
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv

      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "drop") {

      let drop = 0.005;
      qL = qL * drop;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = (qL/drop)/20
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv

      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "dash") {

      let dash = 0.061611519922;
      qL = qL * dash;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = (qL / dash)  / 1.623073090
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv

      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "tsp") {

      let tsp = 0.492892;
      qL = qL * tsp;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv =( qL/tsp) * 4.92892
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv

      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "tbsp") {

      let tbsp = 1.47868;
      qL = qL * tbsp;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = (qL/tbsp)/0.06762805
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv

      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    } else if (UMi == "mm") {

      let mm = 0.1;
      qL = qL * mm;
      totalPriceIngredient += drinkCoast(qL, pB, qB);
      let conv = qL * 10
      volumeAlcolicoCocktail += quantitaAlcool(gA,conv);
      volumeCocktail += conv 

      
      let p = document.createElement("p");
      p.innerHTML = `L'ingrediente ${nI} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `;
      informationWrapper.appendChild(p);
    

    }
  }


  let grammiAlcool = pesoSpecificoA * volumeAlcolicoCocktail
  let percentualeAlcolica = gradoAlcolicoCocktail(volumeCocktail,volumeAlcolicoCocktail) 

  totalPrice.innerHTML = `
   <h3>il cocktail costa: ${totalPriceIngredient.toFixed(2)} € </h3>
   <h3>il Grado alcolico è ${percentualeAlcolica.toFixed(2)}%, e contiene ${grammiAlcool.toFixed(2)} grammi di alcool.
   <h3>il costo finale del tuo cocktail è approsimativamente di ${(
     totalPriceIngredient + 0.25
   ).toFixed(2)} € </h3>
   <p>tenendo conto del costo del ghiaccio, dell'elettricità e ed eventuale decorazione (che puoi calcolare come ingrediente)</p>
   <h3>Il prezzo al pubblico dovrebbe essere fra i ${(
     (totalPriceIngredient + 0.25) *
     2
   ).toFixed(2)} e i ${((totalPriceIngredient + 0.25) * 3).toFixed(2)} € </h3>
   `;

  // let nameIngredient = document.querySelectorAll("#nameIngredient");

  // nameIngredient.forEach((el, i) => {
  //   let qL = qLiquor[i].value;
  //   let pB = priceBottle[i].value;
  //   let qB = qBottle[i].value;

  //   let p = document.createElement("p");

  //   p.innerHTML = `L'ingrediente ${el.value} costa ${drinkCoast(
  //     qL,
  //     pB,
  //     qB
  //   ).toFixed(2)} euro `;
  //   informationWrapper.appendChild(p);
  // });
}});

function drinkCoast(qL, pB, qB) {
  if (qL && pB && qB) {
    return (qL * pB) / qB;
  } else {
    return 0;
  }
}

function quantitaAlcool(gradoAlcolico,quantità) {
    return (gradoAlcolico * quantità)/100
}



function gradoAlcolicoCocktail(quantitaCocktail,SSQA) {
    return (SSQA * 100)/quantitaCocktail
}

//1) quantità alcool
//2) somma singole quantità d alcool (SSQA)
//3) SSQA * pesoSpecifico
//4) grado alcolico
