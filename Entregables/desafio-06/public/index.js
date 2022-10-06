const socket = io.connect()

const addProduct = ()=>{
    const newProduct = {
        "product" : document.getElementById("product").value,
        "value" : document.getElementById("value").value,
        "urlImg": document.getElementById("urlImg").value
    }
    socket.emit('add-product', newProduct)

    return false
}

const renderProducts = (data)=>{
    const html = data.map((el)=>{
        return (`
        <tr>
            <td>
                ${el.product}
            </td>
            <td>
                ${el.value}
            </td>
            <td>
                <img src="${el.urlImg}" class="h-auto" style="object-fit: cover; width: 75px;">
            </td>
        </tr>
        `)
    }).join(" ")
    document.getElementById('products').innerHTML = html
}

socket.on("products-sv", data => {
    renderProducts(data)
})

//----Chat----

const sendMessage = () =>{
    const newMessage = {
        "name": document.getElementById('name').value,
        "message": document.getElementById('message').value
    }

    socket.emit('new-message', newMessage)
    return false
}

const renderMessages = (data) => {
    const html = data.map((el)=>{
        return (`
        <stroke>${el.name}</stroke>
        <span>${el.message}</span>
        `)
    }).join("<br>")
    document.getElementById('messages').innerHTML = html
}

socket.on('messages-sv', data => {
    renderMessages(data)
})