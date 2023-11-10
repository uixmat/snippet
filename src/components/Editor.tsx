// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import EditorControls from "./EditorControls";
import clsx from "clsx";
import hljs from "highlight.js";
import domToImage from "dom-to-image";
import { themes } from "@/lib/themes";
import { toast } from "sonner";

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
  const [theme, setTheme] = useState("purple");
  const [code, setCode] = useState(`function Snippet() {
  const snippet = 'https://snippet.fyi';
  return (
    <li>Snippet URL: {snippet}</li>
  );
}`);
  const [textareaHeight, setTextareaHeight] = useState("22.5px");
  const [cardPadding, setCardPadding] = useState("64px");

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
          link.download = "snippet.png";
          link.href = dataUrl;
          link.click();
          toast.success("Generated PNG", {
            className: "toast",
            unstyled: true,
            cancel: {
              label: "Close",
            },
          });
        });
        break;
      case "svg":
        domToImage.toSvg(cardElement, config).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "snippet.svg";
          link.href = dataUrl;
          link.click();
          toast.success("Generated SVG", {
            className: "toast",
            unstyled: true,
            cancel: {
              label: "Close",
            },
          });
        });
        break;
      case "url":
        domToImage.toSvg(cardElement, config).then((dataUrl) => {
          toast.success("Open console to see data URL!", {
            className: "toast",
            unstyled: true,
            cancel: {
              label: "Close",
            },
          });
          console.log(dataUrl);
        });
        break;
      default:
        break;
    }
  };

  const themeClass = clsx(styles.card, styles[theme]);

  const selectedThemeStyles =
    themes.find((t) => t.value === theme)?.styles || {};
  const themeStyles = {
    ...selectedThemeStyles,
    padding: cardPadding,
  };

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
          <div className={themeClass} style={themeStyles}>
            <div className={styles.ide}>
              <div className={styles.textareaWrapper}>
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
