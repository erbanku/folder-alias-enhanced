import type { Uri } from "vscode";
import type { UseConfigReturn } from "./hooks/useConfig";
import { useEventEmitter, useFsWatcher } from "reactive-vscode";
import { FileDecoration, RelativePattern, window } from "vscode";
import { useConfig } from "./hooks/useConfig";

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
FileDecoration.validate = (d: FileDecoration): void => {
  if (d.badge && d.badge.length !== 1 && d.badge.length !== 2) {
    // throw new Error(`The 'badge'-property must be undefined or a short character`);
  }
  if (!d.color && !d.badge && !d.tooltip) {
    // throw new Error(`The decoration is empty`);
  }
};
export interface UseFileAliasReturn extends UseConfigReturn {
  changeEmitter: (uri: Uri | Uri[]) => void;
}
export function useFileAlias(uri: Uri): UseFileAliasReturn {
  const { publicConfig, privateConfig, configFile, resetConfig, savePublic, savePrivate } = useConfig(uri.fsPath);

  // Create event emitter first so it can be used in watcher
  const changeEmitter = useEventEmitter<undefined | Uri | Uri[]>([]);

  const watcher = useFsWatcher(new RelativePattern(uri, "**/*"));
  watcher.onDidChange((uri) => {
    if (uri.fsPath.endsWith("public-folder-alias.json") || uri.fsPath.endsWith("private-folder-alias.json")) {
      resetConfig();
      // Trigger decoration refresh for all files
      changeEmitter.fire(undefined);
    }
  });
  function getFileDecoration(_uri: Uri) {
    const file = _uri.toString().replace(`${uri.toString()}/`, "");
    if (configFile.value[file]) {
      const description = configFile.value[file].description || "";
      const MAX_BADGE_LENGTH = 15; // Reasonable length for display
      const isTruncated = description.length > MAX_BADGE_LENGTH;
      const truncatedDescription = isTruncated
        ? `${description.substring(0, MAX_BADGE_LENGTH)}...`
        : description;
      // Use the full description as tooltip if it was truncated, or use custom tooltip if provided
      const tooltip = isTruncated
        ? description
        : (configFile.value[file].tooltip || description);
      return new FileDecoration(truncatedDescription, tooltip);
    }
  }

  window.registerFileDecorationProvider({
    onDidChangeFileDecorations: changeEmitter.event,
    provideFileDecoration: uri => getFileDecoration(uri),
  });

  return {
    changeEmitter: (uri: Uri | Uri[]) => changeEmitter.fire(uri),
    publicConfig,
    privateConfig,
    configFile,
    resetConfig,
    savePublic,
    savePrivate,
  };
}
