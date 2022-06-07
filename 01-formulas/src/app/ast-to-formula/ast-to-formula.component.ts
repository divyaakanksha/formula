import { Component, OnInit } from "@angular/core";

// enum created for the operators in a binary expression
enum operator {
  DIVISION = "/",
  MULTIPLICATION = "*",
  ADDITION = "+",
  SUBTRACTION = "-",
  NULL = "",
}

@Component({
  selector: "app-ast-to-formula",
  templateUrl: "./ast-to-formula.component.html",
  styleUrls: ["./ast-to-formula.component.scss"],
})
export class AstToFormulaComponent implements OnInit {
  expression: any = [];
  flag: string = "";
  operator: any = operator;
  constructor() {}

  ngOnInit(): void {}

  evalAST(ast: any): string {
    // push the value only for the first node
    if (this.flag === ast.type) {
      this.expression.push(
        this.evalAST(ast.left) +
          this.operator[ast.type] +
          this.evalAST(ast.right)
      );
      this.flag = "";
    }
    if (ast.type == "NUMBER") {
      return ast.value;
    } else if (ast.type == "VARIABLE") {
      return ast.name;
    } else if (ast.type == "UNARY") {
      return "(-" + ast.name + ")";
    }
    // For binary expression operation done between 2 leaves
    else if (
      ast.type == "ADDITION" ||
      ast.type == "SUBTRACTION" ||
      ast.type == "MULTIPLICATION" ||
      ast.type === "DIVISION"
    ) {
      return (
        this.evalAST(ast.left) +
        this.operator[ast.type] +
        this.evalAST(ast.right)
      );
    }
    // For Paranthesis, we have a child ast again which expresion
    else if (ast.type === "PAREN") {
      if (ast.expression.type === "ADDITION") {
        let val =
          "(" +
          this.evalAST(ast.expression.left) +
          "+" +
          this.evalAST(ast.expression.right) +
          ")";

        return val;
      } else if (ast.expression.type === "SUBTRACTION") {
        let val =
          "(" +
          this.evalAST(ast.expression.left) +
          "-" +
          this.evalAST(ast.expression.right) +
          ")";

        return val;
      } else if (ast.expression.type === "MULTIPLICATION") {
        let val =
          "(" +
          this.evalAST(ast.expression.left) +
          "*" +
          this.evalAST(ast.expression.right) +
          ")";

        return val;
      } else if (ast.expression.type === "DIVISION") {
        let val =
          "(" +
          this.evalAST(ast.expression.left) +
          "/" +
          this.evalAST(ast.expression.right) +
          ")";

        return val;
      } else if (
        ast.expression.type === "VARIABLE" ||
        ast.expression.type === "NUMBER"
      ) {
        let val = ast.name + "(" + this.evalAST(ast.expression) + ")";
      }
    } else if (ast.type === "FUNCTION") {
      let val: any;
      ast.arguments.forEach((value: any) => {
        if (value.type === "ADDITION") {
          val =
            ast.name +
            "(" +
            this.evalAST(value.left) +
            "+" +
            this.evalAST(value.right) +
            ")";
        } else if (value.type === "SUBTRACTION") {
          val =
            ast.name +
            "(" +
            this.evalAST(value.left) +
            "-" +
            this.evalAST(value.right) +
            ")";
        } else if (value.type === "MULTIPLICATION") {
          val =
            ast.name +
            "(" +
            this.evalAST(value.left) +
            "*" +
            this.evalAST(value.right) +
            ")";
        } else if (value.type === "DIVISION") {
          val =
            ast.name +
            "(" +
            this.evalAST(value.left) +
            "/" +
            this.evalAST(value.right) +
            ")";
        } else if (value.type === "VARIABLE" || value.type === "NUMBER") {
          val = ast.name + "(" + this.evalAST(value) + ")";
        }
        return val;
      });
      return val;
    }
    return "";
  }
}
