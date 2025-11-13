import React, { useEffect, useState, useMemo } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebaseConfig";
import TicketCard from "./TicketCard";
import "./Support.css";

export default function CustomerSupportPage({ userRole, uid }) {
  const [tickets, setTickets] = useState([]);

  // form state
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("billing");
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignedFilter, setAssignedFilter] = useState("all"); // all | mine | unassigned
  const [search, setSearch] = useState("");

  // load tickets for this role
  useEffect(() => {
    const refTickets = collection(db, "supportTickets");

    const q =
      userRole === "customer"
        ? query(refTickets, where("createdBy", "==", uid), orderBy("createdAt", "desc"))
        : query(refTickets, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [uid, userRole]);

  // stats (for dashboard)
  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in-progress").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;
    const highPriority = tickets.filter((t) => t.priority === "high").length;
    return { total, open, inProgress, resolved, highPriority };
  }, [tickets]);

  // filtered tickets for list
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;

      if (assignedFilter === "mine") {
        const isStaff = userRole === "admin" || userRole === "accountant";
        if (isStaff) {
          if (t.assignedTo && t.assignedTo !== uid) return false;
          if (!t.assignedTo && t.assignedToRole && t.assignedToRole !== userRole)
            return false;
        } else {
          // customer "mine" filter just means tickets they created – already done by query
        }
      } else if (assignedFilter === "unassigned") {
        if (t.assignedTo || t.assignedToRole) return false;
      }

      if (search.trim()) {
        const s = search.toLowerCase();
        const subject = (t.subject || "").toLowerCase();
        const msg = (t.message || "").toLowerCase();
        const cat = (t.category || "").toLowerCase();
        const id = (t.id || "").toLowerCase();
        if (!subject.includes(s) && !msg.includes(s) && !cat.includes(s) && !id.includes(s))
          return false;
      }

      return true;
    });
  }, [tickets, statusFilter, priorityFilter, assignedFilter, search, uid, userRole]);

  // create ticket with advanced behavior
  async function handleSubmit(e) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setLoading(true);

    try {
      let attachmentUrl = null;

      if (attachmentFile) {
        const fileRef = ref(
          storage,
          `support_attachments/${uid}/${Date.now()}_${attachmentFile.name}`
        );
        await uploadBytes(fileRef, attachmentFile);
        attachmentUrl = await getDownloadURL(fileRef);
      }

      // auto assign based on category
      let autoAssignedRole = null;
      if (category === "billing") autoAssignedRole = "accountant";
      if (category === "technical") autoAssignedRole = "admin";

      // Step 1: create base ticket (no timestamps in arrays)
      const docRef = await addDoc(collection(db, "supportTickets"), {
        subject,
        message,
        priority,
        category,
        status: "open",
        createdBy: uid,
        assignedTo: null,        // could be filled later with a user id
        assignedToRole: autoAssignedRole, // for filters and display
        attachmentUrl: attachmentUrl || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        unreadFor: "staff",      // staff hasn't seen it yet
        history: [],
        activityLog: [],
      });

      const ts = Date.now();

      // Step 2: add history + activity log (safe timestamps)
      await updateDoc(docRef, {
        history: [
          {
            sender: "customer",
            message,
            time: ts,
          },
        ],
        activityLog: [
          {
            actorRole: "customer",
            action: "ticket_created",
            at: ts,
          },
        ],
      });

      // reset form
      setSubject("");
      setMessage("");
      setPriority("low");
      setCategory("billing");
      setAttachmentFile(null);
    } catch (err) {
      console.error("Failed to create ticket:", err);
    }

    setLoading(false);
  }

  return (
    <div className="support-page">
      <h1 className="support-title">Customer Support</h1>

      {/* ADMIN / ACCOUNTANT DASHBOARD STATS */}
      {userRole !== "customer" && (
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Open</span>
            <span className="stat-value">{stats.open}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{stats.inProgress}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Resolved</span>
            <span className="stat-value">{stats.resolved}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">High Priority</span>
            <span className="stat-value">{stats.highPriority}</span>
          </div>
        </div>
      )}

      {/* CUSTOMER: CREATE TICKET */}
      {userRole === "customer" && (
        <form className="ticket-form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="input textarea"
            placeholder="Describe your issue…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="form-row">
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="account">Account Access</option>
              <option value="other">Other</option>
            </select>

            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-row">
            <input
              className="input"
              type="file"
              onChange={(e) => setAttachmentFile(e.target.files[0] || null)}
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit Ticket"}
          </button>
        </form>
      )}

      {/* FILTERS */}
      <div className="filters-row">
        <select
          className="input filter-input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="input filter-input"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="input filter-input"
          value={assignedFilter}
          onChange={(e) => setAssignedFilter(e.target.value)}
        >
          <option value="all">All tickets</option>
          <option value="mine">My tickets</option>
          <option value="unassigned">Unassigned</option>
        </select>

        <input
          className="input filter-input"
          placeholder="Search subject, message, category, ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 className="subtitle">Tickets</h2>

      <div className="ticket-list">
        {filteredTickets.length === 0 && <p>No tickets found.</p>}

        {filteredTickets.map((t) => (
          <TicketCard key={t.id} ticket={t} userRole={userRole} uid={uid} />
        ))}
      </div>
    </div>
  );
}
