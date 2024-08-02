
# API REST - CODERHOUSE👋 

Proyecto Backend

Aviso: Use **UUID** para la cracion automatica de los id, mas especifico **UUIDV4**
Hecho en base a **POSTMAN**


**Productos**

- GET - http://localhost:8080/api/products
    
        Devuelve el JSON con los productos actuales.        
- GET - http://localhost:8080/api/products?limit=2

        Devuelve una lista de productos limitada a la cantidad que elijas.
- GET - http://localhost:8080/api/products/<idProducto>

        Devuelve el producto filtrado por id.
- POST - http://localhost:8080/api/products
        
        Agrega un producto con el siguiente formato

        Body: JSON
        { 
            "title": "Producto prueba",
            "description": "Descripción prueba",
            "code": "PROD001",
            "price": 10000,
            "status": true,
            "stock": 10,
            "category": "Categoría prueba",
            "thumbnails": []
  
        }
- PUT - http://localhost:8080/api/products/<idProducto>

        Edita cualquier dato de un producto en especifico

        Body: JSON 
        {
            "title": "Producto actualizado",
            "price": 200,
            "stock": 7
        }
- DELETE - http://localhost:8080/api/products/<idProducto>

        Elimina un producto en especifico. 




## 
**Carritos**

- POST - http://localhost:8080/api/CARTS
    
        Crea un carrito, no es necesario agregarle cuerpo.        
- GET - http://localhost:8080/api/carts/<idCarrito>

        Devuelve los productos que esten dentro del carrito seleccionado.
- POST - http://localhost:8080/api/carts/<idCarrito>/products/<idProducto>

        Devuelve el carrito actualizado con el producto.
- DELETE - http://localhost:8080/api/carts/<idCarrito>/product/<idProducto>
        
        Elimina un producto en especifico del carrito.



