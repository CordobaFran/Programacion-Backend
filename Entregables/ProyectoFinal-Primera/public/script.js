const cartSelect = document.querySelectorAll(".cart__select")
const row = document.querySelectorAll(".addProductForm")
const submit = document.querySelectorAll(".submit__btn")

submit.forEach(el=>{
    el.disabled = true
})

cartSelect.forEach(el => {
    el.addEventListener("change", (element)=>{
        console.log(element);

        row.forEach(el => {
            const listValue = el.querySelector(".cart__select").value
            if (listValue == 0){
                el.querySelector(".submit__btn").disabled = true
            } else {
                el.querySelector(".submit__btn").disabled = false
            }
            
            el.action = `/api/carrito/${element.target.value}/productos`
        })
    })
})