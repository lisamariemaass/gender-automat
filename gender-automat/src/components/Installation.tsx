import React, { useState } from 'react';
import '../styles/Installation.css';
import replaceGenericMasculine from '../utils/genderReplacer';

const Installation: React.FC = () => {
  const [isModified, setIsModified] = useState(false); // Zustand, ob der Text angepasst wurde

  // Originalinhalt der Seite
  const originalContent = `
    <h1>Anleitung zur Installation von Git und GitHub</h1>
    <h2 id="einfuhrung">1. Einführung</h2>
    <p>Git ist ein verteiltes Versionskontrollsystem, das der Entwickler nutzt, um Änderungen am Code zu verfolgen. 
    Der Programmierer kann damit effizient an Projekten arbeiten und seinen Code mit anderen teilen. 
    GitHub ist eine Plattform, die dem Anwender ermöglicht, Repositories zu speichern, zu verwalten und gemeinsam mit anderen zu bearbeiten.</p>
    <h2 id="installation-git">2. Installation von Git</h2>
    <h3>Windows</h3>
    <ol>
      <li>Der Nutzer lädt die neueste Version von Git von der offiziellen Website herunter: <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer">Git for Windows</a>.</li>
      <li>Die heruntergeladene Datei wird ausgeführt und es wird den Anweisungen gefolgt.</li>
      <li>Er wählt empfohlene Einstellungen aus, um eine optimale Verwendung zu gewährleisten.</li>
    </ol>
    <h3>macOS</h3>
    <ol>
      <li>Das Terminal wird geöffnet und folgender Befehl eingegeben:</li>
      <pre><code>brew install git</code></pre>
      <li>Falls Homebrew nicht installiert ist, wird zuerst <a href="https://brew.sh/" target="_blank" rel="noopener noreferrer">Homebrew</a> heruntergeladen.</li>
      <li>Nach der Installation wird die Git-Version überprüft mit:</li>
      <pre><code>git --version</code></pre>
    </ol>
    <h3>Linux</h3>
    <ol>
      <li>Der Administrator installiert Git mit folgendem Befehl:</li>
      <pre><code>sudo apt update && sudo apt install git</code></pre>
      <li>Oder für Fedora:</li>
      <pre><code>sudo dnf install git</code></pre>
      <li>Die Installation wird überprüft mit:</li>
      <pre><code>git --version</code></pre>
    </ol>
    <h2 id="git-konfigurieren">3. Git konfigurieren</h2>
    <p>Nach der Installation konfiguriert der Entwickler Git mit seinem Namen und seiner E-Mail-Adresse:</p>
    <p>
      <code>
        git config --global user.name "Benutzername"
        <br />
        git config --global user.email "email@example.com"
      </code>
    </p>
    <h2 id="github-konto">4. Erstellung eines GitHub-Kontos</h2>
    <ol>
      <li>Der Nutzer besucht <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a> und klickt auf "Sign up".</li>
      <li>Der Anwender gibt seinen Benutzernamen, seine E-Mail-Adresse und ein sicheres Passwort ein.</li>
      <li>Der Programmierer bestätigt seine E-Mail-Adresse, um das Konto zu aktivieren.</li>
    </ol>
    <h2 id="git-github-verbinden">5. Verbindung von Git mit GitHub</h2>
    <h3>Erstellen eines SSH-Schlüssels</h3>
    <ol>
      <li>Das Terminal wird geöffnet und folgender Befehl eingegeben:</li>
      <pre><code>ssh-keygen -t rsa -b 4096 -C "email@example.com"</code></pre>
      <li>Der Speicherort wird bestätigt und es wird optional ein Passwort festgelegt.</li>
      <li>Der Nutzer ergänzt den SSH-Schlüssel zu seinem GitHub-Konto:</li>
      <ul>
        <li>Der Schlüssel muss kopiert werden:</li>
        <pre><code>cat ~/.ssh/id_rsa.pub</code></pre>
        <li>Es wird der Schlüssel unter "Settings" → "SSH and GPG keys" auf GitHub hinzugefügt.</li>
      </ul>
      <li>Die Verbindung wird getestet mit:</li>
      <pre><code>ssh -T git@github.com</code></pre>
    </ol>
    <h2 id="git-repository">6. Erstellen eines Git-Repositorys</h2>
    <ol>
      <li>Es wird ein neues Repository auf GitHub erstellt.</li>
      <li>Das Repository wird geklont mit:</li>
      <pre><code>git clone git@github.com:Benutzername/Repository.git</code></pre>
      <li>Der Entwickler erstellt die erste Datei, committet und pusht sie:</li>
      </ol>
      <p>
        <code>
          echo "Hallo Welt" > datei.txt
          <br />
          git add .
          <br />
          git commit -m "Erste Datei hinzugefügt"
          <br />
          git push origin main
        </code>
      </p>
    <h2 id="fazit">7. Fazit</h2>
    <p>Der Entwickler hat nun Git und GitHub eingerichtet und kann seine Projekte effizient verwalten. 
    Wenn weitere Funktionen genutzt werden möchten, kann sich die Dokumentation auf der GitHub-Website durchlesen werden. 
  `; // Bereinige den Originalinhalt

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
    <div className="installation-page page-container">
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
        className="installation-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default Installation;