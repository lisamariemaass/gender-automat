//zum Ausführen des Tests: npm test
import sanitizeInput from './sanitizeInput';

// Testet, ob gefährlicher Code wie <script>, <iframe>, Inline-Event-Handler, JavaScript-URLs, <style> und <link> entfernt wird
test('sanitizeInput removes injected code', () => {
  const texts = [
    `<h1>Normale Überschrift</h1>`, // Normaler Text
    `<script>alert('Injected Code');</script>`, // Script-Tag
    `<iframe src="malicious.html"></iframe>`, // Iframe-Tag
    `<div onclick="alert('Click!')">Klick mich</div>`, // Inline-Event-Handler
    `<a href="javascript:alert('Injected Code')">Link</a>`, // JavaScript-URL
    `<style>body { background-color: red; }</style>`, // Style-Tag
    `<link rel="stylesheet" href="styles.css">` // Link-Tag
  ];

  texts.forEach((text) => {
    const sanitizedText = sanitizeInput(text);
    expect(sanitizedText).not.toMatch(/<script.*?>.*?<\/script>/gi); // Entfernt <script>-Tags
    expect(sanitizedText).not.toMatch(/<iframe.*?>.*?<\/iframe>/gi); // Entfernt <iframe>-Tags
    expect(sanitizedText).not.toMatch(/on\w+=".*?"/gi); // Entfernt Inline-Event-Handler
    expect(sanitizedText).not.toMatch(/javascript:/gi); // Entfernt JavaScript-URLs
    expect(sanitizedText).not.toMatch(/<style.*?>.*?<\/style>/gi); // Entfernt <style>-Tags
    expect(sanitizedText).not.toMatch(/<link.*?>/gi); // Entfernt <link>-Tags
  });
});

// Testet, ob leere Eingaben wie '', null und undefined korrekt behandelt werden
test('sanitizeInput handles empty inputs', () => {
  expect(sanitizeInput('')).toBe(''); // Leerer String
  expect(sanitizeInput(null)).toBe(''); // Null
  expect(sanitizeInput(undefined)).toBe(''); // Undefined
});

// Testet, ob legitime Inhalte wie normale HTML-Tags nicht verändert werden
test('sanitizeInput does not alter safe content', () => {
  const text = `<p>Dies ist ein legitimer Absatz.</p>`; // Sicherer HTML-Inhalt
  const sanitizedText = sanitizeInput(text);
  expect(sanitizedText).toBe('&lt;p&gt;Dies ist ein legitimer Absatz.&lt;/p&gt;'); // Erwartet, dass der Inhalt in HTML-Entitäten umgewandelt wird
});

// Testet, ob verschachtelte gefährliche Tags wie <script> korrekt entfernt werden
test('sanitizeInput removes nested dangerous tags', () => {
  const text = `<div><script>alert('XSS')</script></div>`; // Verschachtelte <script>-Tags
  const sanitizedText = sanitizeInput(text);
  expect(sanitizedText).not.toMatch(/<script.*?>.*?<\/script>/gi); // Entfernt verschachtelte <script>-Tags
});

// Testet, ob ungewöhnliche Attribute wie onerror korrekt entfernt werden
test('sanitizeInput removes unusual attributes', () => {
  const text = `<img src="x" onerror="alert('XSS')">`; // Bild mit onerror-Attribut
  const sanitizedText = sanitizeInput(text);
  expect(sanitizedText).not.toMatch(/onerror=".*?"/gi); // Entfernt das onerror-Attribut
});

// Testet, ob die Funktion mit sehr großen Eingaben effizient umgehen kann
test('sanitizeInput handles large inputs efficiently', () => {
  const largeText = `<div>${'<script>alert("XSS")</script>'.repeat(1000)}</div>`; // Sehr großer Text mit vielen <script>-Tags
  const sanitizedText = sanitizeInput(largeText);
  expect(sanitizedText).not.toMatch(/<script.*?>.*?<\/script>/gi); // Entfernt alle <script>-Tags
});