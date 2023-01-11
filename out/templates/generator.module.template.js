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
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = __importStar(require("change-case"));
const fs_1 = require("fs");
/**
 * pascalCaseName: The first letter is uppercase module name
 * snakeCaseName: The module name
 * targetPath: The module path
 */
// api
function apiTemplate(pageName, targetDirectory) {
    const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${pageName}/api/api.ts`;
    const template = `
import request from '@/utils/request'
const ${snakeCaseName}Api = {
  getDemoTestListID(id: string) {
    return request.get(\`/api/\${ id }/list\`)
  }
}

export default ${snakeCaseName}Api
`;
    return new Promise(async (resolve, reject) => {
        (0, fs_1.writeFile)(targetPath, template, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}
// page
function pageTemplate(pageName, targetDirectory) {
    const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${pageName}/pages/${snakeCaseName}.vue`;
    const template = `
<template>

</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: '${pascalCaseName}'
})
</script>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
</script>

<style scoped lang="scss">

</style>
`;
    return new Promise(async (resolve, reject) => {
        (0, fs_1.writeFile)(targetPath, template, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}
// store
function storeTemplate(pageName, targetDirectory) {
    const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
    const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
    const targetPath = `${targetDirectory}/${pageName}/store/index.ts`;
    const template = `
import { defineStore } from 'pinia'
import ${snakeCaseName}Api from 'modules/${pascalCaseName}/api'

export const use${pascalCaseName} = defineStore('${pascalCaseName}', {
  state: () => {
    return {
      id: 'absdb'
    }
  },
  actions: {
    async getDemoTestList() {
      const res = await ${snakeCaseName}Api.getDemoTestListID(this.id)
      return this.filterResponse(res)
    }
  }
})
`;
    return new Promise(async (resolve, reject) => {
        (0, fs_1.writeFile)(targetPath, template, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve;
        });
    });
}
exports.default = {
    apiTemplate,
    pageTemplate,
    storeTemplate
};
//# sourceMappingURL=generator.module.template.js.map