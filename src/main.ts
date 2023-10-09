import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";

async function run() {

	try {
		const vars = core.getInput("env");

		if (!vars) {
			core.warning("No environment variables were provided");
			return;
		}

		console.log({ vars });

		const envKeys = JSON.parse(vars);

		let content = "";

		for (const key in envKeys) {
			const value = envKeys[key];

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
