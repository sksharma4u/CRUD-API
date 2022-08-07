var update = document.getElementById('update');
update.addEventListener('click', function() {

    console.log("yes clicked!");
    fetch('quotes', { method: 'put', headers: { 'Content-Type': 'application/json' } })
        .then(res => { if (res.ok) return res.json() })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
})


var del = document.getElementById('delete');
del.addEventListener('click', async function() {
    //console.log("Delete working")
    await fetch('quotes', { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })

    .then(res => { if (res.ok) return res.text() })
        .then(data => {
            console.log("haa main hoon");
            console.log(data)
            window.location.reload(true)
        })
})