const pico = require('picocolors')
const argv = require('yargs').argv
const {
  listContacts,
  getContactById,
  removeContact,
  addContact
} = require('./contacts')

async function showContacts () {
  try {
    const contacts = await listContacts()
    console.table(contacts)
  } catch (error) {
    console.log(pico.red('error', error))
  }
}
async function contactById (id) {
  try {
    const contacts = await getContactById(id)
    console.table(contacts)
  } catch (error) {
    console.log(pico.red('error', error))
  }
}

async function removeContactById (id) {
  try {
    const contacts = await removeContact(id)
    console.table(contacts)
  } catch (error) {
    console.log(pico.red('error', error))
  }
}

async function addNewContact (name, email, phone) {
  try {
    const contacts = await addContact(name, email, phone)
    console.table(contacts)
  } catch (error) {
    console.log(pico.red('error', error))
  }
}

function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      showContacts()
      break

    case 'get':
      contactById(id)
      break

    case 'add':
      addNewContact(name, email, phone)
      break

    case 'remove':
      removeContactById(id)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
