// @ts-nocheck
"use client";
import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Button } from "@radix-ui/themes";
import hljs from "highlight.js";
import domToImage from "dom-to-image";
import styles from "./Editor.module.scss";
import "@radix-ui/themes/styles.css";

export default function Editor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const highlightedCode = hljs.highlight(language, code).value;

  // Export
  const exportCard = (format: "png" | "svg" | "url") => {
    const cardElement = document.querySelector(`.${styles.card}`);
    if (!cardElement) return;

    switch (format) {
      case "png":
        domToImage.toPng(cardElement).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "code_card.png";
          link.href = dataUrl;
          link.click();
        });
        break;
      case "svg":
        domToImage.toSvg(cardElement).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "code_card.svg";
          link.href = dataUrl;
          link.click();
        });
        break;
      case "url":
        domToImage.toSvg(cardElement).then((dataUrl) => {
          console.log(dataUrl);
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.controls}>
        <Select.Root onValueChange={setLanguage} defaultValue="javascript">
          <Select.Trigger variant="soft">Language: {language}</Select.Trigger>
          <Select.Content variant="solid">
            <Select.Item value="javascript">JavaScript</Select.Item>
            <Select.Item value="css">SCSS</Select.Item>
          </Select.Content>
        </Select.Root>

        <Button onClick={() => exportCard("png")}>Export as PNG</Button>
        <Button onClick={() => exportCard("svg")}>Export as SVG</Button>
        <Button onClick={() => exportCard("url")}>Get SVG URL</Button>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.editor}>
          <div className={styles.card}>
            <div className={styles.ide}>
              <div
                className={styles.textareaWrapper}
                style={{
                  "--editor-padding": "16px 16px 21px 16px",
                  "--syntax-text": "#FFFFFF",
                  "--syntax-background": "rgba(0, 0, 0, 0.75)",
                  "--syntax-string": "#6D86A4",
                  "--syntax-comment": "#4A4C56",
                  "--syntax-variable": "#51D0F8",
                  "--syntax-variable-2": "#FFFFFF",
                  "--syntax-variable-3": "#626B8B",
                  "--syntax-number": "#75D2B1",
                  "--syntax-atom": "#75D2B1",
                  "--syntax-keyword": "#7DA9AB",
                  "--syntax-property": "#9681C2",
                  "--syntax-definition": "#51D0F8",
                  "--syntax-meta": "#F2F7F7",
                  "--syntax-operator": "#7DA9AB",
                  "--syntax-attribute": "#51D0F8",
                  "--syntax-tag": "#7DA9AB",
                }}
              >
                <textarea
                  rows="10"
                  cols="50"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={styles.textarea}
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
