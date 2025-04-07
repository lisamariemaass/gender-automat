//zum Ausführen des Tests: npm test 
//src/utils/sanitizeInput.test.js
/**
 * Überprüft und bereinigt den Text, um sicherzustellen, dass kein injizierter Code enthalten ist.
 * @param {string} text - Der zu überprüfende Text.
 * @returns {string} - Der bereinigte Text.
 */
function sanitizeInput(text) {
  // Entferne potenziell gefährliche Tags wie <script>, <iframe>, etc.
  const sanitizedText = text.replace(/<script.*?>.*?<\/script>/gi, "")
                             .replace(/<iframe.*?>.*?<\/iframe>/gi, "")
                             .replace(/<object.*?>.*?<\/object>/gi, "")
                             .replace(/<embed.*?>.*?<\/embed>/gi, "")
                             .replace(/on\w+=".*?"/gi, "") // Entfernt Inline-Event-Handler wie onclick, onerror
                             .replace(/javascript:/gi, "") // Entfernt JavaScript-URLs
                             .replace(/<style.*?>.*?<\/style>/gi, "") // Entfernt eingebettete Styles
                             .replace(/<link.*?>/gi, ""); // Entfernt externe Links

  return sanitizedText;
}

export default sanitizeInput;