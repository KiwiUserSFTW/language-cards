# 🧠 Dict Edit Modal – State Flow

```mermaid
flowchart TD
  globalData["global data\n[{name, answer}]"] --> modal["dict edit modal"]

    modal --> renderModal --> saveChanges --> vocabApi
  modal -->|render rows| rows["rows:\nname = text\nanswer = input\ndelete button"]
  modal -->|render form| addForm["add form:\nname input\nanswer input\nadd button"]
  modal --> submitButton["SUBMIT CHANGES"]

  submitButton --> setGlobal["set global data"]

  rows -->|user change input| dictSet["dict state\nsetDict(prev => {...prev, [key]: value})"]
  rows -->|delete button| dictDelete["dict state\nconst [...prev]\nsetDict(prev)"]

  addForm -->|inputs change| formState["form state"]
  formState -->|update| formCall["form state call →\nsetDict(prev => {...prev, [key]: value})"]
  formCall --> dictSet

  dictSet --> formState
