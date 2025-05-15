/**
 * Ersetzt generisches Maskulinum durch gendergerechte Alternativen.
 * @param {string} text - Der zu überprüfende Text.
 * @returns {string} - Der angepasste Text.
 */
function replaceGenericMasculine(text) {
  // Pronomenersetzungen
  const pronounReplacements = [
    // 1. Personalpronomen
    { search: /\bsein\b/g, replace: "ihr" },
    { search: /\b[Ee]r\b/g, replace: (match) => (match === "Er" ? "Sie" : "sie") },

    // 2. Possessivpronomen
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

    // 3. Relativpronomen
    { search: /\bwelcher\b/g, replace: "welche" },

    // 4. Indefinitpronomen
    { search: /\bJeder,\sder\b/g, replace: "Alle, die" },
    { search: /\bJeder\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => `Alle ${p1 === "Leser" ? "Lesenden" : p1.replace(/er$/, "elnden")}` },
  ];

  // 5. Substantive
  const substantiveReplacements = [
    { search: /\bdem Anwender\b/g, replace: "den Nutzenden" },
    { search: /\bDer\sEinzelne\b/g, replace: "Die Einzelnen" },
    { search: /\bDer\sInteressierte\b/g, replace: "Die Interessierten" },
    { search: /\bDer\sDesigner\b/g, replace: "Die Designenden" },
    { search: /\bdem\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => {
        if (p1 === "Anwender") return "den Nutzenden";
        if (p1 === "Leser") return "den Lesenden";
        return `den ${p1.replace(/er$/, "elnden")}`;
      }
    },
    { search: /\bEntwicklern\b/g, replace: "Entwickelnden" },
    { search: /\bvom\s(Webentwickler|Entwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => `von ${p1 === "Leser" ? "Lesenden" : p1.replace(/er$/, "elnden")}` },
    { search: /\bDer\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => {
        if (p1 === "Programmierer") return "Die Programmierenden";
        if (p1 === "Nutzer") return "Die Nutzenden";
        if (p1 === "Anwender") return "Die Nutzenden";
        if (p1 === "Administrator") return "Die Administrierenden";
        if (p1 === "Anfänger") return "Die Beginnenden";
        if (p1 === "Leser") return "Die Lesenden";
        return `Die ${p1.replace(/er$/, "elnden")}`;
      },
    },
    { search: /\bder\s(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match, p1) => {
        if (p1 === "Programmierer") return "die Programmierenden";
        if (p1 === "Nutzer") return "die Nutzenden";
        if (p1 === "Anwender") return "die Nutzenden";
        if (p1 === "Administrator") return "die Administrierenden";
        if (p1 === "Anfänger") return "die Beginnenden";
        if (p1 === "Leser") return "die Lesenden";
        return `die ${p1.replace(/er$/, "elnden")}`;
      },
    },
    { search: /\b(Entwickler|Webentwickler|Programmierer|Nutzer|Administrator|Leser|Anwender|Anfänger)\b/g, replace: (match) => {
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

  // 6. Verben
  const verbReplacements = [
    { search: /\bentscheidet\b/g, replace: "entscheiden" },
    { search: /\bwählt\b/g, replace: "wählen" },
    { search: /\bsollte\b/g, replace: "sollten" },
    { search: /\bentwickelt\b/g, replace: "entwickeln" },
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

  const sentences = text.split(/(?<=[.!?])\s+/);

  const updatedSentences = sentences.map((sentence) => {
    let updatedSentence = sentence;
    let wasSubstantiveReplaced = false;
    let wasPronounReplaced = false;

    // Substantive ersetzen und prüfen, ob sich etwas geändert hat
    for (const { search, replace } of substantiveReplacements) {
      const before = updatedSentence;
      updatedSentence = updatedSentence.replace(search, replace);
      if (before !== updatedSentence) {
        wasSubstantiveReplaced = true;
      }
    }

    // Pronomen ersetzen und prüfen, ob sich etwas geändert hat
    for (const { search, replace } of pronounReplacements) {
      const before = updatedSentence;
      updatedSentence = updatedSentence.replace(search, replace);
      if (before !== updatedSentence) {
        wasPronounReplaced = true;
      }
    }

    // Verben ersetzen, wenn Substantive oder Pronomen ersetzt wurden
    if (wasSubstantiveReplaced || wasPronounReplaced) {
      for (const { search, replace } of verbReplacements) {
        updatedSentence = updatedSentence.replace(search, replace);
      }
    }

    return updatedSentence;
  });

  return updatedSentences.join(" ");
}

export default replaceGenericMasculine;