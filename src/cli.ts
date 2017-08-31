import { EmitterFile } from "./emitter/EmitterFile";
import { TypeScriptProject } from "./parser/project";

async function main() {
  const project = await TypeScriptProject.create("tsconfig.json");
  const emitter = new EmitterFile(project.configuration);
  project.traversedSourceFiles.forEach((sf) => {
    sf.getClasses().forEach((cl) => {
      emitter.addSymbol(cl);
    });
  });
  console.log(emitter.generateFileString());
}

main();
