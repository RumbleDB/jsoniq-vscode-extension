import { CommonTokenStream, Token } from "antlr4ts";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { jsoniqVisitor } from "../../grammar/jsoniqVisitor";
import { ModuleAndThisIsItContext } from "../../grammar/jsoniqParser";
import { ModuleContext } from "../../grammar/jsoniqParser";
import { MainModuleContext } from "../../grammar/jsoniqParser";
import { LibraryModuleContext } from "../../grammar/jsoniqParser";
import { PrologContext } from "../../grammar/jsoniqParser";
import { ProgramContext } from "../../grammar/jsoniqParser";
import { StatementsContext } from "../../grammar/jsoniqParser";
import { StatementsAndExprContext } from "../../grammar/jsoniqParser";
import { StatementsAndOptionalExprContext } from "../../grammar/jsoniqParser";
import { StatementContext } from "../../grammar/jsoniqParser";
import { ApplyStatementContext } from "../../grammar/jsoniqParser";
import { AssignStatementContext } from "../../grammar/jsoniqParser";
import { BlockStatementContext } from "../../grammar/jsoniqParser";
import { BreakStatementContext } from "../../grammar/jsoniqParser";
import { ContinueStatementContext } from "../../grammar/jsoniqParser";
import { ExitStatementContext } from "../../grammar/jsoniqParser";
import { FlowrStatementContext } from "../../grammar/jsoniqParser";
import { IfStatementContext } from "../../grammar/jsoniqParser";
import { SwitchStatementContext } from "../../grammar/jsoniqParser";
import { SwitchCaseStatementContext } from "../../grammar/jsoniqParser";
import { TryCatchStatementContext } from "../../grammar/jsoniqParser";
import { CatchCaseStatementContext } from "../../grammar/jsoniqParser";
import { TypeSwitchStatementContext } from "../../grammar/jsoniqParser";
import { CaseStatementContext } from "../../grammar/jsoniqParser";
import { AnnotationContext } from "../../grammar/jsoniqParser";
import { AnnotationsContext } from "../../grammar/jsoniqParser";
import { VarDeclStatementContext } from "../../grammar/jsoniqParser";
import { VarDeclForStatementContext } from "../../grammar/jsoniqParser";
import { WhileStatementContext } from "../../grammar/jsoniqParser";
import { SetterContext } from "../../grammar/jsoniqParser";
import { NamespaceDeclContext } from "../../grammar/jsoniqParser";
import { AnnotatedDeclContext } from "../../grammar/jsoniqParser";
import { DefaultCollationDeclContext } from "../../grammar/jsoniqParser";
import { OrderingModeDeclContext } from "../../grammar/jsoniqParser";
import { EmptyOrderDeclContext } from "../../grammar/jsoniqParser";
import { DecimalFormatDeclContext } from "../../grammar/jsoniqParser";
import { QnameContext } from "../../grammar/jsoniqParser";
import { DfPropertyNameContext } from "../../grammar/jsoniqParser";
import { ModuleImportContext } from "../../grammar/jsoniqParser";
import { VarDeclContext } from "../../grammar/jsoniqParser";
import { ContextItemDeclContext } from "../../grammar/jsoniqParser";
import { FunctionDeclContext } from "../../grammar/jsoniqParser";
import { TypeDeclContext } from "../../grammar/jsoniqParser";
import { SchemaLanguageContext } from "../../grammar/jsoniqParser";
import { ParamListContext } from "../../grammar/jsoniqParser";
import { ParamContext } from "../../grammar/jsoniqParser";
import { ExprContext } from "../../grammar/jsoniqParser";
import { ExprSingleContext } from "../../grammar/jsoniqParser";
import { ExprSimpleContext } from "../../grammar/jsoniqParser";
import { FlowrExprContext } from "../../grammar/jsoniqParser";
import { ForClauseContext } from "../../grammar/jsoniqParser";
import { ForVarContext } from "../../grammar/jsoniqParser";
import { LetClauseContext } from "../../grammar/jsoniqParser";
import { LetVarContext } from "../../grammar/jsoniqParser";
import { WhereClauseContext } from "../../grammar/jsoniqParser";
import { GroupByClauseContext } from "../../grammar/jsoniqParser";
import { GroupByVarContext } from "../../grammar/jsoniqParser";
import { OrderByClauseContext } from "../../grammar/jsoniqParser";
import { OrderByExprContext } from "../../grammar/jsoniqParser";
import { CountClauseContext } from "../../grammar/jsoniqParser";
import { QuantifiedExprContext } from "../../grammar/jsoniqParser";
import { QuantifiedExprVarContext } from "../../grammar/jsoniqParser";
import { SwitchExprContext } from "../../grammar/jsoniqParser";
import { SwitchCaseClauseContext } from "../../grammar/jsoniqParser";
import { TypeSwitchExprContext } from "../../grammar/jsoniqParser";
import { CaseClauseContext } from "../../grammar/jsoniqParser";
import { IfExprContext } from "../../grammar/jsoniqParser";
import { TryCatchExprContext } from "../../grammar/jsoniqParser";
import { CatchClauseContext } from "../../grammar/jsoniqParser";
import { OrExprContext } from "../../grammar/jsoniqParser";
import { AndExprContext } from "../../grammar/jsoniqParser";
import { NotExprContext } from "../../grammar/jsoniqParser";
import { ComparisonExprContext } from "../../grammar/jsoniqParser";
import { StringConcatExprContext } from "../../grammar/jsoniqParser";
import { RangeExprContext } from "../../grammar/jsoniqParser";
import { AdditiveExprContext } from "../../grammar/jsoniqParser";
import { MultiplicativeExprContext } from "../../grammar/jsoniqParser";
import { InstanceOfExprContext } from "../../grammar/jsoniqParser";
import { IsStaticallyExprContext } from "../../grammar/jsoniqParser";
import { TreatExprContext } from "../../grammar/jsoniqParser";
import { CastableExprContext } from "../../grammar/jsoniqParser";
import { CastExprContext } from "../../grammar/jsoniqParser";
import { ArrowExprContext } from "../../grammar/jsoniqParser";
import { ArrowFunctionSpecifierContext } from "../../grammar/jsoniqParser";
import { UnaryExprContext } from "../../grammar/jsoniqParser";
import { ValueExprContext } from "../../grammar/jsoniqParser";
import { ValidateExprContext } from "../../grammar/jsoniqParser";
import { AnnotateExprContext } from "../../grammar/jsoniqParser";
import { SimpleMapExprContext } from "../../grammar/jsoniqParser";
import { PostFixExprContext } from "../../grammar/jsoniqParser";
import { ArrayLookupContext } from "../../grammar/jsoniqParser";
import { ArrayUnboxingContext } from "../../grammar/jsoniqParser";
import { PredicateContext } from "../../grammar/jsoniqParser";
import { ObjectLookupContext } from "../../grammar/jsoniqParser";
import { PrimaryExprContext } from "../../grammar/jsoniqParser";
import { BlockExprContext } from "../../grammar/jsoniqParser";
import { VarRefContext } from "../../grammar/jsoniqParser";
import { ParenthesizedExprContext } from "../../grammar/jsoniqParser";
import { ContextItemExprContext } from "../../grammar/jsoniqParser";
import { OrderedExprContext } from "../../grammar/jsoniqParser";
import { UnorderedExprContext } from "../../grammar/jsoniqParser";
import { FunctionCallContext } from "../../grammar/jsoniqParser";
import { ArgumentListContext } from "../../grammar/jsoniqParser";
import { ArgumentContext } from "../../grammar/jsoniqParser";
import { FunctionItemExprContext } from "../../grammar/jsoniqParser";
import { NamedFunctionRefContext } from "../../grammar/jsoniqParser";
import { InlineFunctionExprContext } from "../../grammar/jsoniqParser";
import { InsertExprContext } from "../../grammar/jsoniqParser";
import { DeleteExprContext } from "../../grammar/jsoniqParser";
import { RenameExprContext } from "../../grammar/jsoniqParser";
import { ReplaceExprContext } from "../../grammar/jsoniqParser";
import { TransformExprContext } from "../../grammar/jsoniqParser";
import { AppendExprContext } from "../../grammar/jsoniqParser";
import { UpdateLocatorContext } from "../../grammar/jsoniqParser";
import { CopyDeclContext } from "../../grammar/jsoniqParser";
import { SequenceTypeContext } from "../../grammar/jsoniqParser";
import { ObjectConstructorContext } from "../../grammar/jsoniqParser";
import { ItemTypeContext } from "../../grammar/jsoniqParser";
import { FunctionTestContext } from "../../grammar/jsoniqParser";
import { AnyFunctionTestContext } from "../../grammar/jsoniqParser";
import { TypedFunctionTestContext } from "../../grammar/jsoniqParser";
import { SingleTypeContext } from "../../grammar/jsoniqParser";
import { PairConstructorContext } from "../../grammar/jsoniqParser";
import { ArrayConstructorContext } from "../../grammar/jsoniqParser";
import { UriLiteralContext } from "../../grammar/jsoniqParser";
import { StringLiteralContext } from "../../grammar/jsoniqParser";
import { KeyWordsContext } from "../../grammar/jsoniqParser";

class TokensVisitor
  extends AbstractParseTreeVisitor<void>
  implements jsoniqVisitor<void>
{
  protected defaultResult(): void {}

  /**
   * Visit a parse tree produced by `jsoniqParser.moduleAndThisIsIt`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitModuleAndThisIsIt?: (ctx: ModuleAndThisIsItContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.module`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitModule?: (ctx: ModuleContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.mainModule`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitMainModule?: (ctx: MainModuleContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.libraryModule`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitLibraryModule?: (ctx: LibraryModuleContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.prolog`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitProlog?: (ctx: PrologContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.program`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitProgram?: (ctx: ProgramContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.statements`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStatements?: (ctx: StatementsContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.statementsAndExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStatementsAndExpr?: (ctx: StatementsAndExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.statementsAndOptionalExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStatementsAndOptionalExpr?: (
    ctx: StatementsAndOptionalExprContext
  ) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.statement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStatement?: (ctx: StatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.applyStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitApplyStatement?: (ctx: ApplyStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.assignStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAssignStatement?: (ctx: AssignStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.blockStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitBlockStatement?: (ctx: BlockStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.breakStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitBreakStatement?: (ctx: BreakStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.continueStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitContinueStatement?: (ctx: ContinueStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.exitStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitExitStatement?: (ctx: ExitStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.flowrStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFlowrStatement?: (ctx: FlowrStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.ifStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitIfStatement?: (ctx: IfStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.switchStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSwitchStatement?: (ctx: SwitchStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.switchCaseStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSwitchCaseStatement?: (ctx: SwitchCaseStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.tryCatchStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTryCatchStatement?: (ctx: TryCatchStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.catchCaseStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCatchCaseStatement?: (ctx: CatchCaseStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.typeSwitchStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTypeSwitchStatement?: (ctx: TypeSwitchStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.caseStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCaseStatement?: (ctx: CaseStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.annotation`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAnnotation?: (ctx: AnnotationContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.annotations`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAnnotations?: (ctx: AnnotationsContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.varDeclStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitVarDeclStatement?: (ctx: VarDeclStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.varDeclForStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitVarDeclForStatement?: (ctx: VarDeclForStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.whileStatement`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitWhileStatement?: (ctx: WhileStatementContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.setter`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSetter(ctx: SetterContext) {}

  /**
   * Visit a parse tree produced by `jsoniqParser.namespaceDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitNamespaceDecl?: (ctx: NamespaceDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.annotatedDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAnnotatedDecl?: (ctx: AnnotatedDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.defaultCollationDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitDefaultCollationDecl?: (ctx: DefaultCollationDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.orderingModeDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitOrderingModeDecl?: (ctx: OrderingModeDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.emptyOrderDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitEmptyOrderDecl?: (ctx: EmptyOrderDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.decimalFormatDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitDecimalFormatDecl?: (ctx: DecimalFormatDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.qname`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitQname?: (ctx: QnameContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.dfPropertyName`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitDfPropertyName?: (ctx: DfPropertyNameContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.moduleImport`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitModuleImport?: (ctx: ModuleImportContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.varDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitVarDecl?: (ctx: VarDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.contextItemDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitContextItemDecl?: (ctx: ContextItemDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.functionDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFunctionDecl?: (ctx: FunctionDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.typeDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTypeDecl?: (ctx: TypeDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.schemaLanguage`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSchemaLanguage?: (ctx: SchemaLanguageContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.paramList`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitParamList?: (ctx: ParamListContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.param`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitParam?: (ctx: ParamContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.expr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitExpr?: (ctx: ExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.exprSingle`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitExprSingle?: (ctx: ExprSingleContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.exprSimple`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitExprSimple?: (ctx: ExprSimpleContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.flowrExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFlowrExpr?: (ctx: FlowrExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.forClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitForClause?: (ctx: ForClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.forVar`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitForVar?: (ctx: ForVarContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.letClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitLetClause?: (ctx: LetClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.letVar`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitLetVar?: (ctx: LetVarContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.whereClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitWhereClause?: (ctx: WhereClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.groupByClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitGroupByClause?: (ctx: GroupByClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.groupByVar`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitGroupByVar?: (ctx: GroupByVarContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.orderByClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitOrderByClause?: (ctx: OrderByClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.orderByExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitOrderByExpr?: (ctx: OrderByExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.countClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCountClause?: (ctx: CountClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.quantifiedExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitQuantifiedExpr?: (ctx: QuantifiedExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.quantifiedExprVar`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitQuantifiedExprVar?: (ctx: QuantifiedExprVarContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.switchExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSwitchExpr?: (ctx: SwitchExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.switchCaseClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSwitchCaseClause?: (ctx: SwitchCaseClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.typeSwitchExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTypeSwitchExpr?: (ctx: TypeSwitchExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.caseClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCaseClause?: (ctx: CaseClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.ifExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitIfExpr?: (ctx: IfExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.tryCatchExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTryCatchExpr?: (ctx: TryCatchExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.catchClause`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCatchClause?: (ctx: CatchClauseContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.orExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitOrExpr?: (ctx: OrExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.andExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAndExpr?: (ctx: AndExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.notExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitNotExpr?: (ctx: NotExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.comparisonExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitComparisonExpr?: (ctx: ComparisonExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.stringConcatExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStringConcatExpr?: (ctx: StringConcatExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.rangeExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitRangeExpr?: (ctx: RangeExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.additiveExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.multiplicativeExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.instanceOfExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitInstanceOfExpr?: (ctx: InstanceOfExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.isStaticallyExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitIsStaticallyExpr?: (ctx: IsStaticallyExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.treatExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTreatExpr?: (ctx: TreatExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.castableExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCastableExpr?: (ctx: CastableExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.castExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCastExpr?: (ctx: CastExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.arrowExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArrowExpr?: (ctx: ArrowExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.arrowFunctionSpecifier`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArrowFunctionSpecifier?: (ctx: ArrowFunctionSpecifierContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.unaryExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitUnaryExpr?: (ctx: UnaryExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.valueExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitValueExpr?: (ctx: ValueExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.validateExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitValidateExpr?: (ctx: ValidateExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.annotateExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAnnotateExpr?: (ctx: AnnotateExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.simpleMapExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSimpleMapExpr?: (ctx: SimpleMapExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.postFixExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitPostFixExpr?: (ctx: PostFixExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.arrayLookup`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArrayLookup?: (ctx: ArrayLookupContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.arrayUnboxing`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArrayUnboxing?: (ctx: ArrayUnboxingContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.predicate`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitPredicate?: (ctx: PredicateContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.objectLookup`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitObjectLookup?: (ctx: ObjectLookupContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.primaryExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.blockExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitBlockExpr?: (ctx: BlockExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.varRef`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitVarRef?: (ctx: VarRefContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.parenthesizedExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitParenthesizedExpr?: (ctx: ParenthesizedExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.contextItemExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitContextItemExpr?: (ctx: ContextItemExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.orderedExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitOrderedExpr?: (ctx: OrderedExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.unorderedExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitUnorderedExpr?: (ctx: UnorderedExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.functionCall`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFunctionCall?: (ctx: FunctionCallContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.argumentList`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArgumentList?: (ctx: ArgumentListContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.argument`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArgument?: (ctx: ArgumentContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.functionItemExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFunctionItemExpr?: (ctx: FunctionItemExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.namedFunctionRef`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitNamedFunctionRef?: (ctx: NamedFunctionRefContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.inlineFunctionExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitInlineFunctionExpr?: (ctx: InlineFunctionExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.insertExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitInsertExpr?: (ctx: InsertExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.deleteExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitDeleteExpr?: (ctx: DeleteExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.renameExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitRenameExpr?: (ctx: RenameExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.replaceExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitReplaceExpr?: (ctx: ReplaceExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.transformExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTransformExpr?: (ctx: TransformExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.appendExpr`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAppendExpr?: (ctx: AppendExprContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.updateLocator`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitUpdateLocator?: (ctx: UpdateLocatorContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.copyDecl`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitCopyDecl?: (ctx: CopyDeclContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.sequenceType`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSequenceType?: (ctx: SequenceTypeContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.objectConstructor`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitObjectConstructor?: (ctx: ObjectConstructorContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.itemType`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitItemType?: (ctx: ItemTypeContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.functionTest`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitFunctionTest?: (ctx: FunctionTestContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.anyFunctionTest`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitAnyFunctionTest?: (ctx: AnyFunctionTestContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.typedFunctionTest`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitTypedFunctionTest?: (ctx: TypedFunctionTestContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.singleType`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitSingleType?: (ctx: SingleTypeContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.pairConstructor`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitPairConstructor?: (ctx: PairConstructorContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.arrayConstructor`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitArrayConstructor?: (ctx: ArrayConstructorContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.uriLiteral`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitUriLiteral?: (ctx: UriLiteralContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.stringLiteral`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitStringLiteral?: (ctx: StringLiteralContext) => void;

  /**
   * Visit a parse tree produced by `jsoniqParser.keyWords`.
   * @param ctx the parse tree
   * @return the visitor void
   */
  visitKeyWords?: (ctx: KeyWordsContext) => void;
}
