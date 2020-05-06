$( document ).ready(() => {

    function loadEntry(){
        return fetch('/note-page.html').then(r => r.json());
    }

    loadEntry().then(entry => showEntry(entry));

    function showEntry(entry){
        console.log(entry);
    }

});