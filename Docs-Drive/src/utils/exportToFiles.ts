import { saveAs } from "file-saver";

function exportFile(name: string, content: string, extension: string) {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  saveAs(blob, `${name}.${extension}`);
}

export function exportToHtml(name: string, content: string) {
  exportFile(name, content, "html");
}

export function exportToTxt(name: string, content: string) {
  exportFile(name, content, "txt");
}

export function exportToRtf(name: string, content: string) {
  exportFile(name, content, "rtf");
}
