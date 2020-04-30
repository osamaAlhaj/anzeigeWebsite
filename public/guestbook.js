$( document ).ready(() => {

    function loadEntries() {
        return fetch('/api/entry').then(r => r.json());
    }

    function showEntries(entries) {
        $('#guestbook_entries').empty();
        for (const e of entries) {
            const el = $('<article></article>');
            const name = $('<address class="author"></address>').text(e.name);
            const dateString = new Date(e.created).toLocaleString();
            const date = $('<time></time>', {datetime: e.created}).text(dateString);
            const text = $('<section></section>').text(e.text);

            el.append(name).append(date).append(text);

            $('#guestbook_entries').append(el);
        }
    }

    loadEntries().then(entries => showEntries(entries));

    function submitEntry(entry) {
        const headers = { 'Content-Type': 'application/json' };
        return fetch('/api/entry', { method: 'POST', headers, body: JSON.stringify(entry) });
    }


    $('#guestbook_form').on('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entry = Object.fromEntries(formData.entries());
        const response = await submitEntry(entry);
        if(response.ok) {
            event.target.reset();
            const newEntries = await loadEntries();
            showEntries(newEntries);
        }
    });

});