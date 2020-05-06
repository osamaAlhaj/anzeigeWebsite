$( document ).ready(() => {

    let x = location.search;
    let xArr = x.split("=")
    let idUrl = xArr[xArr.length-1];

    function loadEntries() {
        return fetch('/api/entry').then(r => r.json());
    }

    loadEntries().then(entries => getObject(entries));

    function getObject(entries){
        let objectId = [];
        for (let i = 0; i < entries.length; i++){
            if(idUrl == entries[i].id){
                objectId.push(entries[i]);
                    }
                }
                return showObjectentries(objectId);
            }

    function showObjectentries (objectId){
        let title = objectId[0].title;
        let text = objectId[0].text;
        let price = objectId[0].price;
        let date = objectId[0].created;
        let author = objectId[0].name;
        let contact = objectId[0].email;

        $(".header-title-container").append(`<h1>${title}</h1>`);
        $(".top-locations-header").append(`${text}`);
        $('#price').append(`${price} €`);
        $('#date').append(`${date}`);
        $('#author').append(`${author}`);
        $('#contact').append(`${contact}`);
    }

});