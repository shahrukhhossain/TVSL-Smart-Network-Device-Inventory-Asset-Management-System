# TVSL Asset Manager

**Smart Network Device Inventory & Asset Management System with AI Assistant**
Built for **Tech Valley Solutions Ltd. (TVSL)** — Integrated IT & Data Center Solutions, Bangladesh.

A full-stack web application to track network and data center devices, client
installations, warranties, maintenance, support tickets and employee equipment —
with a natural-language **AI assistant** powered by a FastAPI + Gemini service and
a 5,000+ entry knowledge base about the company, its services and networking.

---


## Quick start

### 1. The web app (3 commands)


```bash
npm install
npm run setup     # generate client, create DB, seed real TVSL data
npm run dev
```

### 2. The AI service 

```bash
cd ai-service
pip install -r requirements.txt
python build_kb.py            
uvicorn main:app --port 8000
```

## Modules

| Module              | Highlights                                                                |
| ------------------- | ------------------------------------------------------------------------- |
| **Dashboard**       | Company profile header, live counts, category & status charts, alerts     |
| **Devices**         | Real TVSL data center gear, auto asset tags (`TVSL-00001`), specs, status  |
| **Clients**         | Enterprise customer profiles with installed devices and tickets           |
| **Assignments**     | Assign devices to client sites, transfer and return                       |
| **Employee Assets** | Issue internal equipment to staff, return, damage reports                 |
| **Maintenance**     | Service logs with engineer, parts and cost                                |
| **Warranty**        | Active / expiring / expired with 90-60-30 day alert windows               |
| **Support Tickets** | Auto ticket numbers (`TKT-0001`), priority, status updates                |
| **Reports**         | CSV export, print-to-PDF, and per-asset one-page PDF reports               |
| **AI Assistant**    | Inventory queries + company / services / networking knowledge             |
| **Users**           | 24 staff grouped by department (Network, Data Center, IT, Power, Sales…)   |

---

## The AI Assistant

The assistant answers two kinds of questions:

1. **Live inventory** (answered from the database, always accurate):
   - *"Show all Cisco switches at Sonali Bank"*
   - *"Which devices have expired warranties?"*
   - *"How many UPS devices are active?"*
   - *"List devices assigned to Tanvir"*

2. **Company, services & networking** (answered by the FastAPI + Gemini service):
   - *"What services does TVSL offer?"*
   - *"Does TVSL provide UPS and PDU?"*
   - *"What is a VLAN and how does it work?"*
   - *"Difference between TCP and UDP"*, *"How many hosts in a /26?"*



- **Port 3000 in use** — `npm run dev -- -p 3001`.
- **AI service offline** — inventory questions still work; start `uvicorn` for the rest.
- **Reset data** — `npm run db:reset`.
