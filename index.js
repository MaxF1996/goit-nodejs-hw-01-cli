'use strict';

const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case 'get':
      const searchedContact = await contacts.getContactById(id);
      return console.log(searchedContact);

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      return console.log(removedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
