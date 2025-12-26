import type { ComputedRef, Ref } from "reactive-vscode";
import type { RecordConfig } from "../typings/common.typing";
import { merge } from "lodash-es";
import { join } from "pathe";
import { computed, ref } from "reactive-vscode";
import { config } from "../config";
import { readConfig, writeConfig } from "../utils/file.util";

export interface UseConfigReturn {
  publicConfig: Ref<RecordConfig, RecordConfig>;
  privateConfig: Ref<RecordConfig, RecordConfig>;
  configFile: ComputedRef<RecordConfig>;
  resetConfig: () => void;
  savePublic: () => void;
  savePrivate: () => void;
}

export function useConfig(fileDir: string): UseConfigReturn {
  const configPath = join(fileDir, ".vscode", "public-folder-alias.json");
  const privateConfigPath = join(fileDir, ".vscode", "private-folder-alias.json");
  const publicConfig = ref(readConfig(configPath));
  const privateConfig = ref(readConfig(privateConfigPath));
  const configFile = computed<RecordConfig>(() => {
    // Merge configs based on priority setting
    // 'private-first' (default): private overrides public
    // 'public-first': public overrides private
    const priority = config.aliasPriority || "private-first";
    if (priority === "public-first") {
      return merge({}, privateConfig.value, publicConfig.value);
    }
    else {
      return merge({}, publicConfig.value, privateConfig.value);
    }
  });
  function resetConfig() {
    publicConfig.value = readConfig(configPath);
    privateConfig.value = readConfig(privateConfigPath);
  }

  function savePublic() {
    writeConfig(configPath, publicConfig.value);
  }

  function savePrivate() {
    writeConfig(privateConfigPath, privateConfig.value);
  }

  return {
    publicConfig,
    privateConfig,
    configFile,
    resetConfig,
    savePublic,
    savePrivate,
  };
}
