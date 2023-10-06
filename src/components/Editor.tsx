// @ts-nocheck
"use client";
import { useState, useEffect } from "react";

import { Button, Popover, Select, Flex } from "@radix-ui/themes";
import { ChevronUpIcon, ImageIcon, Link2Icon } from "@radix-ui/react-icons";

import hljs from "highlight.js";
import domToImage from "dom-to-image";
import { languages } from "@/lib/languages";

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
  const [code, setCode] = useState("const hello = 'world';");
  const [textareaHeight, setTextareaHeight] = useState("22.5px");

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
          link.download = "code_card.png";
          link.href = dataUrl;
          link.click();
        });
        break;
      case "svg":
        domToImage.toSvg(cardElement, config).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "code_card.svg";
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

  return (
    <>
      <div className={styles.controls}>
        <Select.Root
          defaultValue="javascript"
          onValueChange={(value) => setLanguage(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Language</Select.Label>
              {languages.map((lang) => (
                <Select.Item key={lang.value} value={lang.value}>
                  {lang.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Flex gap="2">
          <Button onClick={() => exportCard("png")}>Export</Button>

          <Popover.Root>
            <Popover.Trigger>
              <Button variant="soft">
                <ChevronUpIcon width="16" height="16" />
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Flex direction="column" gap="3">
                <Button onClick={() => exportCard("png")}>
                  <ImageIcon /> Save PNG
                </Button>
                <Button onClick={() => exportCard("svg")}>
                  <ImageIcon /> Save SVG
                </Button>
                <Button onClick={() => exportCard("url")}>
                  <Link2Icon /> Base64 URL
                </Button>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Flex>
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
                  rows="1"
                  cols="50"
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
