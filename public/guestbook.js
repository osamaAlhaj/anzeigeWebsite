$( document ).ready(() => {

    function loadEntries() {
        return fetch('/api/entry').then(r => r.json());
    }

    function getTopLocations(){
        return fetch('/api/entry/toplocations').then(r => r.json());
    }

    function showEntries(entries) {
        $('#tab-1').empty();
        for (const e of entries) {
            const noteId = e.id;
            const el = $(`<div class="note-content-note-box" id=${noteId}></div>`);
            const name = $(`<a href="/note-page.html?id=${noteId}"><h3></h3></a>`).text(e.title);
            // const dateString = new Date(e.created).toLocaleString();
            // const date = $('<time></time>', {datetime: e.created}).text(dateString);
            const text = $('<section></section>').text(e.text.substr(0,100)+" ...");

            el.append(name).append(text);

            $('#tab-1').append(el);
        }
    }

    function topLocationEntries(entries){
        $('.top-locations-header').empty();
        const locationsHeader = $('<h2>Most Popular Locations</h2>');
        const locationContent = $('<div class="top-location-content"></div>');
        $('.top-locations-header').append(locationsHeader).append(locationContent);
        for (const e of entries){
            let location = e.location;
            const locationLoc = $(`<div class="top-locations-content" id="${location}"><p>${location}</p></div>`);
            locationContent.append(locationLoc);
        }
    }


    loadEntries().then(entries => showEntries(entries));
    getTopLocations().then(entries => topLocationEntries(entries));


    $("ul li").click(function(){
        let tab_id = $(this).attr("data-tab");

        $("ul.switch-tabs-list li").removeClass("active");
        $(".note-content-container").removeClass("active");

        $(this).addClass("active");
        $("#"+tab_id).addClass("active");
    });

    $("#tab-1").click(function(e){
        let divId = e.target.closest("div").id;

    });


    function submitEntry(entry) {
        const headers = { 'Content-Type': 'application/json' };
        return fetch('/api/entry', { method: 'POST', headers, body: JSON.stringify(entry) });
    }


    $('#guestbook_form').on('submit', async (event) => {
        event.preventDefault();
        console.log(event);
        const formData = new FormData(event.target);
        console.log(formData);
        const entry = Object.fromEntries(formData.entries());
        const response = await submitEntry(entry);
        if(response.ok) {
            event.target.reset();
            const newEntries = await loadEntries();
            showEntries(newEntries);
        }
    });

});