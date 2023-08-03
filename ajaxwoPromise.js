function getProductsUrl(keyword) {
  return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`;
}

function getProducts(keyword, callbackSuccess, callbackError) {
  const ajax = new XMLHttpRequest();
  ajax.onload = function () {
    if (ajax.status === 200) {
      const data = JSON.parse(ajax.responseText);
      callbackSuccess(data);
      // clearProducts();
      // displayProducts(data);
    } else {
      callbackError();
    }
  };

  const url = getProductsUrl(keyword);
  ajax.open("GET", url);
  ajax.send();

  // const response = JSON.parse(ajax.responseText);
  // console.log(response);
}

function getProductError() {
  alert("Error woyy");
}

// function clearProducts() {
//   const productUl = document.getElementById("products");
//   productUl.textContent = "";
// }

// function displayProducts(data) {
//   data.data.products.forEach((product) => displayProduct(product));
// }

// function displayProduct(product) {
//   const productLi = document.createElement("li");
//   productLi.textContent = product.name;

//   const productUl = document.getElementById("products");
//   productUl.appendChild(productLi);
// }

function clearTableProducts() {
  const productUl = document.getElementById("table-products");
  productUl.textContent;
}

function displayTableProducts(data) {
  const table = document.createElement("table");
  table.setAttribute("border", 1);

  let index = 0;
  data.data.products.forEach((product) => {
    table.insertRow(index).insertCell(0).innerText = product.name;
    index++;
  });

  const tableProduct = document.getElementById("table-products");
  tableProduct.appendChild(table);
}

function buttonClick() {
  // getProducts(
  //   document.getElementById("keyword").value,
  //   function (data) {
  //     clearProducts();
  //     displayProducts(data);
  //   },
  //   function () {
  //     getProductError();
  //   }
  // );

  getProducts(
    document.getElementById("keyword").value,
    function (data) {
      clearTableProducts();
      displayTableProducts(data);
    },
    function () {
      getProductError();
    }
  );
  // console.log("Sudah di klik");
}
