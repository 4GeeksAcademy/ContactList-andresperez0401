const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      contacts: [],
    },
    actions: {
      //--------------------------------------------------------------------------------------------------------------------------------
      //Esta Funcion crea el usuario en la api si no existe.
      createUserApi: async (user) => {
        try {
          //Esperamos la respuesta
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${user}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            if (response.status === 400) {
              console.warn("El usuario ya existe");
            } else {
              console.warn(
                `Error en la API: ${response.status} - ${response.statusText}`
              );
              return false;
            }
          }

          setStore({ ...getStore(), user: user });
          console.log(getStore().user);

          //Si llega aca significa que se creo y retorna verdadero
          return true;
        } catch (error) {
          //Si en caso contrario tiene un error, lo capturamos y retornamos en false

          if (response.status === 400) {
            console.warn("El usuario ya existe");
          }
          return false;
        }
      },
      //Termina la funcion crearUserApi
      //--------------------------------------------------------------------------------------------------------------------------------

      //--------------------------------------------------------------------------------------------------------------------------------
      //Funcion para agregar contacto

      addContact: async (contact) => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${
              getStore().user
            }/contacts`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contact),
            }
          );

          if (response.status !== 201) {
            console.warn(
              `Error en la API: ${response.status} - ${response.statusText}`
            );
            throw new Error("Error al agregar el contacto");
          }

          contact.id = response.id;

          setStore({
            ...getStore(),
            contacts: [...getStore().contacts, contact],
          });

          return true;
        } catch (error) {
          return false;
        }
      },
      //Termina la funcion addContact
      //-------------------------------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------------------------------
      //Funcion para obtener los contactos de la api

      getContacts: async () => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${
              getStore().user
            }/contacts`
          );

          if (!response.ok) {
            console.warn(
              `Error en la API: ${response.status} - ${response.statusText}`
            );
            throw new Error("Error al obtener los contactos");
          }

          let data = await response.json();
          setStore({ ...getStore(), contacts: data.contacts });

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      //Termina la funcion getContacts
      //----------------------------------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------------------------------
      //Funcion para editar un contacto

      editContact: async (idContact, contact) => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${
              getStore().user
            }/contacts/${idContact}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contact),
            }
          );

          if (!response.ok) {
            console.warn(
              `Error en la API: ${response.status} - ${response.statusText}`
            );
            throw new Error("Error al editar el contacto");
          }

          //Actualizamos el contexto con el contacto actualizado
          setStore({
            ...getStore(),
            contacts: getStore().contacts.map((c) =>
              //   c.id === idContact ? { ...contact, id: idContact } : c
              c.id === idContact ? { response } : c
            ),
          });

          return true;
        } catch (error) {
          return false;
        }
      },

      //Termina la funcion editContact
      //----------------------------------------------------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------------------------------------------------
      //Funcion para eliminar un contacto

      deleteContact: async (id) => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${
              getStore().user
            }/contacts/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.status !== 204) {
            console.warn(
              `Error en la API: ${response.status} - ${response.statusText}`
            );
            throw new Error("Error al eliminar el contacto");
          }

          //Setteamos en el store del contexto
          let newContacts = getStore().contacts.filter(
            (contact) => contact.id !== id
          );
          setStore({ ...getStore(), contacts: newContacts });
          return true;
        } catch (error) {
          return false;
        }
      },
      //Termina la funcion deleteContact
      //----------------------------------------------------------------------------------------------------------------------------------------
    },
  };
};

export default getState;
