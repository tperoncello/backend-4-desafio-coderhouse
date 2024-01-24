import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const arrayObj = JSON.parse(info);
        return limit ? arrayObj.slice(0, limit) : arrayObj;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts({});
      const codeRepeat = products.find((p) => p.code === product.code);

      if (
        !product.title ||
        !product.description ||
        !product.price
      ) {
        console.log("Faltan campos");
        return;
      }
      let id;

      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      products.push({ id, ...product });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProd) {
    try {
      const prods = await this.getProducts({});
      console.log("prods", prods);
      const prod = prods.find((p) => p.id === idProd);
      return prod;
    } catch (error) {
      return error;
    }
  }
  async updateProduct(idProd, obj) {
    try {
      const prods = await this.getProducts({});
      const modifProd = prods.findIndex((p) => p.id === idProd);
      if (modifProd === -1) {
        return -1;
      }
      const prod = prods[modifProd];
      prods[modifProd] = { ...prod, ...obj };
      await fs.promises.writeFile(this.path, JSON.stringify(prods));
      return 1;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProd) {
    try {
      const prods = await this.getProducts({});
      const deletedProd = prods.find((p) => p.id === idProd);
      console.log(deletedProd);
      if (!deletedProd) {
        return -1;
      }
      const product = prods.filter((p) => p.id !== idProd);

      await fs.promises.writeFile(this.path, JSON.stringify(product));
      return 1;
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  title: "Luz Brillante",
  description: "Bombilla LED de alto rendimiento con luz violeta intensa. Ideal para iluminación suave con un toque moderno. Larga duración y eficiencia energética.",
  price: 730,
  thumbnail: "https://www.example.com/productos/1.jpg",
  code: "ALM001",
  stock: 10,
};

const product2 = {
  title: "Caja de Herramientas Maestra",
  description: "Caja resistente y duradera con compartimentos para organizar todas tus herramientas. Perfecta para profesionales y entusiastas del bricolaje.",
  price: 730,
  thumbnail: "https://www.example.com/productos/2.jpg",
  code: "ALM002",
  stock: 16,
};

const product3 = {
  title: "Pintura Todo en Uno",
  description: "Pintura versátil para interiores y exteriores. Color violeta vibrante que agrega un toque de elegancia a cualquier superficie. Fácil de aplicar y de secado rápido.",
  price: 250,
  thumbnail: "https://www.example.com/productos/3.jpg",
  code: "ALM003",
  stock: 16,
};

const product4 = {
  title: "Juego de Sábanas Acolchadas",
  description: "Conjunto de sábanas acolchadas para una comodidad óptima. Diseño con intensos patrones de ciruelas maduras y café tostado. Perfecto para una noche de sueño reparador.",
  price: 2660,
  thumbnail: "https://www.example.com/productos/4.jpg",
  code: "ALM004",
  stock: 20,
};

const product5 = {
  title: "Set de Tazas y Platillos",
  description: "Set elegante de tazas y platillos en tonos de ciruela y mora. Añade un toque de sofisticación a tu hora del té o café. Apto para lavavajillas y microondas.",
  price: 1000,
  thumbnail: "https://www.example.com/productos/5.jpg",
  code: "ALM005",
  stock: 12,
};

const product6 = {
  title: "Organizador de Escritorio",
  description: "Organizador de escritorio con notas herbáceas y anisadas. Compartimientos para tus bolígrafos, clips y documentos. Agrega elegancia y orden a tu espacio de trabajo.",
  price: 1000,
  thumbnail: "https://www.example.com/productos/6.jpg",
  code: "ALM006",
  stock: 25,
};

const product7 = {
  title: "Manta de Felpa Roja",
  description: "Manta suave y esponjosa en un vibrante tono de rojo violáceo. Aromas intensos y agradables, con notas florales y especiadas. Perfecta para acurrucarse en una noche fría.",
  price: 1050,
  thumbnail: "https://www.example.com/productos/7.jpg",
  code: "ALM007",
  stock: 31,
};

const product8 = {
  title: "Mantel de Mesa Elegante",
  description: "Mantel de mesa en un profundo y brillante tono de rojo rubí. Aromas sutiles y equilibrados, con notas de frutas negras, especias y cuero. Agrega un toque de lujo a tus cenas.",
  price: 970,
  thumbnail: "https://www.example.com/productos/8.jpg",
  code: "ALM008",
  stock: 10,
};

const product9 = {
  title: "Alfombra de Sala Profunda",
  description: "Alfombra en un profundo color púrpura con reflejos azulados. Aromas intensos a frutas rojas y negras como cereza, casis y mora. Añade calidez y estilo a tu sala de estar.",
  price: 430,
  thumbnail: "https://www.example.com/productos/9.jpg",
  code: "ALM009",
  stock: 10,
};

const product10 = {
  title: "Estante de Especias Chic",
  description: "Color rojo violáceo con notas rubias. Aroma a frutos rojos, ciruela y flores rojas. Estante elegante para organizar tus especias y dar un toque de sabor a tu cocina.",
  price: 430,
  thumbnail: "https://www.example.com/productos/10.jpg",
  code: "ALM010",
  stock: 18,
};

const product12 = {
  title: "Puff de Terciopelo de Lujo",
  description: "Puff de terciopelo violeta de lujo con sabor intenso a ciruelas maduras. Acompañado de notas de café tostado y chocolate. Textura suave y larga permanencia para una experiencia de descanso excepcional.",
  price: 730,
  thumbnail: "https://www.example.com/productos/12.jpg",
  code: "ALM012",
  stock: 10,
};



export default new ProductManager("products.json");


