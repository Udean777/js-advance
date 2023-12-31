function getProductsUrl(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword) {
  const promise = new Promise(function (resolve, reject) {
    const ajax = new XMLHttpRequest();
    ajax.onload = function () {
      if (ajax.status === 200) {
        const data = JSON.parse(ajax.responseText);
        resolve(data);
      } else {
        reject(Error("Gagal mengambil data produk"));
      }
    };

    const url = getProductsUrl(keyword);
    ajax.open("GET", url);
    ajax.send();
  });

  return promise;
}

function clearProducts() {
  const productUl = document.getElementById("products");
  productUl.textContent = "";
}

function displayProducts(data) {
  data.data.products.forEach((product) => displayProduct(product));
}

function displayProduct(product) {
  const productLi = document.createElement("li");
  productLi.textContent = product.name;

  const productUl = document.getElementById("products");
  productUl.appendChild(productLi);
}

function buttonClick() {
  //   const promise = getProducts(document.getElementById("keyword").value);
  //   console.log(promise);

  //   promise
  //     .then(function (value) {
  //       // console.log(value);
  //       return value.data.products;
  //     })
  //     .then(function (products) {
  //       clearProducts();
  //       products.forEach(function (product) {
  //         displayProduct(product);
  //       });
  //     })
  //     .catch(function (error) {
  //       alert(error.message);
  //     })
  //     .finally(function () {
  //       console.log("Selesai memproses promise!");
  //     });

  const promise1 = getProducts(document.getElementById("keyword").value);
  const promise2 = getProducts(document.getElementById("keyword2").value);
  const promise3 = getProducts(document.getElementById("keyword3").value);

  Promise.all([promise1, promise2, promise3])
    .then(function (values) {
      return values.map((value) => value.data.products);
    })
    .then(function (values) {
      clearProducts();
      values.forEach(function (products) {
        products.forEach(function (product) {
          displayProduct(product);
        });
      });
    })
    .catch(function (error) {
      alert(error.message);
    })
    .finally(function () {
      console.log("Selesai memproses promise!");
    });
}
