<template>
  <el-dialog :visible.sync="visible" width="60%" class="custom-dialog">
    <template #title>
      <div class="dialog-header">
        <span>Send Exchange Request</span>
        <div class="header-buttons">
          <el-button type="primary" @click="submitExchangeRequest"
            >Send Request</el-button
          >
          <el-button @click="handleCancel">Cancel</el-button>
        </div>
      </div>
    </template>

    <!-- Scrollable Form Content -->
    <div class="dialog-body">
      <el-form :model="exchangeRequest" label-width="150px">
        <!-- Sender and Receiver IDs -->
        <el-form-item label="Your User ID" prop="senderId">
          <el-input
            v-model="exchangeRequest.senderId"
            placeholder="Enter your User ID"
            required
          />
        </el-form-item>
        <el-form-item label="Recipient's User ID" prop="receiverId">
          <el-input
            v-model="exchangeRequest.receiverId"
            placeholder="Enter recipient's User ID"
            required
          />
        </el-form-item>

        <!-- Book Offered and Book Requested Side by Side -->
        <el-row :gutter="20">
          <el-col :span="12">
            <h3>Book Offered</h3>
            <el-form-item label="Title" prop="bookOffered.title">
              <el-input
                v-model="exchangeRequest.bookOffered.title"
                placeholder="Title"
                required
              />
            </el-form-item>
            <el-form-item label="Author" prop="bookOffered.author">
              <el-input
                v-model="exchangeRequest.bookOffered.author"
                placeholder="Author"
                required
              />
            </el-form-item>
            <el-form-item label="Genre" prop="bookOffered.genre">
              <el-input
                v-model="exchangeRequest.bookOffered.genre"
                placeholder="Genre"
              />
            </el-form-item>
            <el-form-item label="Condition" prop="bookOffered.condition">
              <el-input
                v-model="exchangeRequest.bookOffered.condition"
                placeholder="Condition"
              />
            </el-form-item>
            <el-form-item label="Status" prop="bookOffered.status">
              <el-select
                v-model="exchangeRequest.bookOffered.status"
                placeholder="Select Status"
              >
                <el-option label="Available" value="Available" />
                <el-option label="Reserved" value="Reserved" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <h3>Book Requested</h3>
            <el-form-item label="Title" prop="bookRequested.title">
              <el-input
                v-model="exchangeRequest.bookRequested.title"
                placeholder="Title"
                required
              />
            </el-form-item>
            <el-form-item label="Author" prop="bookRequested.author">
              <el-input
                v-model="exchangeRequest.bookRequested.author"
                placeholder="Author"
                required
              />
            </el-form-item>
            <el-form-item label="Genre" prop="bookRequested.genre">
              <el-input
                v-model="exchangeRequest.bookRequested.genre"
                placeholder="Genre"
              />
            </el-form-item>
            <el-form-item label="Condition" prop="bookRequested.condition">
              <el-input
                v-model="exchangeRequest.bookRequested.condition"
                placeholder="Condition"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Delivery Method -->
        <el-form-item label="Delivery Method" prop="deliveryMethod">
          <el-select
            v-model="exchangeRequest.deliveryMethod"
            placeholder="Select Delivery Method"
          >
            <el-option label="In-Person" value="In-Person" />
            <el-option label="Courier" value="Courier" />
            <el-option label="Self-pickup" value="Self-pickup" />
          </el-select>
        </el-form-item>

        <!-- Exchange Duration -->
        <el-form-item label="Exchange Duration (Days)" prop="exchangeDuration">
          <el-input-number
            v-model="exchangeRequest.exchangeDuration"
            :min="1"
            placeholder="Enter number of days"
            required
          />
        </el-form-item>

        <!-- Location -->
        <el-form-item label="Exchange Location" prop="location">
          <el-input
            v-model="exchangeRequest.location"
            placeholder="Location (Optional)"
          />
        </el-form-item>

        <!-- Optional Message -->
        <el-form-item label="Message (Optional)" prop="message">
          <el-input
            type="textarea"
            v-model="exchangeRequest.message"
            placeholder="Write a message..."
          />
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["update:visible", "submit"]);

const exchangeRequest = ref({
  senderId: "",
  receiverId: "",
  bookOffered: {
    id: null,
    title: "",
    author: "",
    genre: "",
    condition: "",
    status: "Available",
  },
  bookRequested: { id: null, title: "", author: "", genre: "", condition: "" },
  deliveryMethod: "In-Person",
  exchangeDuration: 7,
  location: "",
  message: "",
  status: "Pending",
  timestamp: new Date().toISOString(),
});

const submitExchangeRequest = () => {
  console.log("Exchange Request:", exchangeRequest.value);
  alert("Exchange request sent successfully!");
  emit("submit", exchangeRequest.value);
  emit("update:visible", false);
};

const handleCancel = () => {
  emit("update:visible", false);
};
</script>

<style scoped>
.el-dialog {
  overflow: hidden;
  height: 65%;
}

.custom-dialog {
  height: 65%;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  background-color: #f5f5f5;
  padding: 10px 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.dialog-footer {
  background-color: #f5f5f5;
  padding: 10px 20px;
  text-align: right;
  border-top: 1px solid #e0e0e0;
}
</style>
