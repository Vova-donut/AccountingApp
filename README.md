Accounting App
 
📘 Project Overview —
Accounting App (React + Firebase)
 
 
1. Project Description
 
Our team is developing a simple accounting web application designed for small businesses and self-employed individuals in New Zealand.
The app helps users record their income and expenses and view a basic yearly summary based on the New Zealand tax year (1 April – 31 March).
 
The system includes a role-based structure:
 
Admin – manages users (can block/unblock accounts) and creates shared categories of income and expenses.
Manager – can view all users and their transactions, and leave comments or advice about optimizing spending.
Customer – adds their own income and expense transactions manually, choosing a category created by the admin and optionally adding notes.
Fourth role (TBD) – to be defined later during the project (possibly Accountant or Owner).
 
All data will be stored and managed using Firebase (Firestore + Authentication).
 
 
2. Tools and Technologies
 
Purpose
	
Tool / Platform


Frontend Framework
	
React (Vite)


UI Library
	
Material UI (MUI) for forms and tables


Database
	
Firebase Firestore


Authentication
	
Firebase Auth (Email / Password)


Hosting
	
Firebase Hosting (for demo)


Project Management
	
Jira — used to track team tasks, assign work, and monitor progress


Version Control
	
GitHub repository


Design / Wireframes
	
Figma / Excalidraw


Documentation / Reports
	
Google Drive + README.md
 
 
3. Core Features (MVP)
 
User authentication (login/logout, roles).
Admin panel: manage users (block/unblock), manage categories.
Customer panel: add income / expense transactions (amount, date, category, note).
Manager panel: view all users and their transactions, add comments.
Dashboard: show totals for income, expenses, and balance.
NZ Tax Year summary: 1 Apr – 31 Mar view with totals.
Firestore storage and simple security rules by role.
 
 
4. Team Structure and Responsibilities
(may change)
 
 
Role
	
Name / Responsibility
	
Description


Team Lead / Firebase Developer
	
Vladimir Belykh
	
Responsible for Firebase setup (Auth + Firestore), database architecture, security rules, and linking frontend with DB. Oversees team coordination and Jira task tracking.


Frontend Developer 1
	
TBD
	
Builds login/register UI and customer dashboard. Works mostly with mock data provided by the lead.


Frontend Developer 2
	
TBD
	
Implements admin and manager pages (user list, categories, comments UI).


Documentation / QA
	
TBD
	
Maintains README, creates wireframes, handles testing and presentation materials.
🔹 The fourth role (e.g. Accountant / Owner) will be defined later.
🔹 Team roles and responsibilities can change as project complexity increases.
 
 
 
5. Repository Structure (simplified)
 
To keep things easy for beginners, the team will share one GitHub repository with four separate folders, one for each member:
/AccountingApp

  /Vladimir

  /Vraj

  /Viren

  /Arya
 
Each member will work in their own folder (e.g. individual test components, mockups, or feature demos).
Later, the team lead will combine finished parts into the main working version.
 
 
6. Database Structure (Firestore)
 
users

  {uid} → displayName, email, role, blocked, createdAt
 
categories

  {categoryId} → name, type(income/expense), createdAt
 
transactions

  {txId} → userId, type, amount, date, categoryId, note, createdAt
 
comments

  {commentId} → txId, managerId, message, createdAt
 
 
7. Workflow and Collaboration
 
All tasks will be tracked in Jira, under sprints named Week 1, Week 2, etc.
Each Jira ticket will include: short task name, description, assignee, and status (To Do / In Progress / Done).
GitHub commits must include Jira task IDs (e.g. ACC-12 Add customer transaction form).
Weekly short meetings will be held to review progress and adjust roles.
