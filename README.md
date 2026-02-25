💊 Medivo — Distributed Online Pharmacy Platform

<p align="center"> <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/ArgoCD-FF7F01?style=for-the-badge&logo=argo&logoColor=white" /> <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" /> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" /> </p>

A cloud-native distributed pharmacy platform that connects patients with nearby pharmacies through real-time inventory discovery, secure ordering, and scalable microservices infrastructure.

Medivo demonstrates production-grade distributed system design using event-driven architecture, container orchestration, and polyglot microservices.

📖 Overview

Traditional pharmacy systems operate in isolated silos, making medicine discovery and availability verification difficult for patients. Medivo provides a distributed aggregation model that enables users to query real-time inventory across multiple pharmacy nodes and place secure orders.

The platform emphasizes:

- scalability
- fault tolerance
- secure transactions
- high availability
- cloud-native deployment

🌟 Core Capabilities

- Real-time Inventory Discovery — Query medicine availability across distributed pharmacy services.
- Secure Order Processing — Transaction-safe checkout with consistency guarantees.
- Prescription Validation Workflow — Secure document upload and verification.
- Event-driven Notifications — Asynchronous order and system alerts.
- Cloud-native Deployment — Containerized services managed through Kubernetes and GitOps.

🏗️ Architecture

Medivo follows a decoupled microservices architecture designed for scalability, resilience, and independent service deployment.

| Service                | Stack              | Responsibility                             |
| ---------------------- | ------------------ | ------------------------------------------ |
| Authentication Service | Python / Django    | Identity management and JWT authentication |
| Inventory Service      | Java / Spring Boot | High-concurrency stock management          |
| Notification Service   | Node.js / Prisma   | Event-driven user notifications            |
| Database               | PostgreSQL         | Persistent distributed storage             |

Architecture Principles

- Service isolation and independent deployment
- Event-driven communication
- Horizontal scalability
- Fault tolerance and resilience
- Optimistic concurrency control

🛠 Technology Stack

Backend

- Spring Boot (Java)
- Django (Python)
- Node.js

Infrastructure

- Kubernetes (k3s / k3d)
- Docker
- ArgoCD (GitOps deployment)
- GitHub Actions (CI/CD)

🚀 Deployment

Medivo supports cloud-native deployment using Kubernetes.

Requirements

- Docker
- kubectl
- k3d or a Kubernetes cluster

Run locally

```bash
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
k3d cluster create pharmacy-cluster -p "8080:80@loadbalancer"
```

Deploy services:

```bash
kubectl apply -f k8s/
```

Each service contains additional configuration instructions in `Server/*`.

🔐 Security

- JWT-based authentication
- Role-based access control
- Secure prescription handling
- Service-level isolation
- Environment-based configuration management

📈 Future Improvements

- Distributed caching layer
- Observability (Prometheus / Grafana)
- Multi-region deployment
- Advanced search optimization

📄 License

This project is provided for educational and demonstration purposes.
