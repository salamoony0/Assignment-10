var NameInput = document.getElementById("InputSite");
var urlInput = document.getElementById("InputURL");


var sites = [];
if(localStorage.getItem('sites') != null) {
    sites = JSON.parse(localStorage.getItem('sites'));
    displaySites();
    console.log(sites);
}


function addSite ( ) {
   if (validateName() && validateURL()) {
       var site = {
        name : NameInput.value,
        url : urlInput.value
    }
    sites.push(site);
    localStorage.setItem('sites' , JSON.stringify(sites));
    displaySites();
    clearForm();
    console.log(sites);
   }
}

function displaySites () {
var box = ``
for (var i = 1 ; i < sites.length ; i++) {
box += `
    
      <tr class="pt-sans-caption-regular">
        <td>${i}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" target="_blank" class="btn grn-btn px-3"> <i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td>  <button onClick="deleteURL(${i})" class="btn btn-danger "> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>
 
    
`
}
document.getElementById("table-body").innerHTML = box;
}
function clearForm () {
NameInput.value = "";
urlInput.value = "";
}

function deleteURL (index) {
    console.log('deleted');
    sites.splice(index , 1) ; 
    localStorage.setItem('sites' , JSON.stringify(sites)); 
    displaySites(); 
}


function validateURL() {
  var regex = /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.com(?:[\/\?\#][^\s]*)?$/;
  var alertMsg = document.getElementById('alertMsg');

  if (urlInput.value === "") {
    urlInput.classList.remove('is-valid', 'is-invalid');
    alertMsg.classList.add('d-none');
    return false;
  }

  if (regex.test(urlInput.value)) {
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');
    alertMsg.classList.add('d-none');
    return true;
  } else {
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
    alertMsg.classList.remove('d-none');
    return false;
  }
}

function validateName() {
  var regex = /^[a-zA-Z0-9-]{4,}$/;
  var alertMsg0 = document.getElementById('alertMsg0');

  if (NameInput.value === "") {
    NameInput.classList.remove('is-valid', 'is-invalid');
    alertMsg0.classList.add('d-none');
    return false;
  }

  if (regex.test(NameInput.value)) {
    NameInput.classList.remove('is-invalid');
    NameInput.classList.add('is-valid');
    alertMsg0.classList.add('d-none');
    return true;
  } else {
    NameInput.classList.remove('is-valid');
    NameInput.classList.add('is-invalid');
    alertMsg0.classList.remove('d-none');
    return false;
  }
}

document.getElementById("submit").addEventListener("click", function() {
  

  if (validateName() && validateURL()) {
    addSite();
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your site was added successfully ✅"
    });
  } else {
 Swal.fire({
  icon: "error",
  title: "Oops...",
  html: `
    Site Name or Url is not valid, Please follow the rules below : <br><br>
    • Website name must be at least 4 characters long and can only contain letters, numbers, and hyphens. <br>
    • URL must end with <b>.com</b>
  `
});
  }
});



