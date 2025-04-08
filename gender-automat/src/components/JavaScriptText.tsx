import React, { useState } from 'react';
import '../styles/JavaScriptText.css';
import replaceGenericMasculine from '../utils/genderReplacer';

// Bilder importieren
import java1 from '../assets/java1.png';
import java2 from '../assets/java2.png';
import java3 from '../assets/java3.png';
import java4 from '../assets/java4.png';
import java5 from '../assets/java5.png';

const JavaScriptText: React.FC = () => {
  const [isModified, setIsModified] = useState(false); // Zustand, ob der Text angepasst wurde

  // Originalinhalt der Seite
  const originalContent = `
    <h1>Dokumentation zur Nutzung von JavaScript</h1>
    <h2 id="einfuhrung">1. Einführung</h2>
    <p>
      JavaScript ist eine weit verbreitete Programmiersprache, die hauptsächlich vom Webentwickler genutzt wird, um Webseiten interaktiv zu gestalten.
      Der Programmierer verwendet JavaScript, um dynamische Inhalte zu erstellen, Formulare zu validieren oder Animationen auf der Webseite darzustellen.
    </p>
    <p>
      Der Anfänger sollte sich zunächst mit den Grundlagen vertraut machen, bevor er komplexere Anwendungen entwickelt.
      Jeder Entwickler, welcher tiefer in die Materie einsteigen möchte, findet zahlreiche Tutorials und Leitfäden online.
    </p>
    <h2 id="erste-schritte">2. Erste Schritte</h2>
    <p>Der Entwickler benötigt lediglich einen Texteditor und einen Browser, um JavaScript auszuführen.</p>
    <p><strong>Beispiel für ein einfaches JavaScript-Programm:</strong></p>
    <img src="${java1}" alt="Beispiel für ein einfaches JavaScript-Programm" />
    <p>
      Der Leser kann diesen Code direkt in die Entwicklertools des Browsers einfügen und ausführen.
      Der Anfänger, welcher noch keine Erfahrung mit der Konsole hat, sollte sich hierzu das Entwickler-Tool seines Browsers ansehen.
    </p>
    <h2 id="variablen-und-datentypen">3. Variablen und Datentypen</h2>
    <p>Der Programmierer nutzt Variablen, um Daten zu speichern.</p>
    <p><strong>Beispiel:</strong></p>
    <img src="${java2}" alt="Beispiel für Variablen und Datentypen" />
    <p>
      Jeder Entwickler muss darauf achten, die richtige Deklaration (let, const oder var) zu verwenden.
      Der Einzelne entscheidet dabei, ob der Wert veränderlich sein soll (let/var) oder nicht (const).
    </p>
    <h2 id="funktionen">4. Funktionen</h2>
    <p>Der Entwickler nutzt Funktionen, um wiederverwendbaren Code zu schreiben.</p>
    <p><strong>Beispiel:</strong></p>
    <img src="${java3}" alt="Beispiel für Funktionen" />
    <p>
      Der Programmierer, welcher viele Funktionen schreibt, sollte darauf achten, die Funktionen sinnvoll zu benennen.
    </p>
    <h2 id="fehlerbehandlung">5. Fehlerbehandlung</h2>
    <p>Der Entwickler sollte auch wissen, wie man mit Fehlern umgeht.</p>
    <p><strong>Beispiel:</strong></p>
    <img src="${java4}" alt="Beispiel für Fehlerbehandlung" />
    <p>
      Der Leser dieser Anleitung sollte immer prüfen, ob sein Code korrekt funktioniert.
      Jeder, der auf Fehler stößt, kann diese mit try-catch-Blöcken abfangen.
    </p>
    <h2 id="fazit">6. Fazit</h2>
    <p>
      JavaScript bietet dem Entwickler zahlreiche Möglichkeiten, um moderne Webseiten zu erstellen.
      Der Interessierte, welcher tiefer einsteigen möchte, findet in der Online-Community viele Ressourcen.
      Der Anfänger, welcher sich regelmäßig mit anderen Entwicklern austauscht, macht schnell Fortschritte.
    </p>
    <h2 id="testmoglichkeiten">7. Testmöglichkeiten</h2>
    <p>
      Jeder Entwickler, welcher JavaScript ausprobieren möchte, kann dazu auch Online-Editoren nutzen.
    </p>
    <p>
      Ein besonders einfaches und schnelles Tool ist&nbsp;
      <a href="https://playcode.io" target="_blank" rel="noopener noreferrer">
        https://playcode.io
      </a>.
    </p>
    <p><strong>So funktioniert es:</strong></p>
    <ol>
      <li>Gehe auf <a href="https://playcode.io/javascript" target="_blank" rel="noopener noreferrer">https://playcode.io/javascript</a>.</li>
      <li>Lösche den vorhandenen Beispiel-Code.</li>
      <li>Drücke auf "Run" und beobachte die Ausgabe im Konsolenfenster.</li>
    </ol>
    <img src="${java5}" alt="Beispiel für Testmöglichkeiten" />
    <p>
      Dieses Tool eignet sich besonders, wenn kein Editor installiert ist.
      Auch erfahrene Entwickler können dort schnell neue Funktionen testen.
    </p>
    <div class="hint">
      💡 <strong>Hinweis:</strong> Wer sich unsicher ist, darf sich an erfahrenen Programmierer wenden oder an einem Einsteiger-Workshop teilnehmen.
    </div>
  `;

  const [content, setContent] = useState(originalContent); // Zustand für den angezeigten Inhalt

  // Funktion, um den Text der Seite zu ändern oder rückgängig zu machen
  const handleButtonClick = () => {
    if (isModified) {
      // Rückgängig machen: Originalinhalt wiederherstellen
      setContent(originalContent);
    } else {
      // Text anpassen: Gendergerechte Sprache anwenden
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');

      // Rekursive Funktion, um alle Textknoten zu bearbeiten
      const processTextNodes = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Textknoten anpassen
          node.textContent = replaceGenericMasculine(node.textContent || '');
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Kinderknoten rekursiv durchlaufen
          node.childNodes.forEach(processTextNodes);
        }
      };

      // Verarbeitung starten
      processTextNodes(doc.body);

      // Aktualisierten Inhalt setzen
      setContent(doc.body.innerHTML);
    }
    setIsModified(!isModified); // Zustand umschalten
  };

  return (
    <div className="javascripttext-page page-container">
      {/* Scrollender Button */}
      <button className="scroll-button" onClick={handleButtonClick}>
        {isModified ? (
          <>
            Vorherige Version <span style={{ fontSize: '1.0rem' }}>↩</span>
          </>
        ) : (
          'Text anpassen'
        )}
      </button>

      {/* Inhalt der Seite */}
      <div
        className="javascripttext-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default JavaScriptText;
