# Online Pharmacy Ordering System

### Project Phase 0: Initiation \& Proposal


***

## Overview

The Online Pharmacy Ordering System is a microservices-based web application designed to make accessing medicines more convenient. The system enables users to search for medicines, check availability at nearby pharmacies, and place secure online orders—including prescriptions—without needing to visit physical stores.

It also allows pharmacies to update their inventories in real time and provides automated order updates to users through a publish/subscribe (Pub/Sub) notification model.

***

## Problem Statement

In many areas, pharmacies are not easily accessible, especially for people with health limitations or those living in remote regions. Often, customers visit multiple pharmacies only to find that the required medicines are unavailable.

This project aims to address these challenges by developing a system that simplifies medicine discovery and ordering, helping users find the nearest pharmacy with available stock—efficiently and securely.

***

## Objectives

- Allow users to securely register, log in, and search for medicines.
- Enable customers to place online medicine orders with prescription upload support.
- Allow pharmacies to update stock in real time.
- Notify customers about order status updates using a Pub/Sub model.
- Maintain reliable order logs and consistent inventory data using distributed services.

***

## System Architecture (High-Level)

The system follows a microservices architecture composed of the following services:


| Service | Responsibility |
| :-- | :-- |
| **Auth Service** | Manages users and pharmacy accounts (authentication \& authorization). |
| **Inventory Service** | Stores, updates, and tracks medicine stock across pharmacies. |
| **Order Service** | Handles customer orders, including prescription validation and fulfillment. |
| **Notification Service** | Publishes order updates to subscribed users instantly. |

Services communicate via REST APIs, with asynchronous messaging handled through a Pub/Sub message broker (Redis or RabbitMQ).
Persistent storage will be managed using either **MongoDB** or **PostgreSQL**.

***

## Key Technologies

- **Backend:** Django
- **Frontend (optional):** React / Next.js
- **Database:** MongoDB / PostgreSQL
- **Message Broker:** Redis Pub/Sub or RabbitMQ
- **Deployment:** Docker + Docker Compose

***

## Risks and Mitigation

| Risk | Mitigation |
| :-- | :-- |
| Message delivery failure between services | Implement retry logic for failed message handling. |
| Inconsistent inventory data | Use transactions and versioned updates to ensure stock accuracy. |
| Team coordination issues | Maintain task tracking, clear role definitions, and regular stand-ups. |


***

## Project Timeline

| Week | Date | Milestone | Deliverable |
| :-- | :-- | :-- | :-- |
| Week 6 | Nov 07, 2025 | Project Initiation | Team contract, problem statement, scope, GitHub setup |
| Week 8 | Nov 21, 2025 | System Architecture | Architecture diagram, APIs, message flows, data model |
| Week 10 | Dec 05, 2025 | Progress Review | Service skeletons, partial APIs, CI/CD pipeline, communication tests |
| Week 12 | Dec 19, 2025 | Integration \& Testing | Integrated services, test report, API documentation, deployment notes |
| Week 14 | Jan 02, 2026 | Final Demo | Working system demo, presentation deck, final project report |


***

## Team Members

| Name | ID | Role | Email |
| :-- | :-- | :-- | :-- |
| Miheret Girmachew | ETS 1071/14 | Project Lead \& Frontend/UI Developer | [miheret.girmachew@aastustudent.edu.et](mailto:miheret.girmachew@aastustudent.edu.et) |
| Mihret Desalegn | ETS 1074/14 | Backend Developer \& Documentation Lead | [mihret.desalegn@aastustudent.edu.et](mailto:mihret.desalegn@aastustudent.edu.et) |
| Mikiyas Alemayehu Mekonen | ETS 1086/14 | Backend Developer \& Documentation Lead | [mikiyas.alemayehum@aastustudent.edu.et](mailto:mikiyas.alemayehum@aastustudent.edu.et) |
| Mikiyas Alemayehu Gebrewold | ETS 1087/14 | Integration / Pub-Sub Engineer | [mikiyas.alemayehug@aastustudent.edu.et](mailto:mikiyas.alemayehug@aastustudent.edu.et) |
| Milkias Yeheyis | ETS 1100/14 | DevOps \& QA Engineer | [milkias.yeheyis@aastustudent.edu.et](mailto:milkias.yeheyis@aastustudent.edu.et) |


***

## Team Contract

- All members contribute via Git commits and a shared task board.
- Communication through Telegram and weekly in-person sync meetings.
- Conflicts are first resolved through discussion; unresolved issues are mediated by the Project Lead.

***

## Repository Setup \& Usage (coming soon)

Guidelines and setup instructions (Docker configuration, API documentation, etc.) will be added once service development begins in Phase 1.

