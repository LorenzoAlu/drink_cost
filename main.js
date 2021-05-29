
let calculate= document.querySelector('#calculate');
let addIngredient = document.querySelector('#addIngredient')
let addIngredientWrapper = document.querySelector('#addIngredientWrapper')
let totalPrice = document.querySelector('#totalPrice')
let deleteIngredient = document.querySelector('#deleteIngredient')
let addAlcolFree = document.querySelector('#addAlcolFree')
let alcoolFreeIngredient=document.querySelector('#alcoolFreeIngredient')
let informationWrapper = document.querySelector('#informationWrapper')


addIngredient.addEventListener('click',()=>{
    let div = document.createElement('div')
    div.classList.add('col-12')
    div.innerHTML=
    `
                <div class="d-flex justify-content-around card-custom my-3">
                    <div class="col-5 col-md-5">
                        <div class="mb-3">
                            <label for="nameIngredient" class="form-label">Nome Ingrediente</label>
                            <input type="text" class="form-control" id="nameIngredient">
                        </div>
                        <div class="mb-3">
                          <label for="qLiquor" class="form-label"> Dose (cl) ingrediente</label>
                          <input type="number" class="form-control" id="qLiquor">
                        </div>
                    </div>
                    <div class="col-5 col-md-5">
                        <div class="mb-3">
                            <label for="priceBottle" class="form-label">Prezzo della bottiglia</label>
                            <input type="number" class="form-control" id="priceBottle">
                        </div>
                        <div class="mb-3">
                            <label for="qBottle" class="form-label">Quantita della bottiglia</label>
                            <input type="number" class="form-control" id="qBottle">
                        </div>
                    </div>  
                </div>

    `
    addIngredientWrapper.appendChild(div)
    
    deleteIngredient.addEventListener('click',()=>{
       div.innerHTML=``
    
    })

  
    
})


calculate.addEventListener('click',()=>{
   let qLiquor = document.querySelectorAll('#qLiquor')
   let priceBottle = document.querySelectorAll('#priceBottle')
   let qBottle = document.querySelectorAll('#qBottle')

   let totalPriceIngredient = 0 
   for (let i = 0; i < qLiquor.length; i++) {
      let qL = parseInt(qLiquor[i].value)
      let pB = parseInt(priceBottle[i].value)
      let qB = parseInt(qBottle[i].value)
      totalPriceIngredient += (drinkCoast(qL,pB,qB))
   }

   totalPrice.innerHTML = 
   `
   il cocktail ti costa ${totalPriceIngredient.toFixed(2)} a questo devi aggiungere il prezzo del ghiaccio, il costo dell'elettricità e l'ipotetico dipendente, il costo finale del tuo cocktail è di ${(totalPriceIngredient + 0.50).toFixed(2)},
   Il prezzo al pubblico dovrebbe essere fra i ${(totalPriceIngredient * 2).toFixed(2)} e i ${(totalPriceIngredient * 3).toFixed(2)}
   `

   let nameIngredient = document.querySelectorAll('#nameIngredient')

   console.log(nameIngredient)

   nameIngredient.forEach((el,i)=>{
    let qL = qLiquor[i].value
    let pB = priceBottle[i].value
    let qB = qBottle[i].value


      let p=document.createElement('p')
      p.innerHTML= `L'ingrediente ${el.value} costa ${drinkCoast(qL,pB,qB).toFixed(2)} euro `
      informationWrapper.appendChild(p)

    })

})


function drinkCoast(qL,pB,qB){
    if(qL && pB && qB){
        return (qL * pB) / qB
    }else{
        return 0
    }
}
