const objlist = document.querySelector(".objlist");
const plusbtn = document.querySelector(".plus");
const minusbtn = document.querySelector(".minus");

let list = [{id: 1, value: "example"}];

let nextid = 1;

let base64 = null;
let json = null;

decode();

updatelist();

plusbtn.addEventListener("click", () => {
    list.push({id: nextid++, value: "example"});
    updatelist();
    console.log(list);
})

minusbtn.addEventListener("click", () => {
    list.pop()
    updatelist();
})

function updatelist() {
    objlist.innerHTML = "";

    for (let order = 0; order < list.length; order ++) {
        let obj = document.createElement("input");
        obj.classList.add("input")
        objlist.appendChild(obj);

        obj.value = list[order].value;

        obj.addEventListener("input", (e) => {
            list[order].value = e.target.value;
        })

    }
}

function encode() {
    json = JSON.stringify(list)
    base64 = btoa(encodeURIComponent(json));
    history.replaceState(null, "", `?data=${base64}`);
}

function decode() {
    let params = new URLSearchParams(location.search);
    const data = params.get("data");
    if (!data) return;
    stringjson = decodeURIComponent(atob(data));
    list = JSON.parse(stringjson);

}

setInterval(encode, 1000);