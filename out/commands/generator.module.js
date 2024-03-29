"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newGetxGetBuilderPage = void 0;
const _ = __importStar(require("lodash"));
const changeCase = __importStar(require("change-case"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const generator_module_template_1 = __importDefault(require("../templates/generator.module.template"));
/**
 * @description: 开始
 * @param {Uri} uri 当前路径
 * @return {*}
 */
const newGetxGetBuilderPage = async (uri) => {
    const pageName = await promptForPageName();
    if (_.isNil(pageName) || pageName.trim() === "") {
        vscode_1.window.showErrorMessage("The name must not be empty");
        return;
    }
    let targetDirectory = uri.fsPath;
    const pascalCasepageName = changeCase.pascalCase(pageName.toLowerCase());
    try {
        await generateCode(pageName, pascalCasepageName, targetDirectory);
    }
    catch (error) {
        vscode_1.window.showErrorMessage(`Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};
exports.newGetxGetBuilderPage = newGetxGetBuilderPage;
/**
 * @description: 获取用户输入的模块名称
 * @return {*}
 */
function promptForPageName() {
    const namePromptOptions = {
        prompt: "Input Module Name",
        // placeHolder: "counter",
    };
    return vscode_1.window.showInputBox(namePromptOptions);
}
/**
 * @description: 创建文件目录
 * @param {string} targetDirectory
 * @return {*}
 */
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        (0, mkdirp_1.default)(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
/**
 * @description: 创建文件，写入代码片段
 * @param {string} pageName
 * @param {string} pascalCasepageName
 * @param {string} targetDirectory
 * @return {*}
 */
async function generateCode(pageName, pascalCasepageName, targetDirectory) {
    console.log(123111);
    const pageDirectoryPath = `${targetDirectory}/${pascalCasepageName}`;
    const fileList = [
        '',
        'api',
        'components',
        'pages',
        'store',
    ];
    if (!(0, fs_1.existsSync)(pageDirectoryPath)) {
        vscode_1.window.showInformationMessage(`Successfully Generated ${pascalCasepageName} Modules123`);
        await fileList.forEach(async (file) => {
            await createDirectory(`${pageDirectoryPath}/${file}`);
        });
        await Promise.all([
            generator_module_template_1.default.apiTemplate(pageName, targetDirectory),
            generator_module_template_1.default.pageTemplate(pageName, targetDirectory),
            generator_module_template_1.default.storeTemplate(pageName, targetDirectory),
        ]).then(() => {
            vscode_1.window.showInformationMessage(`Successfully Generated ${pascalCasepageName} Modules223`);
        });
    }
    else {
        vscode_1.window.showErrorMessage("The file already exists in the current directory.");
    }
}
//# sourceMappingURL=generator.module.js.map