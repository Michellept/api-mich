const express = require("express");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const app = express();
const port = 4000;

const api = new WooCommerceRestApi({
  url: "http://bordados.noobhuman.ninja",
  consumerKey: "ck_86eb6ca8af82a34ee5148967a6b747cf276f3372",
  consumerSecret: "cs_57602229daa12b81357d8f8b7d0593a976d463e5",
  version: "wc/v3",
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

//Todos los productos
app.get("/products", (req, res) => {
  api
    .get("products")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});
//Solo un producto
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  api
    .get(`products/${id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});
// Crear producto
app.post("/products", (req, res) => {
  //Se reciben los datos por el body
  //const datosProducto = req.query;

  const datosProducto = {
    name: "Premium Quality",
    type: "simple",
    regular_price: "21.99",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    short_description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    categories: [
      {
        id: 9,
      },
      {
        id: 14,
      },
    ],
    images: [
      {
        src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg",
      },
      {
        src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg",
      },
    ],
  };

  api
    .post("products", datosProducto)
    .then((response) => {
      res.json(response.datosProducto);
    })
    .catch((error) => {
      res.json(error.response.datosProducto);
    });
});

//Actualizar un producto
app.put("/products/:id", (req, res) => {
  //Se recibe el id por parametros
  const id = req.params.id;
  //Se reciben los datos por la query
  const datosActualizados = req.query;

  api
    .put(`products/${id}`, datosActualizados)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

//Eliminar un producto
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  api
    .delete(`products/${id}`, {
      force: true,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
