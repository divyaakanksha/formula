import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AstToFormulaComponent } from "./ast-to-formula.component";

describe("AstToStringComponent", () => {
  let component: AstToFormulaComponent;
  let fixture: ComponentFixture<AstToFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AstToFormulaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstToFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
