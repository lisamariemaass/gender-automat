//zum Ausführen des Tests: npm test src/utils/sanitizeInput.test.js
import sanitizeInput from './sanitizeInput';

test('sanitizeInput removes injected code', () => {
  const texts = [
    `<h1>Normale Überschrift</h1>`,
    `<script>alert('Injected Code');</script>`,
    `<iframe src="malicious.html"></iframe>`,
    `<div onclick="alert('Click!')">Klick mich</div>`,
    `<a href="javascript:alert('Injected Code')">Link</a>`,
    `<style>body { background-color: red; }</style>`,
    `<link rel="stylesheet" href="styles.css">`
  ];

  texts.forEach((text) => {
    const sanitizedText = sanitizeInput(text);
    expect(sanitizedText).not.toMatch(/<script.*?>.*?<\/script>/gi);
    expect(sanitizedText).not.toMatch(/<iframe.*?>.*?<\/iframe>/gi);
    expect(sanitizedText).not.toMatch(/on\w+=".*?"/gi);
    expect(sanitizedText).not.toMatch(/javascript:/gi);
    expect(sanitizedText).not.toMatch(/<style.*?>.*?<\/style>/gi);
    expect(sanitizedText).not.toMatch(/<link.*?>/gi);
  });
});