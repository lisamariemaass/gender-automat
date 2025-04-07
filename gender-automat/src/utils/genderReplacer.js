/**
 * Ersetzt generisches Maskulinum durch gendergerechte Alternativen.
 * @param {string} text - Der zu überprüfende Text.
 * @returns {string} - Der angepasste Text.
 */
function replaceGenericMasculine(text) {
  const substantiveReplacements = [
    // Spezifische Fälle zuerst prüfen
    { search: /\bJeder,\sder\b/g, replace: "Alle, die" },
    { search: /\bDer\sEinzelne\b/g, replace: "Die Einzelnen" },
    { search: /\bDer\sInteressierte\b/g, replace: "Die Interessierten" },
    { search: /\bDer\sDesigner\b/g, replace: "Die Designenden" }, // Neue Regel für "der Designer"
    { search: /\bJeder\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => `Alle ${p1 === "Leser" ? "Lesenden" : p1.replace(/er$/, "elnden")}` },
    { search: /\bdem\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => `den ${p1 === "Leser" ? "Lesenden" : p1.replace(/er$/, "elnden")}` },
    { search: /\bEntwicklern\b/g, replace: "Entwickelnden" },
    { search: /\bseine(?:n|m|r|s)?\b/g, replace: (match) => {
        switch (match) {
          case "seinen": return "ihren";
          case "seinem": return "ihrem";
          case "seiner": return "ihrer";
          case "seine": return "ihre";
          case "seines": return "ihres";
          default: return match;
        }
      }
    },
    { search: /\bsein\b/g, replace: "ihr" },
    { search: /\bvom\s(Webentwickler|Entwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => `von ${p1 === "Leser" ? "Lesenden" : p1.replace(/er$/, "elnden")}` },

    // Fälle mit "welcher" prüfen
    { search: /\bwelcher\b/g, replace: "welche" },

    // Fälle mit "Der" oder "der" prüfen
    {
      search: /\bDer\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g,
      replace: (match, p1) => {
        if (p1 === "Programmierer") return "Die Programmierenden";
        if (p1 === "Nutzer") return "Die Nutzenden";
        if (p1 === "Anwender") return "Die Nutzenden";
        if (p1 === "Administrator") return "Die Administrierenden";
        if (p1 === "Anfänger") return "Die Beginnenden";
        if (p1 === "Leser") return "Die Lesenden";
        return `Die ${p1.replace(/er$/, "elnden")}`;
      },
    },
    {
      search: /\bder\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g,
      replace: (match, p1) => {
        if (p1 === "Programmierer") return "die Programmierenden";
        if (p1 === "Nutzer") return "die Nutzenden";
        if (p1 === "Anwender") return "die Nutzenden";
        if (p1 === "Administrator") return "die Administrierenden";
        if (p1 === "Anfänger") return "die Beginnenden";
        if (p1 === "Leser") return "die Lesenden";
        return `die ${p1.replace(/er$/, "elnden")}`;
      },
    },

    // Fälle ohne Artikel prüfen
    {
      search: /\b(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g,
      replace: (match) => {
        if (match === "Programmierer") return "Programmierende";
        if (match === "Nutzer") return "Nutzende";
        if (match === "Anwender") return "Nutzende";
        if (match === "Administrator") return "Administrierende";
        if (match === "Anfänger") return "Beginnende";
        if (match === "Leser") return "Lesenden";
        return `${match.replace(/er$/, "elnde")}`;
      },
    },
  ];

  const verbReplacements = [
    { search: /\bsollte\b/g, replace: "sollten" },
    { search: /\bliest\b/g, replace: "lesen" },
    { search: /\bcommittet\b/g, replace: "committen" },
    { search: /\bpusht\b/g, replace: "pushen" },
    { search: /\btestet\b/g, replace: "testen" },
    { search: /\bklont\b/g, replace: "klonen" },
    { search: /\bfügt\b/g, replace: "hinzufügen" },
    { search: /\büberprüft\b/g, replace: "überprüfen" },
    { search: /\bbestätigt\b/g, replace: "bestätigen" },
    { search: /\bnutzt\b/g, replace: "nutzen" },
    { search: /\bkann\b/g, replace: "können" },
    { search: /\blädt\b/g, replace: "laden" },
    { search: /\böffnet\b/g, replace: "öffnen" },
    { search: /\bgibt\b/g, replace: "geben" },
    { search: /\binstalliert\b/g, replace: "installieren" },
    { search: /\bkonfiguriert\b/g, replace: "konfigurieren" },
    { search: /\bbesucht\b/g, replace: "besuchen" },
    { search: /\bklickt\b/g, replace: "klicken" },
    { search: /\bergänzt\b/g, replace: "ergänzen" },
    { search: /\bhat\b/g, replace: "haben" },
    { search: /\berstellt\b/g, replace: "erstellen" },
    { search: /\bgenutzt wird\b/g, replace: "genutzt werden" },
    { search: /\beinsteigen möchte\b/g, replace: "einsteigen möchten" },
    { search: /\bfindet\b/g, replace: "finden" },
    { search: /\bbenötigt\b/g, replace: "benötigen" },
    { search: /\bmuss\b/g, replace: "müssen" },
    { search: /\bschreibt\b/g, replace: "schreiben" },
    { search: /\bstößt\b/g, replace: "stoßen" },
    { search: /\baustauscht\b/g, replace: "austauschen" },
    { search: /\bmacht\b/g, replace: "machen" },
    { search: /\bausprobieren möchte\b/g, replace: "ausprobieren möchten" },
    { search: /\einsetzt\b/g, replace: "einsetzen" },
    { search: /\btrennt\b/g, replace: "trennen" },
    { search: /\berhält\b/g, replace: "erhalten" },
    { search: /\bdefiniert\b/g, replace: "definieren" },
    { search: /\bsetzt\b/g, replace: "setzen" },
    { search: /\bvergibt\b/g, replace: "vergeben" },
    { search: /\bvorfindet\b/g, replace: "vorfinden" },
    { search: /\berkennt\b/g, replace: "erkennen" },
    { search: /\bsicherstellt\b/g, replace: "sicherstellen" },
    { search: /\bfunktioniert\b/g, replace: "funktionieren" },
    { search: /\bauseinandersetzen möchte\b/g, replace: "auseinandersetzen möchten" },
  ];

  
  const exceptionReplacements = [
    { search: /\bEr wählt empfohlene Einstellungen aus\b/g, replace: "Es werden empfohlene Einstellungen ausgewählt" },
    { search: /\bDer Nutzer fügt den SSH-Schlüssel zu\b/g, replace: "Die Nutzenden fügen den SSH-Schlüssel zu" },
  ];

  // Text in Sätze aufteilen
  const sentences = text.split(/(?<=[.!?])\s+/);

  // Jeden Satz separat verarbeiten
  const updatedSentences = sentences.map((sentence) => {
    let updatedSentence = sentence;
    let wasSubstantiveReplaced = false;

    // Substantive ersetzen und prüfen, ob sich etwas geändert hat
    for (const { search, replace } of substantiveReplacements) {
      const before = updatedSentence;
      updatedSentence = updatedSentence.replace(search, replace);
      if (before !== updatedSentence) {
        wasSubstantiveReplaced = true;
      }
    }

    // Ausnahmen immer anwenden
    for (const { search, replace } of exceptionReplacements) {
      updatedSentence = updatedSentence.replace(search, replace);
    }

    // Nur wenn Substantive ersetzt wurden → Verben anpassen
    if (wasSubstantiveReplaced) {
      for (const { search, replace } of verbReplacements) {
        updatedSentence = updatedSentence.replace(search, replace);
      }
    }

    return updatedSentence;
  });

  // Verarbeitete Sätze wieder zusammenfügen
  return updatedSentences.join(" ");
}

// Beispielanwendung
const originalText = `
  Der Interessierte kann sich weitere Informationen einholen. Dem Entwickler wurde eine Aufgabe zugewiesen.
`;

const updatedText = replaceGenericMasculine(originalText);
console.log("Originaler Text:\n", originalText);
console.log("Angepasster Text:\n", updatedText);

export default replaceGenericMasculine;