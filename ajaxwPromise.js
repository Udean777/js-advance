const apiUrl = (keyword) => {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
};

const Products = (keyword) => {
  const promise = new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();
    ajax.onload = () => {
      if (ajax.status === 200) {
        const data = JSON.parse(ajax.responseText);
        resolve(data);
      } else {
        reject(Error("Gagal mengambil data produk!"));
      }
    };

    const url = apiUrl(keyword);
    ajax.open("GET", url);
    ajax.send();
  });

  return promise;
};

const clear = () => {
  const productUl = document.getElementById("products");
  productUl.textContent = "";
};

const displays = (data) => {
  data.data.products.forEach((product) => {
    displays(product);
  });
};

const displayP = (product) => {
  const productLi = document.createElement("li");
  productLi.textContent = product.name;

  const productUl = document.getElementById("products");
  productUl.appendChild(productLi);
};

const buttonClick = () => {
  const promise = Products(document.getElementById("keyword").value);
  console.log(promise);

  promise
    .then((value) => {
      return value.data.products;
    })
    .then((products) => {
      clear();
      products.forEach((product) => {
        displayP(product);
      });
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      console.log("Selesai memproses Promise");
    });
};
