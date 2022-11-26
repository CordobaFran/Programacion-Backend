const chatMsjs = {
    id: "999",
    posts: [
        {
            id: 1,
            author: {
                id: 1,
                email: "francocordobafs@gmail.com",
                name: "Franco",
                lastname: "Cordoba",
                age: "30",
                alias: "Fran",
                avatar: ""
            },
            messages: [
                {
                    id: "02",
                    author: {
                        id: 2,
                        email: "crisferes@gmail.com",
                        name: "Cristian",
                        lastname: "Feres",
                        age: "31",
                        alias: "Cris",
                        avatar: ""
                    },
                    message: "Busco productos 2022"
                },
                {
                    id: "03",
                    author: {
                        id: 1,
                        email: "francocordobafs@gmail.com",
                        name: "Franco",
                        lastname: "Cordoba",
                        age: "30",
                        alias: "Fran",
                        avatar: ""
                    },
                    message: "Que clase de productos busca?"
                },
                {
                    id: "04",
                    author: {
                        id: 2,
                        email: "crisferes@gmail.com",
                        name: "Cristian",
                        lastname: "Feres",
                        age: "31",
                        alias: "Cris",
                        avatar: ""
                    },
                    message: "Busco productos de limpieza"
                }
            ]
        }
    ]
}

module.exports = chatMsjs