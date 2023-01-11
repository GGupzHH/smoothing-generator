import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";

/**
 * pascalCaseName: The first letter is uppercase module name
 * snakeCaseName: The module name
 * targetPath: The module path
 */ 

// api
function apiTemplate(pageName: string, targetDirectory: string) {
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
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

// page
function pageTemplate(pageName: string, targetDirectory: string) {
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
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

// store
function storeTemplate(pageName: string, targetDirectory: string) {
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
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

export default {
  apiTemplate,
  pageTemplate,
  storeTemplate
};
