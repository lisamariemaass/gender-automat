import React, { useState } from 'react';
import '../styles/CssText.css';
import replaceGenericMasculine from '../utils/genderReplacer';
import sanitizeInput from '../utils/sanitizeInput'; // Importiere sanitizeInput

const CssText: React.FC = () => {
  const [isModified, setIsModified] = useState(false); // Zustand, ob der Text angepasst wurde

  // Originalinhalt der Seite
  const originalContent = sanitizeInput(`
    <h1>Dokumentation zur Nutzung von CSS</h1>
    <h2 id="einfuhrung">1. Einführung</h2>
    <p>
      CSS (Cascading Style Sheets) ist eine Stylesheet-Sprache, die der Entwickler einsetzt, um das Aussehen von HTML-Dokumenten zu definieren. 
      Der Designer, welcher eine Webseite erstellt, trennt damit Inhalt und visuelle Darstellung, sodass der Programmierer Änderungen am Layout vornehmen kann, 
      ohne den eigentlichen Inhalt zu verändern. Der Leser dieser Dokumentation erhält einen umfassenden Überblick über die Grundlagen und fortgeschrittene Techniken von CSS.
    </p>
    <h2 id="grundlagen">2. Grundlagen</h2>
    <p>
      CSS ermöglicht es dem Entwickler, Stilregeln festzulegen, die auf HTML-Elemente angewendet werden. 
      Jede Regel besteht aus einem Selektor und einer Deklarationsblock, in dem der Programmierer Eigenschaften und Werte definiert. 
      Der generische Aufbau sieht folgendermaßen aus:
    </p>
        <code class="css-code">
          <span class="comment">/* Beispiel einer CSS-Regel */</span>
          <br />
          element &#123;
          <br />
          &nbsp;&nbsp;eigenschaft: wert;
          <br />
          &#125;
        </code>
    <p>
      Wer das Erscheinungsbild optimieren möchte, kann mithilfe dieser Syntax die typografische Gestaltung, Farben, Abstände und viele weitere Aspekte einer Webseite steuern.
    </p>
    <h2 id="selektoren">3. Selektoren</h2>
    <p>
      Der Entwickler verwendet Selektoren, um gezielt HTML-Elemente anzusprechen. Dabei stehen ihm verschiedene Typen zur Verfügung:
    </p>
    <ul>
      <li>
        <strong>Elementselektoren:</strong> Der Programmierer kann durch den Namen des Elements, wie z. B. 
        <code>p</code> oder <code>h1</code>, alle entsprechenden Elemente auf der Seite formatieren.
      </li>
      <li>
        <strong>Klassenselektoren:</strong> Der Designer setzt den Klassennamen ein, um Gruppen von Elementen zu stylen, 
        die gemeinsam ein bestimmtes Aussehen erhalten sollen.
      </li>
      <li>
        <strong>ID-Selektoren:</strong> Der Entwickler vergibt eindeutige IDs, sodass einzelne Elemente präzise angesprochen werden können.
      </li>
      <li>
        <strong>Attributselektoren:</strong> Der Programmierer nutzt diese Methode, um Elemente basierend auf Attributen zu selektieren, 
        was besonders nützlich für dynamische Inhalte ist.
      </li>
    </ul>
    <h2 id="eigenschaften">4. Eigenschaften</h2>
    <p>
      Die Deklarationen in CSS bestehen aus Eigenschaften und den zugehörigen Werten:
    </p>
    <ul>
      <li>
        <strong>Farben:</strong> Der Entwickler setzt mit <code>color</code> oder <code>background-color</code> die Schrift- oder Hintergrundfarbe fest.
      </li>
      <li>
        <strong>Schriftarten:</strong> Es wird mit <code>font-family</code> festgelegt, welche Schriftart der Leser zu sehen bekommen.
      </li>
      <li>
        <strong>Abstände:</strong> Der Designer bestimmt mit <code>margin</code> oder <code>padding</code> die Abstände um die Elemente, 
        sodass der Anwender eine harmonische Anordnung vorfindet.
      </li>
      <li>
        <strong>Rahmen:</strong> Mit <code>border</code> wird die Umrandung von Elementen definiert, was dem Layout Struktur verleiht.
      </li>
    </ul>
    <h2 id="layout-techniken">5. Layout-Techniken</h2>
    <p>
      Moderne Webseiten erfordern flexible und ansprechende Layouts. Der Entwickler kann hierzu verschiedene Methoden einsetzen:
    </p>
    <ul>
      <li>
        <strong>Das Box-Modell:</strong> Jedes Element wird als Box betrachtet, 
        bestehend aus Inhalt, Padding, Border und Margin.
      </li>
      <li>
        <strong>Flexbox:</strong> Der Designer nutzt Flexbox, um dynamische und flexible Layouts zu realisieren, 
        die sich automatisch an den verfügbaren Platz anpassen.
      </li>
      <li>
        <strong>Grid:</strong> Um komplexe, zweidimensionale Layouts zu erstellen, bei denen die Struktur klar erkennbar ist, kann CSS-Grid angewandt werden.
      </li>
    </ul>
    <h2 id="responsive-design">6. Responsive Design</h2>
    <p>
      Um eine optimale Darstellung auf verschiedenen Endgeräten zu gewährleisten, werden Media Queries eingesetzt. 
      Der Entwickler definiert Bedingungen, unter denen bestimmte CSS-Regeln angewendet werden, sodass der Administrator der Webseite sicherstellt, 
      dass die Webseite auf Desktop-PCs, Tablets und Smartphones gleichermaßen gut funktioniert.
    </p>
    <h2 id="fortgeschrittene-techniken">7. Fortgeschrittene Techniken</h2>
    <p>
      Für interaktive Effekte bieten sich CSS-Animationen und Transitionen an.
    </p>
    <ul>
      <li>
        <strong>Animationen:</strong> Der Programmierer definiert mit CSS Animationen, um Bewegungen und Übergänge zu realisieren. 
        Schlüsselbilder werden erstellt, die den Ablauf der Animation festlegen.
      </li>
      <li>
        <strong>Transitionen:</strong> Der Programmierer setzt Transitionen ein, um Änderungen an den Eigenschaften ansprechend darzustellen.
      </li>
    </ul>
    <h2 id="fazit">8. Fazit</h2>
    <p>
      Diese Dokumentation richtet sich an Entwickler, welche CSS als mächtiges Werkzeug zur Gestaltung moderner Webseiten nutzen. 
      Es können hier alle notwendigen Grundlagen und fortgeschrittenen Techniken, gefunden werden. Der Leser, welcher sich intensiver mit CSS auseinandersetzen möchte, 
      erhält in diesem Dokument einen klar strukturierten Leitfaden zur Umsetzung eigener Projekte.
    </p>
  `); // Bereinige den Originalinhalt

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
    <div className="csstext-page page-container">
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
        className="csstext-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default CssText;
