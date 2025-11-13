import React, { useState, useMemo } from "react";
import {
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function TicketCard({ ticket, userRole, uid }) {
  const [reply, setReply] = useState("");
  const [showLog, setShowLog] = useState(false);

  const isStaff = userRole === "admin" || userRole === "accountant";
  const myUnreadKey = isStaff ? "staff" : "customer";
  const isUnreadForMe = ticket.unreadFor === myUnreadKey;

  const ticketRef = useMemo(() => doc(db, "supportTickets", ticket.id), [ticket.id]);

  async function markAsRead() {
    if (!isUnreadForMe) return;
    try {
      await updateDoc(ticketRef, { unreadFor: null });
    } catch (e) {
      console.error("Failed to mark as read:", e);
    }
  }

  // Reply to ticket
  async function sendReply() {
    if (!reply.trim()) return;

    const now = Date.now();

    const newHistory = [
      ...(ticket.history || []),
      {
        sender: userRole,
        message: reply,
        time: now,
      },
    ];

    const newActivity = [
      ...(ticket.activityLog || []),
      {
        actorRole: userRole,
        action: "replied",
        at: now,
      },
    ];

    const unreadFor = isStaff ? "customer" : "staff";

    try {
      await updateDoc(ticketRef, {
        history: newHistory,
        activityLog: newActivity,
        unreadFor,
        updatedAt: serverTimestamp(),
      });

      setReply("");
    } catch (e) {
      console.error("Failed to send reply:", e);
    }
  }

  // Assign admin/accountant to self
  async function assign() {
    if (!isStaff) return;

    const now = Date.now();
    const newActivity = [
      ...(ticket.activityLog || []),
      {
        actorRole: userRole,
        action: "assigned_to_self",
        at: now,
      },
    ];

    try {
      await updateDoc(ticketRef, {
        assignedTo: uid,
        assignedToRole: userRole,
        status: "in-progress",
        activityLog: newActivity,
        unreadFor: "customer",
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to assign ticket:", e);
    }
  }

  // Mark resolved
  async function resolve() {
    if (!isStaff) return;

    const now = Date.now();
    const newActivity = [
      ...(ticket.activityLog || []),
      {
        actorRole: userRole,
        action: "resolved",
        at: now,
      },
    ];

    try {
      await updateDoc(ticketRef, {
        status: "resolved",
        activityLog: newActivity,
        unreadFor: "customer",
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Failed to resolve ticket:", e);
    }
  }

  function formatTime(ms) {
    if (!ms) return "";
    try {
      return new Date(ms).toLocaleString();
    } catch {
      return "";
    }
  }

  return (
    <div
      className={`ticket-card ${ticket.status}`}
      onClick={markAsRead}
    >
      <div className="ticket-header">
        <div className="ticket-header-left">
          <h3>{ticket.subject}</h3>
          <div className="ticket-meta">
            <span className="chip category-chip">{ticket.category || "Uncategorised"}</span>
            <span className={`chip priority-chip ${ticket.priority}`}>
              {ticket.priority} priority
            </span>
            {ticket.assignedToRole && (
              <span className="chip assigned-role-chip">
                Assigned role: {ticket.assignedToRole}
              </span>
            )}
          </div>
        </div>

        <div className="ticket-header-right">
          {isUnreadForMe && <span className="unread-dot" title="Unread for you">●</span>}
          <span className={`status ${ticket.status}`}>{ticket.status}</span>
        </div>
      </div>

      {ticket.attachmentUrl && (
        <div className="attachment">
          <a href={ticket.attachmentUrl} target="_blank" rel="noreferrer">
            View attachment
          </a>
        </div>
      )}

      {/* Chat-style conversation */}
      <div className="history">
        {(ticket.history || []).map((h, i) => (
          <div
            key={i}
            className={`msg-bubble ${h.sender === "customer" ? "from-customer" : "from-staff"}`}
          >
            <div className="msg-header">
              <strong>{h.sender}</strong>
              <span className="msg-time">{formatTime(h.time)}</span>
            </div>
            <p>{h.message}</p>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <textarea
        className="input textarea"
        placeholder="Write a reply…"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          sendReply();
        }}
      >
        Send Reply
      </button>

      {isStaff && (
        <div
          className="admin-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="btn-secondary" onClick={assign}>
            Assign to Me
          </button>
          <button className="btn-primary" onClick={resolve}>
            Mark Resolved
          </button>
          {(ticket.activityLog || []).length > 0 && (
            <button
              className="btn-secondary"
              onClick={() => setShowLog((s) => !s)}
            >
              {showLog ? "Hide Activity Log" : "Show Activity Log"}
            </button>
          )}
        </div>
      )}

      {showLog && isStaff && (
        <div className="activity-log">
          <h4>Activity Log</h4>
          {(ticket.activityLog || []).map((entry, idx) => (
            <div key={idx} className="activity-row">
              <span className="activity-time">{formatTime(entry.at)}</span>
              <span className="activity-text">
                [{entry.actorRole}] {entry.action}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
