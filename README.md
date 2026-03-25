# Stargrams

Stargrams is a React app for processing Microsoft Forms exports for a high school show. Friends and family can submit a form to send a performer a treat and a message, and this app turns the exported Excel workbook into a set of printable stargram cards for organizers to fulfill.

## What it does

- Upload a Microsoft Forms Excel workbook in `.xlsx` or `.xls` format
- Parse each response into one or more stargrams
- Extract the sender, recipient, show date, treat choice, allergies, and message
- Generate print-optimized cards that can be attached to treats or handed out backstage

## Workflow

1. Collect stargram orders through Microsoft Forms.
2. Export the responses to Excel.
3. Upload the workbook into this app.
4. Print the generated stargram cards.
5. Match cards with treats and deliver them to performers.

## Notes

- A single Microsoft Forms response can generate multiple stargrams.
- The app reads the first worksheet in the workbook.
- Printing is optimized so multiple cards fit cleanly on each page.

## Getting Started

```bash
npm install
npm run dev
```

For local testing, a sample workbook is included at `test-stargrams.xlsx` in the project root.

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [SheetJS (xlsx)](https://sheetjs.com/) for Excel parsing
- [react-dropzone](https://react-dropzone.js.org/) for file upload
