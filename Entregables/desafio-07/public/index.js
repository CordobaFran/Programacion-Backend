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
            <td class="px-5">
                ${el.product}
            </td>
            <td class="px-5">
                ${el.value}
            </td>
            <td class="px-5">
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
    const date = new Date().toLocaleString()
    const newMessage = {
        "name": document.getElementById('name').value,
        "message": document.getElementById('message').value,
        "date": date
    }
    document.getElementById('message').value = ""
    socket.emit('new-message', newMessage)
    return false
}

const renderMessages = (data) => {
    let ownMsg
    const name = document.getElementById('name').value

    const html = data.map((el)=>{
        if (name == el.name) {
            ownMsg = {"align": "text-end", "color": "bg-info"}
        } else {
            ownMsg = {"align": "text-start", "color": "bg-secondary"}
        }
        return (`
        <div class=${ownMsg.align}>
            <div class='${ownMsg.color} p-2 mx-2 textBox'>
                <stroke class="fw-bold fs-6">${el.name}</stroke> <br>
                <span class="fs-6 fw-light font-monospace msj">${el.message}</span><br>
                <span class="d-flex flex-row-reverse time">${el.date}</span>
            </div>
        </div>
        `)
    }).join("<br>")
    document.getElementById('messages').innerHTML = html

    let messageBody = document.querySelector('#messages');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight

}

socket.on('messages', data =>{
    renderMessages(data)
})

socket.on('messages-sv', data => {
    renderMessages(data)
})