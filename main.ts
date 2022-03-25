import {Plugin} from "obsidian";
import {ChatViewSettingsTab} from "settings";

const KEYMAP: Record<string, string> = {">": "right", "<": "left", "^": "center"};
const REVERSED_KEYMAP: Record<string, string> = {">": "left", "<": "right", "^": "center"};
const COLORS = [ "red", "yellow", "blue", "purple", "green", "grey" ];

interface ChatViewPluginSettings {
	reverse: boolean;
}

const DEFAULT_SETTINGS: Partial<ChatViewPluginSettings> = {reverse: false};

export default class ChatViewPlugin extends Plugin {
	settings: ChatViewPluginSettings;

	override async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new ChatViewSettingsTab(this.app, this));
		this.registerMarkdownCodeBlockProcessor("chat", (source, element, _) => {
			const rawLines = source.split("\n").filter((line) => /(^>|<|\^)|...|\[(.*?)\]|^#/.test(line.trim()));
			const lines = rawLines.map((rawLine) => rawLine.trim());
			const colorConfigs = new Map<string, string>();
			for (const line of lines) {
				if (/\[(.*?)\]/.test(line)) {
					const configs = line.replace("[", "").replace("]", "").split(",").map((l) => l.trim());
					for (const config of configs) {
						const entry = config.split("=").map((c) => c.trim());
						if (COLORS.contains(entry[ 1 ])) colorConfigs.set(entry[ 0 ], entry[ 1 ]);
					}
				}
			}
			console.log(colorConfigs);
			for (let index = 0; index < lines.length; index++) {
				const line = lines[ index ].trim();
				if (/^#/.test(line)) {
					element.createEl("p", {text: line.substring(1).trim(), cls: [ "chat-view-comment" ]})
				} else if (line === "...") {
					this.createDelimiter(element);
				} else if (/^>|<|\^/.test(line)) {
					const components = line.substring(1).split("|");
					if (components.length > 0) {
						const header = components.length > 1 && /[a-zA-Z0-9]/.test(components[ 0 ])
							? components[ 0 ].trim() : "";
						const message = components.length > 1 ? components[ 1 ].trim() : components[ 0 ].trim();
						const subtext = components.length > 2 ? components[ 2 ].trim() : "";
						const continued = index > 0 && line.charAt(0) === lines[ index - 1 ].charAt(0);
						this.createChatBubble(
							header, message, subtext,
							(this.settings.reverse ? KEYMAP : REVERSED_KEYMAP)[ line.charAt(0) ],
							element, continued, colorConfigs
						);
					}
				}
			}
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	createDelimiter(element: HTMLElement) {
		const delimiter = element.createDiv({cls: [ "delimiter" ]});
		for (let i = 0; i < 3; i++) {
			delimiter.createDiv({cls: [ "dot" ]});
		}
	}

	createChatBubble(
		header: string, message: string, subtext: string, align: string, element: HTMLElement, continued: boolean,
		colorConfigs: Map<string, string>
	) {
		const bubble = element.createDiv({
			cls: [
				"chat-view-bubble",
				`chat-view-align-${ align }`,
				continued ? "chat-view-small-vertical-margin" : "chat-view-default-vertical-margin"
			],
		});
		if (header.length > 0) bubble.createEl("h4", {
			text: header, cls: [ "chat-view-header", `chat-view-${ colorConfigs.get(header) }` ]
		});
		if (message.length > 0) bubble.createEl("p", {text: message, cls: [ "chat-view-message" ]});
		if (subtext.length > 0) bubble.createEl("sub", {text: subtext, cls: [ "chat-view-subtext" ], });
	}
}