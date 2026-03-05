import { getToken } from "../utils/auth";

const BASE_URL = "http://localhost:5000";

function authHeaders() {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ---------- AUTH ----------
export async function registerUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Register failed: ${res.status}`);
  }

  return data; // { token }
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Login failed: ${res.status}`);
  }

  return data; // { token }
}

// ---------- JOBS ----------
export async function getJobs() {
  const res = await fetch(`${BASE_URL}/jobs`, {
    headers: { ...authHeaders() }
  });

  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
  return res.json();
}

export async function createJob(job) {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(job)
  });

  if (!res.ok) throw new Error(`Failed to create job: ${res.status}`);
  return res.json();
}

export async function deleteJobById(id) {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() }
  });

  if (!res.ok) throw new Error(`Failed to delete job: ${res.status}`);
  return res.json();
}

export async function updateJobStatusById(id, status) {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status })
  });

  if (!res.ok) throw new Error(`Failed to update job: ${res.status}`);
  return res.json();
}