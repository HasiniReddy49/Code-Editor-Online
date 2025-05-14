let htmlEditor, cssEditor, jsEditor;

function initEditors() {
  htmlEditor = CodeMirror.fromTextArea(document.getElementById('html'), {
    mode: 'xml',
    theme: 'ayu-dark',
    lineNumbers: true,
    autoCloseTags: true
  });

  cssEditor = CodeMirror.fromTextArea(document.getElementById('css'), {
    mode: 'css',
    theme: 'ayu-dark',
    lineNumbers: true,
    autoCloseTags: true
  });

  jsEditor = CodeMirror.fromTextArea(document.getElementById('js'), {
    mode: 'javascript',
    theme: 'ayu-dark',
    lineNumbers: true,
    autoCloseTags: true
  });
}

function compileCode() {
  const codeFrame = document.getElementById('code').contentWindow.document;
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  codeFrame.open();
  codeFrame.writeln(`
    ${html}
    <style>${css}</style>
    <script>${js}<\/script>
  `);
  codeFrame.close();
}

function downloadFile(content, filename) {
  const element = document.createElement('a');
  const blob = new Blob([content], { type: 'text/plain' });
  const fileUrl = URL.createObjectURL(blob);

  element.setAttribute('href', fileUrl);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function loadLocalFile(files, editor) {
  if (files.length !== 1) return;
  const reader = new FileReader();
  reader.onload = e => editor.setValue(e.target.result);
  reader.readAsText(files[0]);
}

function toggleStylesheet() {
  const el = document.getElementById('style');
  el.href = el.href.includes('style.css') ? 'style2.css' : 'style.css';
}

function resetEditor() {
  location.reload();
}

function bindEvents() {
  document.body.addEventListener('keyup', compileCode);

  document.getElementById('HTMLdownload').addEventListener('click', () => {
    const content = htmlEditor.getValue();
    if (content) downloadFile(content, 'index.html');
  });

  document.getElementById('CSSdownload').addEventListener('click', () => {
    const content = cssEditor.getValue();
    if (content) downloadFile(content, 'style.css');
  });

  document.getElementById('JSdownload').addEventListener('click', () => {
    const content = jsEditor.getValue();
    if (content) downloadFile(content, 'script.js');
  });
}

window.onload = () => {
  initEditors();
  bindEvents();
};
