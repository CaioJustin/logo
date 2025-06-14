const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Casamento Classico",
        "image":"casamento_classico.webp",
        "price": 2000
    },
    {
        "id": 2,
        "name": "Casamento Rustico",
        "image":"casamento_rustico.webp",
        "price": 2200
    },
    {
        "id": 3,
        "name": "Festa Anos 80",
        "image":"festa_anos80.webp",
        "price": 2400
    },
    {
        "id": 4,
        "name": "Festa Boteco",
        "image":"festa_boteco.webp",
        "price": 2600
    },
    {
        "id": 5,
        "name": "Festa Princesa",
        "image":"festa_princesa.webp",
        "price": 1400
    },
    {
        "id": 6,
        "name": "Festa Safari",
        "image":"festa_safari.webp",
        "price": 1800
    }
]


let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "img/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Carrinho</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice= 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "img/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}

total.addEventListener("click", () => {
    if (listCards.length === 0 || listCards.filter(item => item).length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "🛒 *Pedido:*%0A%0A";
    listCards.forEach((item) => {
        if (item) {
            message += `*${item.name}* - Quantidade: ${item.quantity} - Total: R$ ${item.price.toLocaleString()}%0A`;
        }
    });

    let totalPrice = listCards.reduce((sum, item) => item ? sum + item.price : sum, 0);
    message += `%0A*Valor total:* R$ ${totalPrice.toLocaleString()}`;

    let phoneNumber = "5571991818322"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
});
