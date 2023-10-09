import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";

async function run() {

	try {
		const envKeys = Object.keys(process.env).filter((key) => key.startsWith("INPUT_"));

		let content = "";

		for (const key of envKeys) {
			const value = process.env[key];

			if (!value) {
				continue;
			}

			content += `${key}=${value}\n`;
		}

		const envPath = path.join(process.cwd(), ".env");

		fs.writeFileSync(envPath, content);

		core.debug(`Wrote env file to ${envPath}`);
		core.setOutput("path", envPath);

	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
	}
}

run();
