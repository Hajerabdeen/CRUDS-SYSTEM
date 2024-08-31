//variables declaration
var inputName = document.getElementById("name");
var inputPrice = document.getElementById("price");
var inputCat = document.getElementById("cat");
var inputDescription = document.getElementById("description");
var tbody = document.getElementById("tbody");
var addUpdateBtn = document.getElementById("button");
var productsArr = [];
var currentndex;
//check if there is data in local storage
if (localStorage.getItem("product") != null) {
  productsArr = JSON.parse(localStorage.getItem("product"));
  displayData(productsArr);
} else {
  productsArr = [];
}
//display data function
function addBtn() {
  if(IsEmpty()){
    if(addUpdateBtn.innerHTML.trim() == "Add Product"){
      if(testName() && testPrice()){
        getAddData();
      }else{
        alert("Invalid Input");
      }
    }else{
      if(testName() && testPrice()){
        getUpdateData();
      }else{
        alert("Invalid Input");
      }
    }
  }else{
    alert("You need to fill all the fields !");
  }
}
//Add Data
function getAddData() {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    cat: inputCat.value,
    desc: inputDescription.value,
  };
  productsArr.push(product);
  //push data in local storage
  localStorage.setItem("product",JSON.stringify(productsArr));
  displayData(productsArr);
  clearData();
}

//update Data
function getUpdateData() {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    cat: inputCat.value,
    desc: inputDescription.value,
  };
  //update selectedd index information
  productsArr[currentndex] = product;
  //push data in local storage
  localStorage.setItem("product", JSON.stringify(productsArr));
  displayData(productsArr);
  addUpdateBtn.innerHTML = "Add Product";
  clearData();
}
//clear data function
function clearData() {
  inputName.value = "";
  inputPrice.value = "";
  inputCat.value = "";
  inputDescription.value = "";
}
//display data function
function displayData(arr) {
  var content = ``;
  for (var i = 0; i < arr.length; i++) {
    content += `<tr>
              <td>${i + 1}</td>
              <td>${arr[i].name}</td>
              <td>${arr[i].price}</td>
              <td>${arr[i].cat}</td>
              <td>${arr[i].desc}</td>
              <td class="action ">
             <div class="d-flex justify-content-around">
             <i class="fa-solid fa-pen-to-square edit fs-5"  onclick="editData(${i})" ></i>
             <i class="fa-solid fa-trash trash fs-5" onclick="deleteData (${i})"></i>
                </div>
              </td>
            </tr>`;
  }
  tbody.innerHTML = content;
  removeClass()
}
//Delete Data
function deleteData(index) {
  productsArr.splice(index, 1);
  alert("Are you Sure you want to delete this product?");
  localStorage.setItem("product", JSON.stringify(productsArr));
  displayData(productsArr);
}
//edit data
function editData(index) {
  currentndex = index;
  inputName.value = productsArr[index].name;
  inputPrice.value = productsArr[index].price;
  inputCat.value = productsArr[index].cat;
  inputDescription.value = productsArr[index].desc;

  addUpdateBtn.innerHTML = "Update Product";
}
//search function
function search(term) {
  var newArr = [];
  for (var i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name.toLowerCase().includes(term.toLowerCase())) {
      newArr.push(productsArr[i]);
    }
    displayData(newArr);
  }
}
//validation functions

//test name
function testName(){
  var regex =/^[A-Z]{1}[a-z]{3,8} {0,1}[a-z]{0,2}[0-9]{0,2}$/gm;
   if(regex.test(inputName.value)){
    inputName.classList.add("is-valid")
    inputName.classList.remove("is-invalid")
    return true;
   }else{
    inputName.classList.add("is-invalid")
    inputName.classList.remove("is-valid")
    return false;
   }
}
//test price
function testPrice(){
  let regex= /^[1-9]{1}[0-9]{1,5}$/gm
  if(regex.test(inputPrice.value)){
    inputPrice.classList.add("is-valid")
    inputPrice.classList.remove("is-invalid")
    return true;
   }else{
    inputPrice.classList.add("is-invalid")
    inputPrice.classList.remove("is-valid")
    return false;
   }
}
//test  & description Empty
function IsEmpty() {
  if (inputCat.value != "" && inputDescription.value != "") {
    return true;
  }
  return false;
}
function testCat(){
  if(inputCat.value!=""){
    inputCat.classList.add("is-valid")
    inputCat.classList.remove("is-invalid")
    return true;
   }else{
    inputCat.classList.add("is-invalid")
    inputCat.classList.remove("is-valid")
    return false;
   }
}
function testDescription(){
  if(inputDescription.value!=""){
    inputDescription.classList.add("is-valid")
    inputDescription.classList.remove("is-invalid")
    return true;
   }else{
    inputDescription.classList.add("is-invalid")
    inputDescription.classList.remove("is-valid")
    return false;
   }
}
//remove classes 
function removeClass(){
  inputName.classList.remove("is-valid","is-invalid");
  inputPrice.classList.remove("is-valid","is-invalid");
  inputCat.classList.remove("is-valid","is-invalid");
  inputDescription.classList.remove("is-valid","is-invalid");
}
