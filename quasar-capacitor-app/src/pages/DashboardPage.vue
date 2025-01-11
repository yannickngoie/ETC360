<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <!-- Button to sync data -->
        <q-btn @click="openSynchDialog" label="Sync Data" color="primary" />

        <!-- Button to open the dialog for adding a new record -->
        <q-btn @click="openAddDialog" label="Add New Record" color="secondary" />

        <!-- Table to display records -->
        <q-table :rows="records" :columns="columns" row-key="id">
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn @click="openEditDialog(props.row)" color="primary" label="Edit" />
              <q-btn @click="openDeleteDialog(props.row)" color="negative" label="Delete" />
            </q-td>
          </template>
        </q-table>

        <!-- Dialog for adding a new record -->
        <q-dialog v-model="addDialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Add New Record</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="newRecord.title" label="Title" required />
              <q-input v-model="newRecord.description" label="Description" required />
              <q-input v-model="newRecord.barcode" label="Barcode" required />
            </q-card-section>

            <q-card-actions>
              <q-btn label="Cancel" color="grey" @click="closeAddDialog" />
              <q-btn label="Add" color="primary" @click="addRecord" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Dialog for editing a record -->
        <q-dialog v-model="editDialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Edit Record</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="editRecord.title" label="Title" required />
              <q-input v-model="editRecord.description" label="Description" required />
              <q-input v-model="editRecord.barcode" label="Barcode" required />
            </q-card-section>

            <q-card-actions>
              <q-btn label="Cancel" color="grey" @click="closeEditDialog" />
              <q-btn label="Save" color="primary" @click="saveEditRecord" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Dialog for deleting a record -->
        <q-dialog v-model="deleteDialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Delete Record</div>
              <div>Are you sure you want to delete this record?</div>
            </q-card-section>

            <q-card-actions>
              <q-btn label="Cancel" color="grey" @click="closeDeleteDialog" />
              <q-btn label="Delete" color="negative" @click="deleteRecordConfirmed" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        
        <q-dialog v-model="synchDialog" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">Synch Records</div>
              <div>Are you sure you want to sync these records?</div>
            </q-card-section>

            <q-card-actions>
              <q-btn label="Cancel" color="grey" @click="closeSynchDialog" />
              <q-btn label="Sync" color="negative" @click="synchDialogConfirmed" />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
//import { useRecordsStore } from '../stores/recordsStore';
import { recordsStore } from '../stores/sql_lite/recordsStore';
import { ref, onMounted } from 'vue';

// Component state
const records = ref([]);
const columns = ref([
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'description', label: 'Description', field: 'description' },
  { name: 'barcode', label: 'Barcode', field: 'barcode' },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
]);

const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const synchDialog = ref(false);
const newRecord = ref({ title: '', description: '', barcode: '' });
const editRecord = ref({ title: '', description: '', barcode: '' });
const deleteRecord = ref(null);
const recordsLoaded = ref(false);

onMounted(async () => {
  await recordsStore.loadRecords();
  records.value = recordsStore.records; // Assign the loaded records to the records ref
  recordsLoaded.value = true; // Set to true when records are loaded
});
// Sync records with the database
// const syncRecords = () => {
//   console.log('Syncing records...');

//   recordsStore.syncRecords();
//   records.value = recordsStore.records; // Refresh records after sync
//   recordsLoaded.value = true;
// };

// Dialog methods
const openAddDialog = () => {
  addDialog.value = true;
};
const closeAddDialog = () => {
  addDialog.value = false;
};

const openEditDialog = (record) => {
  editRecord.value = { ...record }; // Create a copy of the record for editing
  editDialog.value = true;
};
const closeEditDialog = () => {
  editDialog.value = false;
};

const openDeleteDialog = (record) => {
  deleteRecord.value = record;
  deleteDialog.value = true;
};
const closeDeleteDialog = () => {
  deleteDialog.value = false;
};


const closeSynchDialog = () => {
  synchDialog.value = false;
};

const openSynchDialog = () =>{

  synchDialog.value = true;
};
// Add record method
const addRecord = async () => {
  const record = {
    title: newRecord.value.title,
    description: newRecord.value.description,
    barcode: newRecord.value.barcode
  };

  try {
    // Add record using the store
    await recordsStore.addRecord(record);

    // Update the local records list after the record is added
    records.value = [...recordsStore.records];

    // Close the dialog and reset form
    closeAddDialog();
    newRecord.value = { title: '', description: '', barcode: '' };
  } catch (error) {
    console.error('Error adding record:', error);
  }
};



const saveEditRecord =  async () => {
  await recordsStore.addRecord(editRecord.value); // Update the record in the store
  records.value = records.value.map(record => record.id === editRecord.value.id ? editRecord.value : record); // Update the local records
  closeEditDialog(); // Close the dialog after saving
};


// Delete the confirmed record
const deleteRecordConfirmed =  async() => {
  
 await  recordsStore.deleteRecord(deleteRecord.value.id);
  records.value = records.value.filter(record => record.id !== deleteRecord.value.id); // Remove from local records
  closeDeleteDialog(); // Close the dialog after deletion
};

const synchDialogConfirmed = async () => {
  await recordsStore.syncRecords();
  records.value = recordsStore.records; // Refresh records after sync
  recordsLoaded.value = true;
  // Remove from local records
  closeSynchDialog(); // Close the dialog after deletion
};

// Load records on mount (optional)
// recordsStore.loadRecords();
</script>

