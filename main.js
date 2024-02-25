const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck= document.querySelector('#status-input');
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector('#name-input');


// izleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter);


// toplam State (durum)
let toplam = 0;

function updateToplam(fiyat){
    toplam +=  Number(fiyat);
    toplamBilgi.innerText = toplam;
}


// harcama oluşturma
function addExpense(e) {
  e.preventDefault();
  console.log(harcamaInput.value, fiyatInput.value);

  if(!fiyatInput.value || !harcamaInput.value) {
    alert ('Formları Doldurun');
    return;
  }

  // div oluşturma
  const harcamaDiv = document.createElement("div");

  // class ekleme
  harcamaDiv.classList.add("harcama");
 
  if (statusCheck.checked){
    harcamaDiv.classList.add("payed");
 }

  //içeriğini ayarlama
  harcamaDiv.innerHTML = `
          <h2>${harcamaInput.value}</h2>
          <h2 id='value' >${fiyatInput.value}</h2>
          <div class="buttons">
             <img id='payment' src="icons8-payment-100.png" alt="">
             <img id='remove' src="icons8-delete-100.png" alt="">
         </div>
         `;

// oluşan harcamayı listeye ekleme
liste.appendChild(harcamaDiv);

// toplamı güncelle
updateToplam(fiyatInput.value);

// formu temizleme
harcamaInput.value = ''
fiyatInput.value = ''

}
// listeye tıklanma olayını yönetme
function handleClick(e){

// tıklanan elemanı alma
    const element = e.target;
    
    if(element.id === 'remove'){

        const wrapperElement = element.parentElement.parentElement;

    // silinen elemanın fiyatını alma
     const deletedPrice = wrapperElement.querySelector('#value').innerText;
    

    
    // silinen elemanın fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));



    // kapsayıcıyı htmlden kaldırma

        wrapperElement.remove();
    }
}
 // filtreleme işleme
function handleFilter(e){
    const items = liste.childNodes;

    items.forEach((item) => {
        console.log(item)
        switch (e.target.value){
            case 'all' :
                item.style.display = 'flex';
            break;

            case 'payed':
                if (!item.classList.contains('payed')){
                    item.style.display = 'none';
                }else{
                    item.style.display = 'flex';
                }
            break;
            case 'not-payed':
                if (item.classList.contains('payed')){
                    item.style.display = 'none';
                }else{
                    item.style.display = 'flex';
                }
            break;
        }
    });
}
