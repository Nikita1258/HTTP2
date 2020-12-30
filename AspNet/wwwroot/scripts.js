let ads;

fetch('/ads')
.then(result => result.json())
.then(ads_res => {
    ads = ads_res;
    ads_res.forEach(e => {
        let elem = document.createElement('div');
        elem.onclick = () => OpenAd(elem.dataset.id);
        elem.className = 'ad';
        elem.dataset.id = e.id;
        elem.setAttribute('title', e.title);
        elem.innerHTML = 
        `<h2 class="ad-item">
        ${e.title.length > 20 ? e.title.substr(0, 20) + '...' : e.title}</h2>
        <div class="ad-author-date">
            <p class="ad-item" style="flex-grow: 1">${e.author}</p>
            <p class="ad-item">${e.date.substr(0, 10)}</p></div>
        <div class="ad-item">${e.text.length > 200 ? e.text.substr(0, 200) + '...' : e.text}</div>`;
        document.querySelector('#posters').append(elem);
    });

    let url = new URL(location.href)
    if(url.searchParams.has('id') && !isNaN(+url.searchParams.get('id')) 
        && ads.find(a => a.id == +url.searchParams.get('id')) != null)
        OpenAd(+url.searchParams.get('id'));
});

document.querySelector('#div-form').addEventListener('click',event => {
    if(event.currentTarget != event.target)
        return;
    document.querySelector('#screen').style.display = 'none';
    event.currentTarget.style.display = 'none';
    document.forms[0].style.display = 'none';
    document.forms[0].dataset.id = -1;
    document.querySelector('#ad-info').style.display = '';
    document.querySelector('#form-contacts').innerHTML = '';
    document.forms[0].reset();
});

document.querySelector('#edit-button').addEventListener('click', () => {
    document.querySelector('#ad-info').style.display = 'none';
    document.forms[0].style.display = '';
});

document.forms[0].onsubmit = () => {
    fetch('/ads', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            id: document.forms[0].dataset.id,
            title: document.querySelector('#edit-title').value,
            author: document.querySelector('#edit-author').value,
            text: document.querySelector('#edit-text').value,
            date: document.querySelector('#edit-date').value,
            contacts:{
                email: document.querySelector('#e-mail').value ? 
                    document.querySelector('#e-mail').value : null,
                telephone: document.querySelector('#telephone').value ? 
                    document.querySelector('#telephone').value : null,
                address: document.querySelector('#address').value ? 
                    document.querySelector('#address').value : null
            }
        })
    })
    .then(r => r.json())
    .then(res => location.href = location.origin + '/?id=' + res.id);
    return false;
};

document.querySelector('#add-button').addEventListener('click', () => {
    document.querySelector('#screen').style.display = '';
    document.querySelector('#div-form').style.display = '';
    document.querySelector('#ad-info').style.display = 'none';
    document.forms[0].style.display = '';
});

document.querySelector('#cancel').addEventListener('click', () => {
    if(document.forms[0].dataset.id > -1){
        document.forms[0].style.display = 'none';
        document.querySelector('#ad-info').style.display = '';
    }
    else{
        document.querySelector('#screen').style.display = 'none';
        document.querySelector('#div-form').style.display = 'none';
        document.forms[0].style.display = 'none';
        document.forms[0].dataset.id = -1;
        document.querySelector('#ad-info').style.display = '';
        document.querySelector('#form-contacts').innerHTML = '';
        document.forms[0].reset();
    }
});

function OpenAd(id){
    document.querySelector('#screen').style.display = '';
    document.querySelector('#div-form').style.display = '';
    let temp = ads.find(i => i.id == id);
    document.forms[0].dataset.id = id;
    document.querySelector('#form-title').innerHTML = temp.title;
    document.querySelector('#edit-title').value = temp.title;
    document.querySelector('#form-author').innerHTML = temp.author;
    document.querySelector('#edit-author').value = temp.author;
    document.querySelector('#form-date').innerHTML = temp.date.substr(0, 10);
    document.querySelector('#edit-date').value = temp.date.substr(0, 10);
    document.querySelector('#form-text').innerHTML = temp.text;
    document.querySelector('#edit-text').value = temp.text;
    let contacts_div = document.querySelector('#form-contacts');
    if(temp.contacts.email){
        contacts_div.innerHTML += 
        `<div class="contact"><p>e-mail</p>
        <p>${temp.contacts.email}</div>`;
        document.querySelector('#e-mail').value = temp.contacts.email;
    }
    if(temp.contacts.telephone){
        contacts_div.innerHTML += 
        `<div class="contact"><p>Телефон</p>
        <p>${temp.contacts.telephone}</div>`;
        document.querySelector('#telephone').value = temp.contacts.telephone;
    }
    if(temp.contacts.address){
        contacts_div.innerHTML += 
        `<div class="contact"><p>Адрес</p>
        <p>${temp.contacts.address}</div>`;
        document.querySelector('#address').value = temp.contacts.address;
    }
}