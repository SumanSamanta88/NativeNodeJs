import React, { useEffect , useState} from 'react';
import * as Contacts from 'expo-contacts';

import userApi from '../api/userApi';
import userStorage from '../localStorage/userStorage';

export default useContacts = () => {
    let [contacts, setContacts] = useState();
    function createContact(contact) {
        try {
            const name = contact.name;
            let phoneNumbers = [];
            contact.phoneNumbers.forEach((currentContactNumberDetails) => {
                let currentNumber = currentContactNumberDetails.number;
                let phLength = currentNumber.length;
                let scrubbedPhoneNumber = currentNumber.substring(phLength - 10, phLength).replace(/\s+/g, '');

                phoneNumbers.push(scrubbedPhoneNumber);
            });
            let uniquePhones = [...new Set(phoneNumbers)];
            contact = { name: name, phoneNumbers: uniquePhones }
            return contact;
        } catch (ex) {
            console.log(ex,contact,contact.phoneNumbers);
        }
    }
    useEffect(() => {
       
        (async () => {
            try {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [Contacts.Fields.PhoneNumbers],
                    });
                    if (data.length > 0) {
                        let contacts = [];
                        data.forEach((contact) => {
                            if ((contact.phoneNumbers) && (contact.phoneNumbers.length > 0)) {
                                contacts.push(createContact(contact));
                            }
                        });
                        const response = await userApi.updateContacts({ contacts: contacts });
                        setContacts(response.data.content);
                        await userStorage.storeContacts('userContacts', response.data.content);
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        })();
    }, []);
    return {contacts};
};