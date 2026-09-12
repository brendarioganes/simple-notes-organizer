<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Simple Notes Organizer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <div class="container">

        <!-- ========================= -->
        <!-- ADD / EDIT NOTE FORM -->
        <!-- ========================= -->

        <h1>
          {{ editingId ? 'Edit Note' : 'Add New Note' }}
        </h1>

        <!-- Title -->
        <ion-item>
          <ion-input
            v-model="title"
            label="Title"
            label-placement="floating"
            placeholder="Enter note title"
          ></ion-input>
        </ion-item>

        <!-- Content -->
        <ion-item>
          <ion-textarea
            v-model="content"
            label="Content"
            label-placement="floating"
            placeholder="Write your note..."
            :auto-grow="true"
          ></ion-textarea>
        </ion-item>

        <!-- Category -->
        <ion-item>
          <ion-select
            v-model="category"
            label="Category"
            label-placement="floating"
          >
            <ion-select-option value="School">
              School
            </ion-select-option>

            <ion-select-option value="Personal">
              Personal
            </ion-select-option>

            <ion-select-option value="Work">
              Work
            </ion-select-option>

            <ion-select-option value="Other">
              Other
            </ion-select-option>
          </ion-select>
        </ion-item>

        <!-- Date Created -->
        <ion-item>
          <ion-input
            v-model="dateCreated"
            label="Date Created"
            label-placement="floating"
            type="date"
          ></ion-input>
        </ion-item>

        <!-- Status -->
        <ion-item>
          <ion-select
            v-model="status"
            label="Status"
            label-placement="floating"
          >
            <ion-select-option value="Normal">
              Normal
            </ion-select-option>

            <ion-select-option value="Important">
              Important
            </ion-select-option>
          </ion-select>
        </ion-item>


        <!-- ========================= -->
        <!-- SAVE / UPDATE BUTTON -->
        <!-- ========================= -->

        <ion-button
          expand="block"
          @click="editingId ? updateNote() : addNote()"
        >
          {{ editingId ? 'Update Note' : 'Save Note' }}
        </ion-button>


        <!-- Cancel Edit -->
        <ion-button
          v-if="editingId"
          expand="block"
          fill="outline"
          @click="cancelEdit"
        >
          Cancel Edit
        </ion-button>


        <!-- Message -->
        <p
          v-if="message"
          class="message"
        >
          {{ message }}
        </p>


        <!-- ========================= -->
        <!-- READ NOTES -->
        <!-- ========================= -->

        <div class="notes-section">

          <h2>My Notes</h2>

          <!-- No Notes -->
          <p
            v-if="notes.length === 0"
            class="no-notes"
          >
            No notes found.
          </p>


          <!-- Notes List -->
          <ion-card
            v-for="note in notes"
            :key="note.id"
          >

            <ion-card-header>

              <ion-card-title>
                {{ note.title }}
              </ion-card-title>

              <ion-card-subtitle>
                {{ note.category }} • {{ note.status }}
              </ion-card-subtitle>

            </ion-card-header>


            <ion-card-content>

              <p class="note-content">
                {{ note.content }}
              </p>

              <p class="note-date">
                Date Created: {{ note.dateCreated }}
              </p>


              <!-- Edit Button -->
              <ion-button
                size="small"
                @click="startEdit(note)"
              >
                Edit
              </ion-button>


              <!-- Delete Button -->
              <ion-button
                size="small"
                color="danger"
                @click="deleteNote(note.id)"
              >
                Delete
              </ion-button>

            </ion-card-content>

          </ion-card>

        </div>

      </div>

    </ion-content>
  </ion-app>
</template>


<script setup lang="ts">

import { ref, onMounted } from 'vue'


import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue'


import {
  push,
  ref as dbRef,
  onValue,
  update,
  remove
} from 'firebase/database'


import { db } from './firebase'


// ===============================
// FORM DATA
// ===============================

const title = ref('')

const content = ref('')

const category = ref('School')

const dateCreated = ref(
  new Date()
    .toISOString()
    .split('T')[0]
)

const status = ref('Normal')

const message = ref('')


// ===============================
// EDITING DATA
// ===============================

const editingId = ref<string | null>(null)


// ===============================
// NOTES DATA
// ===============================

interface Note {

  id: string

  title: string

  content: string

  category: string

  dateCreated: string

  status: string

}


const notes = ref<Note[]>([])


// ===============================
// CREATE NOTE
// ===============================

const addNote = async () => {

  if (
    !title.value.trim() ||
    !content.value.trim()
  ) {

    message.value =
      'Please enter a title and content.'

    return

  }


  try {

    const notesRef = dbRef(
      db,
      'notes'
    )


    await push(
      notesRef,
      {

        title: title.value,

        content: content.value,

        category: category.value,

        dateCreated: dateCreated.value,

        status: status.value

      }
    )


    message.value =
      'Note saved successfully!'


    clearForm()


  } catch (error) {

    console.error(
      'Error saving note:',
      error
    )

    message.value =
      'Failed to save note.'

  }

}


// ===============================
// READ NOTES
// ===============================

const loadNotes = () => {

  const notesRef = dbRef(
    db,
    'notes'
  )


  onValue(
    notesRef,
    (snapshot) => {

      const data = snapshot.val()

      const loadedNotes: Note[] = []


      if (data) {

        Object.keys(data).forEach(
          (id) => {

            loadedNotes.push({

              id: id,

              title: data[id].title,

              content: data[id].content,

              category: data[id].category,

              dateCreated: data[id].dateCreated,

              status: data[id].status

            })

          }
        )

      }


      notes.value = loadedNotes

    },

    (error) => {

      console.error(
        'Error loading notes:',
        error
      )

    }
  )

}


// ===============================
// START EDIT
// ===============================

const startEdit = (note: Note) => {

  editingId.value = note.id

  title.value = note.title

  content.value = note.content

  category.value = note.category

  dateCreated.value = note.dateCreated

  status.value = note.status

  message.value =
    'Editing note...'

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

}


// ===============================
// UPDATE NOTE
// ===============================

const updateNote = async () => {

  if (!editingId.value) {

    return

  }


  if (
    !title.value.trim() ||
    !content.value.trim()
  ) {

    message.value =
      'Please enter a title and content.'

    return

  }


  try {

    const noteRef = dbRef(
      db,
      `notes/${editingId.value}`
    )


    await update(
      noteRef,
      {

        title: title.value,

        content: content.value,

        category: category.value,

        dateCreated: dateCreated.value,

        status: status.value

      }
    )


    message.value =
      'Note updated successfully!'


    clearForm()


  } catch (error) {

    console.error(
      'Error updating note:',
      error
    )

    message.value =
      'Failed to update note.'

  }

}


// ===============================
// DELETE NOTE
// ===============================

const deleteNote = async (id: string) => {

  const confirmed = window.confirm(
    'Are you sure you want to delete this note?'
  )


  if (!confirmed) {

    return

  }


  try {

    const noteRef = dbRef(
      db,
      `notes/${id}`
    )


    await remove(noteRef)


    message.value =
      'Note deleted successfully!'


    // If the deleted note was being edited,
    // clear the form.
    if (editingId.value === id) {

      clearForm()

    }


  } catch (error) {

    console.error(
      'Error deleting note:',
      error
    )

    message.value =
      'Failed to delete note.'

  }

}


// ===============================
// CANCEL EDIT
// ===============================

const cancelEdit = () => {

  clearForm()

  message.value =
    'Edit cancelled.'

}


// ===============================
// CLEAR FORM
// ===============================

const clearForm = () => {

  editingId.value = null

  title.value = ''

  content.value = ''

  category.value = 'School'

  dateCreated.value =
    new Date()
      .toISOString()
      .split('T')[0]

  status.value = 'Normal'

}


// ===============================
// LOAD NOTES WHEN APP STARTS
// ===============================

onMounted(() => {

  loadNotes()

})

</script>


<style scoped>

.container {
  max-width: 700px;
  margin: 0 auto;
}


h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: bold;
}


h2 {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}


ion-item {
  margin-bottom: 15px;
}


ion-button {
  margin-top: 15px;
  height: 50px;
  font-size: 16px;
}


.message {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}


.notes-section {
  margin-top: 30px;
}


ion-card {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 20px;
}


.note-content {
  font-size: 16px;
  margin-bottom: 15px;
}


.note-date {
  font-size: 14px;
  opacity: 0.7;
}


.no-notes {
  text-align: center;
  opacity: 0.7;
  padding: 20px;
}

</style>