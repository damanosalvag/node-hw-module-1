const { readFile, writeFile } = require('node:fs/promises')
const { v4: uuidv4 } = require('uuid')
const path = require('node:path')

const contactsPath = path.join('db', 'contacts.json')

async function listContacts () {
  try {
    const contacts = await readFile(contactsPath, { encoding: 'utf8' })
    return JSON.parse(contacts)
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}

async function getContactById (contactId) {
  try {
    const contacts = await readFile(contactsPath, { encoding: 'utf8' })
    const contact = JSON.parse(contacts).find(
      contact => contact.id === contactId
    )
    return contact
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}
async function removeContact (contactId) {
  try {
    const contacts = await readFile(contactsPath, { encoding: 'utf8' })
    const newContacts = JSON.parse(contacts).filter(
      contact => contact.id !== contactId
    )
    await writeFile(contactsPath, JSON.stringify(newContacts))
    return newContacts
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}

async function addContact (name, email, phone) {
  try {
    const contacts = await readFile(contactsPath, { encoding: 'utf8' })
    const newContact = {
      id: uuidv4(21),
      name,
      email,
      phone
    }
    const newContacts = JSON.parse(contacts).concat(newContact)
    await writeFile(contactsPath, JSON.stringify(newContacts))
    return newContact
  } catch (error) {
    console.error('there was an error:', error.message)
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact
}
