// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import EditorControls from "./EditorControls";
import clsx from "clsx";
import hljs from "highlight.js";
import domToImage from "dom-to-image";

import styles from "./Editor.module.scss";

function adjustTextareaHeight(target) {
  target.style.height = "auto"; // Reset height
  target.style.height = `${target.scrollHeight}px`;
}

function handleTabKey(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    textarea.value =
      textarea.value.substring(0, start) + "  " + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 2;
  }
}

export default function Editor() {
  const [exportType, setExportType] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("winter");
  const [code, setCode] = useState("const hello = 'world';");
  const [textareaHeight, setTextareaHeight] = useState("22.5px");
  const [cardPadding, setCardPadding] = useState("32px");

  const highlightedCode = hljs.highlight(language, code).value;

  useEffect(() => {
    const textareaElement = document.querySelector(`.${styles.textarea}`);
    if (textareaElement) {
      adjustTextareaHeight(textareaElement);
    }
  }, [code]);
  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target;
    setCode(target.value);
    adjustTextareaHeight(target);
  }

  // Export
  const exportCard = (format: "png" | "svg" | "url") => {
    const cardElement = document.querySelector(`.${styles.card}`);
    if (!cardElement) return;
    const scale = 2;
    const config = {
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${cardElement.offsetWidth}px`,
        height: `${cardElement.offsetHeight}px`,
      },
      width: cardElement.offsetWidth * scale,
      height: cardElement.offsetHeight * scale,
    };
    switch (format) {
      case "png":
        domToImage.toPng(cardElement, config).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "snipit.png";
          link.href = dataUrl;
          link.click();
        });
        break;
      case "svg":
        domToImage.toSvg(cardElement, config).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "snipit.svg";
          link.href = dataUrl;
          link.click();
        });
        break;
      case "url":
        domToImage.toSvg(cardElement, config).then((dataUrl) => {
          console.log(dataUrl);
        });
        break;
      default:
        break;
    }
  };

  const themeClass = clsx(styles.card, styles[theme]);

  return (
    <>
      <EditorControls
        setTheme={setTheme}
        setLanguage={setLanguage}
        setCardPadding={setCardPadding}
        exportCard={exportCard}
        cardPadding={cardPadding}
      />

      <div className={styles.cardWrapper}>
        <div className={styles.editor}>
          <div className={themeClass} style={{ padding: cardPadding }}>
            <div className={styles.ide}>
              <div
                className={styles.textareaWrapper}
                style={{
                  "--editor-padding": "16px 16px 21px 16px",
                  "--syntax-text": "#FFFFFF",
                  "--syntax-background": "rgba(0, 0, 0, 0.75)",
                  "--syntax-string": "#6D86A4",
                  "--syntax-comment": "#4f5572",
                  "--syntax-variable": "#868ad3",
                  "--syntax-variable-2": "#51D0F8",
                  "--syntax-variable-3": "#626B8B",
                  "--syntax-number": "#75D2B1",
                  "--syntax-atom": "#75D2B1",
                  "--syntax-keyword": "#34ffc7",
                  "--syntax-property": "#71828f",
                  "--syntax-definition": "#51D0F8",
                  "--syntax-meta": "#F2F7F7",
                  "--syntax-operator": "#7DA9AB",
                  "--syntax-attribute": "#868ad3",
                  "--syntax-tag": "#7DA9AB",
                }}
              >
                <textarea
                  rows="1"
                  value={code}
                  className={styles.textarea}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  style={{ height: textareaHeight }}
                  onChange={handleTextareaChange}
                  onKeyDown={handleTabKey}
                  tabIndex={-1}
                />
                <div
                  id="highlighted-code-div"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  className={styles.highlighted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
