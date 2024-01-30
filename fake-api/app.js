const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { products } = require("./data.mock");

const app = express();
const port = 8000;

app.use(bodyParser.json());

const salt = bcrypt.genSaltSync(10);

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("secret123", salt),
  },
];

app.post("/login", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, "secret", {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/protegida", verificarToken, (req, res) => {
  res.json({ message: "Protected Rote!", user: req.user });
});

function verificarToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Empty Token" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Inavalid Token" });
    }

    req.user = decoded;
    next();
  });
}

app.get("/products", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const limit = 15;
  const page = parseInt(req.query.page) || 0;
  const offset = page ? (page - 1) * limit : 0;
  const end = offset + limit;

  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(name)
    );

    const slicedProducts = filteredProducts.slice(offset, end);

    return res.json({
      products: slicedProducts,
      total: filteredProducts.length,
    });
  }

  const slicedProducts = products.slice(offset, end);

  res.json({
    products: slicedProducts,
    total: products.length,
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
