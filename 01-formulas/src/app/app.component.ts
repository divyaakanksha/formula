import { Component, ViewChild } from "@angular/core";
import { AstToFormulaComponent } from "./ast-to-formula/ast-to-formula.component.js";
// @ts-ignore
import * as Parser from "./parser/formula-parser.js";

const parse = Parser.parse;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  formula: string = "($b + SQRT (SQR($b) - 4 * $a)) / (2 * $a)";
  visualizerOutput: string = "";
  syntaxTree: any;
  syntaxTreeJson: string = "";
  ast = "";

  @ViewChild("astToFormulaRef")
  astToFormulaRef!: AstToFormulaComponent;

  updateAstView() {
    console.log("creating ast view...");
    this.syntaxTree = parse(this.formula);
    console.log("The ast is: ", this.syntaxTree);
    this.syntaxTreeJson = JSON.stringify(this.syntaxTree, null, 2);
  }

  convertAstToFormula() {
    console.log("converting ast to string...");

    console.log(Parser);
    const ast = JSON.parse(this.ast);
    // this.visualizerOutput = Parser.evaluate(val);
    this.astToFormulaRef.flag = ast.type;

    this.astToFormulaRef.evalAST(ast);
    console.log(ast);
  }
}
