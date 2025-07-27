import { Project, SyntaxKind } from "ts-morph";
import glob from "fast-glob";
import path from "path";

function rewriteFile(filePath: string, project: Project) {
  const source = project.getSourceFile(filePath);
  if (!source) return;

  let changed = false;

  /* --------------------------------- imports -------------------------------- */
  source.getImportDeclarations().forEach((imp) => {
    const moduleSpec = imp.getModuleSpecifierValue();
    if (!moduleSpec.endsWith("schema") && !moduleSpec.includes("/schema"))
      return;

    const namedImports = imp.getNamedImports();
    namedImports.forEach((ni) => {
      const name = ni.getName();
      if (name === "user" || name === "User") {
        ni.rename(name === "user" ? "profiles" : "Profile");
        changed = true;
      }
      if (name === "document" || name === "Document") {
        ni.rename(name === "document" ? "artifacts" : "Artifact");
        changed = true;
      }
      if (name === "suggestion") {
        ni.rename("suggestions");
        changed = true;
      }
    });
  });

  /* --------------------------- identifier renames --------------------------- */
  source.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.Identifier) {
      const id = node.asKind(SyntaxKind.Identifier)!;
      const text = id.getText();
      if (text === "selectedVisibilityType") {
        id.replaceWithText("visibility");
        changed = true;
      }
    }
  });

  if (changed) {
    source.saveSync();
    console.log(`✔ Rewrote ${filePath}`);
  }
}

async function run() {
  const patterns = process.argv.slice(2);
  if (patterns.length === 0) {
    console.error("Please supply glob patterns, e.g. src/**/*.ts{,x}");
    process.exit(1);
  }

  const files = await glob(patterns, { absolute: true, onlyFiles: true });
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  files.forEach((file) => project.addSourceFileAtPath(file));

  files.forEach((file) => rewriteFile(file, project));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
