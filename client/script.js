/* 
  Automatically switching between local and deployed backend API URLs.
  - If the app is running locally (hostname = "localhost"), it uses the local server.
  - Otherwise, it uses the deployed backend URL on Render.
*/
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/incidents"
    : "https://incident-management-node.onrender.com/api/incidents";

/* 
  ------------------------------
  DOM ELEMENT REFERENCES
  ------------------------------
  Storing references to all the key HTML elements used in the app.
  These will help in opening modals, reading form inputs, updating the table, etc.
*/
const modalOverlay = document.getElementById("modalOverlay");
const updateModalOverlay = document.getElementById("updateModalOverlay");
const btnCreateIncident = document.getElementById("btnCreateIncident");
const closeModal = document.getElementById("closeModal");
const closeUpdateModal = document.getElementById("closeUpdateModal");
const incidentForm = document.getElementById("incidentForm");
const updateForm = document.getElementById("updateForm");
const tableBody = document.getElementById("incidentTableBody");
const statusFilter = document.getElementById("statusFilter");
const loader = document.getElementById("loader");

/* 
  ------------------------------
  LOADER + BUTTON DISABLE/ENABLE
  ------------------------------
  These helper functions show/hide the loading spinner
  and disable/enable buttons during API calls to prevent multiple clicks.
*/
function showLoader() { loader.classList.remove("hidden"); }
function hideLoader() { loader.classList.add("hidden"); }

function disableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}
function enableButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

/* 
  ------------------------------
  API REQUEST WRAPPER
  ------------------------------
  A reusable function that wraps all fetch() calls.
  - Handles GET, POST, PUT, PATCH requests.
  - Shows loader, disables buttons, handles errors gracefully.
*/
async function apiRequest(url, method = "GET", data = null) {
  showLoader();
  disableButtons();

  try {
    // Sending an HTTP request with optional data
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });

    /* 
      If the response is not OK (status not in 200 range),
      handle it manually to show user-friendly messages.
    */
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP ${res.status}`);
    }

    // Returning JSON data from the API if successful
    return await res.json();
  } catch (error) {
    // Logging network or server errors
    console.error("Network/API error while calling:", url, error);
    alert("⚠ Unable to reach the server. Please try again later.");
    return { success: false, message: "Network Error" };
  } finally {
    // Hiding loader and re-enabling buttons after the request finishes
    hideLoader();
    enableButtons();
  }
}

/* 
  ------------------------------
  API FUNCTIONS
  ------------------------------
  Wrapping all backend endpoints into simple, reusable functions.
  These functions call the above apiRequest() with proper URLs and methods.
*/
const getAllIncidents = () => apiRequest(API_URL);
const getIncident = (id) => apiRequest(`${API_URL}/${id}`);
const createIncident = (data) => apiRequest(API_URL, "POST", data);
const updateIncidentAPI = (id, data) => apiRequest(`${API_URL}/${id}`, "PUT", data);
const closeIncident = (id) => apiRequest(`${API_URL}/${id}/close`, "PATCH");

/* 
  ------------------------------
  FORM VALIDATION
  ------------------------------
  Validates input fields before sending data to backend.
  - Ensures required fields are filled.
  - Checks that end date is after start date.
*/
function validateForm(fields) {
  let valid = true;

  Object.values(fields).forEach(f => {
    f.element.classList.remove("error");
    f.errorSpan.textContent = "";

    if (f.required && !f.element.value.trim()) {
      f.element.classList.add("error");
      f.errorSpan.textContent = "This field is required";
      valid = false;
    }
  });

  // Checking if end date is after start date
  const start = fields.start.element.value;
  const end = fields.end.element.value;

  if (start && end && new Date(end) < new Date(start)) {
    fields.end.element.classList.add("error");
    fields.end.errorSpan.textContent = "End date must be after start date";
    valid = false;
  }

  return valid;
}

/* 
  ------------------------------
  TABLE RENDERING
  ------------------------------
  Responsible for fetching all incidents and displaying them in a table.
  Filters by status and shows friendly messages for empty or failed data.
*/
function formatDate(date) {
  return date ? new Date(date).toLocaleDateString() : "-";
}

async function loadIncidents() {
  const filter = statusFilter.value;
  const res = await getAllIncidents();

  if (!res.success || !res.data) {
    tableBody.innerHTML = `<tr><td colspan="7">⚠ Unable to load incidents</td></tr>`;
    return;
  }

  let incidents = res.data;
  if (filter !== "all") incidents = incidents.filter(i => i.status === filter);

  tableBody.innerHTML = "";

  if (incidents.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7">No incidents found</td></tr>`;
    return;
  }

  // Dynamically generating table rows for each incident
  incidents.forEach(inc => {
    tableBody.innerHTML += `
      <tr>
        <td>${inc.type}</td>
        <td>${formatDate(inc.incidentStartDate)}</td>
        <td>${formatDate(inc.incidentEndDate)}</td>
        <td><span class="status-badge ${inc.status}">${inc.status}</span></td>
        <td>${inc.description}</td>
        <td>${inc.remarks || "-"}</td>
        <td>
          <button class="action-btn update-btn" onclick="openUpdateModal('${inc._id}')">Update</button>
          <button class="action-btn close-btn2" onclick="handleClose('${inc._id}')">Close</button>
        </td>
      </tr>
    `;
  });
}

/* 
  ------------------------------
  MODAL HANDLERS
  ------------------------------
  These handle opening and closing of the "Create" and "Update" modals.
*/
btnCreateIncident.onclick = () => (modalOverlay.style.display = "flex");
closeModal.onclick = () => (modalOverlay.style.display = "none");
closeUpdateModal.onclick = () => (updateModalOverlay.style.display = "none");

/* 
  ------------------------------
  CREATE INCIDENT FORM SUBMISSION
  ------------------------------
  Collects form data, validates it, and sends it to the backend via createIncident().
*/
incidentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fields = {
    type: { element: type, errorSpan: typeError, required: true },
    start: { element: incidentStartDate, errorSpan: startError, required: true },
    end: { element: incidentEndDate, errorSpan: endError, required: false },
    description: { element: description, errorSpan: descriptionError, required: true },
  };

  if (!validateForm(fields)) return;

  const data = {
    type: type.value.trim(),
    incidentStartDate: incidentStartDate.value,
    incidentEndDate: incidentEndDate.value || null,
    description: description.value.trim(),
    remarks: remarks.value.trim(),
  };

  const res = await createIncident(data);

  if (!res.success) {
    alert(res.message || "Server error!");
    if (res.errors) {
      Object.keys(res.errors).forEach(key => {
        const span = document.getElementById(key + "Error");
        if (span) span.textContent = res.errors[key];
      });
    }
    return;
  }

  alert("✅ Incident created successfully!");
  modalOverlay.style.display = "none";
  incidentForm.reset();
  loadIncidents();
});

/* 
  ------------------------------
  OPEN UPDATE MODAL
  ------------------------------
  Fetches specific incident data and pre-fills the update form fields.
*/
async function openUpdateModal(id) {
  const res = await getIncident(id);
  if (!res.success || !res.data) {
    alert("⚠ Unable to fetch incident details");
    return;
  }

  const inc = res.data;
  updateId.value = inc._id;
  updateType.value = inc.type;
  updateIncidentStartDate.value = inc.incidentStartDate?.split("T")[0];
  updateIncidentEndDate.value = inc.incidentEndDate?.split("T")[0] || "";
  updateDescription.value = inc.description;
  updateRemarks.value = inc.remarks || "";

  updateModalOverlay.style.display = "flex";
}

/* 
  ------------------------------
  UPDATE INCIDENT SUBMISSION
  ------------------------------
  Validates updated form data and sends it to backend for saving.
*/
updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fields = {
    type: { element: updateType, errorSpan: updateTypeError, required: true },
    start: { element: updateIncidentStartDate, errorSpan: updateStartError, required: true },
    end: { element: updateIncidentEndDate, errorSpan: updateEndError, required: false },
    description: { element: updateDescription, errorSpan: updateDescriptionError, required: true },
  };

  if (!validateForm(fields)) return;

  const id = updateId.value;
  const data = {
    type: updateType.value.trim(),
    incidentStartDate: updateIncidentStartDate.value,
    incidentEndDate: updateIncidentEndDate.value || null,
    description: updateDescription.value.trim(),
    remarks: updateRemarks.value.trim(),
  };

  const res = await updateIncidentAPI(id, data);

  if (!res.success) {
    alert(res.message || "Update failed!");
    if (res.errors) {
      Object.keys(res.errors).forEach(key => {
        const span = document.getElementById(
          "update" + key.charAt(0).toUpperCase() + key.slice(1) + "Error"
        );
        if (span) span.textContent = res.errors[key];
      });
    }
    return;
  }

  alert("✅ Incident updated successfully!");
  updateModalOverlay.style.display = "none";
  loadIncidents();
});

/* 
  ------------------------------
  CLOSE INCIDENT
  ------------------------------
  Confirms user action, then marks an incident as closed using PATCH request.
*/
async function handleClose(id) {
  if (!confirm("Are you sure you want to close this incident?")) return;

  const res = await closeIncident(id);

  if (res.success) {
    alert("Incident closed successfully!");
    loadIncidents();
  } else {
    alert("⚠ Failed to close incident!");
  }
}

/* 
  ------------------------------
  FILTER CHANGE HANDLER
  ------------------------------
  Reloads the incident list when the user changes the filter (open/closed/all).
*/
statusFilter.addEventListener("change", loadIncidents);

/* 
  ------------------------------
  INITIAL LOAD
  ------------------------------
  Loads incidents automatically when the page first opens.
*/
window.onload = loadIncidents;
