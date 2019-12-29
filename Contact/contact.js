var readLineSync = require('readline-sync');
var fs = require('fs');

var contacts = [];

function loadData() {
    var file = fs.readFileSync('data.json');
    contacts = JSON.parse(file);
}

function saveData() {

}

function showMenu()
{
    console.log('1. Add Contact.');
    console.log('2. Edit profile.');
    console.log('3. Delete Contact.');
    console.log('4. Find Contact.');
    console.log('5. Exit.');
}

function display() {
    var i = 1;
    console.log("---------------------------------------------");
    console.log("| ID |     Name     |     Phone number     |");
    console.log("---------------------------------------------");
    for(contact of contacts){
        console.log(i + "\t" + contact.name + "\t" + contact.phone_number);
        i++;
    }
}

function addContact()
{
    var cont = {};
    cont.name = readLineSync.question("Name: ");
    cont.phone_number = readLineSync.question("Phone number: ");
    contacts.push(cont);
}

function editProfile()
{
    var pos = readLineSync.question("Chon lien he can sua: ");
    contacts[pos-1].name = readLineSync.question("Name: ");
    contacts[pos-1].phone_number = readLineSync.question("Phone number: ");
    display();
}

function deleteContact()
{
    var pos = readLineSync.question("Chon lien he can xoa: ");
    contacts.splice(pos-1,1);
    display();
}

function findContact()
{
    var f = readLineSync.question("Nhap ten hoac sdt lien he can tim: ");
    for (contact of contacts)
    {
        if(contact.name.toLowerCase() === f.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || contact.phone_number.indexOf(f) !== -1)
        {
            console.log(contact.name + "\t" + contact.phone_number);
        }
    }
}

function main()
{
    showMenu();
    loadData();
    display();
    // console.log(contacts);
    var option = readLineSync.question("Select option: ");
    switch(option)
    {
        case '1':
            addContact();
            break;
        case '2':
            editProfile();
            break;
        case '3':
            deleteContact();
            break;
        case '4':
            findContact();
            break;
        case '5':
            break;
    }
}

main();