var product_Name = document.getElementById("productName");
var product_Price = document.getElementById("productPrice");
var product_Category = document.getElementById("productCategory");
var product_Description = document.getElementById("productDescription");
var product_Image = document.getElementById("productImage");
var rowElements = document.getElementById("rowElements");
var categoryDefaultOption = document.getElementById("categoryDefaultOption");
var addProductButton = document.getElementById("addProductButton");
var addUpdateButton = document.getElementById("addUpdateButton");
var existMsg = document.getElementById("existMsg");
var updatedProductIndex = "";
var productNameRegex = /^[A-Z].+$/;
var productPriceRegex = /^\d+$/;
var productCategoryRegex = /^Mobile Phone|TV|Printer|Lap Top|Camera$/;
var productDescriptionRegex = /^.{4,}$/;

var productList = [];

if (localStorage.getItem("ourProducts") != null) {
  productList = JSON.parse(localStorage.getItem("ourProducts"));
  displayProducts(productList);
}

function addProduct() {
  if (
    validation(productNameRegex, product_Name) &
    validation(productPriceRegex, product_Price) &
    validation(productCategoryRegex, product_Category) &
    validation(productDescriptionRegex, product_Description) &
    imageValidation()
  ) {
    var product = {
      productName: product_Name.value,
      productPrice: product_Price.value,
      productCategory: product_Category.value,
      productDescription: product_Description.value,
      productImage: product_Image.files[0].name,
    };
    productList.push(product);
    localStorage.setItem("ourProducts", JSON.stringify(productList));
    displayProducts(productList);
    resetProductInputs();
  }
}

function displayProducts(arr) {
  var containerElement = ``;
  for (var i = 0; i < arr.length; i++) {
    containerElement += `<div class="col">
                            <div class="border shadow-sm p-2">
                              <div class="productImageContainer mb-5">
                                <img
                                  src="./images/${arr[i].productImage}"
                                  alt=""
                                  class="w-100 h-100 object-fit-contain"
                                />
                              </div>
                              <h3 class="fs-5">${arr[i].productName}</h3>
                              <p class="fs-6 text-secondary">${arr[i].productDescription}</p>
                              <p><span class="fw-semibold">Category:</span>${arr[i].productCategory}</p>
                              <div class="d-flex justify-content-between pe-3">
                                <p class="fw-semibold">${arr[i].productPrice} EGP</p>
                                <div>
                                  <i onclick = "deleteProduct(${i})" class="fa-solid fa-trash-can fs-5 text-danger"></i>
                                  <i onclick = "moveProductDetailsToInputs(${i})" class="fa-solid fa-pen-to-square fs-5 text-success"></i>
                                </div>
                              </div>
                            </div>
                        </div>`;
  }
  rowElements.innerHTML = containerElement;
}

function resetProductInputs() {
  product_Name.value = null;
  product_Price.value = null;
  categoryDefaultOption.selected = true;
  product_Description.value = null;
  product_Image.value = null;
  product_Name.classList.remove("is-valid", "is-invalid");
  product_Price.classList.remove("is-valid", "is-invalid");
  product_Category.classList.remove("is-valid", "is-invalid");
  product_Description.classList.remove("is-valid", "is-invalid");
  product_Image.classList.remove("is-valid", "is-invalid");
}

function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productList));
  displayProducts(productList);
}

function searchByProductName(term) {
  var filteredProductList = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].productName.toLowerCase().includes(term.toLowerCase())) {
      filteredProductList.push(productList[i]);
    }
    displayProducts(filteredProductList);
  }
}

function moveProductDetailsToInputs(index) {
  product_Name.value = productList[index].productName;
  product_Price.value = productList[index].productPrice;
  product_Description.value = productList[index].productDescription;
  product_Category.value = productList[index].productCategory;

  addProductButton.classList.replace("d-block", "d-none");
  addUpdateButton.classList.replace("d-none", "d-block");

  updatedProductIndex = index;
}

function updateProduct() {
  if (
    validation(productNameRegex, product_Name) &
    validation(productPriceRegex, product_Price) &
    validation(productCategoryRegex, product_Category) &
    validation(productDescriptionRegex, product_Description) &
    imageValidation()
  ) {
    productList[updatedProductIndex].productName = product_Name.value;
    productList[updatedProductIndex].productPrice = product_Price.value;
    productList[updatedProductIndex].productDescription =
      product_Description.value;
    productList[updatedProductIndex].productCategory = product_Category.value;
    if (product_Image.files.length != 0) {
      productList[updatedProductIndex].productImage =
        product_Image.files[0].name;
    }
    localStorage.setItem("ourProducts", JSON.stringify(productList));
    displayProducts(productList);
    addUpdateButton.classList.replace("d-block", "d-none");
    addProductButton.classList.replace("d-none", "d-block");
    resetProductInputs();
  }
}

function validation(regex, input) {
  if (regex.test(input.value) == true) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

function imageValidation() {
  if (product_Image.files.length != 0) {
    product_Image.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    product_Image.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
