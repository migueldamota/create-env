import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";

async function run() {

	try {
		const envKeys = Object.keys(process.env);

		let content = "";

		console.log(envKeys);

		for (const key of envKeys) {
			const value = process.env[key];

			if (!value) {
				continue;
			}

			content += `${key}=${value}\n`;
		}

		// core.setOutput("path", );

	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
	}
}

run();
