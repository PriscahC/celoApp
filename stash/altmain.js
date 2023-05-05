//creating an array called products, using sample product data
const products = [
    {
      name: "Giant BBQ",
      image: "https://i.imgur.com/yPreV19.png",
      description: `Grilled chicken, beef, fish, sausages, bacon, 
        vegetables served with chips.`,
      location: "Kimironko Market",
      owner: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
      price: 3,
      sold: 27,
      index: 0,
    },
    {
      name: "BBQ Chicken",
      image: "https://i.imgur.com/NMEzoYb.png",
      description: `French fries and grilled chicken served with gacumbari 
        and avocados with cheese.`,
      location: "Afrika Fresh KG 541 St",
      owner: "0x3275B7F400cCdeBeDaf0D8A9a7C8C1aBE2d747Ea",
      price: 4,
      sold: 12,
      index: 1,
    },
    {
      name: "Beef burrito",
      image: "https://i.imgur.com/RNlv3S6.png",
      description: `Homemade tortilla with your choice of filling, cheese, 
        guacamole salsa with Mexican refried beans and rice.`,
      location: "Asili - KN 4 St",
      owner: "0x2EF48F32eB0AEB90778A2170a0558A941b72BFFb",
      price: 2,
      sold: 35,
      index: 2,
    },
    {
      name: "Barbecue Pizza",
      image: "https://i.imgur.com/fpiDeFd.png",
      description: `Barbecue Chicken Pizza: Chicken, gouda, pineapple, onions 
        and house-made BBQ sauce.`,
      location: "Kigali Hut KG 7 Ave",
      owner: "0x2EF48F32eB0AEB90778A2170a0558A941b72BFFb",
      price: 1,
      sold: 2,
      index: 3,
    },
  ]

  //getBalance function, update the balance of the user. 21 is a placeholder
  const getBalance = function () {
    document.querySelector("#balance").textContent = 21
  }

  //display the products with the renderProducts function
  function renderProducts() {
    document.getElementById("marketplace").innerHTML = ""           //First, empty your marketplace div, so that you don’t add the products multiple times
    products.forEach((_product) => {               // For each product in products, creates a new div with the HTML of productTemplate to add next. 
      const newDiv = document.createElement("div")
      newDiv.className = "col-md-4"
      newDiv.innerHTML = productTemplate(_product)
      document.getElementById("marketplace").appendChild(newDiv)        //appends the new div to the marketplace div.
    })
  }

  //create the HTML of the product.
  function productTemplate(_product) {
    return `
      <div class="card mb-4">
        <img class="card-img-top" src="${_product.image}" alt="...">        <!--a card with an image of the product-->
        <div class="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
          ${_product.sold} Sold          <!--counts the number of times a product has been sold-->
        </div>
    
        <div class="card-body text-left p-4 position-relative">
            <div class="translate-middle-y position-absolute top-0">
            ${identiconTemplate(_product.owner)}            <!--hashvalue is the address of the product owner-->
            </div>
            <h2 class="card-title fs-4 fw-bold mt-2">${_product.name}</h2>
            <p class="card-text mb-4" style="min-height: 82px">
            ${_product.description}             
            </p>
            <p class="card-text mt-4">
                <i class="bi bi-geo-alt-fill"></i>
                <span>${_product.location}</span>
            </p>
            <div class="d-grid gap-2">
                <a class="btn btn-lg btn-outline-dark buyBtn fs-6 p-3" id=${
                    _product.index          // product the user selected
                }>
                    Buy for ${_product.price} cUSD
                </a>
            </div>
        </div>
    </div>
  `
}

//The identiconTemplate function takes an address as a parameter and then creates an icon object with the address through the blockies library.
function identiconTemplate(_address) {
    const icon = blockies
      .create({
        seed: _address,
        size: 8,
        scale: 16,
      })
      .toDataURL()
    //Return a round image of the icon and a link that takes the user to the transactions of the address in the blockchain explorer.
    return `
    <div class="rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0">
      <a href="https://alfajores-blockscout.celo-testnet.org/address/${_address}/transactions"
          target="_blank">
          <img src="${icon}" width="48" alt="${_address}">
      </a>
    </div>
    `
  }

function notification(_text) {        //displays the alert element with the text in the paramete
    document.querySelector(".alert").style.display = "block"
    document.querySelector("#notification").textContent = _text
  }
  
  function notificationOff() {          //stops showing the alert element
    document.querySelector(".alert").style.display = "none"
  }
  
//event handlers
window.addEventListener("load", () => {     //waits for DApp to load
    notification("⌛ Loading...")       // call your notification function with a loading message
    getBalance()        //display the user's balance
    renderProducts()        //render all products so the user can see them
    notificationOff()       //disable the notification div again.

  })

  document
  .querySelector("#newProductBtn")
  .addEventListener("click", () => {        //onclick, receive all values from the form.
    const _product = {
      owner: "0x2EF48F32eB0AEB90778A2170a0558A941b72BFFb",      //For the first value, hard code the address of the owner
      //Then you can receive the values from the input fields for name, image, description, location, and price.
      name: document.getElementById("newProductName").value,
      image: document.getElementById("newImgUrl").value,
      description: document.getElementById("newProductDescription").value,
      location: document.getElementById("newLocation").value,
      price: document.getElementById("newPrice").value,
      sold: 0,      // start with 0 products so your first product will have the index 0.
      index: products.length,
    }
    // add the new product to your products array, send a notification, and render the products.
    products.push(_product)
    notification(`🎉 You successfully added "${_product.name}".`)
    renderProducts()
  })

  //onclick, saves the index of the product clicked on
  document.querySelector("#marketplace").addEventListener("click", (e) => {
    if(e.target.className.includes("buyBtn")) {
      const index = e.target.id
      products[index].sold++    // increase the number of times the item has been sold
      notification(`🎉 You successfully bought "${products[index].name}".`)     //send a notification 
      renderProducts()      // render the products again, so that it displays the updated amount of products sold.
    }
  })

  