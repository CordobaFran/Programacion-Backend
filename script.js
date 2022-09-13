let mostrarLetras = (word) => {
    const timer = setInterval(() => {
        for (let i = 0; i < word.length; i++) {
            i == (word.length-1) ? clearInterval(timer) : null
            const element = word[i];
            console.log(element);
        }
    }, 1000);
    timer
}
mostrarLetras("hola")