$(document).ready(() => {

    function loadEntries() {
        return fetch('/api/entry').then(r => r.json());
    }

    function showEntries(entries) {
        $('#tab-1').empty();
        for (const e of entries) {
            const el = $('<div class="note-content-note-box"></div>');
            const name = $('<h3></h3>').text(e.title);
            //const dateString = new Date(e.created).toLocaleString();
            //const date = $('<time></time>', { datetime: e.created }).text(dateString);
            const text = $('<section></section>').text(e.text.substr(0, 100));

            //apend(date) entfernt
            el.append(name).append(text);

            $('#tab-1').append(el);
        }
    }

    loadEntries().then(entries => showEntries(entries));

    $("ul li").click(function () {
        let tab_id = $(this).attr("data-tab");

        $("ul.switch-tabs-list li").removeClass("active");
        $(".note-content-container").removeClass("active");

        $(this).addClass("active");
        $("#" + tab_id).addClass("active");
    });

    function submitEntry(entry) {
        const headers = { 'Content-Type': 'application/json' };
        return fetch('/api/entry', { method: 'POST', headers, body: JSON.stringify(entry) });
    }


    $('#guestbook_form').on('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entry = Object.fromEntries(formData.entries());
        const response = await submitEntry(entry);
        if (response.ok) {
            event.target.reset();
            const newEntries = await loadEntries();
            showEntries(newEntries);
        }
    });

});