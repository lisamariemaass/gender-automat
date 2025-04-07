//zum Ausführen des Tests: npm test
// src/utils/sanitizeInput.test.js
/**
 * Überprüft und bereinigt den Text, um sicherzustellen, dass kein injizierter Code enthalten ist.
 * @param {string} text - Der zu überprüfende Text.
 * @returns {string} - Der bereinigte Text.
 */
function sanitizeInput(text) {
  // Entferne potenziell gefährliche Tags und Attribute
  const sanitizedText = text.replace(/<script.*?>.*?<\/script>/gi, "")
                             .replace(/<iframe.*?>.*?<\/iframe>/gi, "")
                             .replace(/<object.*?>.*?<\/object>/gi, "")
                             .replace(/<embed.*?>.*?<\/embed>/gi, "")
                             .replace(/<style.*?>.*?<\/style>/gi, "")
                             .replace(/<link.*?>/gi, "")
                             .replace(/on\w+=".*?"/gi, "") // Entfernt Inline-Event-Handler wie onclick, onerror
                             .replace(/javascript:/gi, "") // Entfernt JavaScript-URLs
                             .replace(/style=".*?"/gi, ""); // Entfernt Inline-Styles

  // Konvertiere potenziell gefährliche Zeichen in HTML-Entitäten
  const safeText = sanitizedText.replace(/&/g, "&amp;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;")
                                .replace(/"/g, "&quot;")
                                .replace(/'/g, "&#039;");

  return safeText;
}

export default sanitizeInput;