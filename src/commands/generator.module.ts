import * as _ from "lodash";
import * as changeCase from "change-case";
import mkdirp from "mkdirp";
import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import generatorTemplate from "../templates/generator.module.template";

export const newGetxGetBuilderPage = async (uri: Uri) => {
  const pageName = await promptForPageName();
  if (_.isNil(pageName) || pageName.trim() === "") {
    window.showErrorMessage("The name must not be empty");
    return;
  }
  
  let targetDirectory = uri.fsPath;
  
  const pascalCasepageName = changeCase.pascalCase(pageName.toLowerCase());

  try {
    await generateCode(pageName, pascalCasepageName, targetDirectory);
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForPageName(): Thenable<string | undefined> {
  const namePromptOptions: InputBoxOptions = {
    prompt: "Input Module Name",
    // placeHolder: "counter",
  };
  return window.showInputBox(namePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the page in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error: any) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

async function generateCode(pageName: string, pascalCasepageName: string, targetDirectory: string) {
  console.log(123111);
  const pageDirectoryPath = `${targetDirectory}/${pascalCasepageName}`;
  const fileList = [
    '',
    'api',
    'components',
    'pages',
    'store',
  ];
  if (!existsSync(pageDirectoryPath)) {
    window.showInformationMessage(
      `Successfully Generated ${pascalCasepageName} Modules123`
    );
    await fileList.forEach(async (file: string) => {
      await createDirectory(`${pageDirectoryPath}/${file}`);
    });

    await Promise.all([
      generatorTemplate.apiTemplate(pageName, targetDirectory),
      generatorTemplate.pageTemplate(pageName, targetDirectory),
      generatorTemplate.storeTemplate(pageName, targetDirectory),
    ]).then(() => {
      window.showInformationMessage(
        `Successfully Generated ${pascalCasepageName} Modules223`
      );
    });
  } else { 
    window.showErrorMessage("The file already exists in the current directory.");
  }
}
