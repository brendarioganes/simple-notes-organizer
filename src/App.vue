<template>
  <ion-app>
    <!-- ================= HEADER ================= -->
    <ion-header class="app-header">
      <ion-toolbar>
        <div class="header-content">
          <div class="brand">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 3.5h9.5L19 7v13.5H6A2 2 0 0 1 4 18.5v-13a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 3.5V7h4M8 11h7M8 14.5h7M8 18h4"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <h1>Simple Notes</h1>
              <span>Organizer</span>
            </div>
          </div>

          <div class="header-note-count">
            <strong>{{ notes.length }}</strong>
            <span>{{ notes.length === 1 ? 'Note' : 'Notes' }}</span>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="main-content">
      <!-- Decorative background -->
      <div class="background-shape shape-one"></div>
      <div class="background-shape shape-two"></div>

      <div class="page-container">

        <!-- ================= HERO ================= -->
        <section class="hero-section">
          <div class="hero-text">
            <span class="eyebrow">
              <span class="eyebrow-dot"></span>
              Your personal space
            </span>

            <h2>
              Keep your ideas
              <span>organized.</span>
            </h2>

            <p>
              Capture your thoughts, school notes, plans, and reminders
              in one simple place.
            </p>
          </div>

          <button class="hero-add-button" @click="scrollToEditor">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
            </svg>
            <span>New Note</span>
          </button>
        </section>

        <!-- ================= MESSAGE ================= -->
        <div
          v-if="message"
          class="message-box"
          :class="{ editing: !!editingId }"
        >
          <div class="message-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m5 12 4 4L19 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <span>{{ message }}</span>

          <button @click="message = ''" aria-label="Close message">
            ×
          </button>
        </div>

        <!-- ================= EDITOR ================= -->
        <section ref="editorSection" class="editor-card">

          <div class="section-heading">
            <div class="heading-icon" :class="{ edit: !!editingId }">
              <svg v-if="!editingId" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>

              <svg v-else viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20h9"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
                <path
                  d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <h3>{{ editingId ? 'Edit Note' : 'Create a Note' }}</h3>
              <p>
                {{
                  editingId
                    ? 'Update the details of your note.'
                    : 'Write down something worth remembering.'
                }}
              </p>
            </div>
          </div>

          <div class="form-grid">

            <!-- TITLE -->
            <div class="field full-width">
              <label>
                <span>Title</span>
                <small>Required</small>
              </label>

              <div class="input-wrapper">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5.5h14M5 9.5h14M5 13.5h9"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  v-model="title"
                  type="text"
                  placeholder="Give your note a title..."
                />
              </div>
            </div>

            <!-- CONTENT -->
            <div class="field full-width">
              <label>
                <span>Content</span>
                <small>Required</small>
              </label>

              <div class="textarea-wrapper">
                <textarea
                  v-model="content"
                  placeholder="Start writing your note here..."
                  rows="5"
                ></textarea>
              </div>
            </div>

            <!-- CATEGORY -->
            <div class="field">
              <label>Category</label>

              <div class="select-wrapper">
                <span
                  class="category-dot"
                  :class="category.toLowerCase()"
                ></span>

                <select v-model="category">
                  <option value="School">School</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="m7 10 5 5 5-5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- DATE -->
            <div class="field">
              <label>Date Created</label>

              <div class="input-wrapper date-input">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3.5"
                    y="5"
                    width="17"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    d="M7.5 3v4M16.5 3v4M3.5 9h17"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>

                <input v-model="dateCreated" type="date" />
              </div>
            </div>

            <!-- STATUS -->
            <div class="field full-width">
              <label>Status</label>

              <div class="status-options">

                <button
                  type="button"
                  class="status-option normal"
                  :class="{ selected: status === 'Normal' }"
                  @click="status = 'Normal'"
                >
                  <span class="status-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 8v4l2.5 2.5"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="8.5"
                        stroke="currentColor"
                        stroke-width="1.8"
                      />
                    </svg>
                  </span>

                  <span>
                    <strong>Normal</strong>
                    <small>Regular note</small>
                  </span>

                  <span class="radio-circle"></span>
                </button>

                <button
                  type="button"
                  class="status-option important"
                  :class="{ selected: status === 'Important' }"
                  @click="status = 'Important'"
                >
                  <span class="status-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3.5 20 19H4L12 3.5Z"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 9v4"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      />
                      <circle
                        cx="12"
                        cy="16"
                        r="0.8"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <span>
                    <strong>Important</strong>
                    <small>Needs attention</small>
                  </span>

                  <span class="radio-circle"></span>
                </button>

              </div>
            </div>
          </div>

          <!-- FORM BUTTONS -->
          <div class="form-actions">

            <button
              v-if="editingId"
              class="cancel-button"
              @click="cancelEdit"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Cancel
            </button>

            <button
               type="button"
               class="save-button"
              :class="{ update: !!editingId }"
              @click.stop="editingId ? updateNote() : addNote()"
            >
              <svg
                v-if="!editingId"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>

              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {{ editingId ? 'Update Note' : 'Save Note' }}
            </button>

          </div>
        </section>

        <!-- ================= NOTES SECTION ================= -->
        <section class="notes-section">

          <div class="notes-heading">
            <div>
              <span class="eyebrow green">
                <span class="eyebrow-dot"></span>
                Your collection
              </span>

              <h2>My Notes</h2>
            </div>

            <div class="notes-total">
              {{ filteredNotes.length }}
              {{ filteredNotes.length === 1 ? 'note' : 'notes' }}
            </div>
          </div>

          <!-- SEARCH -->
          <div class="search-wrapper">

            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="m16 16 5 5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>

            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search your notes..."
            />

            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              aria-label="Clear search"
            >
              ×
            </button>
          </div>

          <!-- CATEGORY FILTER -->
          <div class="filters">

            <button
              v-for="filter in categories"
              :key="filter"
              class="filter-chip"
              :class="{
                active: selectedCategory === filter,
                [filter.toLowerCase()]: filter !== 'All'
              }"
              @click="selectedCategory = filter"
            >
              <span
                v-if="filter !== 'All'"
                class="filter-dot"
              ></span>

              <span v-else class="all-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 7h14M5 12h14M5 17h14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>

              {{ filter }}
            </button>

          </div>

          <!-- EMPTY STATE -->
          <div
            v-if="filteredNotes.length === 0"
            class="empty-state"
          >
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 3.5h9.5L19 7v13.5H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 3.5V7h4"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M8 12h7M8 15.5h5"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <h3>
              {{
                searchQuery || selectedCategory !== 'All'
                  ? 'No matching notes'
                  : 'No notes yet'
              }}
            </h3>

            <p>
              {{
                searchQuery || selectedCategory !== 'All'
                  ? 'Try a different search or category.'
                  : 'Create your first note and start organizing your ideas.'
              }}
            </p>

            <button
              v-if="!searchQuery && selectedCategory === 'All'"
              @click="scrollToEditor"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Create your first note
            </button>
          </div>

          <!-- NOTES GRID -->
          <div v-else class="notes-grid">

            <article
              v-for="note in filteredNotes"
              :key="note.id"
              class="note-card"
              :class="note.category.toLowerCase()"
            >

              <!-- COLOR TOP -->
              <div class="card-color-bar"></div>

              <div class="card-body">

                <!-- CARD TOP -->
                <div class="card-top">

                  <span
                    class="category-badge"
                    :class="note.category.toLowerCase()"
                  >
                    <span class="badge-dot"></span>
                    {{ note.category }}
                  </span>

                  <span
                    v-if="note.status === 'Important'"
                    class="important-badge"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3.5 20 19H4L12 3.5Z"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 9v4"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                    Important
                  </span>

                </div>

                <!-- TITLE -->
                <h3>{{ note.title }}</h3>

                <!-- CONTENT -->
                <p class="note-content">
                  {{ note.content }}
                </p>

                <!-- DATE -->
                <div class="note-meta">
                  <div class="date">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3.5"
                        y="5"
                        width="17"
                        height="16"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="1.7"
                      />
                      <path
                        d="M7.5 3v4M16.5 3v4M3.5 9h17"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                    {{ note.dateCreated }}
                  </div>

                  <span
                    class="status-label"
                    :class="note.status.toLowerCase()"
                  >
                    {{ note.status }}
                  </span>
                </div>

                <!-- ACTIONS -->
                <div class="card-actions">

                  <button
                    class="edit-button"
                    @click="startEdit(note)"
                    title="Edit note"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 20h9"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      />
                      <path
                        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Edit
                  </button>

                  <button
                    class="delete-button"
                    @click="deleteNote(note.id)"
                    title="Delete note"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Delete
                  </button>

                </div>

              </div>
            </article>

          </div>
        </section>

        <!-- FOOTER -->
        <footer>
          <div class="footer-line"></div>
          <p>Simple Notes Organizer</p>
          <span>Keep it simple. Keep it organized. 🌱</span>
        </footer>

      </div>
    </ion-content>
  </ion-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { IonApp, IonHeader, IonToolbar, IonContent } from '@ionic/vue'

import {
  push,
  ref as dbRef,
  onValue,
  update,
  remove
} from 'firebase/database'

import { db } from './firebase'

/* ================= FORM ================= */

const title = ref('')
const content = ref('')

const category = ref('School')

const dateCreated = ref(
  new Date().toISOString().split('T')[0]
)

const status = ref('Normal')

const message = ref('')

const editingId = ref<string | null>(null)

/* ================= SEARCH ================= */

const searchQuery = ref('')

const selectedCategory = ref('All')

const categories = [
  'All',
  'School',
  'Personal',
  'Work',
  'Other'
]

/* ================= NOTES ================= */

interface Note {
  id: string
  title: string
  content: string
  category: string
  dateCreated: string
  status: string
}

const notes = ref<Note[]>([])

/* ================= FILTERED NOTES ================= */

const filteredNotes = computed(() => {
  const search = searchQuery.value
    .trim()
    .toLowerCase()

  return notes.value
    .filter((note) => {

      const matchesCategory =
        selectedCategory.value === 'All' ||
        note.category === selectedCategory.value

      const matchesSearch =
        !search ||
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search) ||
        note.category.toLowerCase().includes(search)

      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      return b.dateCreated.localeCompare(a.dateCreated)
    })
})

/* ================= ADD NOTE ================= */

const addNote = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    message.value = 'Please enter a title and content.'
    return
  }

  try {
    const notesRef = dbRef(db, 'notes')

    await push(notesRef, {
      title: title.value.trim(),
      content: content.value.trim(),
      category: category.value,
      dateCreated: dateCreated.value,
      status: status.value
    })

    message.value = 'Note saved successfully!'

    clearForm()

  } catch (error) {
    console.error('Error saving note:', error)

    message.value = 'Failed to save note.'
  }
}

/* ================= LOAD NOTES ================= */

const loadNotes = () => {
  const notesRef = dbRef(db, 'notes')

  onValue(
    notesRef,
    (snapshot) => {

      const data = snapshot.val()

      const loadedNotes: Note[] = []

      if (data) {

        Object.keys(data).forEach((id) => {

          loadedNotes.push({
            id,
            title: data[id].title || '',
            content: data[id].content || '',
            category: data[id].category || 'Other',
            dateCreated:
              data[id].dateCreated ||
              new Date().toISOString().split('T')[0],
            status: data[id].status || 'Normal'
          })

        })

      }

      notes.value = loadedNotes
    },
    (error) => {
      console.error('Error loading notes:', error)

      message.value = 'Failed to load notes.'
    }
  )
}

/* ================= START EDIT ================= */

const startEdit = (note: Note) => {

  editingId.value = note.id

  title.value = note.title
  content.value = note.content
  category.value = note.category
  dateCreated.value = note.dateCreated
  status.value = note.status

  message.value = 'Editing note...'

  scrollToEditor()
}

/* ================= UPDATE ================= */

const updateNote = async () => {

  if (!editingId.value) return

  if (!title.value.trim() || !content.value.trim()) {

    message.value =
      'Please enter a title and content.'

    return
  }

  try {

    const noteRef = dbRef(
      db,
      `notes/${editingId.value}`
    )

    await update(noteRef, {

      title: title.value.trim(),

      content: content.value.trim(),

      category: category.value,

      dateCreated: dateCreated.value,

      status: status.value

    })

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

/* ================= DELETE ================= */

const deleteNote = async (id: string) => {

  const confirmed = window.confirm(
    'Are you sure you want to delete this note?'
  )

  if (!confirmed) return

  try {

    const noteRef = dbRef(
      db,
      `notes/${id}`
    )

    await remove(noteRef)

    message.value =
      'Note deleted successfully!'

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

/* ================= CANCEL ================= */

const cancelEdit = () => {

  clearForm()

  message.value =
    'Edit cancelled.'
}

/* ================= CLEAR FORM ================= */

const clearForm = () => {

  editingId.value = null

  title.value = ''

  content.value = ''

  category.value = 'School'

  dateCreated.value =
    new Date().toISOString().split('T')[0]

  status.value = 'Normal'
}

/* ================= SCROLL ================= */

const editorSection = ref<HTMLElement | null>(null)

const scrollToEditor = () => {

  setTimeout(() => {

    editorSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }, 50)
}

/* ================= START ================= */

onMounted(() => {
  loadNotes()
})
</script>

<style>
/* =========================================================
   GLOBAL
========================================================= */

:root {
  --green: #18a66b;
  --green-dark: #087f52;
  --green-light: #e5f8ef;

  --blue: #2474e8;
  --blue-dark: #1455b8;
  --blue-light: #e8f1ff;

  --yellow: #f5b82e;
  --yellow-light: #fff6d9;

  --text-dark: #17324d;
  --text: #41566d;
  --text-light: #718399;

  --background: #edf8f5;

  --card: #fffdf8;

  --border: #dceae5;

  --shadow:
    0 12px 35px rgba(27, 78, 75, 0.08);
}

/* =========================================================
   IONIC
========================================================= */

ion-app {
  background:
    linear-gradient(
      135deg,
      #edf9f4 0%,
      #edf5ff 52%,
      #fff9e7 100%
    );
}

ion-content {
  --background: transparent;
}

/* =========================================================
   HEADER
========================================================= */

.app-header {
  box-shadow:
    0 5px 25px rgba(14, 75, 101, 0.15);
}

.app-header ion-toolbar {
  --background:
    linear-gradient(
      120deg,
      #155db7 0%,
      #177fc7 48%,
      #18a66b 100%
    );

  --color: white;

  min-height: 76px;

  padding:
    8px
    max(18px, calc((100vw - 1180px) / 2));
}

.header-content {
  max-width: 1180px;

  margin: auto;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;
}

.brand {
  display: flex;

  align-items: center;

  gap: 13px;

  color: white;
}

.brand-icon {
  width: 46px;
  height: 46px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.16);

  border:
    1px solid
    rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(8px);
}

.brand-icon svg {
  width: 27px;
  height: 27px;
}

.brand h1 {
  margin: 0;

  font-size: 20px;

  line-height: 1.05;

  font-weight: 800;

  letter-spacing: -0.3px;
}

.brand span {
  display: block;

  margin-top: 4px;

  font-size: 12px;

  opacity: 0.78;

  letter-spacing: 1.2px;

  text-transform: uppercase;
}

.header-note-count {
  display: flex;

  align-items: center;

  gap: 8px;

  padding:
    8px
    13px;

  border-radius: 30px;

  background: rgba(255, 255, 255, 0.15);

  color: white;

  border:
    1px solid
    rgba(255, 255, 255, 0.18);
}

.header-note-count strong {
  font-size: 16px;
}

.header-note-count span {
  font-size: 12px;

  opacity: 0.85;
}

/* =========================================================
   MAIN BACKGROUND
========================================================= */

.main-content {
  position: relative;

  overflow: hidden;
}

.background-shape {
  position: absolute;

  border-radius: 50%;

  filter: blur(2px);

  pointer-events: none;
}

.shape-one {
  width: 300px;
  height: 300px;

  right: -130px;
  top: 180px;

  background:
    radial-gradient(
      circle,
      rgba(36, 116, 232, 0.10),
      transparent 70%
    );
}

.shape-two {
  width: 350px;
  height: 350px;

  left: -170px;
  top: 800px;

  background:
    radial-gradient(
      circle,
      rgba(24, 166, 107, 0.11),
      transparent 70%
    );
}

/* =========================================================
   PAGE
========================================================= */

.page-container {
  position: relative;

  z-index: 1;

  width: min(1180px, calc(100% - 32px));

  margin:
    0
    auto;

  padding:
    42px
    0
    60px;
}

/* =========================================================
   HERO
========================================================= */

.hero-section {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 30px;

  margin-bottom: 30px;
}

.hero-text {
  max-width: 700px;
}

.eyebrow {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  color: var(--blue-dark);

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1.3px;

  text-transform: uppercase;
}

.eyebrow.green {
  color: var(--green-dark);
}

.eyebrow-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--green);

  box-shadow:
    0 0 0 4px
    rgba(24, 166, 107, 0.12);
}

.hero-text h2 {
  margin:
    10px
    0
    9px;

  color: var(--text-dark);

  font-size:
    clamp(32px, 5vw, 49px);

  line-height: 1.05;

  letter-spacing: -1.7px;

  font-weight: 850;
}

.hero-text h2 span {
  color: var(--green);
}

.hero-text p {
  max-width: 600px;

  margin: 0;

  color: var(--text);

  font-size: 15px;

  line-height: 1.65;
}

.hero-add-button {
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  border: 0;

  border-radius: 14px;

  padding:
    14px
    20px;

  background:
    linear-gradient(
      135deg,
      #17a76d,
      #0c8c5b
    );

  color: white;

  font-size: 14px;

  font-weight: 750;

  box-shadow:
    0 10px 25px
    rgba(15, 145, 94, 0.23);

  cursor: pointer;

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.hero-add-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 14px 30px
    rgba(15, 145, 94, 0.28);
}

.hero-add-button svg {
  width: 19px;
  height: 19px;
}

/* =========================================================
   MESSAGE
========================================================= */

.message-box {
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 18px;

  padding:
    12px
    15px;

  border-radius: 13px;

  background: #e5f8ef;

  border:
    1px solid
    #bcebd5;

  color: var(--green-dark);

  font-size: 13px;

  font-weight: 650;
}

.message-box.editing {
  background: #e8f1ff;

  border-color: #c6dcff;

  color: var(--blue-dark);
}

.message-icon {
  width: 26px;
  height: 26px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.7);
}

.message-icon svg {
  width: 16px;
  height: 16px;
}

.message-box button {
  margin-left: auto;

  border: 0;

  background: transparent;

  color: inherit;

  font-size: 21px;

  cursor: pointer;
}

/* =========================================================
   EDITOR CARD
========================================================= */

.editor-card {
  scroll-margin-top: 20px;

  padding: 27px;

  background:
    rgba(255, 255, 255, 0.88);

  border:
    1px solid
    rgba(206, 227, 220, 0.9);

  border-radius: 22px;

  box-shadow: var(--shadow);

  backdrop-filter: blur(12px);
}

.section-heading {
  display: flex;

  align-items: center;

  gap: 13px;

  margin-bottom: 25px;
}

.heading-icon {
  width: 43px;
  height: 43px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 13px;

  background: var(--green-light);

  color: var(--green-dark);
}

.heading-icon.edit {
  background: var(--blue-light);

  color: var(--blue-dark);
}

.heading-icon svg {
  width: 22px;
  height: 22px;
}

.section-heading h3 {
  margin: 0;

  color: var(--text-dark);

  font-size: 20px;

  font-weight: 800;
}

.section-heading p {
  margin:
    4px
    0
    0;

  color: var(--text-light);

  font-size: 12px;
}

/* =========================================================
   FORM
========================================================= */

.form-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.field label {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 8px;

  color: var(--text-dark);

  font-size: 12px;

  font-weight: 750;
}

.field label small {
  color: #9aabb8;

  font-size: 10px;

  font-weight: 600;
}

.input-wrapper,
.textarea-wrapper,
.select-wrapper {
  border:
    1px solid
    var(--border);

  background: #fbfdfc;

  transition:
    border 0.2s,
    box-shadow 0.2s,
    background 0.2s;
}

.input-wrapper {
  min-height: 49px;

  display: flex;

  align-items: center;

  gap: 10px;

  padding:
    0
    13px;

  border-radius: 12px;
}

.input-wrapper:focus-within,
.textarea-wrapper:focus-within,
.select-wrapper:focus-within {
  border-color: #74cba8;

  background: white;

  box-shadow:
    0 0 0 4px
    rgba(24, 166, 107, 0.08);
}

.input-wrapper svg {
  width: 19px;
  height: 19px;

  flex-shrink: 0;

  color: #7e9a94;
}

.input-wrapper input {
  width: 100%;

  border: 0;

  outline: 0;

  background: transparent;

  color: var(--text-dark);

  font-family: inherit;

  font-size: 13px;
}

.input-wrapper input::placeholder,
.textarea-wrapper textarea::placeholder {
  color: #a0afb9;
}

.textarea-wrapper {
  border-radius: 12px;

  padding: 0;
}

.textarea-wrapper textarea {
  display: block;

  width: 100%;

  min-height: 125px;

  resize: vertical;

  border: 0;

  outline: 0;

  padding: 14px;

  background: transparent;

  color: var(--text-dark);

  font-family: inherit;

  font-size: 13px;

  line-height: 1.6;
}

.date-input input {
  cursor: pointer;
}

.select-wrapper {
  position: relative;

  min-height: 49px;

  display: flex;

  align-items: center;

  gap: 10px;

  padding:
    0
    13px;

  border-radius: 12px;
}

.select-wrapper select {
  width: 100%;

  appearance: none;

  border: 0;

  outline: 0;

  background: transparent;

  color: var(--text-dark);

  font-family: inherit;

  font-size: 13px;

  cursor: pointer;
}

.select-wrapper > svg {
  width: 18px;
  height: 18px;

  color: #77918b;

  pointer-events: none;
}

.category-dot {
  width: 10px;
  height: 10px;

  flex-shrink: 0;

  border-radius: 50%;
}

.category-dot.school,
.filter-dot.school,
.badge-dot.school {
  background: #1eaf72;
}

.category-dot.personal,
.filter-dot.personal,
.badge-dot.personal {
  background: #3689ee;
}

.category-dot.work,
.filter-dot.work,
.badge-dot.work {
  background: #f0a72e;
}

.category-dot.other,
.filter-dot.other,
.badge-dot.other {
  background: #8b70d4;
}

/* =========================================================
   STATUS
========================================================= */

.status-options {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 12px;
}

.status-option {
  position: relative;

  display: flex;

  align-items: center;

  gap: 10px;

  min-height: 68px;

  padding:
    10px
    13px;

  border:
    1px solid
    var(--border);

  border-radius: 13px;

  background: #fbfdfc;

  text-align: left;

  cursor: pointer;

  transition:
    border 0.2s,
    background 0.2s,
    transform 0.2s;
}

.status-option:hover {
  transform: translateY(-1px);
}

.status-option.selected.normal {
  border-color: #75cda8;

  background: #f0fbf6;
}

.status-option.selected.important {
  border-color: #f1cf76;

  background: #fff9e8;
}

.status-icon {
  width: 34px;
  height: 34px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background: var(--green-light);

  color: var(--green-dark);
}

.important .status-icon {
  background: var(--yellow-light);

  color: #c88b00;
}

.status-icon svg {
  width: 19px;
  height: 19px;
}

.status-option strong {
  display: block;

  color: var(--text-dark);

  font-size: 12px;
}

.status-option small {
  display: block;

  margin-top: 3px;

  color: var(--text-light);

  font-size: 10px;
}

.radio-circle {
  width: 16px;
  height: 16px;

  margin-left: auto;

  border:
    2px solid
    #b9c9c4;

  border-radius: 50%;
}

.status-option.selected.normal .radio-circle {
  border-color: var(--green);

  box-shadow:
    inset 0 0 0 3px
    #f0fbf6;

  background: var(--green);
}

.status-option.selected.important .radio-circle {
  border-color: var(--yellow);

  box-shadow:
    inset 0 0 0 3px
    #fff9e8;

  background: var(--yellow);
}

/* =========================================================
   FORM ACTIONS
========================================================= */

.form-actions {
  
  position: relative;
    z-index: 20;

  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 24px;

  padding-top: 21px;

  border-top:
    1px solid
    #e5eeeb;
}

.save-button,
.cancel-button {
  min-height: 46px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding:
    0
    19px;

  border-radius: 11px;

  font-family: inherit;

  font-size: 13px;

  font-weight: 750;

  cursor: pointer;

  transition:
    transform 0.2s,
    box-shadow 0.2s;

  
}

.save-button {
  position: relative;
  z-index: 21;
  pointer-events: auto;
  touch-action: manipulation;

  border: 0;

  background:
    linear-gradient(
      135deg,
      #1bab70,
      #0d8c5b
    );

  color: white;

  box-shadow:
    0 8px 18px
    rgba(13, 140, 91, 0.18);
}

.save-button.update {
  background:
    linear-gradient(
      135deg,
      #287ce5,
      #1761c7
    );

  box-shadow:
    0 8px 18px
    rgba(36, 116, 232, 0.18);
}

.save-button:hover,
.cancel-button:hover {
  transform: translateY(-1px);
}

.save-button svg,
.cancel-button svg {
  width: 17px;
  height: 17px;
}

.cancel-button {
  border:
    1px solid
    #dce7e3;

  background: white;

  color: var(--text);
}

/* =========================================================
   NOTES SECTION
========================================================= */

.notes-section {
  margin-top: 52px;
}

.notes-heading {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 18px;
}

.notes-heading h2 {
  margin:
    6px
    0
    0;

  color: var(--text-dark);

  font-size: 28px;

  letter-spacing: -0.8px;

  font-weight: 850;
}

.notes-total {
  padding:
    8px
    12px;

  border-radius: 20px;

  background: rgba(255, 255, 255, 0.7);

  border:
    1px solid
    var(--border);

  color: var(--text);

  font-size: 11px;

  font-weight: 700;
}

/* =========================================================
   SEARCH
========================================================= */

.search-wrapper {
  min-height: 53px;

  display: flex;

  align-items: center;

  gap: 11px;

  margin-bottom: 14px;

  padding:
    0
    15px;

  border:
    1px solid
    var(--border);

  border-radius: 14px;

  background:
    rgba(255, 255, 255, 0.84);

  box-shadow:
    0 5px 20px
    rgba(27, 78, 75, 0.04);
}

.search-wrapper > svg {
  width: 20px;
  height: 20px;

  color: #6f8b84;

  flex-shrink: 0;
}

.search-wrapper input {
  width: 100%;

  border: 0;

  outline: 0;

  background: transparent;

  color: var(--text-dark);

  font-family: inherit;

  font-size: 13px;
}

.search-wrapper input::placeholder {
  color: #91a29f;
}

.search-wrapper button {
  width: 25px;
  height: 25px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 0;

  border-radius: 50%;

  background: #e8f0ee;

  color: #657a76;

  font-size: 18px;

  cursor: pointer;
}

/* =========================================================
   FILTERS
========================================================= */

.filters {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;

  margin-bottom: 22px;
}

.filter-chip {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  min-height: 35px;

  padding:
    0
    13px;

  border:
    1px solid
    #dce8e4;

  border-radius: 30px;

  background: rgba(255, 255, 255, 0.7);

  color: var(--text);

  font-family: inherit;

  font-size: 11px;

  font-weight: 700;

  cursor: pointer;

  transition:
    all 0.2s;
}

.filter-chip:hover {
  border-color: #a9cbc0;
}

.filter-chip.active {
  border-color: var(--green);

  background: var(--green);

  color: white;

  box-shadow:
    0 5px 12px
    rgba(24, 166, 107, 0.16);
}

.filter-chip.active.personal {
  border-color: var(--blue);

  background: var(--blue);
}

.filter-chip.active.work {
  border-color: #e5a323;

  background: #e5a323;
}

.filter-chip.active.other {
  border-color: #8065c7;

  background: #8065c7;
}

.filter-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: currentColor;
}

.filter-chip:not(.active) .filter-dot.school {
  background: #1eaf72;
}

.filter-chip:not(.active) .filter-dot.personal {
  background: #3689ee;
}

.filter-chip:not(.active) .filter-dot.work {
  background: #f0a72e;
}

.filter-chip:not(.active) .filter-dot.other {
  background: #8b70d4;
}

.all-icon {
  display: flex;
}

.all-icon svg {
  width: 15px;
  height: 15px;
}

/* =========================================================
   NOTES GRID
========================================================= */

.notes-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 17px;
}

/* =========================================================
   NOTE CARD
========================================================= */

.note-card {
  position: relative;

  overflow: hidden;

  border:
    1px solid
    rgba(211, 228, 223, 0.95);

  border-radius: 18px;

  background:
    rgba(255, 255, 255, 0.92);

  box-shadow:
    0 9px 27px
    rgba(27, 78, 75, 0.06);

  transition:
    transform 0.22s,
    box-shadow 0.22s;
}

.note-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 15px 35px
    rgba(27, 78, 75, 0.10);
}

.card-color-bar {
  height: 5px;

  background: var(--green);
}

.note-card.personal .card-color-bar {
  background: var(--blue);
}

.note-card.work .card-color-bar {
  background: #f0aa2f;
}

.note-card.other .card-color-bar {
  background: #8a70d3;
}

.card-body {
  padding: 18px;
}

.card-top {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 8px;

  margin-bottom: 13px;
}

.category-badge,
.important-badge {
  display: inline-flex;

  align-items: center;

  gap: 6px;

  border-radius: 20px;

  padding:
    5px
    8px;

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.3px;

  text-transform: uppercase;
}

.category-badge {
  background: var(--green-light);

  color: var(--green-dark);
}

.category-badge.personal {
  background: var(--blue-light);

  color: var(--blue-dark);
}

.category-badge.work {
  background: #fff4da;

  color: #b77800;
}

.category-badge.other {
  background: #eee9ff;

  color: #6951ae;
}

.badge-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.important-badge {
  background: var(--yellow-light);

  color: #ad7900;
}

.important-badge svg {
  width: 13px;
  height: 13px;
}

.note-card h3 {
  margin:
    0
    0
    9px;

  color: var(--text-dark);

  font-size: 18px;

  line-height: 1.25;

  font-weight: 800;

  word-break: break-word;
}

.note-content {
  display: -webkit-box;

  overflow: hidden;

  margin: 0;

  color: var(--text);

  font-size: 12px;

  line-height: 1.65;

  -webkit-line-clamp: 4;

  -webkit-box-orient: vertical;

  min-height: 78px;

  word-break: break-word;
}

.note-meta {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  margin-top: 15px;

  padding-top: 13px;

  border-top:
    1px solid
    #edf2f0;
}

.date {
  display: flex;

  align-items: center;

  gap: 6px;

  color: var(--text-light);

  font-size: 10px;
}

.date svg {
  width: 15px;
  height: 15px;
}

.status-label {
  padding:
    4px
    7px;

  border-radius: 10px;

  background: #eaf6f0;

  color: var(--green-dark);

  font-size: 9px;

  font-weight: 750;
}

.status-label.important {
  background: var(--yellow-light);

  color: #a87500;
}

/* =========================================================
   CARD ACTIONS
========================================================= */

.card-actions {
  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 8px;

  margin-top: 14px;
}

.edit-button,
.delete-button {
  min-height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  border-radius: 9px;

  font-family: inherit;

  font-size: 11px;

  font-weight: 750;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;
}

.edit-button {
  border:
    1px solid
    #cfe1ff;

  background: #f3f7ff;

  color: var(--blue-dark);
}

.delete-button {
  border:
    1px solid
    #f1d3d3;

  background: #fff7f7;

  color: #c34e4e;
}

.edit-button:hover,
.delete-button:hover {
  transform: translateY(-1px);
}

.edit-button svg,
.delete-button svg {
  width: 15px;
  height: 15px;
}

/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {
  padding:
    50px
    25px;

  border:
    1px dashed
    #bfd8d0;

  border-radius: 19px;

  background:
    rgba(255, 255, 255, 0.55);

  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin:
    0
    auto
    14px;

  border-radius: 19px;

  background:
    linear-gradient(
      135deg,
      #e2f7ee,
      #e7f1ff
    );

  color: var(--green-dark);
}

.empty-icon svg {
  width: 30px;
  height: 30px;
}

.empty-state h3 {
  margin:
    0
    0
    6px;

  color: var(--text-dark);

  font-size: 17px;

  font-weight: 800;
}

.empty-state p {
  max-width: 380px;

  margin:
    0
    auto
    17px;

  color: var(--text-light);

  font-size: 12px;

  line-height: 1.6;
}

.empty-state button {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  min-height: 39px;

  padding:
    0
    15px;

  border: 0;

  border-radius: 10px;

  background: var(--green);

  color: white;

  font-family: inherit;

  font-size: 11px;

  font-weight: 750;

  cursor: pointer;
}

.empty-state button svg {
  width: 15px;
  height: 15px;
}

/* =========================================================
   FOOTER
========================================================= */

footer {
  padding-top: 45px;

  text-align: center;
}

.footer-line {
  width: 55px;
  height: 3px;

  margin:
    0
    auto
    14px;

  border-radius: 10px;

  background:
    linear-gradient(
      90deg,
      var(--blue),
      var(--green),
      var(--yellow)
    );
}

footer p {
  margin: 0;

  color: var(--text);

  font-size: 11px;

  font-weight: 750;
}

footer span {
  display: block;

  margin-top: 4px;

  color: #91a19d;

  font-size: 10px;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 850px) {

  .page-container {
    width: min(
      100% - 24px,
      720px
    );

    padding-top: 30px;
  }

  .hero-section {
    align-items: flex-start;

    flex-direction: column;
  }

  .hero-add-button {
    width: 100%;
  }

  .notes-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

  .app-header ion-toolbar {
    min-height: 68px;

    padding:
      6px
      12px;
  }

  .brand-icon {
    width: 40px;
    height: 40px;

    border-radius: 12px;
  }

  .brand-icon svg {
    width: 23px;
    height: 23px;
  }

  .brand h1 {
    font-size: 17px;
  }

  .brand span {
    font-size: 9px;
  }

  .header-note-count {
    padding:
      7px
      10px;
  }

  .header-note-count span {
    display: none;
  }

  .page-container {
    width: calc(100% - 20px);

    padding:
      25px
      0
      45px;
  }

  .hero-text h2 {
    font-size: 35px;

    letter-spacing: -1.2px;
  }

  .hero-text p {
    font-size: 13px;
  }

  .hero-add-button {
    min-height: 48px;
  }

  .editor-card {
    padding: 18px;

    border-radius: 18px;
  }

  .section-heading {
    margin-bottom: 20px;
  }

  .section-heading h3 {
    font-size: 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;

    gap: 17px;
  }

  .full-width {
    grid-column: auto;
  }

  .status-options {
    grid-template-columns: 1fr;
  }

  .status-option {
    min-height: 62px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .save-button,
  .cancel-button {
    width: 100%;
  }

  .notes-section {
    margin-top: 40px;
  }

  .notes-heading h2 {
    font-size: 25px;
  }

  .filters {
    flex-wrap: nowrap;

    overflow-x: auto;

    padding-bottom: 4px;

    scrollbar-width: none;
  }

  .filters::-webkit-scrollbar {
    display: none;
  }

  .filter-chip {
    flex-shrink: 0;
  }

  .card-body {
    padding: 16px;
  }

  .note-card h3 {
    font-size: 17px;
  }

  .note-content {
    min-height: auto;

    -webkit-line-clamp: 5;
  }

  .empty-state {
    padding:
      40px
      18px;
  }
}

/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 380px) {

  .page-container {
    width: calc(100% - 16px);
  }

  .brand h1 {
    font-size: 15px;
  }

  .hero-text h2 {
    font-size: 31px;
  }

  .editor-card {
    padding: 15px;
  }

  .notes-heading {
    align-items: center;
  }

  .notes-total {
    font-size: 10px;
  }
}
</style>