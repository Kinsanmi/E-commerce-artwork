export const productData = [
    {

        "products": [
            {
            "name": "Red Bench",
            "category": "people",
            "price": 3.89,
            "currency": "USD",
            "image": {
            "src": "https://res.cloudinary.com/dkngsthge/image/upload/v1706393067/Rectangle_2_qdrlco.png",
            "alt": "",
            },
            "bestseller": true,
            "featured": false,
            "details": null
            },


            {
            "name": "Egg Balloon",
            "category": "food",
            "price": 93.89,
            "currency": "USD",
            "image": "https://res.cloudinary.com/dkngsthge/image/upload/v1706393067/Rectangle_2.1_fb7osw.png",
            "bestseller": false,
            "featured": false,
            "details": null
            },

            {
            "name": "Egg Balloon",
            "category": "food",
            "price": 93.89,
            "currency": "USD",
            "image": "https://res.cloudinary.com/dkngsthge/image/upload/v1706393067/Rectangle_2.1_fb7osw.png",
            "bestseller": false,
            "featured": false,
            "details": null
            },


            {
            "name": "Man",
            "category": "people",
            "price": 100,
            "currency": "USD",
            "image": {
            "src": "",
            "alt": ""
            },
            "bestseller": false,
            "featured": false,
            "details": null
            },


            {
            "name": "Architecture",
            "category": "landmarks",
            "price": 101,
            "currency": "USD",
            "dimension": {
            "width": 1020,
            "height": 1020
            },
            "image": "",
            "bestseller": false,
            "featured": false,
            "details": null
            },



            {
            "name": "Samurai King Resting",
            "category": "landmarks",
            "price": 101,
            "currency": "USD",
            "image": {
            "src": "",
            "alt": "Samurai king"
            },
            "bestseller": false,
            "featured": true,
            "details": {
            "dimensions": {
            "width": 1020,
            "height": 1020
            },
            "size": 15000,
            "description": "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scram",
            "recommendations": [
            {
            "src": "",
            "alt": ""
            },
            {
            "src": "",
            "alt": ""
            },
            {
            "src": "",
            "alt": ""
            }
            ]
            }
            }
        ]
        }
]
        



export const fetchData = () =>{
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            resolve({allProduct: productData});

            reject({message: "Something went wrong"})
        }, 3500);
     })
}