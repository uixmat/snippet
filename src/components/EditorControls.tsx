import { Button, Popover, Select, Flex } from "@radix-ui/themes";
import { ChevronUpIcon, ImageIcon, Link2Icon } from "@radix-ui/react-icons";
import { languages } from "@/lib/languages";
import { EditorControls } from "@/types/EditorTypes";
import styles from "./EditorControls.module.scss";

export default function EditorControls({
  setLanguage,
  setCardPadding,
  exportCard,
  cardPadding,
}: EditorControls) {
  return (
    <div className={styles.controls}>
      <Select.Root defaultValue="javascript" onValueChange={setLanguage}>
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
        <Button
          variant={cardPadding === "16px" ? "soft" : "outline"}
          onClick={() => setCardPadding("16px")}
        >
          16px
        </Button>
        <Button
          variant={cardPadding === "32px" ? "soft" : "outline"}
          onClick={() => setCardPadding("32px")}
        >
          32px
        </Button>
        <Button
          variant={cardPadding === "64px" ? "soft" : "outline"}
          onClick={() => setCardPadding("64px")}
        >
          64px
        </Button>
      </Flex>

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
  );
}
