"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "lllts",
      version: "0.1.37",
      description: "EvidyTS: the stricter TypeScript compiler/dialect behind Evidype",
      license: "GPL-3.0-or-later",
      main: "dist/LLLTS.bundle.cjs",
      bin: {
        evidyts: "./bin/evidyts",
        lllts: "./bin/lllts"
      },
      type: "commonjs",
      scripts: {
        watch: "node scripts/watch.mjs",
        "watch:overlay-runtime": "node scripts/build-overlay-runtime.mjs --watch",
        "lll-check": "tsc && ./bin/evidyts --project tsconfig.json --entry src/LLLTS.lll.ts --noEmit",
        "lll-check-no-tests": "tsc && ./bin/evidyts --project tsconfig.json --entry src/LLLTS.lll.ts --noTests",
        "lll-check-verbose": "tsc && ./bin/evidyts --project tsconfig.json --entry src/LLLTS.lll.ts --verbose",
        "lll-example-check-quick": "tsc && ./bin/evidyts --project tsconfig.json --entry src/rules/testing/examples/MathObject.lll.ts",
        "lll-example-bad-many-functions": "tsc && ./bin/evidyts --project tsconfig.json --entry src/examples/intentionallyBadExampleTests/ClassUsingManyFunctions.ts",
        "lll-example-bad-rogue-top-level": "tsc && ./bin/evidyts --project tsconfig.json --entry src/examples/intentionallyBadExampleTests/RogueTopLevelViolationsEntry.ts",
        "build:typescript": "tsc",
        "typecheck:overlay-runtime": "tsc -p tsconfig.overlay-runtime.json --noEmit",
        "build:overlay-runtime": "node scripts/build-overlay-runtime.mjs",
        "build:cli-bundle": "node scripts/build-cli-bundle.mjs",
        build: "pnpm run build:typescript && pnpm run build:overlay-runtime && pnpm run build:cli-bundle",
        "ts-check": "tsc --noEmit",
        "playwright-setup": "pnpm exec playwright install chromium",
        "playwright-list": "pnpm exec playwright install --list",
        i: "pnpm i",
        "install-evidyts-global": "pnpm link --global",
        "uninstall-evidyts-global": "pnpm remove --global lllts",
        "install-lllts-global": "pnpm link --global",
        "uninstall-lllts-global": "pnpm remove --global lllts"
      },
      keywords: [
        "evidyts",
        "typescript",
        "compiler",
        "testing",
        "llm"
      ],
      dependencies: {
        express: "^4.22.1",
        playwright: "^1.52.0",
        "ts-morph": "^21.0.1",
        typescript: "^5.3.3"
      },
      devDependencies: {
        "@types/express": "^4.17.25",
        "@types/node": "^20.10.6",
        esbuild: "^0.25.12",
        "ts-node": "^10.9.2",
        "tsconfig-paths": "^4.2.0"
      },
      engines: {
        node: ">=18.0.0"
      }
    };
  }
});

// dist-many/public/lll.lll.js
var require_lll_lll = __commonJS({
  "dist-many/public/lll.lll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Spec = Spec;
    exports2.Scenario = Scenario;
    function Spec(description) {
      return function(target, propertyKey, descriptor) {
        if (descriptor !== void 0) {
          return descriptor;
        }
        return target;
      };
    }
    function Scenario(description) {
      return function(target, propertyKey, descriptor) {
      };
    }
  }
});

// dist-many/core/BaseRule.lll.js
var require_BaseRule_lll = __commonJS({
  "dist-many/core/BaseRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BaseRule = void 0;
    var lll_lll_12 = require_lll_lll();
    var BaseRule = class BaseRule {
      static createDiagnostic(file, message, severity, ruleCode, line) {
        return { file, message, severity, line, ruleCode };
      }
      static filterBySeverity(diagnostics, sev) {
        return diagnostics.filter((d) => d.severity === sev);
      }
      static getExportedClass(sourceFile) {
        return sourceFile.getClasses().find((c) => c.isExported());
      }
      static findDecorator(node, decoratorName) {
        return node.getDecorators().find((d) => d.getName() === decoratorName);
      }
      static hasDecorator(node, decoratorName) {
        return node.getDecorators().some((d) => d.getName() === decoratorName);
      }
      static getDecoratorArguments(decorator) {
        return decorator.getArguments().map((arg) => arg.getText());
      }
      static createError(file, message, ruleCode, line) {
        return this.createDiagnostic(file, message, "error", ruleCode, line);
      }
      static createWarning(file, message, ruleCode, line) {
        return this.createDiagnostic(file, message, "warning", ruleCode, line);
      }
      static createNotice(file, message, ruleCode, line) {
        return this.createDiagnostic(file, message, "notice", ruleCode, line);
      }
    };
    exports2.BaseRule = BaseRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Helper to create a diagnostic object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, String, Number]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "createDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Filters diagnostics by severity level."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array, String]),
      __metadata2("design:returntype", Array)
    ], BaseRule, "filterBySeverity", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the first exported class from a source file, or undefined if nlll exists."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "getExportedClass", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Finds a decorator by name on a given node."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "findDecorator", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks if a node has a specific decorator."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String]),
      __metadata2("design:returntype", Boolean)
    ], BaseRule, "hasDecorator", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Gets the arguments from a decorator as text array."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], BaseRule, "getDecoratorArguments", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Helper to create an error diagnostic object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, Number]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "createError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Helper to create a warning diagnostic object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, Number]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "createWarning", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Helper to create a notice-level diagnostic object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, Number]),
      __metadata2("design:returntype", Object)
    ], BaseRule, "createNotice", null);
    exports2.BaseRule = BaseRule = __decorate2([
      (0, lll_lll_12.Spec)("Defines the Rule interface, Diagnostic structure, and utilities for all rules.")
    ], BaseRule);
  }
});

// dist-many/core/variants/FileVariantSupport.lll.js
var require_FileVariantSupport_lll = __commonJS({
  "dist-many/core/variants/FileVariantSupport.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var FileVariantSupport_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FileVariantSupport = void 0;
    var path = __importStar(require("path"));
    var lll_lll_12 = require_lll_lll();
    var FileVariantSupport = class FileVariantSupport {
      static {
        FileVariantSupport_1 = this;
      }
      static FILE_VARIANTS = [
        { primarySuffix: ".lll.ts", testSuffix: ".test.lll.ts", testClassSuffix: "Test" },
        { primarySuffix: ".lll.ts", testSuffix: ".test2.lll.ts", testClassSuffix: "Test2" }
      ];
      static getVariantForFile(filePath) {
        for (const variant of FileVariantSupport_1.FILE_VARIANTS) {
          if (filePath.endsWith(variant.testSuffix)) {
            return { variant, isTest: true };
          }
        }
        for (const variant of FileVariantSupport_1.FILE_VARIANTS) {
          if (filePath.endsWith(variant.primarySuffix)) {
            return { variant, isTest: false };
          }
        }
        return null;
      }
      static isTestFilePath(filePath) {
        return FileVariantSupport_1.getVariantForFile(filePath)?.isTest === true;
      }
      static getTestFilePaths(filePath, className) {
        const variantMatch = FileVariantSupport_1.getVariantForFile(filePath);
        if (!variantMatch || variantMatch.isTest) {
          return [];
        }
        const parsed = path.parse(filePath);
        const baseName = className ?? (parsed.name.endsWith(".lll") ? parsed.name.slice(0, -".lll".length) : parsed.name);
        return FileVariantSupport_1.FILE_VARIANTS.map((variant) => path.join(parsed.dir, `${baseName}${variant.testSuffix.slice(0, -variant.primarySuffix.length)}${variant.primarySuffix}`));
      }
      static getTestFilePath(filePath, className, testSuffix = ".test.lll.ts") {
        const parsed = path.parse(filePath);
        const baseName = className ?? (parsed.name.endsWith(".lll") ? parsed.name.slice(0, -".lll".length) : parsed.name);
        const variant = FileVariantSupport_1.FILE_VARIANTS.find((candidate) => candidate.testSuffix === testSuffix);
        if (!variant) {
          return null;
        }
        if (FileVariantSupport_1.getVariantForFile(filePath)?.isTest === true) {
          return null;
        }
        return path.join(parsed.dir, `${baseName}${variant.testSuffix.slice(0, -variant.primarySuffix.length)}${variant.primarySuffix}`);
      }
      static getPrimaryFilePath(filePath) {
        const variantMatch = FileVariantSupport_1.getVariantForFile(filePath);
        if (!variantMatch || !variantMatch.isTest) {
          return null;
        }
        return filePath.slice(0, -variantMatch.variant.testSuffix.length) + variantMatch.variant.primarySuffix;
      }
      static getHostClassNameFromTestPath(filePath) {
        const variantMatch = FileVariantSupport_1.getVariantForFile(filePath);
        if (!variantMatch || !variantMatch.isTest) {
          return null;
        }
        return path.basename(filePath).slice(0, -variantMatch.variant.testSuffix.length);
      }
      static getExpectedTestClassName(filePath) {
        const variantMatch = FileVariantSupport_1.getVariantForFile(filePath);
        const hostClassName = FileVariantSupport_1.getHostClassNameFromTestPath(filePath);
        if (!variantMatch || !variantMatch.isTest || hostClassName === null) {
          return null;
        }
        return `${hostClassName}${variantMatch.variant.testClassSuffix}`;
      }
    };
    exports2.FileVariantSupport = FileVariantSupport;
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves whether a path matches a supported production/test file variant."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], FileVariantSupport, "getVariantForFile", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when a file path is one of the supported test companion variants."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], FileVariantSupport, "isTestFilePath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds all supported companion test paths for a production file path and optional class name override."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String]),
      __metadata2("design:returntype", Array)
    ], FileVariantSupport, "getTestFilePaths", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds one companion test path for a production file path, keyed by a supported test suffix."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, Object]),
      __metadata2("design:returntype", Object)
    ], FileVariantSupport, "getTestFilePath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the primary file path represented by a companion test file path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], FileVariantSupport, "getPrimaryFilePath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Extracts the host class name represented by a companion test file path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], FileVariantSupport, "getHostClassNameFromTestPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the exact expected exported class name for a supported test file path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], FileVariantSupport, "getExpectedTestClassName", null);
    exports2.FileVariantSupport = FileVariantSupport = FileVariantSupport_1 = __decorate2([
      (0, lll_lll_12.Spec)("Provides shared file variant helpers for primary/test file naming.")
    ], FileVariantSupport);
  }
});

// dist-many/core/ProjectInitiator.lll.js
var require_ProjectInitiator_lll = __commonJS({
  "dist-many/core/ProjectInitiator.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProjectInitiator = void 0;
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var ts_morph_1 = require("ts-morph");
    var lll_lll_js_1 = require_lll_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var ProjectInitiator = class ProjectInitiator {
      tsconfigPath;
      entryFile;
      project;
      config;
      projectRootDir;
      entryFilePath = null;
      entrySourceRootDir = null;
      constructor(tsconfigPath, strategy = "from_imports", entryFile) {
        this.tsconfigPath = tsconfigPath;
        this.entryFile = entryFile;
        (0, lll_lll_js_1.Spec)("Initializes project graph loading based on the provided strategy.");
        this.tsconfigPath = path.resolve(tsconfigPath);
        this.projectRootDir = path.dirname(this.tsconfigPath);
        this.config = this.loadTsConfig(this.tsconfigPath);
        this.entryFilePath = entryFile !== void 0 ? this.resolveEntryFilePath(entryFile) : null;
        this.entrySourceRootDir = entryFile !== void 0 ? this.resolveEntrySourceRootDir(entryFile, this.entryFilePath) : null;
        if (strategy === "from_imports") {
          this.project = new ts_morph_1.Project({
            tsConfigFilePath: this.tsconfigPath,
            skipAddingFilesFromTsConfig: true
          });
          if (!entryFile) {
            throw new Error("Entry file is required when using 'from_imports' strategy");
          }
          this.addSourceFilesFromImports(entryFile);
        } else {
          this.project = new ts_morph_1.Project({ tsConfigFilePath: this.tsconfigPath });
          this.addSourceFilesFromFolder();
        }
        console.log(`Verifying ${this.project.getSourceFiles().length} source files...`);
      }
      loadTsConfig(configPath) {
        const configContent = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(configContent);
      }
      addSourceFilesFromFolder() {
        const patterns = [];
        if ((this.config.include?.length ?? 0) > 0) {
          patterns.push(...this.config.include ?? []);
        }
        if ((this.config.exclude?.length ?? 0) > 0) {
          patterns.push(...(this.config.exclude ?? []).map((pattern) => `!${pattern}`));
        }
        this.project.addSourceFilesAtPaths(patterns);
      }
      addSourceFilesFromImports(entryFile) {
        const visited = /* @__PURE__ */ new Set();
        const absoluteEntryPath = this.resolveEntryFilePath(entryFile);
        if (!fs.existsSync(absoluteEntryPath)) {
          throw new Error(`Entry file not found: ${absoluteEntryPath}`);
        }
        this.followImportsRecursively(absoluteEntryPath, visited);
      }
      followImportsRecursively(filePath, visited) {
        const normalizedPath = path.resolve(filePath);
        if (visited.has(normalizedPath)) {
          return;
        }
        visited.add(normalizedPath);
        let sourceFile;
        try {
          sourceFile = this.project.addSourceFileAtPath(normalizedPath);
          const relative = path.relative(path.dirname(this.tsconfigPath), normalizedPath);
        } catch (error) {
          return;
        }
        this.enqueueCompanionFiles(normalizedPath, visited);
        const importDeclarations = sourceFile.getImportDeclarations();
        const exportDeclarations = sourceFile.getExportDeclarations();
        const sourceDir = path.dirname(normalizedPath);
        for (const importDecl of importDeclarations) {
          const moduleSpecifier = importDecl.getModuleSpecifierValue();
          if (!moduleSpecifier.startsWith(".") && !moduleSpecifier.startsWith("/")) {
            continue;
          }
          const resolvedPath = this.resolveImportPath(sourceDir, moduleSpecifier);
          if (resolvedPath !== null) {
            this.followImportsRecursively(resolvedPath, visited);
          }
        }
        for (const exportDecl of exportDeclarations) {
          const moduleSpecifier = exportDecl.getModuleSpecifierValue();
          if (!moduleSpecifier) {
            continue;
          }
          if (!moduleSpecifier.startsWith(".") && !moduleSpecifier.startsWith("/")) {
            continue;
          }
          const resolvedPath = this.resolveImportPath(sourceDir, moduleSpecifier);
          if (resolvedPath !== null) {
            this.followImportsRecursively(resolvedPath, visited);
          }
        }
      }
      enqueueCompanionFiles(filePath, visited) {
        const variantMatch = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
        if (!variantMatch) {
          return;
        }
        if (variantMatch.isTest) {
          const primaryPath = FileVariantSupport_lll_1.FileVariantSupport.getPrimaryFilePath(filePath);
          if (primaryPath !== null && fs.existsSync(primaryPath)) {
            this.followImportsRecursively(primaryPath, visited);
          }
          return;
        }
        for (const companionPath of FileVariantSupport_lll_1.FileVariantSupport.getTestFilePaths(filePath)) {
          if (!fs.existsSync(companionPath)) {
            continue;
          }
          this.followImportsRecursively(companionPath, visited);
        }
      }
      resolveImportPath(sourceDir, moduleSpecifier) {
        const possibleExtensions = [".ts", ".lll.ts", ".old.ts", ".d.ts", ".d.old.ts"];
        let basePath = path.resolve(sourceDir, moduleSpecifier);
        if (path.extname(moduleSpecifier).length > 0) {
          if (fs.existsSync(basePath)) {
            return basePath;
          }
          if (moduleSpecifier.endsWith(".lll")) {
            const pathWithTs = basePath + ".ts";
            if (fs.existsSync(pathWithTs)) {
              return pathWithTs;
            }
          }
        }
        for (const ext of possibleExtensions) {
          const pathWithExt = basePath + ext;
          if (fs.existsSync(pathWithExt)) {
            return pathWithExt;
          }
        }
        for (const ext of possibleExtensions) {
          const indexPath = path.join(basePath, `index${ext}`);
          if (fs.existsSync(indexPath)) {
            return indexPath;
          }
        }
        return null;
      }
      getFiles() {
        return this.project.getSourceFiles();
      }
      getProjectRootDir() {
        return this.projectRootDir;
      }
      getEntryFilePath() {
        return this.entryFilePath;
      }
      getEntrySourceRootDir() {
        return this.entrySourceRootDir;
      }
      resolveEntryFilePath(entryFile) {
        return path.resolve(this.projectRootDir, entryFile);
      }
      resolveEntrySourceRootDir(entryFile, resolvedEntryPath) {
        const relativeEntry = path.isAbsolute(entryFile) ? path.relative(this.projectRootDir, resolvedEntryPath ?? entryFile) : entryFile;
        const normalized = relativeEntry.split(path.sep).join("/");
        const segments = normalized.split("/").filter((segment) => segment.length > 0 && segment !== ".");
        const firstSegment = segments.length > 0 ? segments[0] : "";
        if (firstSegment === "" || firstSegment === "..") {
          return this.projectRootDir;
        }
        return path.resolve(this.projectRootDir, firstSegment);
      }
    };
    exports2.ProjectInitiator = ProjectInitiator;
    __decorate2([
      (0, lll_lll_js_1.Spec)("Reads and parses the tsconfig.json file to get include/exclude patterns."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], ProjectInitiator.prototype, "loadTsConfig", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Adds source files to the project using include/exclude patterns from tsconfig."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", void 0)
    ], ProjectInitiator.prototype, "addSourceFilesFromFolder", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Recursively follows imports from entry file to build file list."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", void 0)
    ], ProjectInitiator.prototype, "addSourceFilesFromImports", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Recursively follows all imports from a file, tracking visited files to avoid cycles."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Set]),
      __metadata2("design:returntype", void 0)
    ], ProjectInitiator.prototype, "followImportsRecursively", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Ensures every primary file brings along all supported companions, and test files bring along their host."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Set]),
      __metadata2("design:returntype", void 0)
    ], ProjectInitiator.prototype, "enqueueCompanionFiles", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Resolves a relative import to an absolute file path, handling .ts/.lll.ts extensions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String]),
      __metadata2("design:returntype", Object)
    ], ProjectInitiator.prototype, "resolveImportPath", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Returns all source files matching the include/exclude patterns from tsconfig."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Array)
    ], ProjectInitiator.prototype, "getFiles", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Returns the package directory containing the tsconfig file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", String)
    ], ProjectInitiator.prototype, "getProjectRootDir", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Returns the resolved CLI entry file path when one was provided."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], ProjectInitiator.prototype, "getEntryFilePath", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Returns the source root derived from the first segment of the CLI entry path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], ProjectInitiator.prototype, "getEntrySourceRootDir", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Resolves the CLI entry path relative to the package directory."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], ProjectInitiator.prototype, "resolveEntryFilePath", null);
    __decorate2([
      (0, lll_lll_js_1.Spec)("Derives the source root from the first entry path segment relative to the package directory."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", String)
    ], ProjectInitiator.prototype, "resolveEntrySourceRootDir", null);
    exports2.ProjectInitiator = ProjectInitiator = __decorate2([
      (0, lll_lll_js_1.Spec)("Loads a TypeScript project using ts-morph and returns source files."),
      __metadata2("design:paramtypes", [String, String, String])
    ], ProjectInitiator);
  }
});

// dist-many/rules/limits/BreadthRuleLimits.js
var require_BreadthRuleLimits = __commonJS({
  "dist-many/rules/limits/BreadthRuleLimits.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var BreadthRuleLimits_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BreadthRuleLimits = void 0;
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var lll_lll_12 = require_lll_lll();
    var BreadthRuleLimits = class BreadthRuleLimits {
      static {
        BreadthRuleLimits_1 = this;
      }
      static CONFIG_FILE_NAME = "breadth-rule-limits.json";
      static getConfig() {
        const configPath = BreadthRuleLimits_1.findConfigPath(__dirname);
        const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        return BreadthRuleLimits_1.parseConfig(parsed, configPath);
      }
      static formatAuthoringLimitSummary() {
        const config = BreadthRuleLimits_1.getConfig();
        return [
          `max file length ${config.maxFileLines} lines`,
          `max method body length ${config.maxMethodBodyLines} lines`,
          `max files per folder ${config.maxFilesPerFolder}`,
          `max subfolders per folder ${config.maxSubfoldersPerFolder}`
        ].join(", ");
      }
      static findConfigPath(startDirectory) {
        let currentDirectory = startDirectory;
        while (true) {
          const candidate = path.join(currentDirectory, BreadthRuleLimits_1.CONFIG_FILE_NAME);
          if (fs.existsSync(candidate)) {
            return candidate;
          }
          const parentDirectory = path.dirname(currentDirectory);
          if (parentDirectory === currentDirectory) {
            throw new Error(`Could not find ${BreadthRuleLimits_1.CONFIG_FILE_NAME} from ${startDirectory}`);
          }
          currentDirectory = parentDirectory;
        }
      }
      static parseConfig(value, configPath) {
        if (!value || typeof value !== "object" || Array.isArray(value)) {
          throw new Error(`${configPath} must contain a JSON object.`);
        }
        const record = value;
        return {
          maxFileLines: BreadthRuleLimits_1.parsePositiveInteger(record.maxFileLines, "maxFileLines", configPath),
          maxMethodBodyLines: BreadthRuleLimits_1.parsePositiveInteger(record.maxMethodBodyLines, "maxMethodBodyLines", configPath),
          maxFilesPerFolder: BreadthRuleLimits_1.parsePositiveInteger(record.maxFilesPerFolder, "maxFilesPerFolder", configPath),
          maxSubfoldersPerFolder: BreadthRuleLimits_1.parsePositiveInteger(record.maxSubfoldersPerFolder, "maxSubfoldersPerFolder", configPath)
        };
      }
      static parsePositiveInteger(value, fieldName, configPath) {
        if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
          throw new Error(`${configPath} field ${fieldName} must be a positive integer.`);
        }
        return value;
      }
    };
    exports2.BreadthRuleLimits = BreadthRuleLimits;
    __decorate2([
      (0, lll_lll_12.Spec)("Reads and validates the shared breadth limit configuration."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], BreadthRuleLimits, "getConfig", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Formats the configured limits for language guidance text."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", String)
    ], BreadthRuleLimits, "formatAuthoringLimitSummary", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Finds the nearest package-level breadth limit configuration file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], BreadthRuleLimits, "findConfigPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Parses and validates the breadth limit configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String]),
      __metadata2("design:returntype", Object)
    ], BreadthRuleLimits, "parseConfig", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Parses a positive integer config field."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, String]),
      __metadata2("design:returntype", Number)
    ], BreadthRuleLimits, "parsePositiveInteger", null);
    exports2.BreadthRuleLimits = BreadthRuleLimits = BreadthRuleLimits_1 = __decorate2([
      (0, lll_lll_12.Spec)("Loads the single shared configuration for EvidyTS breadth and size limits.")
    ], BreadthRuleLimits);
  }
});

// dist-many/core/ResultReporter.lll.js
var require_ResultReporter_lll = __commonJS({
  "dist-many/core/ResultReporter.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ResultReporter_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ResultReporter = void 0;
    var path = __importStar(require("path"));
    var lll_lll_12 = require_lll_lll();
    var BreadthRuleLimits_1 = require_BreadthRuleLimits();
    var ResultReporter = class ResultReporter {
      static {
        ResultReporter_1 = this;
      }
      projectRoot;
      static RULE_DESCRIPTIONS = {
        "no-export": "Wrong number of exports. Only if it's impossible to follow EvidyTS, for example: 1. you need to support old system, 2. you export decorators - only in those two cases - rename the file from .ts to .old.ts, but avoid it at all costs",
        "name-mismatch": "Export name must match filename",
        "extra-exports": "Extra exports beyond main class/type",
        "extra-top-level": "Extra top-level class/type/interface declarations",
        "rogue-top-level": "Forbidden top-level declarations/statements",
        "missing-spec-class": "Missing @Spec on class",
        "missing-spec-method": "Missing @Spec on method",
        "missing-spec-type": "Missing Spec call before exported type",
        "missing-desc-class": "Missing description in class @Spec",
        "missing-desc-method": "Missing description in method @Spec",
        "missing-test": "Test companion structure missing",
        "missing-test-type": "Test must declare testType = 'unit' | 'behavioral'",
        "bad-test-type": "Test testType must be literal 'unit' or 'behavioral'",
        "test-import-boundary": "Production code cannot import test modules",
        "missing-explicit-return-type": "Value-returning declarations must declare explicit return types",
        "test-coverage": "Test coverage debt",
        "test-failure": "Test scenario failed",
        "file-too-long": `File allowed maximum line limit is ${BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxFileLines} lines. Consider splitting into smaller modules`,
        "method-too-long": `Method body allowed maximum line limit is ${BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxMethodBodyLines} lines. Consider refactoring into smaller methods`,
        "folder-too-many-files": "Folder contains too many source files",
        "folder-too-many-folders": "Folder contains too many subfolders",
        "assignment-in-conditions": "Assignments are forbidden inside conditions",
        "no-loose-equality": "Loose equality operators are forbidden",
        "no-implicit-truthiness": "Conditions cannot rely on implicit truthiness",
        "switch-fallthrough": "Switch clauses must terminate or use an explicit fallthrough marker",
        "no-ignored-promises": "Promise-valued expression statements must be handled explicitly",
        "no-floating-promises": "Promise values created in async code must be awaited, returned, or combined explicitly",
        "no-implicit-primitive-coercion": "Arithmetic operators require statically numeric operands",
        "no-any": "Explicit any is forbidden",
        "no-non-null-assertion": "Non-null assertions are forbidden",
        "no-parameter-mutation": "Function parameter bindings must not be reassigned or updated"
      };
      constructor(tsconfigPath) {
        (0, lll_lll_12.Spec)("Initializes reporter root path from tsconfig location.");
        this.projectRoot = path.dirname(tsconfigPath);
      }
      groupDiagnosticsByRuleCode(results) {
        const grouped = /* @__PURE__ */ new Map();
        for (const diagnostic of results) {
          const ruleCode = diagnostic.ruleCode;
          if (!grouped.has(ruleCode)) {
            grouped.set(ruleCode, []);
          }
          const groupedDiagnostics = grouped.get(ruleCode);
          if (groupedDiagnostics !== void 0) {
            groupedDiagnostics.push(diagnostic);
          }
        }
        return grouped;
      }
      print(results, options = {}) {
        const suppressSuccessMessage = options.suppressSuccessMessage === true;
        if (results.length === 0) {
          if (!suppressSuccessMessage) {
            console.log("\u2705 No issues found.");
          }
          return;
        }
        const notices = results.filter((r) => r.severity === "notice");
        const issues = results.filter((r) => r.severity !== "notice");
        const hasErrors = results.some((r) => r.severity === "error");
        if (notices.length > 0) {
          this.printGrouped(notices, "notice");
        }
        if (issues.length > 0) {
          this.printGrouped(issues);
        }
        if (!hasErrors && !suppressSuccessMessage) {
          console.log("\n\u2705 No issues found.");
        }
      }
      printGrouped(results, forcedSeverity) {
        const grouped = this.groupDiagnosticsByRuleCode(results);
        for (const [ruleCode, diagnostics] of grouped) {
          const severity = forcedSeverity ?? diagnostics[0].severity;
          const baseDescription = ResultReporter_1.RULE_DESCRIPTIONS[ruleCode] || ruleCode;
          const coverageDebtMatch = ruleCode === "test-coverage" ? diagnostics[0]?.message.match(/^test coverage debt\s+([0-9]+(?:\.[0-9]+)?)%:/i) : null;
          const descriptionBase = coverageDebtMatch !== null ? `${baseDescription} ${coverageDebtMatch[1]}%` : baseDescription;
          const description = ResultReporter_1.isBreadthOrSizeRuleCode(ruleCode) ? `${descriptionBase} [breadthSummary]` : descriptionBase;
          console.log(`
${this.getSeverityPrefix(severity)} ${severity.toUpperCase()}: ${description}`);
          const byFile = /* @__PURE__ */ new Map();
          for (const diag of diagnostics) {
            if (!byFile.has(diag.file)) {
              byFile.set(diag.file, []);
            }
            const fileDiagnostics = byFile.get(diag.file);
            if (fileDiagnostics !== void 0) {
              fileDiagnostics.push(diag);
            }
          }
          const indent = `  `;
          for (const [file, fileDiags] of byFile) {
            const relativePath = path.relative(this.projectRoot, file);
            const single = fileDiags.length === 1;
            if (!single) {
              console.log(`${indent}${relativePath}`);
            }
            for (const diag of fileDiags) {
              const displayMessage = ruleCode === "test-coverage" ? diag.message.replace(/^test coverage debt\s+[0-9]+(?:\.[0-9]+)?%:\s*/i, "") : diag.message || "";
              const markedDisplayMessage = ResultReporter_1.isBreadthOrSizeRuleCode(ruleCode) ? `${displayMessage} [breadthDetail]` : displayMessage;
              const shouldPrintLine = diag.line !== void 0 && !ResultReporter_1.shouldHideDiagnosticLine(ruleCode, diag.line);
              const locationPrefix = shouldPrintLine ? single ? `${indent}${relativePath}:${diag.line}` : `${indent}${indent}line ${diag.line}` : single ? ruleCode === "test-coverage" && file === "project" ? `${indent}` : `${indent}${relativePath}` : `${indent}${indent}`;
              console.log(`${locationPrefix} ${markedDisplayMessage}`);
            }
          }
        }
      }
      static isBreadthOrSizeRuleCode(ruleCode) {
        return ruleCode === "folder-too-many-files" || ruleCode === "folder-too-many-folders" || ruleCode === "file-too-long" || ruleCode === "method-too-long";
      }
      static shouldHideDiagnosticLine(ruleCode, line) {
        return ResultReporter_1.isBreadthOrSizeRuleCode(ruleCode) && line === 1;
      }
      getSeverityPrefix(severity) {
        if (severity === "error") {
          return "\u274C";
        }
        if (severity === "warning") {
          return "\u26A0\uFE0F";
        }
        if (severity === "notice") {
          return "\u2139\uFE0F";
        }
        return "\u2022";
      }
    };
    exports2.ResultReporter = ResultReporter;
    __decorate2([
      (0, lll_lll_12.Spec)("Groups diagnostics by their rule code for organized reporting."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array]),
      __metadata2("design:returntype", Map)
    ], ResultReporter.prototype, "groupDiagnosticsByRuleCode", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Pretty prints results in grouped format without ANSI colors."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array, Object]),
      __metadata2("design:returntype", void 0)
    ], ResultReporter.prototype, "print", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Prints grouped diagnostics with optional forced severity."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array, String]),
      __metadata2("design:returntype", void 0)
    ], ResultReporter.prototype, "printGrouped", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Maps severities to plain-text emoji prefixes."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], ResultReporter.prototype, "getSeverityPrefix", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a rule code represents breadth or size limits that unlock refactor tools."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], ResultReporter, "isBreadthOrSizeRuleCode", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Hides synthetic line numbers from breadth and size diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Number]),
      __metadata2("design:returntype", Boolean)
    ], ResultReporter, "shouldHideDiagnosticLine", null);
    exports2.ResultReporter = ResultReporter = ResultReporter_1 = __decorate2([
      (0, lll_lll_12.Spec)("Formats and prints diagnostics to the console."),
      __metadata2("design:paramtypes", [String])
    ], ResultReporter);
  }
});

// dist-many/rules/documentation/MustHaveDescRule.lll.js
var require_MustHaveDescRule_lll = __commonJS({
  "dist-many/rules/documentation/MustHaveDescRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MustHaveDescRule = void 0;
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var MustHaveDescRule = class MustHaveDescRule {
      static getRule() {
        return {
          id: "R3",
          title: "Must have description in spec",
          run(sourceFile) {
            const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(sourceFile);
            if (!exportedClass)
              return [];
            const diagnostics = [];
            const classSpecDecorator = BaseRule_lll_12.BaseRule.findDecorator(exportedClass, "Spec");
            if (classSpecDecorator !== void 0) {
              const args = classSpecDecorator.getArguments();
              const hasDescription = args.length >= 1 && args[0] !== void 0 && args[0].getText().trim().length > 0;
              if (!hasDescription) {
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), "Missing description in class @Spec decorator. Provide a description string for @Spec.", "missing-desc-class"));
              }
            }
            const methods = exportedClass.getMethods();
            for (const method of methods) {
              const methodSpecDecorator = BaseRule_lll_12.BaseRule.findDecorator(method, "Spec");
              if (methodSpecDecorator !== void 0) {
                const args = methodSpecDecorator.getArguments();
                const hasDescription = args.length >= 1 && args[0] !== void 0 && args[0].getText().trim().length > 0;
                if (!hasDescription) {
                  diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Missing description in method @Spec decorator for '${method.getName()}'. Provide a description string for @Spec.`, "missing-desc-method", method.getStartLineNumber()));
                }
              }
            }
            return diagnostics;
          }
        };
      }
    };
    exports2.MustHaveDescRule = MustHaveDescRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MustHaveDescRule, "getRule", null);
    exports2.MustHaveDescRule = MustHaveDescRule = __decorate2([
      (0, lll_lll_12.Spec)("Verifies that each class has a description in @Spec decorator.")
    ], MustHaveDescRule);
  }
});

// dist-many/rules/documentation/MustHaveExplicitReturnTypeRule.lll.js
var require_MustHaveExplicitReturnTypeRule_lll = __commonJS({
  "dist-many/rules/documentation/MustHaveExplicitReturnTypeRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MustHaveExplicitReturnTypeRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MustHaveExplicitReturnTypeRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var MustHaveExplicitReturnTypeRule = MustHaveExplicitReturnTypeRule_1 = class MustHaveExplicitReturnTypeRule {
      static getRule() {
        return {
          id: "R6",
          title: "Must declare explicit return types for value-returning declarations",
          run(sourceFile) {
            const diagnostics = [];
            const methods = sourceFile.getClasses().flatMap((classDeclaration) => classDeclaration.getMethods());
            for (const method of methods) {
              MustHaveExplicitReturnTypeRule_1.addMissingTypeDiagnostic(sourceFile.getFilePath(), method.getName(), method, diagnostics);
            }
            for (const fn of sourceFile.getFunctions()) {
              const functionName = fn.getName() ?? "<anonymous>";
              MustHaveExplicitReturnTypeRule_1.addMissingTypeDiagnostic(sourceFile.getFilePath(), functionName, fn, diagnostics);
            }
            return diagnostics;
          }
        };
      }
      static addMissingTypeDiagnostic(filePath, declarationName, declaration, diagnostics) {
        if (!MustHaveExplicitReturnTypeRule_1.returnsValue(declaration)) {
          return;
        }
        if (declaration.getReturnTypeNode() !== void 0) {
          return;
        }
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Declaration '${declarationName}' returns a value but does not declare an explicit return type. Add ': TypeName'.`, "missing-explicit-return-type", declaration.getStartLineNumber()));
      }
      static returnsValue(declaration) {
        const body = declaration.getBody();
        if (!body) {
          return false;
        }
        const returnStatements = body.getDescendantsOfKind(ts_morph_1.SyntaxKind.ReturnStatement);
        for (const returnStatement of returnStatements) {
          if (!MustHaveExplicitReturnTypeRule_1.belongsToDeclaration(returnStatement, declaration)) {
            continue;
          }
          if (returnStatement.getExpression() !== void 0) {
            return true;
          }
        }
        return false;
      }
      static belongsToDeclaration(returnStatement, declaration) {
        const nearestFunctionLike = returnStatement.getFirstAncestor((ancestor) => ts_morph_1.Node.isMethodDeclaration(ancestor) || ts_morph_1.Node.isFunctionDeclaration(ancestor) || ts_morph_1.Node.isFunctionExpression(ancestor) || ts_morph_1.Node.isArrowFunction(ancestor));
        return nearestFunctionLike === declaration;
      }
    };
    exports2.MustHaveExplicitReturnTypeRule = MustHaveExplicitReturnTypeRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MustHaveExplicitReturnTypeRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Adds a diagnostic when a value-returning declaration omits its explicit return type."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, Function, Array]),
      __metadata2("design:returntype", void 0)
    ], MustHaveExplicitReturnTypeRule, "addMissingTypeDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Determines whether a declared method or function returns a value expression."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], MustHaveExplicitReturnTypeRule, "returnsValue", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a return statement belongs to the current declaration rather than a nested callback."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], MustHaveExplicitReturnTypeRule, "belongsToDeclaration", null);
    exports2.MustHaveExplicitReturnTypeRule = MustHaveExplicitReturnTypeRule = MustHaveExplicitReturnTypeRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Verifies that value-returning declared methods and functions use explicit return type annotations.")
    ], MustHaveExplicitReturnTypeRule);
  }
});

// dist-many/rules/documentation/MustHaveSpecHeaderRule.lll.js
var require_MustHaveSpecHeaderRule_lll = __commonJS({
  "dist-many/rules/documentation/MustHaveSpecHeaderRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MustHaveSpecHeaderRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MustHaveSpecHeaderRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var MustHaveSpecHeaderRule = MustHaveSpecHeaderRule_1 = class MustHaveSpecHeaderRule {
      static getRule() {
        return {
          id: "R2",
          title: "Must have spec decorator",
          run(sourceFile) {
            const diagnostics = [];
            const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(sourceFile);
            if (exportedClass !== void 0) {
              const hasClassSpec = BaseRule_lll_12.BaseRule.hasDecorator(exportedClass, "Spec");
              if (!hasClassSpec) {
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), "Missing @Spec decorator on class. @Spec expects lll string parameter: description.", "missing-spec-class"));
              }
              const methods = exportedClass.getMethods();
              const isTestFile = FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(sourceFile.getFilePath());
              const constructorDeclaration = exportedClass.getConstructors()[0];
              if (constructorDeclaration !== void 0) {
                const body = constructorDeclaration.getBody();
                const statements2 = body !== void 0 && ts_morph_1.Node.isBlock(body) ? body.getStatements() : [];
                const firstStatement = statements2[0];
                const firstNonLeadingSpecStatement = statements2.find((statement, index) => {
                  return index > 0 && MustHaveSpecHeaderRule_1.isSpecCallStatement(statement);
                });
                if (firstNonLeadingSpecStatement !== void 0 && !MustHaveSpecHeaderRule_1.isSpecCallStatement(firstStatement)) {
                  diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), 'Constructor Spec("...") call is optional, but when present it must be the first constructor statement. All other methods must use @Spec as a decorator.', "missing-spec-method", firstNonLeadingSpecStatement.getStartLineNumber()));
                }
              }
              for (const method of methods) {
                const methodName = method.getName();
                const isRenderMethod = typeof method.isStatic === "function" && !method.isStatic() && methodName === "render";
                if (isTestFile && isRenderMethod) {
                  continue;
                }
                const hasMethodSpec = BaseRule_lll_12.BaseRule.hasDecorator(method, "Spec");
                const hasScenarioDecorator = BaseRule_lll_12.BaseRule.hasDecorator(method, "Scenario");
                if (!hasMethodSpec && !hasScenarioDecorator) {
                  diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Missing @Spec decorator on method '${methodName}'. @Spec expects lll parameter description.`, "missing-spec-method", method.getStartLineNumber()));
                }
              }
            }
            const statements = sourceFile.getStatements();
            for (let index = 0; index < statements.length; index++) {
              const statement = statements[index];
              const typeAlias = statement.asKind(ts_morph_1.SyntaxKind.TypeAliasDeclaration);
              if (!typeAlias || !typeAlias.isExported()) {
                continue;
              }
              if (!MustHaveSpecHeaderRule_1.requiresSpecForTypeAlias(typeAlias)) {
                continue;
              }
              const previousStatement = index > 0 ? statements[index - 1] : void 0;
              if (!MustHaveSpecHeaderRule_1.isSpecCallStatement(previousStatement)) {
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Complex exported type '${typeAlias.getName()}' must be immediately preceded by Spec("...") call.`, "missing-spec-type", typeAlias.getStartLineNumber()));
              }
            }
            return diagnostics;
          }
        };
      }
      static isSpecCallStatement(statement) {
        if (!statement || !ts_morph_1.Node.isExpressionStatement(statement)) {
          return false;
        }
        const expression = statement.getExpression();
        if (!ts_morph_1.Node.isCallExpression(expression)) {
          return false;
        }
        const callee = expression.getExpression();
        return ts_morph_1.Node.isIdentifier(callee) && ["Spec", "spec"].includes(callee.getText());
      }
      static requiresSpecForTypeAlias(typeAlias) {
        const lineCount = typeAlias.getEndLineNumber() - typeAlias.getStartLineNumber() + 1;
        const typeNode = typeAlias.getTypeNode();
        const memberCount = typeNode !== void 0 && ts_morph_1.Node.isTypeLiteral(typeNode) ? typeNode.getMembers().length : 0;
        return lineCount > 10 || memberCount > 10;
      }
    };
    exports2.MustHaveSpecHeaderRule = MustHaveSpecHeaderRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MustHaveSpecHeaderRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when a statement is a direct top-level Spec(...) or spec(...) call."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], MustHaveSpecHeaderRule, "isSpecCallStatement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when an exported type alias is complex enough to require Spec(...) call."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], MustHaveSpecHeaderRule, "requiresSpecForTypeAlias", null);
    exports2.MustHaveSpecHeaderRule = MustHaveSpecHeaderRule = MustHaveSpecHeaderRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Verifies that each class and method has a @Spec decorator.")
    ], MustHaveSpecHeaderRule);
  }
});

// dist-many/rules/limits/MaxFileLengthRule.lll.js
var require_MaxFileLengthRule_lll = __commonJS({
  "dist-many/rules/limits/MaxFileLengthRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaxFileLengthRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MaxFileLengthRule = void 0;
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var BreadthRuleLimits_1 = require_BreadthRuleLimits();
    var MaxFileLengthRule = class MaxFileLengthRule {
      static {
        MaxFileLengthRule_1 = this;
      }
      static MAX_DISPLAYED_EXTRACTION_CANDIDATES = 3;
      static get MAX_LINES() {
        return BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxFileLines;
      }
      static getRule() {
        return {
          id: "R7",
          title: "Max file length",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".lll.ts")) {
              return [];
            }
            const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
            if (variant !== null && variant.isTest) {
              return [];
            }
            const lineCount = sourceFile.getEndLineNumber();
            const maxLines = MaxFileLengthRule_1.MAX_LINES;
            if (lineCount > maxLines) {
              return [
                BaseRule_lll_12.BaseRule.createError(filePath, MaxFileLengthRule_1.buildDiagnosticMessage(sourceFile, lineCount, maxLines), "file-too-long", 1)
              ];
            }
            return [];
          }
        };
      }
      static buildDiagnosticMessage(sourceFile, lineCount, maxLines) {
        const overflow = lineCount - maxLines;
        const lines = [
          `Found ${lineCount} lines (max allowed: ${maxLines}; reduce by at least ${overflow} lines).`
        ];
        const candidates = this.collectExtractionCandidates(sourceFile);
        if (candidates.length === 0) {
          lines.push("No obvious class members were found to move. Inspect the file manually before editing.");
          return lines.join("\n");
        }
        lines.push("Suggested move_members extraction candidates:");
        const visibleCandidates = candidates.slice(0, this.MAX_DISPLAYED_EXTRACTION_CANDIDATES);
        for (const candidate of visibleCandidates) {
          lines.push(`- ${candidate}`);
        }
        const hiddenCandidateCount = candidates.length - visibleCandidates.length;
        if (hiddenCandidateCount > 0) {
          const suffix = hiddenCandidateCount === 1 ? "candidate" : "candidates";
          lines.push(`... and ${hiddenCandidateCount} more ${suffix}.`);
        }
        lines.push("Prefer static members first; static properties and static methods are movable. For instance methods, move their member dependencies in the same batch or let move_members create a focused destination class.");
        return lines.join("\n");
      }
      static collectExtractionCandidates(sourceFile) {
        const candidates = [];
        for (const classDecl of sourceFile.getClasses()) {
          const className = classDecl.getName() ?? "(anonymous)";
          for (const method of classDecl.getMethods()) {
            candidates.push({
              label: this.formatMethodCandidate(className, method),
              sortWeight: this.getMethodCandidateWeight(method)
            });
          }
          for (const property of classDecl.getProperties()) {
            if (!property.isStatic()) {
              continue;
            }
            candidates.push({
              label: this.formatPropertyCandidate(className, property),
              sortWeight: this.getPropertyCandidateWeight(property)
            });
          }
        }
        return candidates.sort((left, right) => right.sortWeight - left.sortWeight || left.label.localeCompare(right.label)).map((candidate) => candidate.label);
      }
      static formatMethodCandidate(className, method) {
        const memberKind = method.isStatic() ? "static method" : "instance method";
        return `${memberKind} ${className}.${method.getName()} (${this.getNodeLineCount(method)} lines, starts line ${method.getStartLineNumber()})`;
      }
      static formatPropertyCandidate(className, property) {
        return `static property ${className}.${property.getName()} (${this.getNodeLineCount(property)} lines, starts line ${property.getStartLineNumber()})`;
      }
      static getMethodCandidateWeight(method) {
        const staticBonus = method.isStatic() ? 1e4 : 0;
        return staticBonus + this.getNodeLineCount(method);
      }
      static getPropertyCandidateWeight(property) {
        return 5e3 + this.getNodeLineCount(property);
      }
      static getNodeLineCount(node) {
        return node.getEndLineNumber() - node.getStartLineNumber() + 1;
      }
    };
    exports2.MaxFileLengthRule = MaxFileLengthRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MaxFileLengthRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a file-length diagnostic with concrete extraction candidates for LLM-assisted refactoring."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Number, Number]),
      __metadata2("design:returntype", String)
    ], MaxFileLengthRule, "buildDiagnosticMessage", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects compact member descriptions that are useful as first-pass extraction targets."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], MaxFileLengthRule, "collectExtractionCandidates", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Formats one method candidate with static/instance and line-count details."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Function]),
      __metadata2("design:returntype", String)
    ], MaxFileLengthRule, "formatMethodCandidate", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Formats one static property candidate with line-count details."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Function]),
      __metadata2("design:returntype", String)
    ], MaxFileLengthRule, "formatPropertyCandidate", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Ranks methods by likely extraction value and move safety."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Number)
    ], MaxFileLengthRule, "getMethodCandidateWeight", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Ranks static properties below static methods but above tiny instance methods."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Number)
    ], MaxFileLengthRule, "getPropertyCandidateWeight", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the source span length for one class member."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Number)
    ], MaxFileLengthRule, "getNodeLineCount", null);
    exports2.MaxFileLengthRule = MaxFileLengthRule = MaxFileLengthRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Enforces a maximum file length in lines for non-test EvidyTS files.")
    ], MaxFileLengthRule);
  }
});

// dist-many/rules/limits/MaxFolderBreadthRule.lll.js
var require_MaxFolderBreadthRule_lll = __commonJS({
  "dist-many/rules/limits/MaxFolderBreadthRule.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaxFolderBreadthRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MaxFolderBreadthRule = void 0;
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var BreadthRuleLimits_1 = require_BreadthRuleLimits();
    var MaxFolderBreadthRule = MaxFolderBreadthRule_1 = class MaxFolderBreadthRule {
      static get MAX_FILES() {
        return BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxFilesPerFolder;
      }
      static get MAX_FOLDERS() {
        return BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxSubfoldersPerFolder;
      }
      static getRule() {
        return {
          id: "R9",
          title: "Max folder breadth",
          run(sourceFile, context) {
            const filePath = sourceFile.getFilePath();
            if (!MaxFolderBreadthRule_1.isCountedSourceFile(filePath)) {
              return [];
            }
            if (MaxFolderBreadthRule_1.isTestFile(filePath)) {
              return [];
            }
            const loadedRelevantFiles = MaxFolderBreadthRule_1.getLoadedRelevantFiles(sourceFile);
            if (loadedRelevantFiles.length === 0) {
              return [];
            }
            if (!MaxFolderBreadthRule_1.shouldRunForSourceFile(sourceFile.getFilePath(), loadedRelevantFiles)) {
              return [];
            }
            const rootDir = MaxFolderBreadthRule_1.getSourceRootDir(context, loadedRelevantFiles);
            const sourceFiles = MaxFolderBreadthRule_1.scanPhysicalSourceFiles(rootDir);
            const folderInfo = MaxFolderBreadthRule_1.buildFolderInfo(sourceFiles, rootDir);
            const diagnostics = [];
            const maxFiles = MaxFolderBreadthRule_1.MAX_FILES;
            const maxFolders = MaxFolderBreadthRule_1.MAX_FOLDERS;
            for (const [dir, info] of folderInfo.entries()) {
              const rel = path.relative(rootDir, dir) || ".";
              if (info.files > maxFiles) {
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(dir, `Folder '${rel}' contains ${info.files} source files (max allowed: ${maxFiles}).`, "folder-too-many-files", 1));
              }
              if (info.children.size > maxFolders) {
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(dir, `Folder '${rel}' contains ${info.children.size} subfolders (max allowed: ${maxFolders}).`, "folder-too-many-folders", 1));
              }
            }
            return diagnostics;
          }
        };
      }
      static isDotFolder(dir) {
        const base = path.basename(dir);
        return base.startsWith(".");
      }
      static isWithinRoot(dir, root) {
        if (dir === root) {
          return true;
        }
        const relative = path.relative(root, dir);
        return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
      }
      static shouldRunForSourceFile(currentFilePath, relevantFiles) {
        const [firstFile] = relevantFiles.map((file) => file.getFilePath()).sort((left, right) => left.localeCompare(right));
        return firstFile === currentFilePath;
      }
      static getLoadedRelevantFiles(sourceFile) {
        return sourceFile.getProject().getSourceFiles().filter((f) => {
          const p = f.getFilePath();
          return MaxFolderBreadthRule_1.isCountedSourceFile(p) && !MaxFolderBreadthRule_1.isTestFile(p);
        });
      }
      static getSourceRootDir(context, relevantFiles) {
        if (context?.entrySourceRootDir !== null && context?.entrySourceRootDir !== void 0) {
          return path.resolve(context.entrySourceRootDir);
        }
        const [firstFile] = relevantFiles.map((file) => path.dirname(file.getFilePath())).sort((left, right) => left.localeCompare(right));
        return firstFile !== void 0 ? path.resolve(firstFile) : process.cwd();
      }
      static scanPhysicalSourceFiles(rootDir) {
        if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
          return [];
        }
        const files = [];
        const visit = (dir) => {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              if (!MaxFolderBreadthRule_1.isDotFolder(fullPath)) {
                visit(fullPath);
              }
              continue;
            }
            if (!entry.isFile()) {
              continue;
            }
            if (MaxFolderBreadthRule_1.isCountedSourceFile(fullPath) && !MaxFolderBreadthRule_1.isTestFile(fullPath)) {
              files.push(path.resolve(fullPath));
            }
          }
        };
        visit(path.resolve(rootDir));
        return files.sort((left, right) => left.localeCompare(right));
      }
      static buildFolderInfo(sourceFiles, rootDir) {
        const root = path.resolve(rootDir);
        const folderInfo = /* @__PURE__ */ new Map();
        const ensureFolder = (dir) => {
          if (!folderInfo.has(dir)) {
            folderInfo.set(dir, { files: 0, children: /* @__PURE__ */ new Set() });
          }
        };
        ensureFolder(root);
        for (const sourceFile of sourceFiles) {
          const dir = path.dirname(sourceFile);
          if (!MaxFolderBreadthRule_1.isWithinRoot(dir, root)) {
            continue;
          }
          ensureFolder(dir);
          const info = folderInfo.get(dir);
          if (info !== void 0) {
            info.files++;
          }
          let current = dir;
          while (current !== root) {
            const parent = path.dirname(current);
            if (!MaxFolderBreadthRule_1.isWithinRoot(parent, root)) {
              break;
            }
            ensureFolder(parent);
            const parentInfo = folderInfo.get(parent);
            if (parentInfo !== void 0 && !MaxFolderBreadthRule_1.isDotFolder(current)) {
              parentInfo.children.add(current);
            }
            current = parent;
          }
        }
        return folderInfo;
      }
      static isCountedSourceFile(filePath) {
        return filePath.endsWith(".ts") && !filePath.endsWith(".d.ts");
      }
      static isTestFile(filePath) {
        const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
        if (variant !== null) {
          return variant.isTest;
        }
        return filePath.endsWith(".test.ts");
      }
    };
    exports2.MaxFolderBreadthRule = MaxFolderBreadthRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MaxFolderBreadthRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a directory name represents a dot-prefixed system folder."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], MaxFolderBreadthRule, "isDotFolder", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Verifies that a directory is within the computed root boundary."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String]),
      __metadata2("design:returntype", Boolean)
    ], MaxFolderBreadthRule, "isWithinRoot", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Determines whether the current file should own project-wide folder breadth diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Array]),
      __metadata2("design:returntype", Boolean)
    ], MaxFolderBreadthRule, "shouldRunForSourceFile", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Finds graph-loaded non-test source files used only to choose one diagnostic owner."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], MaxFolderBreadthRule, "getLoadedRelevantFiles", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Chooses the physical filesystem root for folder breadth counting."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Array]),
      __metadata2("design:returntype", String)
    ], MaxFolderBreadthRule, "getSourceRootDir", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Recursively scans physical source files under the entry-derived source root."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Array)
    ], MaxFolderBreadthRule, "scanPhysicalSourceFiles", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds direct folder file and source-child counts from physical source files."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array, String]),
      __metadata2("design:returntype", Map)
    ], MaxFolderBreadthRule, "buildFolderInfo", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the file is a TypeScript source file counted by folder breadth."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], MaxFolderBreadthRule, "isCountedSourceFile", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the file path represents a test file that should be excluded from breadth counts."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], MaxFolderBreadthRule, "isTestFile", null);
    exports2.MaxFolderBreadthRule = MaxFolderBreadthRule = MaxFolderBreadthRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Enforces maximum counts of physical source files and subfolders per directory under the entry source root.")
    ], MaxFolderBreadthRule);
  }
});

// dist-many/rules/limits/MaxMethodLengthRule.lll.js
var require_MaxMethodLengthRule_lll = __commonJS({
  "dist-many/rules/limits/MaxMethodLengthRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaxMethodLengthRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MaxMethodLengthRule = void 0;
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var BreadthRuleLimits_1 = require_BreadthRuleLimits();
    var MaxMethodLengthRule = MaxMethodLengthRule_1 = class MaxMethodLengthRule {
      static get MAX_LINES() {
        return BreadthRuleLimits_1.BreadthRuleLimits.getConfig().maxMethodBodyLines;
      }
      static getRule() {
        return {
          id: "R8",
          title: "Max method length",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".lll.ts")) {
              return [];
            }
            const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
            if (variant !== null && variant.isTest) {
              return [];
            }
            const diagnostics = [];
            const classes = sourceFile.getClasses();
            classes.forEach((classDecl) => {
              const methods = classDecl.getMethods();
              methods.forEach((method) => {
                const body = method.getBody();
                if (body !== void 0) {
                  const lineCount = body.getEndLineNumber() - body.getStartLineNumber() + 1;
                  const maxLines = MaxMethodLengthRule_1.MAX_LINES;
                  if (lineCount > maxLines) {
                    diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Method '${method.getName()}' has ${lineCount} lines (max allowed: ${maxLines}).`, "method-too-long", body.getStartLineNumber()));
                  }
                }
              });
            });
            return diagnostics;
          }
        };
      }
    };
    exports2.MaxMethodLengthRule = MaxMethodLengthRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MaxMethodLengthRule, "getRule", null);
    exports2.MaxMethodLengthRule = MaxMethodLengthRule = MaxMethodLengthRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Enforces a maximum method body length in lines for all methods in EvidyTS classes.")
    ], MaxMethodLengthRule);
  }
});

// dist-many/rules/safety/types/NoAnyRule.lll.js
var require_NoAnyRule_lll = __commonJS({
  "dist-many/rules/safety/types/NoAnyRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoAnyRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoAnyRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoAnyRule = NoAnyRule_1 = class NoAnyRule {
      static getRule() {
        return {
          id: "R14",
          title: "No any",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const anyKeywords = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.AnyKeyword);
            for (const anyKeyword of anyKeywords) {
              diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, NoAnyRule_1.buildMessage(anyKeyword), "no-any", anyKeyword.getStartLineNumber()));
            }
            return diagnostics;
          }
        };
      }
      static buildMessage(anyKeyword) {
        const parentKind = anyKeyword.getParentOrThrow().getKind();
        const context = parentKind === ts_morph_1.SyntaxKind.TypeReference ? "type reference" : parentKind === ts_morph_1.SyntaxKind.TypeAssertionExpression ? "type assertion" : parentKind === ts_morph_1.SyntaxKind.AsExpression ? "'as any' cast" : parentKind === ts_morph_1.SyntaxKind.Parameter ? "parameter type" : parentKind === ts_morph_1.SyntaxKind.FunctionType ? "function type" : parentKind === ts_morph_1.SyntaxKind.PropertyDeclaration ? "property type" : parentKind === ts_morph_1.SyntaxKind.VariableDeclaration ? "variable type" : parentKind === ts_morph_1.SyntaxKind.TypeAliasDeclaration ? "type alias" : "type annotation";
        return `Explicit 'any' is forbidden in ${context}. Use a concrete type, a generic constraint, or 'unknown' with narrowing.`;
      }
    };
    exports2.NoAnyRule = NoAnyRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoAnyRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a diagnostic message that describes the explicit any usage shape."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", String)
    ], NoAnyRule, "buildMessage", null);
    exports2.NoAnyRule = NoAnyRule = NoAnyRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids explicit any type usage anywhere in supported source files.")
    ], NoAnyRule);
  }
});

// dist-many/rules/safety/NoAssignmentInConditionsRule.lll.js
var require_NoAssignmentInConditionsRule_lll = __commonJS({
  "dist-many/rules/safety/NoAssignmentInConditionsRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoAssignmentInConditionsRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoAssignmentInConditionsRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoAssignmentInConditionsRule = class NoAssignmentInConditionsRule {
      static {
        NoAssignmentInConditionsRule_1 = this;
      }
      static condition_kind_values = ["if", "while", "do while", "for", "ternary"];
      static getRule() {
        return {
          id: "R10",
          title: "No assignments inside conditions",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const conditionContexts = NoAssignmentInConditionsRule_1.collectConditionContexts(sourceFile);
            for (const conditionContext of conditionContexts) {
              const assignments = NoAssignmentInConditionsRule_1.findAssignmentsInCondition(conditionContext.expression);
              for (const assignment of assignments) {
                const operator = assignment.getOperatorToken().getText();
                diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Assignments are forbidden inside ${conditionContext.kind} conditions. Found '${operator}'. Move the assignment before the condition and keep the condition as a pure boolean check.`, "assignment-in-conditions", assignment.getStartLineNumber()));
              }
            }
            return diagnostics;
          }
        };
      }
      static collectConditionContexts(sourceFile) {
        const conditions = [];
        for (const ifStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.IfStatement)) {
          conditions.push(NoAssignmentInConditionsRule_1.createConditionContext("if", ifStatement));
        }
        for (const whileStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.WhileStatement)) {
          conditions.push(NoAssignmentInConditionsRule_1.createConditionContext("while", whileStatement));
        }
        for (const doStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.DoStatement)) {
          conditions.push(NoAssignmentInConditionsRule_1.createConditionContext("do while", doStatement));
        }
        for (const forStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ForStatement)) {
          const expression = forStatement.getCondition();
          if (expression !== void 0) {
            conditions.push({ kind: "for", expression });
          }
        }
        for (const conditionalExpression of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ConditionalExpression)) {
          conditions.push(NoAssignmentInConditionsRule_1.createConditionContext("ternary", conditionalExpression));
        }
        return conditions;
      }
      static createConditionContext(kind, node) {
        const expression = ts_morph_1.Node.isConditionalExpression(node) ? node.getCondition() : node.getExpression();
        return {
          kind,
          expression
        };
      }
      static findAssignmentsInCondition(condition) {
        const binaryExpressions = NoAssignmentInConditionsRule_1.collectBinaryExpressions(condition);
        return binaryExpressions.filter((binaryExpression) => {
          const operatorKind = binaryExpression.getOperatorToken().getKind();
          return NoAssignmentInConditionsRule_1.isAssignmentOperator(operatorKind);
        });
      }
      static collectBinaryExpressions(expression) {
        const binaryExpressions = [];
        if (ts_morph_1.Node.isBinaryExpression(expression)) {
          binaryExpressions.push(expression);
        }
        binaryExpressions.push(...expression.getDescendantsOfKind(ts_morph_1.SyntaxKind.BinaryExpression));
        return binaryExpressions;
      }
      static isAssignmentOperator(kind) {
        return kind === ts_morph_1.SyntaxKind.EqualsToken || kind === ts_morph_1.SyntaxKind.PlusEqualsToken || kind === ts_morph_1.SyntaxKind.MinusEqualsToken || kind === ts_morph_1.SyntaxKind.AsteriskEqualsToken || kind === ts_morph_1.SyntaxKind.AsteriskAsteriskEqualsToken || kind === ts_morph_1.SyntaxKind.SlashEqualsToken || kind === ts_morph_1.SyntaxKind.PercentEqualsToken || kind === ts_morph_1.SyntaxKind.LessThanLessThanEqualsToken || kind === ts_morph_1.SyntaxKind.GreaterThanGreaterThanEqualsToken || kind === ts_morph_1.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken || kind === ts_morph_1.SyntaxKind.AmpersandEqualsToken || kind === ts_morph_1.SyntaxKind.BarEqualsToken || kind === ts_morph_1.SyntaxKind.CaretEqualsToken || kind === ts_morph_1.SyntaxKind.BarBarEqualsToken || kind === ts_morph_1.SyntaxKind.AmpersandAmpersandEqualsToken || kind === ts_morph_1.SyntaxKind.QuestionQuestionEqualsToken;
      }
    };
    exports2.NoAssignmentInConditionsRule = NoAssignmentInConditionsRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoAssignmentInConditionsRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects condition expressions from supported control-flow and ternary positions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoAssignmentInConditionsRule, "collectConditionContexts", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a condition context from a supported condition-bearing node."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Function]),
      __metadata2("design:returntype", Object)
    ], NoAssignmentInConditionsRule, "createConditionContext", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns assignment binary expressions contained in the condition subtree."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoAssignmentInConditionsRule, "findAssignmentsInCondition", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects the current expression when binary plus all nested binary expressions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoAssignmentInConditionsRule, "collectBinaryExpressions", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a binary operator token is an assignment operator."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number]),
      __metadata2("design:returntype", Boolean)
    ], NoAssignmentInConditionsRule, "isAssignmentOperator", null);
    exports2.NoAssignmentInConditionsRule = NoAssignmentInConditionsRule = NoAssignmentInConditionsRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids assignment expressions anywhere inside supported condition expressions.")
    ], NoAssignmentInConditionsRule);
  }
});

// dist-many/rules/safety/promises/NoFloatingPromisesRule.lll.js
var require_NoFloatingPromisesRule_lll = __commonJS({
  "dist-many/rules/safety/promises/NoFloatingPromisesRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoFloatingPromisesRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoFloatingPromisesRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoFloatingPromisesRule = class NoFloatingPromisesRule {
      static {
        NoFloatingPromisesRule_1 = this;
      }
      static async_function_kinds = ["method", "function", "function-expression", "arrow-function"];
      static tracked_value_kinds = ["promise", "promise-collection"];
      static getRule() {
        return {
          id: "R18",
          title: "No floating promises in async code",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const asyncFunctions = NoFloatingPromisesRule_1.collectAsyncFunctions(sourceFile);
            for (const asyncFunction of asyncFunctions) {
              diagnostics.push(...NoFloatingPromisesRule_1.validateAsyncFunction(filePath, asyncFunction));
            }
            return diagnostics;
          }
        };
      }
      static collectAsyncFunctions(sourceFile) {
        const asyncFunctions = [];
        const addIfAsync = (candidate) => {
          if (!candidate.isAsync()) {
            return;
          }
          if (candidate.getBody() === void 0) {
            return;
          }
          asyncFunctions.push(candidate);
        };
        for (const methodDeclaration of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.MethodDeclaration)) {
          addIfAsync(methodDeclaration);
        }
        for (const functionDeclaration of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.FunctionDeclaration)) {
          addIfAsync(functionDeclaration);
        }
        for (const functionExpression of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.FunctionExpression)) {
          addIfAsync(functionExpression);
        }
        for (const arrowFunction of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ArrowFunction)) {
          addIfAsync(arrowFunction);
        }
        return asyncFunctions;
      }
      static validateAsyncFunction(filePath, asyncFunction) {
        const diagnostics = [];
        const trackedDeclarations = NoFloatingPromisesRule_1.collectTrackedDeclarations(asyncFunction);
        for (const trackedDeclaration of trackedDeclarations) {
          if (NoFloatingPromisesRule_1.isTrackedDeclarationHandled(trackedDeclaration.nameNode, asyncFunction)) {
            continue;
          }
          const kindLabel = trackedDeclaration.kind === "promise" ? "Promise value" : "Collection of promises";
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `${kindLabel} '${trackedDeclaration.nameNode.getText()}' floats inside async code. Await it, return it, pass it to Promise.all/Promise.allSettled/Promise.race/Promise.any, or explicitly discard it with 'void'.`, "no-floating-promises", trackedDeclaration.expression.getStartLineNumber()));
        }
        return diagnostics;
      }
      static collectTrackedDeclarations(asyncFunction) {
        const body = asyncFunction.getBody();
        if (body === void 0 || !ts_morph_1.Node.isBlock(body)) {
          return [];
        }
        const tracked = [];
        for (const variableDeclaration of body.getDescendantsOfKind(ts_morph_1.SyntaxKind.VariableDeclaration)) {
          if (!NoFloatingPromisesRule_1.belongsToFunction(variableDeclaration, asyncFunction)) {
            continue;
          }
          const nameNode = variableDeclaration.getNameNode();
          if (!ts_morph_1.Node.isIdentifier(nameNode)) {
            continue;
          }
          const initializer = variableDeclaration.getInitializer();
          if (initializer === void 0) {
            continue;
          }
          const trackedKind = NoFloatingPromisesRule_1.getTrackedValueKind(initializer);
          if (trackedKind === void 0) {
            continue;
          }
          tracked.push({
            expression: initializer,
            kind: trackedKind,
            nameNode
          });
        }
        return tracked;
      }
      static getTrackedValueKind(expression) {
        if (ts_morph_1.Node.isAwaitExpression(expression) || ts_morph_1.Node.isVoidExpression(expression)) {
          return void 0;
        }
        const type = expression.getType();
        if (NoFloatingPromisesRule_1.isPromiseLikeType(type, expression)) {
          return "promise";
        }
        if (NoFloatingPromisesRule_1.isPromiseCollectionType(type, expression)) {
          return "promise-collection";
        }
        if (ts_morph_1.Node.isArrayLiteralExpression(expression) && NoFloatingPromisesRule_1.arrayLiteralContainsPromiseLike(expression)) {
          return "promise-collection";
        }
        return void 0;
      }
      static isTrackedDeclarationHandled(nameNode, asyncFunction) {
        const references = nameNode.findReferencesAsNodes().filter((reference) => reference !== nameNode).filter((reference) => NoFloatingPromisesRule_1.belongsToFunction(reference, asyncFunction));
        if (references.length === 0) {
          return false;
        }
        return references.some((reference) => NoFloatingPromisesRule_1.isHandledReference(reference));
      }
      static isHandledReference(reference) {
        let current = reference;
        while (current !== void 0) {
          const parent = current.getParent();
          if (parent === void 0) {
            return false;
          }
          if (ts_morph_1.Node.isParenthesizedExpression(parent)) {
            current = parent;
            continue;
          }
          if (ts_morph_1.Node.isAwaitExpression(parent) || ts_morph_1.Node.isReturnStatement(parent) || ts_morph_1.Node.isVoidExpression(parent)) {
            return true;
          }
          if (ts_morph_1.Node.isCallExpression(parent) && NoFloatingPromisesRule_1.isExplicitPromiseHandlingCall(parent, current)) {
            return true;
          }
          if (ts_morph_1.Node.isArrayLiteralExpression(parent) && NoFloatingPromisesRule_1.isPromiseCollectionHandler(parent)) {
            return true;
          }
          if (ts_morph_1.Node.isSpreadElement(parent) || ts_morph_1.Node.isAsExpression(parent) || ts_morph_1.Node.isNonNullExpression(parent)) {
            current = parent;
            continue;
          }
          if (ts_morph_1.Node.isPropertyAccessExpression(parent)) {
            const grandParent = parent.getParent();
            if (grandParent !== void 0 && ts_morph_1.Node.isCallExpression(grandParent) && grandParent.getExpression() === parent) {
              current = parent;
              continue;
            }
            return false;
          }
          return false;
        }
        return false;
      }
      static isExplicitPromiseHandlingCall(callExpression, current) {
        if (NoFloatingPromisesRule_1.isPromiseCombinatorCall(callExpression) && callExpression.getArguments().includes(current)) {
          return true;
        }
        const callee = callExpression.getExpression();
        if (!ts_morph_1.Node.isPropertyAccessExpression(callee)) {
          return false;
        }
        const methodName = callee.getName();
        if (methodName === "catch" && callExpression.getArguments().length >= 1) {
          return current === callee.getExpression();
        }
        if (methodName === "then" && callExpression.getArguments().length >= 2) {
          return current === callee.getExpression();
        }
        return false;
      }
      static isPromiseCollectionHandler(arrayLiteralExpression) {
        const parent = arrayLiteralExpression.getParent();
        if (parent === void 0) {
          return false;
        }
        return ts_morph_1.Node.isCallExpression(parent) && NoFloatingPromisesRule_1.isPromiseCombinatorCall(parent);
      }
      static isPromiseCombinatorCall(callExpression) {
        const callee = callExpression.getExpression();
        if (!ts_morph_1.Node.isPropertyAccessExpression(callee)) {
          return false;
        }
        if (callee.getExpression().getText() !== "Promise") {
          return false;
        }
        const methodName = callee.getName();
        return methodName === "all" || methodName === "allSettled" || methodName === "any" || methodName === "race";
      }
      static belongsToFunction(node, asyncFunction) {
        return NoFloatingPromisesRule_1.getOwningFunction(node) === asyncFunction;
      }
      static getOwningFunction(node) {
        let current = node;
        while (current !== void 0) {
          if (ts_morph_1.Node.isMethodDeclaration(current) || ts_morph_1.Node.isFunctionDeclaration(current) || ts_morph_1.Node.isFunctionExpression(current) || ts_morph_1.Node.isArrowFunction(current)) {
            return current;
          }
          current = current.getParent();
        }
        return void 0;
      }
      static isPromiseLikeType(type, expression) {
        const pending = [type];
        const visited = /* @__PURE__ */ new Set();
        while (pending.length > 0) {
          const current = pending.pop();
          if (current === void 0) {
            continue;
          }
          if (visited.has(current)) {
            continue;
          }
          visited.add(current);
          if (NoFloatingPromisesRule_1.hasPromiseLikeShape(current, expression)) {
            return true;
          }
          if (current.isUnion()) {
            pending.push(...current.getUnionTypes());
            continue;
          }
          if (current.isIntersection()) {
            pending.push(...current.getIntersectionTypes());
          }
        }
        return false;
      }
      static isPromiseCollectionType(type, expression) {
        const pending = [type];
        const visited = /* @__PURE__ */ new Set();
        while (pending.length > 0) {
          const current = pending.pop();
          if (current === void 0) {
            continue;
          }
          if (visited.has(current)) {
            continue;
          }
          visited.add(current);
          if (current.isUnion()) {
            pending.push(...current.getUnionTypes());
            continue;
          }
          if (current.isIntersection()) {
            pending.push(...current.getIntersectionTypes());
          }
          const arrayElementType = current.getArrayElementType();
          if (arrayElementType !== void 0 && NoFloatingPromisesRule_1.isPromiseLikeType(arrayElementType, expression)) {
            return true;
          }
          if (current.isTuple()) {
            const tupleElements = current.getTupleElements();
            if (tupleElements.some((tupleElement) => NoFloatingPromisesRule_1.isPromiseLikeType(tupleElement, expression))) {
              return true;
            }
          }
        }
        return false;
      }
      static arrayLiteralContainsPromiseLike(arrayLiteralExpression) {
        return arrayLiteralExpression.getElements().some((element) => {
          if (!ts_morph_1.Node.isExpression(element)) {
            return false;
          }
          return NoFloatingPromisesRule_1.isPromiseLikeType(element.getType(), element);
        });
      }
      static hasPromiseLikeShape(type, expression) {
        const flags = type.getFlags();
        if ((flags & ts_morph_1.ts.TypeFlags.Any) !== 0 || (flags & ts_morph_1.ts.TypeFlags.Unknown) !== 0) {
          return false;
        }
        const symbolName = type.getSymbol()?.getName() ?? type.getAliasSymbol()?.getName();
        if (symbolName === "Promise" || symbolName === "PromiseLike") {
          return true;
        }
        const text = type.getText(expression);
        if (text === "Promise" || text.startsWith("Promise<") || text === "PromiseLike" || text.startsWith("PromiseLike<")) {
          return true;
        }
        const thenProperty = type.getApparentType().getProperty("then");
        if (thenProperty === void 0) {
          return false;
        }
        const declaration = thenProperty.getValueDeclaration();
        if (declaration === void 0) {
          return true;
        }
        const thenType = declaration.getType();
        return thenType.getCallSignatures().length > 0;
      }
    };
    exports2.NoFloatingPromisesRule = NoFloatingPromisesRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoFloatingPromisesRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects async function-like declarations with block bodies."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoFloatingPromisesRule, "collectAsyncFunctions", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns diagnostics for floating promise values declared inside an async function."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", Array)
    ], NoFloatingPromisesRule, "validateAsyncFunction", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects variable declarations in the current async function whose initializer is a promise or a collection of promises."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], NoFloatingPromisesRule, "collectTrackedDeclarations", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the tracked kind when an expression evaluates to a Promise or collection of promises."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Object)
    ], NoFloatingPromisesRule, "getTrackedValueKind", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the tracked declaration is later awaited, returned, voided, or combined explicitly inside the same async function."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Object]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isTrackedDeclarationHandled", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the reference participates in an explicit handling pattern."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isHandledReference", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a call expression explicitly handles a promise or a promise collection."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isExplicitPromiseHandlingCall", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether an array literal is directly supplied to a Promise combinator call."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isPromiseCollectionHandler", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the call expression is Promise.all, Promise.allSettled, Promise.any, or Promise.race."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isPromiseCombinatorCall", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the current node belongs to the target function instead of a nested function."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Object]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "belongsToFunction", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the nearest function-like ancestor that owns the node."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Object)
    ], NoFloatingPromisesRule, "getOwningFunction", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the resolved type is or includes a Promise or PromiseLike value."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isPromiseLikeType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the resolved type is a collection whose element type includes a Promise or PromiseLike value."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "isPromiseCollectionType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether an array literal contains at least one promise-like element."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "arrayLiteralContainsPromiseLike", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks for Promise flags, symbols, or a callable then method on the apparent type."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoFloatingPromisesRule, "hasPromiseLikeShape", null);
    exports2.NoFloatingPromisesRule = NoFloatingPromisesRule = NoFloatingPromisesRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids promise values created inside async functions from floating without await, return, or Promise combinator handling.")
    ], NoFloatingPromisesRule);
  }
});

// dist-many/rules/safety/promises/NoIgnoredPromisesRule.lll.js
var require_NoIgnoredPromisesRule_lll = __commonJS({
  "dist-many/rules/safety/promises/NoIgnoredPromisesRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoIgnoredPromisesRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoIgnoredPromisesRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoIgnoredPromisesRule = NoIgnoredPromisesRule_1 = class NoIgnoredPromisesRule {
      static getRule() {
        return {
          id: "R17",
          title: "No ignored promises",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const expressionStatements = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ExpressionStatement);
            for (const expressionStatement of expressionStatements) {
              if (!NoIgnoredPromisesRule_1.isIgnoredPromiseExpressionStatement(expressionStatement)) {
                continue;
              }
              const expression = expressionStatement.getExpression();
              const typeText = expression.getType().getText(expression);
              diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Promise result is ignored. Expression statements of type '${typeText}' must be awaited, returned, assigned, or explicitly discarded with 'void'.`, "no-ignored-promises", expressionStatement.getStartLineNumber()));
            }
            return diagnostics;
          }
        };
      }
      static isIgnoredPromiseExpressionStatement(expressionStatement) {
        const expression = expressionStatement.getExpression();
        if (ts_morph_1.Node.isAwaitExpression(expression) || ts_morph_1.Node.isVoidExpression(expression)) {
          return false;
        }
        if (!NoIgnoredPromisesRule_1.isPromiseLikeType(expression.getType(), expression)) {
          return false;
        }
        return !NoIgnoredPromisesRule_1.hasExplicitPromiseHandling(expression);
      }
      static hasExplicitPromiseHandling(expression) {
        if (ts_morph_1.Node.isParenthesizedExpression(expression)) {
          return NoIgnoredPromisesRule_1.hasExplicitPromiseHandling(expression.getExpression());
        }
        if (!ts_morph_1.Node.isCallExpression(expression)) {
          return false;
        }
        const propertyAccess = NoIgnoredPromisesRule_1.getPropertyAccess(expression);
        if (propertyAccess === void 0) {
          return false;
        }
        const methodName = propertyAccess.getName();
        if (methodName === "catch" && expression.getArguments().length >= 1) {
          return true;
        }
        if (methodName === "then" && expression.getArguments().length >= 2) {
          return true;
        }
        return NoIgnoredPromisesRule_1.hasExplicitPromiseHandling(propertyAccess.getExpression());
      }
      static getPropertyAccess(expression) {
        const callee = expression.getExpression();
        if (!ts_morph_1.Node.isPropertyAccessExpression(callee)) {
          return void 0;
        }
        return callee;
      }
      static isPromiseLikeType(type, expression) {
        const pending = [type];
        const visited = /* @__PURE__ */ new Set();
        while (pending.length > 0) {
          const current = pending.pop();
          if (current === void 0) {
            continue;
          }
          if (visited.has(current)) {
            continue;
          }
          visited.add(current);
          if (NoIgnoredPromisesRule_1.hasPromiseLikeShape(current, expression)) {
            return true;
          }
          if (current.isUnion()) {
            pending.push(...current.getUnionTypes());
            continue;
          }
          if (current.isIntersection()) {
            pending.push(...current.getIntersectionTypes());
          }
        }
        return false;
      }
      static hasPromiseLikeShape(type, expression) {
        const flags = type.getFlags();
        if ((flags & ts_morph_1.ts.TypeFlags.Any) !== 0 || (flags & ts_morph_1.ts.TypeFlags.Unknown) !== 0) {
          return false;
        }
        const symbolName = type.getSymbol()?.getName() ?? type.getAliasSymbol()?.getName();
        if (symbolName === "Promise" || symbolName === "PromiseLike") {
          return true;
        }
        const text = type.getText(expression);
        if (text === "Promise" || text.startsWith("Promise<") || text === "PromiseLike" || text.startsWith("PromiseLike<")) {
          return true;
        }
        const thenProperty = type.getApparentType().getProperty("then");
        if (thenProperty === void 0) {
          return false;
        }
        const declaration = thenProperty.getValueDeclaration();
        if (declaration === void 0) {
          return true;
        }
        const thenType = declaration.getType();
        return thenType.getCallSignatures().length > 0;
      }
    };
    exports2.NoIgnoredPromisesRule = NoIgnoredPromisesRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoIgnoredPromisesRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether an expression statement silently drops a promise-like result."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoIgnoredPromisesRule, "isIgnoredPromiseExpressionStatement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the expression already includes an explicit rejection-handling promise chain."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoIgnoredPromisesRule, "hasExplicitPromiseHandling", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the property access for method-style promise handling calls."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Object)
    ], NoIgnoredPromisesRule, "getPropertyAccess", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the resolved type is or includes a Promise or PromiseLike value."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoIgnoredPromisesRule, "isPromiseLikeType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks for Promise flags, symbols, or a callable then method on the apparent type."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoIgnoredPromisesRule, "hasPromiseLikeShape", null);
    exports2.NoIgnoredPromisesRule = NoIgnoredPromisesRule = NoIgnoredPromisesRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids promise-valued expression statements whose result is silently ignored.")
    ], NoIgnoredPromisesRule);
  }
});

// dist-many/rules/safety/truthiness/NoImplicitTruthinessRule.lll.js
var require_NoImplicitTruthinessRule_lll = __commonJS({
  "dist-many/rules/safety/truthiness/NoImplicitTruthinessRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoImplicitTruthinessRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoImplicitTruthinessRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoImplicitTruthinessRule = class NoImplicitTruthinessRule {
      static {
        NoImplicitTruthinessRule_1 = this;
      }
      static condition_kind_values = ["if", "while", "do while", "for", "ternary"];
      static getRule() {
        return {
          id: "R12",
          title: "No implicit truthiness",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const conditionContexts = NoImplicitTruthinessRule_1.collectConditionContexts(sourceFile);
            for (const conditionContext of conditionContexts) {
              if (NoImplicitTruthinessRule_1.isExplicitBooleanCondition(conditionContext.expression)) {
                continue;
              }
              const conditionType = conditionContext.expression.getType();
              const conditionTypeText = conditionType.getText(conditionContext.expression);
              diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Condition must be explicit. ${conditionContext.kind} conditions cannot rely on truthiness from '${conditionTypeText}'. Compare against '', 0, null, undefined, or rewrite as a boolean expression.`, "no-implicit-truthiness", conditionContext.expression.getStartLineNumber()));
            }
            return diagnostics;
          }
        };
      }
      static collectConditionContexts(sourceFile) {
        const conditions = [];
        for (const ifStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.IfStatement)) {
          conditions.push(NoImplicitTruthinessRule_1.createConditionContext("if", ifStatement));
        }
        for (const whileStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.WhileStatement)) {
          conditions.push(NoImplicitTruthinessRule_1.createConditionContext("while", whileStatement));
        }
        for (const doStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.DoStatement)) {
          conditions.push(NoImplicitTruthinessRule_1.createConditionContext("do while", doStatement));
        }
        for (const forStatement of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ForStatement)) {
          const expression = forStatement.getCondition();
          if (expression !== void 0) {
            conditions.push({ kind: "for", expression });
          }
        }
        for (const conditionalExpression of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ConditionalExpression)) {
          conditions.push(NoImplicitTruthinessRule_1.createConditionContext("ternary", conditionalExpression));
        }
        return conditions;
      }
      static createConditionContext(kind, node) {
        const expression = ts_morph_1.Node.isConditionalExpression(node) ? node.getCondition() : node.getExpression();
        return {
          kind,
          expression
        };
      }
      static isExplicitBooleanCondition(expression) {
        return NoImplicitTruthinessRule_1.isBooleanLikeType(expression.getType());
      }
      static isBooleanLikeType(type) {
        if (type.isBoolean() || type.isBooleanLiteral()) {
          return true;
        }
        if (!type.isUnion()) {
          return false;
        }
        const unionTypes = type.getUnionTypes();
        return unionTypes.length > 0 && unionTypes.every((unionType) => unionType.isBoolean() || unionType.isBooleanLiteral());
      }
    };
    exports2.NoImplicitTruthinessRule = NoImplicitTruthinessRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoImplicitTruthinessRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects condition expressions from supported control-flow and ternary positions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoImplicitTruthinessRule, "collectConditionContexts", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a condition context from a supported condition-bearing node."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Function]),
      __metadata2("design:returntype", Object)
    ], NoImplicitTruthinessRule, "createConditionContext", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the condition expression is statically boolean after resolving union members."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitTruthinessRule, "isExplicitBooleanCondition", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the type is boolean, a boolean literal, or a union of boolean members only."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitTruthinessRule, "isBooleanLikeType", null);
    exports2.NoImplicitTruthinessRule = NoImplicitTruthinessRule = NoImplicitTruthinessRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids implicit truthiness in supported condition positions unless the expression resolves to boolean.")
    ], NoImplicitTruthinessRule);
  }
});

// dist-many/rules/safety/comparisons/NoLooseEqualityRule.lll.js
var require_NoLooseEqualityRule_lll = __commonJS({
  "dist-many/rules/safety/comparisons/NoLooseEqualityRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoLooseEqualityRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoLooseEqualityRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoLooseEqualityRule = NoLooseEqualityRule_1 = class NoLooseEqualityRule {
      static getRule() {
        return {
          id: "R11",
          title: "No loose equality",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const binaryExpressions = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.BinaryExpression);
            for (const binaryExpression of binaryExpressions) {
              if (!NoLooseEqualityRule_1.isLooseEquality(binaryExpression)) {
                continue;
              }
              const operator = binaryExpression.getOperatorToken().getText();
              diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Loose equality is forbidden. Found '${operator}'. Use '===' or '!==' and compare against the intended value explicitly.`, "no-loose-equality", binaryExpression.getStartLineNumber()));
            }
            return diagnostics;
          }
        };
      }
      static isLooseEquality(binaryExpression) {
        const operatorKind = binaryExpression.getOperatorToken().getKind();
        return operatorKind === ts_morph_1.SyntaxKind.EqualsEqualsToken || operatorKind === ts_morph_1.SyntaxKind.ExclamationEqualsToken;
      }
    };
    exports2.NoLooseEqualityRule = NoLooseEqualityRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoLooseEqualityRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a binary expression uses a loose equality operator."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoLooseEqualityRule, "isLooseEquality", null);
    exports2.NoLooseEqualityRule = NoLooseEqualityRule = NoLooseEqualityRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids loose equality operators anywhere in supported source files.")
    ], NoLooseEqualityRule);
  }
});

// dist-many/rules/safety/types/NoNonNullAssertionRule.lll.js
var require_NoNonNullAssertionRule_lll = __commonJS({
  "dist-many/rules/safety/types/NoNonNullAssertionRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoNonNullAssertionRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoNonNullAssertionRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoNonNullAssertionRule = NoNonNullAssertionRule_1 = class NoNonNullAssertionRule {
      static getRule() {
        return {
          id: "R15",
          title: "No non-null assertion",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const nonNullExpressions = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.NonNullExpression);
            for (const nonNullExpression of nonNullExpressions) {
              diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, NoNonNullAssertionRule_1.buildMessage(nonNullExpression), "no-non-null-assertion", nonNullExpression.getStartLineNumber()));
            }
            return diagnostics;
          }
        };
      }
      static buildMessage(nonNullExpression) {
        const operandText = nonNullExpression.getExpression().getText();
        return `Non-null assertion '${operandText}!' is forbidden. Narrow the value with an explicit null check or redesign the type so the uncertainty is resolved.`;
      }
    };
    exports2.NoNonNullAssertionRule = NoNonNullAssertionRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoNonNullAssertionRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a diagnostic message describing the banned non-null assertion."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", String)
    ], NoNonNullAssertionRule, "buildMessage", null);
    exports2.NoNonNullAssertionRule = NoNonNullAssertionRule = NoNonNullAssertionRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids postfix non-null assertions because they suppress unresolved nullability.")
    ], NoNonNullAssertionRule);
  }
});

// dist-many/rules/safety/NoParameterMutationRule.lll.js
var require_NoParameterMutationRule_lll = __commonJS({
  "dist-many/rules/safety/NoParameterMutationRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoParameterMutationRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoParameterMutationRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoParameterMutationRule = NoParameterMutationRule_1 = class NoParameterMutationRule {
      static getRule() {
        return {
          id: "R19",
          title: "No parameter mutation",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const functions = NoParameterMutationRule_1.collectFunctionLikeDeclarations(sourceFile);
            for (const currentFunction of functions) {
              diagnostics.push(...NoParameterMutationRule_1.validateFunction(filePath, currentFunction));
            }
            return diagnostics;
          }
        };
      }
      static collectFunctionLikeDeclarations(sourceFile) {
        const functions = [];
        const addIfWithBody = (candidate) => {
          if (candidate.getBody() === void 0) {
            return;
          }
          functions.push(candidate);
        };
        for (const methodDeclaration of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.MethodDeclaration)) {
          addIfWithBody(methodDeclaration);
        }
        for (const functionDeclaration of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.FunctionDeclaration)) {
          addIfWithBody(functionDeclaration);
        }
        for (const functionExpression of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.FunctionExpression)) {
          addIfWithBody(functionExpression);
        }
        for (const arrowFunction of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.ArrowFunction)) {
          addIfWithBody(arrowFunction);
        }
        for (const constructorDeclaration of sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.Constructor)) {
          addIfWithBody(constructorDeclaration);
        }
        return functions;
      }
      static validateFunction(filePath, currentFunction) {
        const parameterBindings = NoParameterMutationRule_1.collectParameterBindings(currentFunction.getParameters());
        if (parameterBindings.length === 0) {
          return [];
        }
        const diagnostics = [];
        const seenKeys = /* @__PURE__ */ new Set();
        const assignments = currentFunction.getDescendantsOfKind(ts_morph_1.SyntaxKind.BinaryExpression);
        for (const assignment of assignments) {
          if (!NoParameterMutationRule_1.belongsToCurrentFunction(assignment, currentFunction)) {
            continue;
          }
          if (!NoParameterMutationRule_1.isAssignmentExpression(assignment)) {
            continue;
          }
          for (const identifier of NoParameterMutationRule_1.collectAssignedIdentifiers(assignment.getLeft())) {
            const parameterName = NoParameterMutationRule_1.getMatchingParameterName(identifier, parameterBindings);
            if (parameterName === void 0) {
              continue;
            }
            const key = `${assignment.getStart()}-${parameterName}`;
            if (seenKeys.has(key)) {
              continue;
            }
            seenKeys.add(key);
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, NoParameterMutationRule_1.buildAssignmentMessage(parameterName, assignment), "no-parameter-mutation", assignment.getStartLineNumber()));
          }
        }
        for (const updateExpression of currentFunction.getDescendantsOfKind(ts_morph_1.SyntaxKind.PrefixUnaryExpression)) {
          if (!NoParameterMutationRule_1.belongsToCurrentFunction(updateExpression, currentFunction)) {
            continue;
          }
          if (!NoParameterMutationRule_1.isUpdateExpression(updateExpression)) {
            continue;
          }
          const operand = updateExpression.getOperand();
          if (!ts_morph_1.Node.isIdentifier(operand)) {
            continue;
          }
          const parameterName = NoParameterMutationRule_1.getMatchingParameterName(operand, parameterBindings);
          if (parameterName === void 0) {
            continue;
          }
          const key = `${updateExpression.getStart()}-${parameterName}`;
          if (seenKeys.has(key)) {
            continue;
          }
          seenKeys.add(key);
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, NoParameterMutationRule_1.buildUpdateMessage(parameterName, updateExpression.getText()), "no-parameter-mutation", updateExpression.getStartLineNumber()));
        }
        for (const updateExpression of currentFunction.getDescendantsOfKind(ts_morph_1.SyntaxKind.PostfixUnaryExpression)) {
          if (!NoParameterMutationRule_1.belongsToCurrentFunction(updateExpression, currentFunction)) {
            continue;
          }
          const operand = updateExpression.getOperand();
          if (!ts_morph_1.Node.isIdentifier(operand)) {
            continue;
          }
          const parameterName = NoParameterMutationRule_1.getMatchingParameterName(operand, parameterBindings);
          if (parameterName === void 0) {
            continue;
          }
          const key = `${updateExpression.getStart()}-${parameterName}`;
          if (seenKeys.has(key)) {
            continue;
          }
          seenKeys.add(key);
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, NoParameterMutationRule_1.buildUpdateMessage(parameterName, updateExpression.getText()), "no-parameter-mutation", updateExpression.getStartLineNumber()));
        }
        return diagnostics;
      }
      static belongsToCurrentFunction(node, currentFunction) {
        const owner = node.getFirstAncestor((ancestor) => ts_morph_1.Node.isMethodDeclaration(ancestor) || ts_morph_1.Node.isFunctionDeclaration(ancestor) || ts_morph_1.Node.isFunctionExpression(ancestor) || ts_morph_1.Node.isArrowFunction(ancestor) || ts_morph_1.Node.isConstructorDeclaration(ancestor));
        return owner === currentFunction;
      }
      static collectParameterBindings(parameters) {
        const bindings = [];
        for (const parameter of parameters) {
          const nameNode = parameter.getNameNode();
          if (ts_morph_1.Node.isIdentifier(nameNode)) {
            bindings.push(nameNode);
            continue;
          }
          if (ts_morph_1.Node.isObjectBindingPattern(nameNode) || ts_morph_1.Node.isArrayBindingPattern(nameNode)) {
            bindings.push(...NoParameterMutationRule_1.collectBindingIdentifiers(nameNode));
          }
        }
        return bindings;
      }
      static collectBindingIdentifiers(bindingPattern) {
        return bindingPattern.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier);
      }
      static isAssignmentExpression(binaryExpression) {
        const operatorKind = binaryExpression.getOperatorToken().getKind();
        return operatorKind === ts_morph_1.SyntaxKind.EqualsToken || operatorKind === ts_morph_1.SyntaxKind.PlusEqualsToken || operatorKind === ts_morph_1.SyntaxKind.MinusEqualsToken || operatorKind === ts_morph_1.SyntaxKind.AsteriskEqualsToken || operatorKind === ts_morph_1.SyntaxKind.AsteriskAsteriskEqualsToken || operatorKind === ts_morph_1.SyntaxKind.SlashEqualsToken || operatorKind === ts_morph_1.SyntaxKind.PercentEqualsToken || operatorKind === ts_morph_1.SyntaxKind.LessThanLessThanEqualsToken || operatorKind === ts_morph_1.SyntaxKind.GreaterThanGreaterThanEqualsToken || operatorKind === ts_morph_1.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken || operatorKind === ts_morph_1.SyntaxKind.AmpersandEqualsToken || operatorKind === ts_morph_1.SyntaxKind.BarEqualsToken || operatorKind === ts_morph_1.SyntaxKind.CaretEqualsToken || operatorKind === ts_morph_1.SyntaxKind.BarBarEqualsToken || operatorKind === ts_morph_1.SyntaxKind.AmpersandAmpersandEqualsToken || operatorKind === ts_morph_1.SyntaxKind.QuestionQuestionEqualsToken;
      }
      static collectAssignedIdentifiers(leftExpression) {
        if (ts_morph_1.Node.isIdentifier(leftExpression)) {
          return [leftExpression];
        }
        if (ts_morph_1.Node.isArrayLiteralExpression(leftExpression) || ts_morph_1.Node.isObjectLiteralExpression(leftExpression)) {
          return leftExpression.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier);
        }
        return [];
      }
      static getMatchingParameterName(identifier, parameterBindings) {
        const identifierSymbol = identifier.getSymbol();
        if (identifierSymbol === void 0) {
          return void 0;
        }
        const identifierDeclarationKeys = new Set(identifierSymbol.getDeclarations().map((declaration) => `${declaration.getSourceFile().getFilePath()}:${declaration.getStart()}`));
        for (const parameterBinding of parameterBindings) {
          const parameterKey = `${parameterBinding.getSourceFile().getFilePath()}:${parameterBinding.getStart()}`;
          if (identifierDeclarationKeys.has(parameterKey)) {
            return parameterBinding.getText();
          }
        }
        return void 0;
      }
      static isUpdateExpression(prefixUnaryExpression) {
        const operatorKind = prefixUnaryExpression.getOperatorToken();
        return operatorKind === ts_morph_1.SyntaxKind.PlusPlusToken || operatorKind === ts_morph_1.SyntaxKind.MinusMinusToken;
      }
      static buildAssignmentMessage(parameterName, assignment) {
        const operator = assignment.getOperatorToken().getText();
        return `Parameter '${parameterName}' is reassigned with '${operator}'. Create a new local variable instead of mutating the parameter binding.`;
      }
      static buildUpdateMessage(parameterName, expressionText) {
        return `Parameter '${parameterName}' is updated by '${expressionText}'. Create a new local variable instead of mutating the parameter binding.`;
      }
    };
    exports2.NoParameterMutationRule = NoParameterMutationRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoParameterMutationRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects function-like declarations with bodies that can contain parameter mutations."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoParameterMutationRule, "collectFunctionLikeDeclarations", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns diagnostics for mutated parameter bindings inside one function-like declaration."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Function]),
      __metadata2("design:returntype", Array)
    ], NoParameterMutationRule, "validateFunction", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the mutation belongs to the current function instead of a nested function."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Boolean)
    ], NoParameterMutationRule, "belongsToCurrentFunction", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects identifier bindings introduced by function parameters, including destructuring names."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array]),
      __metadata2("design:returntype", Array)
    ], NoParameterMutationRule, "collectParameterBindings", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects identifiers declared inside a binding pattern."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoParameterMutationRule, "collectBindingIdentifiers", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a binary expression uses an assignment operator."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoParameterMutationRule, "isAssignmentExpression", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects identifiers directly rebound by the left-hand side of an assignment."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], NoParameterMutationRule, "collectAssignedIdentifiers", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the matching parameter binding name when the identifier refers to a parameter."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Array]),
      __metadata2("design:returntype", Object)
    ], NoParameterMutationRule, "getMatchingParameterName", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a prefix unary expression updates its operand."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoParameterMutationRule, "isUpdateExpression", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a diagnostic message for assignment-style parameter mutation."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Function]),
      __metadata2("design:returntype", String)
    ], NoParameterMutationRule, "buildAssignmentMessage", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a diagnostic message for increment and decrement parameter mutation."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String]),
      __metadata2("design:returntype", String)
    ], NoParameterMutationRule, "buildUpdateMessage", null);
    exports2.NoParameterMutationRule = NoParameterMutationRule = NoParameterMutationRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids reassignment or update of function parameter bindings.")
    ], NoParameterMutationRule);
  }
});

// dist-many/rules/safety/NoSwitchFallthroughRule.lll.js
var require_NoSwitchFallthroughRule_lll = __commonJS({
  "dist-many/rules/safety/NoSwitchFallthroughRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoSwitchFallthroughRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoSwitchFallthroughRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoSwitchFallthroughRule = NoSwitchFallthroughRule_1 = class NoSwitchFallthroughRule {
      static getRule() {
        return {
          id: "R16",
          title: "No switch fallthrough",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            const switchStatements = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.SwitchStatement);
            for (const switchStatement of switchStatements) {
              diagnostics.push(...NoSwitchFallthroughRule_1.validateSwitch(filePath, switchStatement));
            }
            return diagnostics;
          }
        };
      }
      static validateSwitch(filePath, switchStatement) {
        const diagnostics = [];
        const clauses = switchStatement.getCaseBlock().getClauses();
        for (let index = 0; index < clauses.length - 1; index++) {
          const clause = clauses[index];
          if (NoSwitchFallthroughRule_1.clauseHasNoStatements(clause)) {
            continue;
          }
          if (NoSwitchFallthroughRule_1.clauseTerminates(clause)) {
            continue;
          }
          const clauseLabel = ts_morph_1.Node.isCaseClause(clause) ? `case ${clause.getExpression().getText()}` : "default";
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Switch clause '${clauseLabel}' can fall through into the next clause. Terminate it with break, return, throw, or continue.`, "switch-fallthrough", clause.getStartLineNumber()));
        }
        return diagnostics;
      }
      static clauseTerminates(clause) {
        const statements = clause.getStatements();
        if (statements.length === 0) {
          return false;
        }
        return NoSwitchFallthroughRule_1.statementTerminates(statements[statements.length - 1]);
      }
      static clauseHasNoStatements(clause) {
        return clause.getStatements().length === 0;
      }
      static statementTerminates(statement) {
        const blockTerminates = (block) => {
          const statements = block.getStatements();
          if (statements.length === 0) {
            return false;
          }
          return statementTerminates(statements[statements.length - 1]);
        };
        const statementTerminates = (current) => {
          if (ts_morph_1.Node.isBreakStatement(current) || ts_morph_1.Node.isReturnStatement(current) || ts_morph_1.Node.isThrowStatement(current) || ts_morph_1.Node.isContinueStatement(current)) {
            return true;
          }
          if (ts_morph_1.Node.isBlock(current)) {
            return blockTerminates(current);
          }
          if (ts_morph_1.Node.isIfStatement(current)) {
            const elseStatement = current.getElseStatement();
            if (elseStatement === void 0) {
              return false;
            }
            return statementTerminates(current.getThenStatement()) && statementTerminates(elseStatement);
          }
          if (ts_morph_1.Node.isTryStatement(current)) {
            const finallyBlock = current.getFinallyBlock();
            if (finallyBlock !== void 0) {
              return blockTerminates(finallyBlock);
            }
            const catchClause = current.getCatchClause();
            if (catchClause === void 0) {
              return false;
            }
            return blockTerminates(current.getTryBlock()) && blockTerminates(catchClause.getBlock());
          }
          return false;
        };
        return statementTerminates(statement);
      }
    };
    exports2.NoSwitchFallthroughRule = NoSwitchFallthroughRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoSwitchFallthroughRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns diagnostics for non-final clauses with executable statements that can fall through."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Function]),
      __metadata2("design:returntype", Array)
    ], NoSwitchFallthroughRule, "validateSwitch", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the clause ends with a statement that cannot continue into the next clause."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], NoSwitchFallthroughRule, "clauseTerminates", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the clause is only a grouping label with no executable statements."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], NoSwitchFallthroughRule, "clauseHasNoStatements", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether the statement prevents normal completion of the current switch clause."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], NoSwitchFallthroughRule, "statementTerminates", null);
    exports2.NoSwitchFallthroughRule = NoSwitchFallthroughRule = NoSwitchFallthroughRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids switch fallthrough from clauses with executable statements.")
    ], NoSwitchFallthroughRule);
  }
});

// dist-many/rules/safety/coercion/NoImplicitPrimitiveCoercionRule.lll.js
var require_NoImplicitPrimitiveCoercionRule_lll = __commonJS({
  "dist-many/rules/safety/coercion/NoImplicitPrimitiveCoercionRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoImplicitPrimitiveCoercionRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoImplicitPrimitiveCoercionRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var lll_lll_12 = require_lll_lll();
    var NoImplicitPrimitiveCoercionRule = NoImplicitPrimitiveCoercionRule_1 = class NoImplicitPrimitiveCoercionRule {
      static getRule() {
        return {
          id: "R13",
          title: "No implicit primitive coercion",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
              return [];
            }
            const diagnostics = [];
            diagnostics.push(...NoImplicitPrimitiveCoercionRule_1.collectBinaryOperatorDiagnostics(sourceFile, filePath));
            diagnostics.push(...NoImplicitPrimitiveCoercionRule_1.collectUnaryOperatorDiagnostics(sourceFile, filePath));
            return diagnostics;
          }
        };
      }
      static collectBinaryOperatorDiagnostics(sourceFile, filePath) {
        const diagnostics = [];
        const binaryExpressions = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.BinaryExpression);
        for (const binaryExpression of binaryExpressions) {
          const operatorKind = binaryExpression.getOperatorToken().getKind();
          if (!NoImplicitPrimitiveCoercionRule_1.isCheckedBinaryOperator(operatorKind)) {
            continue;
          }
          const left = binaryExpression.getLeft();
          const right = binaryExpression.getRight();
          const leftType = left.getType();
          const rightType = right.getType();
          if (NoImplicitPrimitiveCoercionRule_1.isStaticallyNumericType(leftType) && NoImplicitPrimitiveCoercionRule_1.isStaticallyNumericType(rightType)) {
            continue;
          }
          const operator = binaryExpression.getOperatorToken().getText();
          const leftTypeText = leftType.getText(left);
          const rightTypeText = rightType.getText(right);
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Arithmetic operator '${operator}' requires numeric operands. Found '${leftTypeText}' ${operator} '${rightTypeText}'. Convert explicitly before arithmetic.`, "no-implicit-primitive-coercion", binaryExpression.getStartLineNumber()));
        }
        return diagnostics;
      }
      static collectUnaryOperatorDiagnostics(sourceFile, filePath) {
        const diagnostics = [];
        const unaryExpressions = sourceFile.getDescendantsOfKind(ts_morph_1.SyntaxKind.PrefixUnaryExpression);
        for (const unaryExpression of unaryExpressions) {
          if (!NoImplicitPrimitiveCoercionRule_1.isCheckedUnaryOperator(unaryExpression)) {
            continue;
          }
          const operand = unaryExpression.getOperand();
          const operandType = operand.getType();
          if (NoImplicitPrimitiveCoercionRule_1.isStaticallyNumericType(operandType)) {
            continue;
          }
          const operator = NoImplicitPrimitiveCoercionRule_1.getUnaryOperatorText(unaryExpression);
          const operandTypeText = operandType.getText(operand);
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Unary operator '${operator}' requires a numeric operand. Found '${operandTypeText}'. Convert explicitly before arithmetic.`, "no-implicit-primitive-coercion", unaryExpression.getStartLineNumber()));
        }
        return diagnostics;
      }
      static isCheckedBinaryOperator(operatorKind) {
        return operatorKind === ts_morph_1.SyntaxKind.MinusToken || operatorKind === ts_morph_1.SyntaxKind.AsteriskToken || operatorKind === ts_morph_1.SyntaxKind.SlashToken || operatorKind === ts_morph_1.SyntaxKind.PercentToken;
      }
      static isCheckedUnaryOperator(unaryExpression) {
        const operatorKind = unaryExpression.getOperatorToken();
        return operatorKind === ts_morph_1.SyntaxKind.PlusToken || operatorKind === ts_morph_1.SyntaxKind.MinusToken;
      }
      static getUnaryOperatorText(unaryExpression) {
        return unaryExpression.getOperatorToken() === ts_morph_1.SyntaxKind.PlusToken ? "+" : "-";
      }
      static isStaticallyNumericType(type) {
        const pending = [type];
        const visited = /* @__PURE__ */ new Set();
        while (pending.length > 0) {
          const current = pending.pop();
          if (current === void 0) {
            continue;
          }
          if (visited.has(current)) {
            continue;
          }
          visited.add(current);
          if (NoImplicitPrimitiveCoercionRule_1.hasNumericFlags(current)) {
            continue;
          }
          if (current.isUnion()) {
            const unionTypes = current.getUnionTypes();
            if (unionTypes.length === 0) {
              return false;
            }
            pending.push(...unionTypes);
            continue;
          }
          if (current.isIntersection()) {
            const intersectionTypes = current.getIntersectionTypes();
            if (intersectionTypes.length === 0) {
              return false;
            }
            if (intersectionTypes.some((intersectionType) => NoImplicitPrimitiveCoercionRule_1.hasNumericFlags(intersectionType))) {
              continue;
            }
            const nestedIntersectionTypes = intersectionTypes.filter((intersectionType) => intersectionType.isUnion() || intersectionType.isIntersection());
            if (nestedIntersectionTypes.length === 0) {
              return false;
            }
            pending.push(...nestedIntersectionTypes);
            continue;
          }
          return false;
        }
        return true;
      }
      static hasNumericFlags(type) {
        const flags = type.getFlags();
        const numericFlags = ts_morph_1.ts.TypeFlags.Number | ts_morph_1.ts.TypeFlags.NumberLiteral | ts_morph_1.ts.TypeFlags.Enum | ts_morph_1.ts.TypeFlags.EnumLiteral;
        return (flags & numericFlags) !== 0;
      }
    };
    exports2.NoImplicitPrimitiveCoercionRule = NoImplicitPrimitiveCoercionRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoImplicitPrimitiveCoercionRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects diagnostics for binary arithmetic operators whose operands are not both numeric."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, String]),
      __metadata2("design:returntype", Array)
    ], NoImplicitPrimitiveCoercionRule, "collectBinaryOperatorDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects diagnostics for unary plus or minus when the operand is not statically numeric."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, String]),
      __metadata2("design:returntype", Array)
    ], NoImplicitPrimitiveCoercionRule, "collectUnaryOperatorDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a binary operator is one of the arithmetic operators covered by this rule."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitPrimitiveCoercionRule, "isCheckedBinaryOperator", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a prefix unary expression uses unary plus or unary minus."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitPrimitiveCoercionRule, "isCheckedUnaryOperator", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the source-text operator symbol for a checked unary arithmetic expression."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", String)
    ], NoImplicitPrimitiveCoercionRule, "getUnaryOperatorText", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the provided type is statically numeric, including numeric unions and branded numbers."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitPrimitiveCoercionRule, "isStaticallyNumericType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks numeric-related TypeScript flags for primitive numbers, literals, and numeric enums."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], NoImplicitPrimitiveCoercionRule, "hasNumericFlags", null);
    exports2.NoImplicitPrimitiveCoercionRule = NoImplicitPrimitiveCoercionRule = NoImplicitPrimitiveCoercionRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids arithmetic operators when operands are not statically known to be numeric.")
    ], NoImplicitPrimitiveCoercionRule);
  }
});

// dist-many/rules/structure/NoRogueTopLevelRule.lll.js
var require_NoRogueTopLevelRule_lll = __commonJS({
  "dist-many/rules/structure/NoRogueTopLevelRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var NoRogueTopLevelRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoRogueTopLevelRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var NoRogueTopLevelRule = NoRogueTopLevelRule_1 = class NoRogueTopLevelRule {
      static getRule() {
        return {
          id: "R6",
          title: "No rogue top-level declarations",
          run(sourceFile) {
            return NoRogueTopLevelRule_1.runRule(sourceFile);
          }
        };
      }
      static runRule(sourceFile) {
        const filePath = sourceFile.getFilePath();
        if (!filePath.endsWith(".ts") || filePath.endsWith(".d.ts")) {
          return [];
        }
        if (NoRogueTopLevelRule_1.isLllPublicDecoratorsFile(filePath)) {
          return [];
        }
        if (NoRogueTopLevelRule_1.isPureReExportBarrel(sourceFile)) {
          return [];
        }
        const statements = sourceFile.getStatements();
        const diagnostics = [];
        NoRogueTopLevelRule_1.validateTopLevelIfPlacement(filePath, statements, diagnostics);
        for (let index = 0; index < statements.length; index++) {
          NoRogueTopLevelRule_1.validateStatement(sourceFile, statements, index, diagnostics);
        }
        return diagnostics;
      }
      static validateStatement(sourceFile, statements, index, diagnostics) {
        const statement = statements[index];
        const kind = statement.getKind();
        const filePath = sourceFile.getFilePath();
        const line = statement.getStartLineNumber();
        if (kind === ts_morph_1.SyntaxKind.FunctionDeclaration) {
          NoRogueTopLevelRule_1.pushFunctionDeclarationError(filePath, statement.asKindOrThrow(ts_morph_1.SyntaxKind.FunctionDeclaration), diagnostics);
          return;
        }
        if (kind === ts_morph_1.SyntaxKind.VariableStatement) {
          NoRogueTopLevelRule_1.pushVariableStatementErrors(filePath, statement.asKindOrThrow(ts_morph_1.SyntaxKind.VariableStatement), line, diagnostics);
          return;
        }
        if (kind === ts_morph_1.SyntaxKind.EnumDeclaration) {
          NoRogueTopLevelRule_1.pushEnumDeclarationError(filePath, statement.asKindOrThrow(ts_morph_1.SyntaxKind.EnumDeclaration), line, diagnostics);
          return;
        }
        if (kind === ts_morph_1.SyntaxKind.ModuleDeclaration) {
          NoRogueTopLevelRule_1.pushModuleDeclarationError(filePath, statement.asKindOrThrow(ts_morph_1.SyntaxKind.ModuleDeclaration), line, diagnostics);
          return;
        }
        if (kind === ts_morph_1.SyntaxKind.IfStatement) {
          return;
        }
        if (kind === ts_morph_1.SyntaxKind.ExpressionStatement) {
          if (NoRogueTopLevelRule_1.isAllowedFinalClassInstantiationStatement(sourceFile, statement, statements)) {
            return;
          }
          if (NoRogueTopLevelRule_1.isAllowedSpecCallBeforeExportedType(statement, statements, index)) {
            return;
          }
          NoRogueTopLevelRule_1.pushExpressionStatementError(filePath, sourceFile, statement.asKindOrThrow(ts_morph_1.SyntaxKind.ExpressionStatement), line, diagnostics);
          return;
        }
        if (NoRogueTopLevelRule_1.isAllowedDeclarationKind(kind)) {
          NoRogueTopLevelRule_1.pushDeclareStatementErrorIfNeeded(filePath, statement, line, diagnostics);
          return;
        }
        if (NoRogueTopLevelRule_1.isDeclaredStatement(statement)) {
          NoRogueTopLevelRule_1.pushDeclareStatementError(filePath, line, diagnostics);
          return;
        }
        NoRogueTopLevelRule_1.pushGenericExecutableStatementError(filePath, line, diagnostics);
      }
      static pushFunctionDeclarationError(filePath, functionDeclaration, diagnostics) {
        const functionName = functionDeclaration.getName() ?? "(anonymous)";
        const visibilityHint = functionDeclaration.isExported() ? "If this must be exported, make it a public static method on a class in this file." : "If this is internal, make it a private static method on a class in this file.";
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Top-level function '${functionName}' is forbidden. ${visibilityHint}`, "rogue-top-level", functionDeclaration.getStartLineNumber()));
      }
      static pushVariableStatementErrors(filePath, variableStatement, line, diagnostics) {
        const declarationKind = variableStatement.getDeclarationKindKeywords()[0]?.getText() ?? "const";
        const visibilityHint = variableStatement.isExported() ? "If this must be exported, move it to a public class property." : "If this is internal, move it to a private class property.";
        for (const declaration of variableStatement.getDeclarations()) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Top-level ${declarationKind} '${declaration.getName()}' is forbidden. Move constants to static readonly class properties. ${visibilityHint}`, "rogue-top-level", line));
        }
      }
      static pushEnumDeclarationError(filePath, enumDeclaration, line, diagnostics) {
        const enumName = enumDeclaration.getName() ?? "(anonymous)";
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Top-level enum '${enumName}' is forbidden. Use a union type or static readonly class properties.`, "rogue-top-level", line));
      }
      static pushModuleDeclarationError(filePath, moduleDeclaration, line, diagnostics) {
        const moduleName = moduleDeclaration.getName() ?? "(anonymous)";
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Top-level namespace/module '${moduleName}' is forbidden in checked source files.`, "rogue-top-level", line));
      }
      static pushExpressionStatementError(filePath, sourceFile, expressionStatement, line, diagnostics) {
        const newExpression = expressionStatement.getExpression().asKind(ts_morph_1.SyntaxKind.NewExpression);
        if (newExpression !== void 0) {
          const message = FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(filePath) ? "Top-level class instantiation is forbidden in test files. Tests are instantiated automatically by the language." : "Top-level class instantiation is allowed only as the final statement in the exact form `new ClassName()` matching the exported class.";
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, message, "rogue-top-level", line));
          return;
        }
        NoRogueTopLevelRule_1.pushGenericExecutableStatementError(filePath, line, diagnostics);
      }
      static pushDeclareStatementErrorIfNeeded(filePath, statement, line, diagnostics) {
        if (NoRogueTopLevelRule_1.isDeclaredStatement(statement)) {
          NoRogueTopLevelRule_1.pushDeclareStatementError(filePath, line, diagnostics);
        }
      }
      static pushDeclareStatementError(filePath, line, diagnostics) {
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, "Top-level 'declare' statements are forbidden in .ts files. Use .d.ts for ambient declarations.", "rogue-top-level", line));
      }
      static pushGenericExecutableStatementError(filePath, line, diagnostics) {
        diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, "Top-level executable statements are restricted: allow only one final top-level if, or in production files one final `new ClassName()` statement.", "rogue-top-level", line));
      }
      static isAllowedDeclarationKind(kind) {
        return kind === ts_morph_1.SyntaxKind.ImportDeclaration || kind === ts_morph_1.SyntaxKind.ExportDeclaration || kind === ts_morph_1.SyntaxKind.ClassDeclaration || kind === ts_morph_1.SyntaxKind.TypeAliasDeclaration || kind === ts_morph_1.SyntaxKind.InterfaceDeclaration;
      }
      static isDeclaredStatement(statement) {
        const withModifiers = statement;
        const modifiers = withModifiers.getModifiers?.() ?? [];
        return modifiers.some((modifier) => modifier.getKind() === ts_morph_1.SyntaxKind.DeclareKeyword);
      }
      static isAllowedFinalClassInstantiationStatement(sourceFile, statement, statements) {
        if (FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(sourceFile.getFilePath())) {
          return false;
        }
        if (statement !== statements[statements.length - 1]) {
          return false;
        }
        const expressionStatement = statement.asKind(ts_morph_1.SyntaxKind.ExpressionStatement);
        const newExpression = expressionStatement?.getExpression().asKind(ts_morph_1.SyntaxKind.NewExpression);
        if (!newExpression) {
          return false;
        }
        if (newExpression.getArguments().length !== 0) {
          return false;
        }
        const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(sourceFile);
        const exportedClassName = exportedClass?.getName();
        if (!exportedClassName) {
          return false;
        }
        const constructedName = newExpression.getExpression().getText().trim();
        return constructedName === exportedClassName;
      }
      static isAllowedSpecCallBeforeExportedType(statement, statements, index) {
        const expressionStatement = statement.asKind(ts_morph_1.SyntaxKind.ExpressionStatement);
        const expression = expressionStatement?.getExpression();
        const callExpression = expression?.asKind(ts_morph_1.SyntaxKind.CallExpression);
        const callee = callExpression?.getExpression().asKind(ts_morph_1.SyntaxKind.Identifier);
        if (!callee || !["Spec", "spec"].includes(callee.getText())) {
          return false;
        }
        const nextStatement = statements[index + 1];
        const nextTypeAlias = nextStatement?.asKind(ts_morph_1.SyntaxKind.TypeAliasDeclaration);
        return !!nextTypeAlias?.isExported();
      }
      static validateTopLevelIfPlacement(filePath, statements, diagnostics) {
        const topLevelIfStatements = statements.filter((statement) => statement.getKind() === ts_morph_1.SyntaxKind.IfStatement).map((statement) => statement.asKindOrThrow(ts_morph_1.SyntaxKind.IfStatement));
        if (topLevelIfStatements.length === 0) {
          return;
        }
        if (topLevelIfStatements.length > 1) {
          for (const extraIf of topLevelIfStatements.slice(1)) {
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, "Only one top-level if statement is allowed per file.", "rogue-top-level", extraIf.getStartLineNumber()));
          }
        }
        const lastStatement = statements[statements.length - 1];
        if (topLevelIfStatements[0] !== lastStatement) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, "The single allowed top-level if statement must be the last top-level statement in the file.", "rogue-top-level", topLevelIfStatements[0].getStartLineNumber()));
        }
      }
      static isPureReExportBarrel(sourceFile) {
        const statements = sourceFile.getStatements();
        if (statements.length === 0) {
          return false;
        }
        return statements.every((statement) => {
          const exportDeclaration = statement.asKind(ts_morph_1.SyntaxKind.ExportDeclaration);
          return !!exportDeclaration?.getModuleSpecifier();
        });
      }
      static isLllPublicDecoratorsFile(filePath) {
        return filePath.endsWith("/lll.lll.ts") || filePath.endsWith("\\lll.lll.ts");
      }
    };
    exports2.NoRogueTopLevelRule = NoRogueTopLevelRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], NoRogueTopLevelRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Runs top-level declaration validation for one source file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], NoRogueTopLevelRule, "runRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Validates one top-level statement and appends diagnostics when needed."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Array, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "validateStatement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports a forbidden top-level function declaration."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushFunctionDeclarationError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports forbidden top-level variable declarations."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushVariableStatementErrors", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports a forbidden top-level enum declaration."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushEnumDeclarationError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports a forbidden top-level module declaration."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushModuleDeclarationError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports invalid top-level expression statements."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object, Object, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushExpressionStatementError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports forbidden top-level declare usage when present."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, ts_morph_1.Statement, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushDeclareStatementErrorIfNeeded", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports forbidden top-level declare statements."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushDeclareStatementError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports generic forbidden top-level executable statements."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Number, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "pushGenericExecutableStatementError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks if statement kind is a declaration that can exist at top level."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isAllowedDeclarationKind", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether a statement has declare modifier."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.Statement]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isDeclaredStatement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether statement is the single allowed final top-level `new ExportedClass()` in non-test files."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, ts_morph_1.Statement, Array]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isAllowedFinalClassInstantiationStatement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether statement is a top-level Spec(...) call immediately before an exported type alias."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.Statement, Array, Number]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isAllowedSpecCallBeforeExportedType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Validates one-final-if top-level rule."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Array, Array]),
      __metadata2("design:returntype", void 0)
    ], NoRogueTopLevelRule, "validateTopLevelIfPlacement", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Detects files that only re-export from other modules (barrel files)."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isPureReExportBarrel", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether file is the explicit decorators/public API exception."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], NoRogueTopLevelRule, "isLllPublicDecoratorsFile", null);
    exports2.NoRogueTopLevelRule = NoRogueTopLevelRule = NoRogueTopLevelRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Forbids rogue top-level declarations; allows one final if, or one final new of exported class in production files.")
    ], NoRogueTopLevelRule);
  }
});

// dist-many/rules/structure/OneClassPerFileRule.lll.js
var require_OneClassPerFileRule_lll = __commonJS({
  "dist-many/rules/structure/OneClassPerFileRule.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var OneClassPerFileRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OneClassPerFileRule = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var OneClassPerFileRule = OneClassPerFileRule_1 = class OneClassPerFileRule {
      static getRule() {
        return {
          id: "R1",
          title: "One export per file",
          run(sourceFile) {
            return OneClassPerFileRule_1.runRule(sourceFile);
          }
        };
      }
      static runRule(sourceFile) {
        const filePath = sourceFile.getFilePath();
        if (!filePath.endsWith(".ts")) {
          return [];
        }
        if (OneClassPerFileRule_1.isPureReExportBarrel(sourceFile)) {
          return [];
        }
        const exportedClasses = sourceFile.getClasses().filter((c) => c.isExported());
        const exportedTypes = sourceFile.getTypeAliases().filter((t) => t.isExported());
        const exportedInterfaces = sourceFile.getInterfaces().filter((i) => i.isExported());
        const totalExports = exportedClasses.length + exportedTypes.length;
        const exportedFunctions = OneClassPerFileRule_1.collectExportedFunctions(sourceFile);
        const missingExportDiagnostics = OneClassPerFileRule_1.buildMissingOrInvalidExportDiagnostics(sourceFile, totalExports, exportedFunctions, exportedInterfaces);
        if (missingExportDiagnostics.length > 0) {
          return missingExportDiagnostics;
        }
        const exportNameDiagnostics = OneClassPerFileRule_1.buildExportNameMismatchDiagnostics(sourceFile, exportedClasses, exportedTypes);
        if (exportNameDiagnostics.length > 0) {
          return exportNameDiagnostics;
        }
        const extraTopLevelDiagnostics = OneClassPerFileRule_1.buildExtraTopLevelDeclarationDiagnostics(sourceFile, exportedClasses, exportedTypes);
        if (extraTopLevelDiagnostics.length > 0) {
          return extraTopLevelDiagnostics;
        }
        return OneClassPerFileRule_1.buildExtraExportDiagnostics(sourceFile, exportedClasses, exportedTypes, exportedFunctions);
      }
      static collectExportedFunctions(sourceFile) {
        const exportedFunctions = [];
        sourceFile.getFunctions().forEach((func) => {
          if (func.isExported()) {
            exportedFunctions.push(`function ${func.getName()}`);
          }
        });
        return exportedFunctions;
      }
      static buildMissingOrInvalidExportDiagnostics(sourceFile, totalExports, exportedFunctions, exportedInterfaces) {
        if (exportedFunctions.length > 0 && totalExports === 0) {
          return [
            BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Expected exactly one export (class or type), found 0. File exports functions: ${exportedFunctions.join(", ")}.`, "no-export")
          ];
        }
        if (totalExports === 1) {
          return [];
        }
        const interfaceNote = exportedInterfaces.length === 1 ? "You export an interface, it's not allowed. Convert your interface to a type. " : "";
        return [BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Expected exactly one export (class or type), found ${totalExports}. ${interfaceNote}`, "no-export")];
      }
      static buildExportNameMismatchDiagnostics(sourceFile, exportedClasses, exportedTypes) {
        const fileName = sourceFile.getBaseName().replace(".lll.ts", "").replace(".ts", "");
        const isTestFile = FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(sourceFile.getFilePath());
        const exportedName = exportedClasses.length === 1 ? exportedClasses[0].getName() : exportedTypes[0].getName();
        if (isTestFile || exportedName === fileName) {
          return [];
        }
        const exportedKind = exportedClasses.length === 1 ? "class" : "type";
        return [BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `Exported ${exportedKind} name "${exportedName}" must match the filename "${fileName}"`, "name-mismatch")];
      }
      static buildExtraTopLevelDeclarationDiagnostics(sourceFile, exportedClasses, exportedTypes) {
        const primaryClass = exportedClasses.length === 1 ? exportedClasses[0] : void 0;
        const primaryType = exportedTypes.length === 1 ? exportedTypes[0] : void 0;
        const extraTopLevelDeclarations = [];
        sourceFile.getClasses().forEach((classDecl) => {
          if (classDecl !== primaryClass) {
            extraTopLevelDeclarations.push(`class ${classDecl.getName() ?? "(anonymous)"}`);
          }
        });
        sourceFile.getTypeAliases().forEach((typeAlias) => {
          if (typeAlias !== primaryType) {
            extraTopLevelDeclarations.push(`type ${typeAlias.getName() ?? "(anonymous)"}`);
          }
        });
        sourceFile.getInterfaces().forEach((iface) => {
          extraTopLevelDeclarations.push(`interface ${iface.getName() ?? "(anonymous)"}`);
        });
        if (extraTopLevelDeclarations.length === 0) {
          return [];
        }
        const exportType = exportedClasses.length === 1 ? "class" : "type";
        const exportName = exportedClasses.length === 1 ? exportedClasses[0].getName() : exportedTypes[0].getName();
        return [
          BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `File must contain exactly one top-level ${exportType} declaration (${exportName}). Move these declarations to their own files: ${extraTopLevelDeclarations.join(", ")}.`, "extra-top-level")
        ];
      }
      static buildExtraExportDiagnostics(sourceFile, exportedClasses, exportedTypes, exportedFunctions) {
        const allOtherExports = [];
        sourceFile.getVariableStatements().forEach((varStmt) => {
          if (varStmt.isExported()) {
            varStmt.getDeclarations().forEach((decl) => {
              allOtherExports.push(`const ${decl.getName()}`);
            });
          }
        });
        exportedFunctions.forEach((funcName) => {
          allOtherExports.push(funcName);
        });
        sourceFile.getInterfaces().forEach((iface) => {
          if (iface.isExported()) {
            allOtherExports.push(`interface ${iface.getName()}`);
          }
        });
        sourceFile.getEnums().forEach((enumDecl) => {
          if (enumDecl.isExported()) {
            allOtherExports.push(`enum ${enumDecl.getName()}`);
          }
        });
        if (allOtherExports.length === 0) {
          return [];
        }
        const exportType = exportedClasses.length === 1 ? "class" : "type";
        const exportName = exportedClasses.length === 1 ? exportedClasses[0].getName() : exportedTypes[0].getName();
        return [
          BaseRule_lll_12.BaseRule.createError(sourceFile.getFilePath(), `File should export only lll ${exportType} (${exportName}), but also exports: ${allOtherExports.join(", ")}.`, "extra-exports")
        ];
      }
      static isPureReExportBarrel(sourceFile) {
        const statements = sourceFile.getStatements();
        if (statements.length === 0) {
          return false;
        }
        return statements.every((statement) => {
          const exportDeclaration = statement.asKind(ts_morph_1.SyntaxKind.ExportDeclaration);
          return !!exportDeclaration?.getModuleSpecifier();
        });
      }
    };
    exports2.OneClassPerFileRule = OneClassPerFileRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], OneClassPerFileRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Runs one-export-per-file validation for one source file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "runRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects exported function names from one source file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "collectExportedFunctions", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds diagnostics for missing or invalid primary exports."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Number, Array, Array]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "buildMissingOrInvalidExportDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds diagnostics when the exported primary name does not match the filename."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Array, Array]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "buildExportNameMismatchDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds diagnostics for extra top-level class, type, or interface declarations."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Array, Array]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "buildExtraTopLevelDeclarationDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds diagnostics for extra exported declarations beyond the primary class or type."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Array, Array, Array]),
      __metadata2("design:returntype", Array)
    ], OneClassPerFileRule, "buildExtraExportDiagnostics", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Detects files that only re-export from other modules (barrel files)."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], OneClassPerFileRule, "isPureReExportBarrel", null);
    exports2.OneClassPerFileRule = OneClassPerFileRule = OneClassPerFileRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Ensures each file has exactly one exported primary class/type and no additional top-level class/type/interface declarations.")
    ], OneClassPerFileRule);
  }
});

// dist-many/core/testing/paired/PairedHostSupport.lll.js
var require_PairedHostSupport_lll = __commonJS({
  "dist-many/core/testing/paired/PairedHostSupport.lll.js"(exports2) {
    "use strict";
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PairedHostSupport = void 0;
    var ts_morph_1 = require("ts-morph");
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var PairedHostSupport = class PairedHostSupport {
      static getHostFilePath(testFilePath) {
        return FileVariantSupport_lll_1.FileVariantSupport.getPrimaryFilePath(testFilePath);
      }
      static getHostClassName(testFilePath) {
        return FileVariantSupport_lll_1.FileVariantSupport.getHostClassNameFromTestPath(testFilePath);
      }
      static getHostClass(testSourceFile) {
        const hostFilePath = this.getHostFilePath(testSourceFile.getFilePath());
        if (hostFilePath === null) {
          return void 0;
        }
        const hostSourceFile = testSourceFile.getProject().getSourceFile(hostFilePath);
        if (hostSourceFile === void 0) {
          return void 0;
        }
        return BaseRule_lll_12.BaseRule.getExportedClass(hostSourceFile);
      }
      static getHostKind(testSourceFile) {
        const hostClass = this.getHostClass(testSourceFile);
        if (hostClass === void 0) {
          return "instantiable";
        }
        return this.isStaticOnlyHostClass(hostClass) ? "static-only" : "instantiable";
      }
      static isStaticOnlyHostClass(hostClass) {
        return !hostClass.getMembers().some((member) => {
          if (ts_morph_1.Node.isConstructorDeclaration(member)) {
            return true;
          }
          if (ts_morph_1.Node.isMethodDeclaration(member) || ts_morph_1.Node.isPropertyDeclaration(member) || ts_morph_1.Node.isGetAccessorDeclaration(member) || ts_morph_1.Node.isSetAccessorDeclaration(member)) {
            return !member.isStatic();
          }
          return false;
        });
      }
    };
    exports2.PairedHostSupport = PairedHostSupport;
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves the paired production file path represented by a companion test file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], PairedHostSupport, "getHostFilePath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves the paired production class name represented by a companion test file."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], PairedHostSupport, "getHostClassName", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Looks up the paired production class declaration from the same ts-morph project."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Object)
    ], PairedHostSupport, "getHostClass", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Classifies the paired host deterministically: static-only means no constructors and no instance members."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", String)
    ], PairedHostSupport, "getHostKind", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns whether a class is static-only under the companion scenario contract."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Boolean)
    ], PairedHostSupport, "isStaticOnlyHostClass", null);
    exports2.PairedHostSupport = PairedHostSupport = __decorate2([
      (0, lll_lll_12.Spec)("Provides deterministic paired-host lookup and classification for companion test files.")
    ], PairedHostSupport);
  }
});

// dist-many/rules/testing/MustHaveTestRule.lll.js
var require_MustHaveTestRule_lll = __commonJS({
  "dist-many/rules/testing/MustHaveTestRule.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MustHaveTestRule_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MustHaveTestRule = void 0;
    var path = __importStar(require("path"));
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var PairedHostSupport_lll_1 = require_PairedHostSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var MustHaveTestRule = MustHaveTestRule_1 = class MustHaveTestRule {
      static getRule() {
        return {
          id: "R4",
          title: "Must have test companion",
          run(sourceFile) {
            const filePath = sourceFile.getFilePath();
            const variantMatch = MustHaveTestRule_1.getVariantForFile(filePath);
            if (!variantMatch) {
              return [];
            }
            if (variantMatch.isTest) {
              const exportedClass2 = BaseRule_lll_12.BaseRule.getExportedClass(sourceFile);
              if (!exportedClass2) {
                return MustHaveTestRule_1.validateMissingExportedTestClass(sourceFile);
              }
              return MustHaveTestRule_1.validateTestClass(sourceFile, exportedClass2);
            }
            const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(sourceFile);
            if (!exportedClass)
              return [];
            return MustHaveTestRule_1.validatePrimaryClass(sourceFile, exportedClass);
          }
        };
      }
      static validatePrimaryClass(sourceFile, exportedClass) {
        const diagnostics = [];
        const file = sourceFile.getFilePath();
        const illegalScenarios = exportedClass.getMethods().filter((method) => method.isStatic() && BaseRule_lll_12.BaseRule.hasDecorator(method, "Scenario"));
        for (const method of illegalScenarios) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${method.getName()}' must live in a '.test.lll.ts' or '.test2.lll.ts' companion, not inside production class code.`, "missing-test", method.getStartLineNumber()));
        }
        for (const importDecl of sourceFile.getImportDeclarations()) {
          const specifier = importDecl.getModuleSpecifierValue();
          const targetFile = importDecl.getModuleSpecifierSourceFile()?.getFilePath();
          const importsTestFile = specifier.includes(".test.lll") || specifier.includes(".test2.lll") || targetFile !== void 0 && FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(targetFile);
          if (!importsTestFile) {
            continue;
          }
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Production file must not import test module '${specifier}'.`, "test-import-boundary", importDecl.getStartLineNumber()));
        }
        return diagnostics;
      }
      static validateTestClass(sourceFile, exportedClass) {
        const diagnostics = [];
        const file = sourceFile.getFilePath();
        const className = exportedClass.getName() ?? "(anonymous)";
        const expectedHostName = PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file) ?? MustHaveTestRule_1.getExpectedHostClassName(file);
        const expectedTestClassName = FileVariantSupport_lll_1.FileVariantSupport.getExpectedTestClassName(file) ?? `${expectedHostName}Test`;
        if (className !== expectedTestClassName) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test file must export class '${expectedTestClassName}'. Found '${className}'.`, "missing-test", exportedClass.getStartLineNumber()));
        }
        MustHaveTestRule_1.validateTestType(exportedClass, diagnostics, file, className);
        MustHaveTestRule_1.validatePlainCompanionRestrictions(exportedClass, diagnostics, file, className);
        MustHaveTestRule_1.validateHostSideEffectImport(sourceFile, diagnostics, expectedHostName);
        const scenarioMethods = MustHaveTestRule_1.getScenarioMethods(exportedClass);
        if (scenarioMethods.length === 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test class '${className}' must declare at least one static @Scenario method.`, "missing-test", exportedClass.getStartLineNumber()));
          return diagnostics;
        }
        for (const method of scenarioMethods) {
          if (!method.method.isAsync()) {
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${method.method.getName()}' must be async.`, "missing-test", method.method.getStartLineNumber()));
          }
          MustHaveTestRule_1.validateScenarioSignature(sourceFile, method.method, diagnostics, file, className);
        }
        return diagnostics;
      }
      static validateScenarioSignature(sourceFile, method, diagnostics, file, className) {
        const hostKind = PairedHostSupport_lll_1.PairedHostSupport.getHostKind(sourceFile);
        const parameters = method.getParameters();
        if (hostKind === "static-only") {
          if (parameters.length !== 1) {
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${className}.${method.getName()}' must declare exactly one parameter for static-only host '${PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file) ?? "Host"}': (scenario: ScenarioParameter).`, "missing-test", method.getStartLineNumber()));
            return;
          }
          const [scenarioParam2] = parameters;
          const scenarioType2 = scenarioParam2.getTypeNode()?.getText().trim() ?? "";
          if (scenarioParam2.getName() !== "scenario" || scenarioType2 !== "ScenarioParameter") {
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${className}.${method.getName()}' must declare parameters exactly as (scenario: ScenarioParameter) for static-only host '${PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file) ?? "Host"}'.`, "missing-test", method.getStartLineNumber()));
          }
          return;
        }
        if (parameters.length !== 2) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${className}.${method.getName()}' must declare exactly two parameters for instantiable host '${PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file) ?? "Host"}': (subjectFactory: SubjectFactory<Subject>, scenario: ScenarioParameter).`, "missing-test", method.getStartLineNumber()));
          return;
        }
        const [subjectFactoryParam, scenarioParam] = parameters;
        const subjectFactoryType = subjectFactoryParam.getTypeNode()?.getText().trim() ?? "";
        const scenarioType = scenarioParam.getTypeNode()?.getText().trim() ?? "";
        const hasValidContract = subjectFactoryParam.getName() === "subjectFactory" && MustHaveTestRule_1.isValidSubjectFactoryType(subjectFactoryType) && scenarioParam.getName() === "scenario" && scenarioType === "ScenarioParameter";
        if (!hasValidContract) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Scenario method '${className}.${method.getName()}' must declare parameters exactly as (subjectFactory: SubjectFactory<Subject>, scenario: ScenarioParameter) for instantiable host '${PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file) ?? "Host"}'.`, "missing-test", method.getStartLineNumber()));
        }
      }
      static validateMissingExportedTestClass(sourceFile) {
        const file = sourceFile.getFilePath();
        const expectedTestClassName = FileVariantSupport_lll_1.FileVariantSupport.getExpectedTestClassName(file) ?? "(unknown)";
        return [
          BaseRule_lll_12.BaseRule.createError(file, `Test file must export class '${expectedTestClassName}'. No exported class was found.`, "missing-test", sourceFile.getStartLineNumber())
        ];
      }
      static validatePlainCompanionRestrictions(exportedClass, diagnostics, file, className) {
        const extendsClause = exportedClass.getExtends();
        if (extendsClause !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not extend any base class.`, "missing-test", extendsClause.getStartLineNumber()));
        }
        const stylesProp = exportedClass.getStaticProperty("styles");
        if (stylesProp !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not declare static styles.`, "missing-test", stylesProp.getStartLineNumber()));
        }
        const renderMethod = exportedClass.getInstanceMethod("render");
        const staticRenderMethod = exportedClass.getStaticMethod("render");
        const forbiddenRenderMethod = renderMethod ?? staticRenderMethod;
        if (forbiddenRenderMethod !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not declare render().`, "missing-test", forbiddenRenderMethod.getStartLineNumber()));
        }
        const connectedCallback = exportedClass.getInstanceMethod("connectedCallback") ?? exportedClass.getStaticMethod("connectedCallback");
        if (connectedCallback !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not declare connectedCallback().`, "missing-test", connectedCallback.getStartLineNumber()));
        }
        const disconnectedCallback = exportedClass.getInstanceMethod("disconnectedCallback") ?? exportedClass.getStaticMethod("disconnectedCallback");
        if (disconnectedCallback !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not declare disconnectedCallback().`, "missing-test", disconnectedCallback.getStartLineNumber()));
        }
        const customElementDecorator = BaseRule_lll_12.BaseRule.findDecorator(exportedClass, "customElement");
        if (customElementDecorator !== void 0) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test companion class '${className}' must not use @customElement(...).`, "missing-test", customElementDecorator.getStartLineNumber()));
        }
      }
      static validateTestType(exportedClass, diagnostics, file, className) {
        const testTypeProp = exportedClass.getProperties().find((prop) => !prop.isStatic() && prop.getName() === "testType");
        if (!testTypeProp) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test class '${className}' must declare 'testType' with value 'unit' or 'behavioral'.`, "missing-test-type", exportedClass.getStartLineNumber()));
          return null;
        }
        const init = testTypeProp.getInitializer();
        const text = init?.getText().trim();
        const match = text !== void 0 && text.length > 0 ? /^['"`](unit|behavioral)['"`]$/.exec(text) : null;
        const testType = match?.[1];
        if (!testType) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Property '${className}.testType' must be initialized to literal 'unit' or 'behavioral'.`, "bad-test-type", testTypeProp.getStartLineNumber()));
        }
        return testType ?? null;
      }
      static validateHostSideEffectImport(sourceFile, diagnostics, hostClassName) {
        const file = sourceFile.getFilePath();
        const hostPath = MustHaveTestRule_1.getHostPathFromTestPath(file);
        const expectedImportSpecifier = `./${hostClassName}.lll`;
        let hasHostSideEffectImport = false;
        for (const importDecl of sourceFile.getImportDeclarations()) {
          const specifier = importDecl.getModuleSpecifierValue();
          const resolvedPath = importDecl.getModuleSpecifierSourceFile()?.getFilePath();
          const isHostByPath = resolvedPath === hostPath;
          const isHostBySpecifier = specifier === expectedImportSpecifier || specifier === `${expectedImportSpecifier}.ts`;
          if (!isHostByPath && !isHostBySpecifier) {
            continue;
          }
          const hasBindings = importDecl.getDefaultImport() !== void 0 || importDecl.getNamespaceImport() !== void 0 || importDecl.getNamedImports().length > 0;
          if (!hasBindings) {
            hasHostSideEffectImport = true;
            break;
          }
        }
        if (!hasHostSideEffectImport) {
          diagnostics.push(BaseRule_lll_12.BaseRule.createError(file, `Test file must side-effect import host module './${hostClassName}.lll' via 'import "./${hostClassName}.lll"'.`, "missing-test", sourceFile.getStartLineNumber()));
        }
      }
      static getHostPathFromTestPath(testFilePath) {
        return FileVariantSupport_lll_1.FileVariantSupport.getPrimaryFilePath(testFilePath) ?? testFilePath;
      }
      static getExpectedHostClassName(filePath) {
        return FileVariantSupport_lll_1.FileVariantSupport.getHostClassNameFromTestPath(filePath) ?? path.parse(filePath).name;
      }
      static isValidSubjectFactoryType(typeText) {
        const trimmed = typeText.trim();
        if (trimmed.length === 0) {
          return false;
        }
        if (/^SubjectFactory<.+>$/.test(trimmed)) {
          return true;
        }
        return /^\(\s*\)\s*=>\s*.+$/.test(trimmed);
      }
      static getVariantForFile(filePath) {
        return FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
      }
      static getScenarioMethods(classDecl) {
        return classDecl.getMethods().filter((method) => method.isStatic() && BaseRule_lll_12.BaseRule.hasDecorator(method, "Scenario")).map((method) => ({ method }));
      }
    };
    exports2.MustHaveTestRule = MustHaveTestRule;
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the rule configuration object."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], MustHaveTestRule, "getRule", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Ensures production classes keep scenarios in test files and do not import tests."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Array)
    ], MustHaveTestRule, "validatePrimaryClass", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Verifies test files use '<Base>Test' naming, valid testType, plain companion rules, host side-effect import, and scenario contract."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function]),
      __metadata2("design:returntype", Array)
    ], MustHaveTestRule, "validateTestClass", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Requires scenario methods to use the paired-host scenario contract."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Function, Array, String, String]),
      __metadata2("design:returntype", void 0)
    ], MustHaveTestRule, "validateScenarioSignature", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Rejects test companion files that fail to export a class at all."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], MustHaveTestRule, "validateMissingExportedTestClass", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Rejects component-style companion behaviors so companions remain plain orchestration classes."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Array, String, String]),
      __metadata2("design:returntype", void 0)
    ], MustHaveTestRule, "validatePlainCompanionRestrictions", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Ensures testType literal is present on test classes."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Array, String, String]),
      __metadata2("design:returntype", Object)
    ], MustHaveTestRule, "validateTestType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks that test imports its host production module via side-effect import."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function, Array, String]),
      __metadata2("design:returntype", void 0)
    ], MustHaveTestRule, "validateHostSideEffectImport", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the host file path from a test file path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], MustHaveTestRule, "getHostPathFromTestPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Extracts expected host class name from a supported companion test file path."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], MustHaveTestRule, "getExpectedHostClassName", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when a subjectFactory type node matches the supported async-capable factory contract."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], MustHaveTestRule, "isValidSubjectFactoryType", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Determines if a file is a supported primary or test variant."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], MustHaveTestRule, "getVariantForFile", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns static methods decorated with @Scenario."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", Array)
    ], MustHaveTestRule, "getScenarioMethods", null);
    exports2.MustHaveTestRule = MustHaveTestRule = MustHaveTestRule_1 = __decorate2([
      (0, lll_lll_12.Spec)("Enforces dedicated '.test.lll.ts' and '.test2.lll.ts' test classes with valid structure and boundaries.")
    ], MustHaveTestRule);
  }
});

// dist-many/core/rulesEngine/RulesEngine.lll.js
var require_RulesEngine_lll = __commonJS({
  "dist-many/core/rulesEngine/RulesEngine.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RulesEngine = void 0;
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var lll_lll_12 = require_lll_lll();
    var MustHaveDescRule_lll_1 = require_MustHaveDescRule_lll();
    var MustHaveExplicitReturnTypeRule_lll_1 = require_MustHaveExplicitReturnTypeRule_lll();
    var MustHaveSpecHeaderRule_lll_1 = require_MustHaveSpecHeaderRule_lll();
    var MaxFileLengthRule_lll_1 = require_MaxFileLengthRule_lll();
    var MaxFolderBreadthRule_lll_1 = require_MaxFolderBreadthRule_lll();
    var MaxMethodLengthRule_lll_1 = require_MaxMethodLengthRule_lll();
    var NoAnyRule_lll_1 = require_NoAnyRule_lll();
    var NoAssignmentInConditionsRule_lll_1 = require_NoAssignmentInConditionsRule_lll();
    var NoFloatingPromisesRule_lll_1 = require_NoFloatingPromisesRule_lll();
    var NoIgnoredPromisesRule_lll_1 = require_NoIgnoredPromisesRule_lll();
    var NoImplicitTruthinessRule_lll_1 = require_NoImplicitTruthinessRule_lll();
    var NoLooseEqualityRule_lll_1 = require_NoLooseEqualityRule_lll();
    var NoNonNullAssertionRule_lll_1 = require_NoNonNullAssertionRule_lll();
    var NoParameterMutationRule_lll_1 = require_NoParameterMutationRule_lll();
    var NoSwitchFallthroughRule_lll_1 = require_NoSwitchFallthroughRule_lll();
    var NoImplicitPrimitiveCoercionRule_lll_1 = require_NoImplicitPrimitiveCoercionRule_lll();
    var NoRogueTopLevelRule_lll_1 = require_NoRogueTopLevelRule_lll();
    var OneClassPerFileRule_lll_1 = require_OneClassPerFileRule_lll();
    var MustHaveTestRule_lll_1 = require_MustHaveTestRule_lll();
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var ProjectInitiator_lll_12 = require_ProjectInitiator_lll();
    var RulesEngine = class RulesEngine {
      loader;
      constructor(loader) {
        this.loader = loader;
        (0, lll_lll_12.Spec)("Initializes the rules engine with a project loader.");
      }
      runAll(options = {}) {
        const skipTestRules = options.skipTestRules === true;
        const skipTestCoverageDebt = options.skipTestCoverageDebt === true;
        const failSafeMode = options.failSafeMode === true;
        const files = this.loader.getFiles();
        const context = {
          projectRootDir: this.loader.getProjectRootDir(),
          entryFilePath: this.loader.getEntryFilePath(),
          entrySourceRootDir: this.loader.getEntrySourceRootDir()
        };
        const rules = [
          OneClassPerFileRule_lll_1.OneClassPerFileRule.getRule(),
          NoRogueTopLevelRule_lll_1.NoRogueTopLevelRule.getRule(),
          MustHaveSpecHeaderRule_lll_1.MustHaveSpecHeaderRule.getRule(),
          MustHaveDescRule_lll_1.MustHaveDescRule.getRule(),
          MaxFileLengthRule_lll_1.MaxFileLengthRule.getRule(),
          MaxMethodLengthRule_lll_1.MaxMethodLengthRule.getRule(),
          MaxFolderBreadthRule_lll_1.MaxFolderBreadthRule.getRule(),
          NoAssignmentInConditionsRule_lll_1.NoAssignmentInConditionsRule.getRule(),
          NoLooseEqualityRule_lll_1.NoLooseEqualityRule.getRule(),
          NoImplicitTruthinessRule_lll_1.NoImplicitTruthinessRule.getRule(),
          NoSwitchFallthroughRule_lll_1.NoSwitchFallthroughRule.getRule(),
          NoIgnoredPromisesRule_lll_1.NoIgnoredPromisesRule.getRule(),
          NoFloatingPromisesRule_lll_1.NoFloatingPromisesRule.getRule(),
          NoImplicitPrimitiveCoercionRule_lll_1.NoImplicitPrimitiveCoercionRule.getRule(),
          NoAnyRule_lll_1.NoAnyRule.getRule(),
          NoNonNullAssertionRule_lll_1.NoNonNullAssertionRule.getRule(),
          NoParameterMutationRule_lll_1.NoParameterMutationRule.getRule()
        ];
        if (!skipTestRules) {
          rules.push(MustHaveTestRule_lll_1.MustHaveTestRule.getRule());
        }
        rules.push(MustHaveExplicitReturnTypeRule_lll_1.MustHaveExplicitReturnTypeRule.getRule());
        const all = [];
        for (const file of files) {
          const filePath = file.getFilePath();
          if (filePath.endsWith(".old.ts") || filePath.endsWith(".d.old.ts") || filePath.endsWith("/lll.lll.ts")) {
            continue;
          }
          for (const rule of rules) {
            try {
              all.push(...rule.run(file, context));
            } catch (err) {
              all.push({
                file: file.getBaseName(),
                message: `Rule ${rule.id} crashed: ${String(err)}`,
                severity: "error",
                ruleCode: "no-export"
              });
            }
          }
        }
        if (!skipTestRules && failSafeMode) {
          all.push(...this.computeFailSafeCompanionRequirements());
        }
        if (!skipTestCoverageDebt && !failSafeMode) {
          all.push(...this.computeTestCoverage());
        }
        return all;
      }
      computeFailSafeCompanionRequirements() {
        const diagnostics = [];
        const files = this.loader.getFiles();
        for (const file of files) {
          const filePath = file.getFilePath();
          if (this.shouldIgnore(filePath))
            continue;
          const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
          if (!variant || variant.isTest)
            continue;
          const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(file);
          if (!exportedClass)
            continue;
          for (const companionPath of FileVariantSupport_lll_1.FileVariantSupport.getTestFilePaths(filePath, exportedClass.getName())) {
            if (fs.existsSync(companionPath)) {
              continue;
            }
            const relativePrimary = path.relative(process.cwd(), filePath);
            const relativeCompanion = path.relative(process.cwd(), companionPath);
            diagnostics.push(BaseRule_lll_12.BaseRule.createError(filePath, `Fail-safe mode requires companion test file '${relativeCompanion}' for primary class file '${relativePrimary}'.`, "missing-test", exportedClass.getStartLineNumber()));
          }
        }
        return diagnostics;
      }
      computeTestCoverage() {
        const files = this.loader.getFiles();
        const fileByPath = /* @__PURE__ */ new Map();
        for (const f of files) {
          fileByPath.set(f.getFilePath(), f);
        }
        let totalClasses = 0;
        let coveredClasses = 0;
        const uncoveredClassFiles = [];
        for (const file of files) {
          const filePath = file.getFilePath();
          if (this.shouldIgnore(filePath))
            continue;
          const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(filePath);
          if (!variant || variant.isTest)
            continue;
          const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(file);
          if (!exportedClass)
            continue;
          totalClasses++;
          let isCovered = false;
          const testPath = FileVariantSupport_lll_1.FileVariantSupport.getTestFilePath(filePath, exportedClass.getName());
          if (!testPath || !fs.existsSync(testPath)) {
            uncoveredClassFiles.push(path.relative(process.cwd(), filePath));
            continue;
          }
          const testFile = fileByPath.get(testPath);
          if (!testFile) {
            uncoveredClassFiles.push(path.relative(process.cwd(), filePath));
            continue;
          }
          const testClass = BaseRule_lll_12.BaseRule.getExportedClass(testFile);
          if (!testClass) {
            uncoveredClassFiles.push(path.relative(process.cwd(), filePath));
            continue;
          }
          const hasScenario = testClass.getMethods().some((method) => method.isStatic() && BaseRule_lll_12.BaseRule.hasDecorator(method, "Scenario"));
          if (hasScenario) {
            coveredClasses++;
            isCovered = true;
          }
          if (!isCovered) {
            uncoveredClassFiles.push(path.relative(process.cwd(), filePath));
          }
        }
        if (totalClasses === 0) {
          return [];
        }
        const status = this.coverageStatus(totalClasses, coveredClasses);
        const round = (value) => Math.round(value * 10) / 10;
        const currentCoverage = round(status.coveragePercent);
        const currentUncovered = round(status.uncoveredPercent);
        const currentDebt = round(status.displayDebtPercent);
        const action = status.band === "notice" ? "Notice: keep coverage high and continue adding tests for new classes." : status.band === "warning" ? "Warning: add more class companions to reduce test-coverage debt." : status.band === "alert" ? "ALERT: coverage is close to the failure threshold; add tests." : "Error: uncovered classes reached the failure threshold (20% or more).";
        const message = `test coverage debt ${currentDebt}%: ${coveredClasses}/${totalClasses} primary classes are covered with scenario tests (${currentUncovered}% uncovered). ${action}`;
        const showUncovered = status.severity === "warning" || status.severity === "error";
        if (showUncovered && uncoveredClassFiles.length > 0) {
          const preview = uncoveredClassFiles.slice(0, 10);
          const remaining = uncoveredClassFiles.length - preview.length;
          const moreText = remaining > 0 ? ` And ${remaining} many more uncovered.` : "";
          const withList = `${message} Uncovered class files: ${preview.join(", ")}.${moreText}`;
          if (status.severity === "error") {
            return [BaseRule_lll_12.BaseRule.createError("project", withList, "test-coverage")];
          }
          return [BaseRule_lll_12.BaseRule.createWarning("project", withList, "test-coverage")];
        }
        if (status.severity === "error") {
          return [BaseRule_lll_12.BaseRule.createError("project", message, "test-coverage")];
        }
        if (status.severity === "notice") {
          return [BaseRule_lll_12.BaseRule.createNotice("project", message, "test-coverage")];
        }
        return [BaseRule_lll_12.BaseRule.createWarning("project", message, "test-coverage")];
      }
      shouldIgnore(filePath) {
        return filePath.endsWith(".old.ts") || filePath.endsWith(".d.old.ts") || filePath.endsWith("decorators.ts") || filePath.endsWith("/lll.lll.ts");
      }
      coverageStatus(classCount, covered = 0) {
        const classes = Math.max(0, classCount);
        const effectiveCovered = Math.min(Math.max(0, covered), classes);
        const coveragePercent = classes === 0 ? 100 : effectiveCovered / classes * 100;
        const uncoveredPercent = Math.max(0, 100 - coveragePercent);
        const displayDebt = uncoveredPercent / 20 * 100;
        const band = uncoveredPercent < 5 ? "notice" : uncoveredPercent < 15 ? "warning" : uncoveredPercent < 20 ? "alert" : "error";
        return {
          totalClasses: classes,
          coveredClasses: effectiveCovered,
          coveragePercent: Number(coveragePercent.toFixed(2)),
          uncoveredPercent: Number(uncoveredPercent.toFixed(2)),
          displayDebtPercent: Number(displayDebt.toFixed(2)),
          band,
          severity: band === "error" ? "error" : band === "notice" ? "notice" : "warning"
        };
      }
    };
    exports2.RulesEngine = RulesEngine;
    __decorate2([
      (0, lll_lll_12.Spec)("Executes all registered rules and returns diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Array)
    ], RulesEngine.prototype, "runAll", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Requires both supported companion test files for every primary class when fail-safe mode is active."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Array)
    ], RulesEngine.prototype, "computeFailSafeCompanionRequirements", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Calculates project-wide test coverage debt and emits warning/error diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Array)
    ], RulesEngine.prototype, "computeTestCoverage", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Determines whether a file should be skipped from coverage calculations."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], RulesEngine.prototype, "shouldIgnore", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds linear test coverage debt status details from class/test counts."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number, Object]),
      __metadata2("design:returntype", Object)
    ], RulesEngine.prototype, "coverageStatus", null);
    exports2.RulesEngine = RulesEngine = __decorate2([
      (0, lll_lll_12.Spec)("Loads and executes all rules against project files."),
      __metadata2("design:paramtypes", [ProjectInitiator_lll_12.ProjectInitiator])
    ], RulesEngine);
  }
});

// dist-many/core/testing/TestRunner.lll.js
var require_TestRunner_lll = __commonJS({
  "dist-many/core/testing/TestRunner.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var TestRunner_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TestRunner = void 0;
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var ts = __importStar(require("typescript"));
    var ts_morph_1 = require("ts-morph");
    var util = __importStar(require("util"));
    var lll_lll_12 = require_lll_lll();
    var BaseRule_lll_12 = require_BaseRule_lll();
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var ProjectInitiator_lll_12 = require_ProjectInitiator_lll();
    var PairedHostSupport_lll_1 = require_PairedHostSupport_lll();
    var TestRunner = TestRunner_1 = class TestRunner {
      loader;
      projectRoot;
      rootDir;
      outDir;
      constructor(loader, tsconfigPath) {
        this.loader = loader;
        (0, lll_lll_12.Spec)("Initializes runtime paths and decorator-safe browser globals for test execution.");
        TestRunner_1.populateFakeBrowserClassesForDecorators();
        this.projectRoot = path.dirname(tsconfigPath);
        const config = this.loadTsConfig(tsconfigPath);
        this.rootDir = this.resolveRootDir(tsconfigPath, config);
        this.outDir = path.resolve(this.projectRoot, config.compilerOptions?.outDir ?? "dist");
      }
      static populateFakeBrowserClassesForDecorators() {
        const browserClasses = [
          "Window",
          "Document",
          "Node",
          "Element",
          "HTMLElement",
          "HTMLDivElement",
          "HTMLSpanElement",
          "HTMLButtllllement",
          "HTMLInputElement",
          "HTMLTextAreaElement",
          "HTMLSelectElement",
          "HTMLOptillllement",
          "HTMLFormElement",
          "HTMLFieldSetElement",
          "HTMLLegendElement",
          "HTMLParagraphElement",
          "HTMLAnchorElement",
          "HTMLImageElement",
          "HTMLUListElement",
          "HTMLOListElement",
          "HTMLLIElement",
          "HTMLTableElement",
          "HTMLTableCaptillllement",
          "HTMLTableRowElement",
          "HTMLTableCellElement",
          "HTMLTableSectillllement",
          "HTMLHeadElement",
          "HTMLBodyElement",
          "HTMLTitleElement",
          "HTMLMetaElement",
          "HTMLBaseElement",
          "HTMLLinkElement",
          "HTMLScriptElement",
          "HTMLStyleElement",
          "HTMLIFrameElement",
          "HTMLSlotElement",
          "HTMLAudioElement",
          "HTMLVideoElement",
          "HTMLSourceElement",
          "HTMLTrackElement",
          "HTMLPictureElement",
          "HTMLCanvasElement",
          "HTMLMapElement",
          "HTMLAreaElement",
          "HTMLDialogElement",
          "HTMLDetailsElement",
          "HTMLSummaryElement",
          "HTMLProgressElement",
          "HTMLMeterElement",
          "HTMLTimeElement",
          "HTMLDataElement",
          "HTMLQuoteElement",
          "HTMLBlockQuoteElement",
          "HTMLBRElement",
          "HTMLEmbedElement",
          "HTMLObjectElement",
          "HTMLParamElement",
          "HTMLTemplateElement",
          "HTMLDListElement",
          "HTMLDirectoryElement",
          "HTMLMenuElement",
          "HTMLMenuItemElement",
          "HTMLQuoteElement",
          "HTMLPictureElement",
          "HTMLSlotElement",
          "HTMLCanvasElement",
          "HTMLContentElement",
          "HTMLShadowElement",
          "HTMLDetailsElement",
          "HTMLSummaryElement",
          "HTMLDialogElement",
          "HTMLMediaElement",
          "HTMLAudioElement",
          "HTMLVideoElement",
          "HTMLSourceElement",
          "HTMLTrackElement",
          "HTMLMeterElement",
          "HTMLProgressElement",
          "HTMLTimeElement",
          "HTMLHeadingElement",
          "HTMLHRElement",
          "HTMLModElement",
          "HTMLMeterElement",
          "HTMLParagraphElement",
          "HTMLPreElement",
          "HTMLScriptElement",
          "HTMLStyleElement",
          "HTMLTitleElement",
          "HTMLLegendElement",
          "HTMLFieldSetElement",
          "HTMLFormElement",
          "HTMLLabelElement",
          "HTMLInputElement",
          "HTMLKeygenElement",
          "HTMLObjectElement",
          "HTMLSelectElement",
          "HTMLSlotElement",
          "HTMLSourceElement",
          "HTMLTemplateElement",
          "HTMLTrackElement",
          "HTMLVideoElement",
          "SVGElement",
          "SVGSVGElement",
          "SVGGraphicsElement",
          "SVGGElement",
          "SVGRectElement",
          "SVGImageElement",
          "SVGPathElement",
          "SVGPolygllllement",
          "SVGPolylineElement",
          "SVGCircleElement",
          "SVGEllipseElement",
          "SVGLineElement",
          "SVGTextElement",
          "SVGPatternElement",
          "SVGMarkerElement",
          "SVGGradientElement",
          "SVGFilterElement",
          "SVGDefsElement",
          "SVGClipPathElement",
          "SVGMaskElement",
          "SVGForeignObjectElement",
          "SVGUseElement",
          "SVGSymbolElement",
          "SVGTitleElement",
          "SVGDescElement",
          "SpeechSynthesisUtterance",
          "MutationObserver",
          "IntersectionObserver",
          "ResizeObserver",
          "PerformanceObserver",
          "AbortController",
          "AbortSignal",
          "Crypto",
          "SubtleCrypto",
          "URL",
          "URLSearchParams",
          "History",
          "Location",
          "Navigator",
          "Screen",
          "DeviceMotilllvent",
          "DeviceOrientatilllvent",
          "MediaStream",
          "MediaStreamTrack",
          "MediaRecorder",
          "WebSocket",
          "EventSource",
          "Worker",
          "SharedWorker",
          "MessageChannel",
          "BroadcastChannel",
          "FileReader",
          "Blob",
          "File",
          "FormData",
          "DataTransfer",
          "DataTransferItem"
        ];
        const target = globalThis;
        for (const className of browserClasses) {
          target[className] = target[className] || {};
        }
      }
      async runAll() {
        const diagnostics = [];
        const reports = [];
        const testClasses = this.listTestClasses();
        for (const testClass of testClasses) {
          const { file, exportedClass, className, relativeFile } = testClass;
          const scenarioEntries = this.getScenarioMethods(exportedClass);
          if (scenarioEntries.length === 0) {
            continue;
          }
          const testType = this.getTestTypeLiteral(exportedClass);
          if (!testType) {
            diagnostics.push(this.createMissingTestTypeDiagnostic(relativeFile, className, exportedClass.getStartLineNumber()));
            continue;
          }
          if (testType === "behavioral") {
            continue;
          }
          const runtimeClass = this.loadRuntimeExport(file, className);
          if (!runtimeClass) {
            diagnostics.push(this.createModuleDiagnostic(file.getFilePath(), className));
            continue;
          }
          const hostKind = PairedHostSupport_lll_1.PairedHostSupport.getHostKind(file);
          const hostClassName = PairedHostSupport_lll_1.PairedHostSupport.getHostClassName(file.getFilePath()) ?? className.replace(/Test2?$/, "");
          const runtimeHostClass = hostKind === "instantiable" ? this.loadRuntimeExportByPath(file.getFilePath(), hostClassName, PairedHostSupport_lll_1.PairedHostSupport.getHostFilePath(file.getFilePath())) : null;
          if (hostKind === "instantiable" && runtimeHostClass === null) {
            diagnostics.push(this.createModuleDiagnostic(file.getFilePath(), hostClassName));
            continue;
          }
          const report = {
            className,
            filePath: relativeFile,
            line: exportedClass.getStartLineNumber(),
            scenarios: []
          };
          for (const entry of scenarioEntries) {
            const methodName = entry.method.getName();
            if (!methodName) {
              continue;
            }
            const scenarioName = entry.metadata.title ?? entry.metadata.id ?? methodName;
            const context = {
              className,
              filePath: relativeFile,
              scenarioMethodName: methodName,
              scenarioName,
              line: entry.method.getStartLineNumber()
            };
            const failure = await this.runScenarioUnit(context, runtimeClass, hostKind, runtimeHostClass);
            report.scenarios.push({
              id: entry.metadata.id,
              title: entry.metadata.title,
              name: scenarioName,
              status: failure === null ? "passed" : "failed"
            });
            if (failure !== null) {
              diagnostics.push(failure);
            }
          }
          reports.push(report);
        }
        return { diagnostics, reports };
      }
      summarizeInventory() {
        const behavioralTests = [];
        const testClasses = this.listTestClasses();
        for (const testClass of testClasses) {
          const testType = this.getTestTypeLiteral(testClass.exportedClass);
          if (testType !== "behavioral") {
            continue;
          }
          behavioralTests.push({
            className: testClass.className,
            filePath: testClass.relativeFile,
            line: testClass.exportedClass.getStartLineNumber()
          });
        }
        behavioralTests.sort((a, b) => {
          const byPath = a.filePath.localeCompare(b.filePath);
          if (byPath !== 0) {
            return byPath;
          }
          const byLine = a.line - b.line;
          if (byLine !== 0) {
            return byLine;
          }
          return a.className.localeCompare(b.className);
        });
        return {
          hasBehavioralTests: behavioralTests.length > 0,
          behavioralTests
        };
      }
      loadTsConfig(configPath) {
        const raw = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(raw);
      }
      resolveRootDir(configPath, config) {
        const configuredRootDir = config.compilerOptions?.rootDir;
        if (configuredRootDir !== void 0 && configuredRootDir.length > 0) {
          return path.resolve(this.projectRoot, configuredRootDir);
        }
        const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
        if (configFile.error !== void 0) {
          return path.resolve(this.projectRoot, "src");
        }
        const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, this.projectRoot);
        const commonSourceDirectory = ts.getCommonSourceDirectory(parsed.options, () => parsed.fileNames, this.projectRoot, ts.sys.useCaseSensitiveFileNames ? (fileName) => fileName : (fileName) => fileName.toLowerCase());
        if (commonSourceDirectory.length > 0) {
          return path.resolve(commonSourceDirectory);
        }
        return path.resolve(this.projectRoot, "src");
      }
      getScenarioMethods(classDecl) {
        return classDecl.getMethods().filter((method) => method.isStatic() && BaseRule_lll_12.BaseRule.hasDecorator(method, "Scenario")).map((method) => ({
          method,
          metadata: this.getScenarioMetadata(method)
        }));
      }
      getTestTypeLiteral(classDecl) {
        const testTypeProp = classDecl.getProperties().find((prop) => !prop.isStatic() && prop.getName() === "testType");
        const init = testTypeProp?.getInitializer();
        const text = init?.getText().trim();
        const match = text !== void 0 && text.length > 0 ? /^['"`](unit|behavioral)['"`]$/.exec(text) : null;
        return match?.[1] ?? null;
      }
      listTestClasses() {
        const records = [];
        const files = this.loader.getFiles();
        for (const file of files) {
          const variant = FileVariantSupport_lll_1.FileVariantSupport.getVariantForFile(file.getFilePath());
          if (!variant || !variant.isTest) {
            continue;
          }
          const exportedClass = BaseRule_lll_12.BaseRule.getExportedClass(file);
          if (!exportedClass) {
            continue;
          }
          const className = exportedClass.getName();
          if (!className || !className.endsWith(variant.variant.testClassSuffix)) {
            continue;
          }
          records.push({
            file,
            exportedClass,
            className,
            relativeFile: this.toProjectRelativePath(file.getFilePath())
          });
        }
        return records.sort((a, b) => {
          const byPath = a.relativeFile.localeCompare(b.relativeFile);
          if (byPath !== 0) {
            return byPath;
          }
          const byLine = a.exportedClass.getStartLineNumber() - b.exportedClass.getStartLineNumber();
          if (byLine !== 0) {
            return byLine;
          }
          return a.className.localeCompare(b.className);
        });
      }
      loadRuntimeExport(sourceFile, exportName) {
        return this.loadRuntimeExportByPath(sourceFile.getFilePath(), exportName);
      }
      loadRuntimeExportByPath(sourcePath, exportName, overridePath) {
        const compiledPath = this.getCompiledPath(overridePath ?? sourcePath);
        if (!compiledPath || !fs.existsSync(compiledPath)) {
          return null;
        }
        const exports3 = require(compiledPath);
        const classRef = exports3[exportName];
        return typeof classRef === "object" || typeof classRef === "function" ? classRef : null;
      }
      getCompiledPath(sourcePath) {
        const relative = path.relative(this.rootDir, sourcePath);
        if (relative.startsWith("..")) {
          return null;
        }
        const parsed = path.parse(relative);
        const compiledFile = path.join(this.outDir, parsed.dir, `${parsed.name}.js`);
        return compiledFile;
      }
      async runScenarioUnit(context, runtimeClass, hostKind, runtimeHostClass) {
        const capturedLogs = [];
        const restoreConsole = this.hookConsole(capturedLogs);
        const scenario = this.createScenarioParameter();
        try {
          const scenarioFn = runtimeClass[context.scenarioMethodName];
          if (typeof scenarioFn !== "function") {
            return this.createMissingScenarioDiagnostic(context);
          }
          try {
            if (hostKind === "static-only") {
              await Reflect.apply(scenarioFn, runtimeClass, [scenario]);
            } else {
              const subjectFactory = this.createSubjectFactory(runtimeHostClass, context);
              await Reflect.apply(scenarioFn, runtimeClass, [subjectFactory, scenario]);
            }
          } catch (error) {
            return this.buildDiagnostic(context, "scenario", error, capturedLogs, "");
          }
          return null;
        } finally {
          restoreConsole();
        }
      }
      createScenarioParameter() {
        return {
          input: {},
          assert: this.createAssert(),
          waitFor: this.createWaitFor()
        };
      }
      createSubjectFactory(runtimeHostClass, context) {
        let cachedSubject;
        let hasCachedSubject = false;
        return async () => {
          if (hasCachedSubject) {
            return cachedSubject;
          }
          if (typeof runtimeHostClass !== "function") {
            throw new Error(`Paired host class for '${context.className}' is unavailable at runtime.`);
          }
          cachedSubject = Reflect.construct(runtimeHostClass, []);
          hasCachedSubject = true;
          return cachedSubject;
        };
      }
      getScenarioMetadata(method) {
        const decorator = BaseRule_lll_12.BaseRule.findDecorator(method, "Scenario");
        if (!decorator) {
          return {};
        }
        const args = decorator.getArguments();
        return {
          id: this.getArgumentString(args[0]?.getText()),
          title: this.getArgumentString(args[1]?.getText())
        };
      }
      getArgumentString(text) {
        if (!text) {
          return void 0;
        }
        const first = text[0];
        const last = text[text.length - 1];
        if ((first === '"' || first === "'" || first === "`") && last === first) {
          return text.slice(1, -1);
        }
        return text;
      }
      toProjectRelativePath(filePath) {
        const relative = path.relative(this.projectRoot, filePath);
        if (!relative || relative.startsWith("..")) {
          return filePath;
        }
        return relative;
      }
      createModuleDiagnostic(file, className) {
        const relativeOutDir = path.relative(this.projectRoot, this.outDir);
        return {
          file,
          line: 0,
          message: `Test runner could not load compiled class '${className}'. Please compile TypeScript to JavaScript before running tests. Expected output folder is '${relativeOutDir}'.`,
          severity: "error",
          ruleCode: this.getRuleCode()
        };
      }
      createMissingScenarioDiagnostic(context) {
        return BaseRule_lll_12.BaseRule.createError(context.filePath, `Scenario method '${context.scenarioMethodName}' on '${context.className}' was not found at runtime.`, this.getRuleCode(), context.line);
      }
      createMissingTestTypeDiagnostic(file, className, line) {
        return BaseRule_lll_12.BaseRule.createError(file, `Test class '${className}' must declare testType = 'unit' | 'behavioral'.`, this.getRuleCode(), line);
      }
      buildDiagnostic(context, phase, error, logs, htmlSnapshot) {
        const messageLines = [
          `Test ${context.className}.${context.scenarioMethodName} scenario "${context.scenarioName}" failed during ${phase}.`,
          `Reason: ${this.formatError(error)}`
        ];
        const cleanedHtml = htmlSnapshot.trim();
        if (cleanedHtml.length > 0) {
          messageLines.push(`DOM snapshot:
${cleanedHtml.slice(0, 100)}...`);
        }
        if (logs.length > 0) {
          messageLines.push(`Captured logs:
${logs.join("\n")}`);
        }
        return {
          file: context.filePath,
          line: context.line,
          message: messageLines.join("\n\n"),
          severity: "error",
          ruleCode: this.getRuleCode()
        };
      }
      formatError(error) {
        if (error instanceof Error) {
          const stack = error.stack ?? error.message ?? String(error);
          const lines = stack.split("\n").map((line) => line.trimEnd());
          if (lines.length <= 3) {
            return lines.join("\n");
          }
          const [headline, ...rest] = lines;
          const shortened = rest.slice(-2);
          return [headline, ...shortened].join("\n");
        }
        if (typeof error === "string") {
          return error;
        }
        return util.inspect(error, { depth: 4, colors: false });
      }
      createAssert() {
        return (condition, message = "Assertion failed") => {
          if (!condition) {
            throw new Error(message);
          }
        };
      }
      createWaitFor() {
        return async (predicate, message, timeoutMs = 1200, intervalMs = 20) => {
          const startTime = Date.now();
          while (Date.now() - startTime < timeoutMs) {
            if (await predicate()) {
              return;
            }
            await this.sleep(intervalMs);
          }
          throw new Error(`Condition was not met within ${timeoutMs}ms: ${message}`);
        };
      }
      async sleep(durationMs) {
        await new Promise((resolve) => setTimeout(resolve, durationMs));
      }
      hookConsole(logs) {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        console.log = (...args) => {
          logs.push(this.formatLog("log", args));
        };
        console.warn = (...args) => {
          logs.push(this.formatLog("warn", args));
        };
        console.error = (...args) => {
          logs.push(this.formatLog("error", args));
        };
        return () => {
          console.log = originalLog;
          console.warn = originalWarn;
          console.error = originalError;
        };
      }
      formatLog(level, args) {
        const rendered = args.map((arg) => typeof arg === "string" ? arg : util.inspect(arg, { depth: 4, colors: false }));
        return `[${level}] ${rendered.join(" ")}`;
      }
      getRuleCode() {
        return "test-failure";
      }
    };
    exports2.TestRunner = TestRunner;
    __decorate2([
      (0, lll_lll_12.Spec)("Executes every discovered test class and returns diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Promise)
    ], TestRunner.prototype, "runAll", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds deterministic inventory data for behavioral test classes."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "summarizeInventory", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reads compiler options for locating compiled files."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "loadTsConfig", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves the effective source root, matching TypeScript when rootDir is omitted."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", String)
    ], TestRunner.prototype, "resolveRootDir", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns static scenario methods decorated with @Scenario."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.ClassDeclaration]),
      __metadata2("design:returntype", Array)
    ], TestRunner.prototype, "getScenarioMethods", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reads testType literal from the source class."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.ClassDeclaration]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "getTestTypeLiteral", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collects executable test classes from discovered companion test files in deterministic order."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Array)
    ], TestRunner.prototype, "listTestClasses", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Requires the compiled JS module and returns the requested exported binding."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.SourceFile, String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "loadRuntimeExport", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Requires the compiled JS module for a given path and returns the requested exported binding."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, Object]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "loadRuntimeExportByPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Maps a source file path to its compiled JavaScript output."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "getCompiledPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Executes a scenario method in unit mode, returning diagnostic on failure."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object, String, Object]),
      __metadata2("design:returntype", Promise)
    ], TestRunner.prototype, "runScenarioUnit", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the shared scenario helper object passed into scenario methods."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "createScenarioParameter", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds an async-capable subject factory that creates a fresh host instance per scenario run."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object]),
      __metadata2("design:returntype", Function)
    ], TestRunner.prototype, "createSubjectFactory", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Extracts decorator arguments for reporting."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.MethodDeclaration]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "getScenarioMetadata", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Converts a decorator argument text into a usable string."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "getArgumentString", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Derives a project-relative path when possible for reporting."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], TestRunner.prototype, "toProjectRelativePath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports missing compiled module for a class."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "createModuleDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports when a scenario method is undefined at runtime."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "createMissingScenarioDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reports missing testType declaration at runtime."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, Number]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "createMissingTestTypeDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Formats scenario failure details."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, Object, Array, String]),
      __metadata2("design:returntype", Object)
    ], TestRunner.prototype, "buildDiagnostic", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Produces a human-readable error message."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", String)
    ], TestRunner.prototype, "formatError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Creates an assertion helper used inside scenarios."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Function)
    ], TestRunner.prototype, "createAssert", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Creates a polling helper for asynchronous scenario conditions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Function)
    ], TestRunner.prototype, "createWaitFor", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Sleeps between waitFor polling attempts."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number]),
      __metadata2("design:returntype", Promise)
    ], TestRunner.prototype, "sleep", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Captures console output during scenario execution."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array]),
      __metadata2("design:returntype", Function)
    ], TestRunner.prototype, "hookConsole", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Formats console output for diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Array]),
      __metadata2("design:returntype", String)
    ], TestRunner.prototype, "formatLog", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns the diagnostic rule code used by this runner."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", String)
    ], TestRunner.prototype, "getRuleCode", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Adds browser-like global class placeholders used by decorator metadata in Node runtime."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", void 0)
    ], TestRunner, "populateFakeBrowserClassesForDecorators", null);
    exports2.TestRunner = TestRunner = TestRunner_1 = __decorate2([
      (0, lll_lll_12.Spec)("Executes unit scenarios inside supported companion test classes and summarizes behavioral test inventory."),
      __metadata2("design:paramtypes", [ProjectInitiator_lll_12.ProjectInitiator, String])
    ], TestRunner);
  }
});

// dist-many/core/tunnel/ClientTunnelRunner.lll.js
var require_ClientTunnelRunner_lll = __commonJS({
  "dist-many/core/tunnel/ClientTunnelRunner.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ClientTunnelRunner_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ClientTunnelRunner = void 0;
    var childProcess = __importStar(require("child_process"));
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var util = __importStar(require("util"));
    var lll_lll_12 = require_lll_lll();
    var ClientTunnelRunner = class ClientTunnelRunner {
      static {
        ClientTunnelRunner_1 = this;
      }
      loadPlaywright;
      installChromium;
      static progressBindingName = "FIXED_llltsReportProgress";
      static progressReadTimeoutMs = 250;
      constructor(loadPlaywright = () => require("playwright"), installChromium = async () => this.installChromiumWithPlaywrightCli()) {
        this.loadPlaywright = loadPlaywright;
        this.installChromium = installChromium;
        (0, lll_lll_12.Spec)("Initializes client tunnel runner with injectable playwright loader.");
      }
      async run(input) {
        const consoleErrors = [];
        let currentPhase = "preflight";
        let browser = null;
        let context = null;
        let page = null;
        let timeoutPhase = "navigation";
        let lastProgressContext = void 0;
        try {
          const playwright = this.loadPlaywright();
          if (!playwright.chromium || typeof playwright.chromium.launch !== "function") {
            return {
              status: "runtime_error",
              message: "Playwright chromium launcher is unavailable. Install 'playwright' and retry."
            };
          }
          const browserInstance = await this.launchChromiumWithRecovery(playwright.chromium, input.headed);
          if ("status" in browserInstance) {
            return browserInstance;
          }
          browser = browserInstance;
          const contextInstance = await browserInstance.newContext();
          context = contextInstance;
          page = await contextInstance.newPage();
          await this.exposeProgressBinding(page, (progressContext) => {
            lastProgressContext = progressContext;
          });
          const automaticUrl = this.buildAutomaticTunnelUrl(input.url, this.resolvePerStepTimeoutMs(input.timeoutMs));
          this.attachConsoleErrorListeners(page, consoleErrors, () => currentPhase);
          await page.goto(automaticUrl, { waitUntil: "domcontentloaded" });
          await this.waitForConsoleStabilization();
          const preflightConsoleErrors = this.filterConsoleErrorsByPhase(consoleErrors, "preflight");
          if (preflightConsoleErrors.length > 0) {
            return {
              status: "console_error",
              consoleErrors: preflightConsoleErrors
            };
          }
          currentPhase = "scenario";
          timeoutPhase = "scenario";
          await page.waitForFunction(() => typeof globalThis.FIXED_llltsLastRunReport === "string", { timeout: input.timeoutMs });
          const reportTextRaw = await page.evaluate(() => globalThis.FIXED_llltsLastRunReport);
          const reportJson = await page.evaluate(() => globalThis.FIXED_llltsLastRunReportJson);
          const reportText = typeof reportTextRaw === "string" ? reportTextRaw : String(reportTextRaw ?? "");
          await this.waitForConsoleStabilization();
          const scenarioConsoleErrors = this.filterConsoleErrorsByPhase(consoleErrors, "scenario");
          if (scenarioConsoleErrors.length > 0) {
            return {
              status: "console_error",
              reportText,
              reportJson,
              consoleErrors: scenarioConsoleErrors
            };
          }
          return {
            status: this.reportIndicatesFailure(reportText) ? "failed" : "passed",
            reportText,
            reportJson
          };
        } catch (error) {
          const timeoutContext = this.isTimeoutError(error) ? await this.readTimeoutContext(page, timeoutPhase, lastProgressContext) : void 0;
          return this.mapRuntimeError(error, timeoutContext);
        } finally {
          await this.safeClose(context);
          await this.safeClose(browser);
        }
      }
      async exposeProgressBinding(page, onProgress) {
        await page.exposeBinding(ClientTunnelRunner_1.progressBindingName, (_source, rawProgress) => {
          onProgress(this.normalizeTimeoutContext(rawProgress, "scenario"));
        });
      }
      async readTimeoutContext(page, timeoutPhase, lastProgressContext) {
        const fallbackContext = timeoutPhase === "scenario" && lastProgressContext?.phase === "scenario" ? lastProgressContext : { phase: timeoutPhase };
        if (page === null || timeoutPhase !== "scenario") {
          return fallbackContext;
        }
        if (lastProgressContext?.phase === "scenario" && this.hasTimeoutTarget(lastProgressContext)) {
          return lastProgressContext;
        }
        try {
          const raw = await this.withTimeout(page.evaluate(() => globalThis.FIXED_llltsRunProgressJson), ClientTunnelRunner_1.progressReadTimeoutMs, "Timed out while reading browser progress.");
          return this.normalizeTimeoutContext(raw, timeoutPhase);
        } catch {
          return fallbackContext;
        }
      }
      normalizeTimeoutContext(raw, timeoutPhase) {
        const context = { phase: timeoutPhase };
        if (!raw || typeof raw !== "object") {
          return context;
        }
        const record = raw;
        const testPath = this.nonEmptyString(record.testPath);
        const scenarioName = this.nonEmptyString(record.scenarioName);
        const scenarioMethodName = this.nonEmptyString(record.scenarioMethodName);
        if (testPath !== void 0) {
          context.testPath = testPath;
        }
        if (scenarioName !== void 0) {
          context.scenarioName = scenarioName;
        }
        if (scenarioMethodName !== void 0) {
          context.scenarioMethodName = scenarioMethodName;
        }
        return context;
      }
      hasTimeoutTarget(context) {
        return typeof context.testPath === "string" && context.testPath.length > 0 || typeof context.scenarioName === "string" && context.scenarioName.length > 0 || typeof context.scenarioMethodName === "string" && context.scenarioMethodName.length > 0;
      }
      nonEmptyString(value) {
        if (typeof value !== "string") {
          return void 0;
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : void 0;
      }
      attachConsoleErrorListeners(page, consoleErrors, getPhase) {
        page.on("pageerror", (error) => {
          consoleErrors.push({
            phase: getPhase(),
            source: "pageerror",
            text: this.formatError(error)
          });
        });
        page.on("console", (message) => {
          const normalized = this.normalizeConsoleMessageError(message);
          if (normalized === null) {
            return;
          }
          consoleErrors.push({
            phase: getPhase(),
            source: "console.error",
            text: normalized.text,
            location: normalized.location
          });
        });
      }
      normalizeConsoleMessageError(message) {
        if (!message || typeof message !== "object") {
          return null;
        }
        const consoleMessage = message;
        if (typeof consoleMessage.type !== "function" || consoleMessage.type() !== "error") {
          return null;
        }
        const text = typeof consoleMessage.text === "function" ? consoleMessage.text().trim() : String(message).trim();
        if (text.length === 0) {
          return null;
        }
        const rawLocation = typeof consoleMessage.location === "function" ? consoleMessage.location() : null;
        const location = rawLocation !== null && typeof rawLocation === "object" ? {
          url: typeof rawLocation.url === "string" && rawLocation.url.length > 0 ? rawLocation.url : void 0,
          lineNumber: typeof rawLocation.lineNumber === "number" ? rawLocation.lineNumber : void 0,
          columnNumber: typeof rawLocation.columnNumber === "number" ? rawLocation.columnNumber : void 0
        } : void 0;
        if (this.shouldIgnoreConsoleErrorText(text, location)) {
          return null;
        }
        return { text, location };
      }
      shouldIgnoreConsoleErrorText(text, location) {
        return this.isViteLocalhostWebsocketConsoleError(text, location) || this.isViteLocalhostBadGatewayConsoleError(text, location);
      }
      isViteLocalhostWebsocketConsoleError(text, location) {
        return text.startsWith("WebSocket connection to 'ws://localhost:") && text.includes("' failed:") && this.isViteLocation(location);
      }
      isViteLocalhostBadGatewayConsoleError(text, location) {
        return text.startsWith("Failed to load resource: the server responded with a status of 502") && typeof location?.url === "string" && location.url.startsWith("http://localhost:") && this.isViteOwnedLocalhostLocation(location);
      }
      isViteLocation(location) {
        return typeof location?.url === "string" && location.url.includes("@vite");
      }
      isViteOwnedLocalhostLocation(location) {
        return this.isViteLocation(location) || this.isAutomaticTunnelLocation(location);
      }
      isAutomaticTunnelLocation(location) {
        if (typeof location?.url !== "string" || !location.url.startsWith("http://localhost:")) {
          return false;
        }
        try {
          return new URL(location.url).searchParams.get("automatic") === "true";
        } catch {
          return location.url.includes("automatic=true");
        }
      }
      async waitForConsoleStabilization() {
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 50);
        });
      }
      filterConsoleErrorsByPhase(consoleErrors, phase) {
        const filtered = consoleErrors.filter((error) => error.phase === phase);
        return this.deduplicateConsoleErrors(filtered);
      }
      deduplicateConsoleErrors(consoleErrors) {
        const seen = /* @__PURE__ */ new Set();
        const unique = [];
        for (const error of consoleErrors) {
          const location = error.location ?? {};
          const key = [
            error.phase,
            error.source,
            error.text,
            location.url ?? "",
            String(location.lineNumber ?? ""),
            String(location.columnNumber ?? "")
          ].join("|");
          if (seen.has(key)) {
            continue;
          }
          seen.add(key);
          unique.push(error);
        }
        return unique;
      }
      reportIndicatesFailure(reportText) {
        const lines = String(reportText || "").split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);
        const lastLine = lines.length > 0 ? lines[lines.length - 1] : "";
        return /failed/i.test(lastLine);
      }
      buildAutomaticTunnelUrl(url, stepTimeoutMs) {
        const automatic_url_key = "automatic";
        const step_timeout_url_key = "stepTimeoutMs";
        try {
          const parsedUrl = new URL(url);
          parsedUrl.searchParams.set(automatic_url_key, "true");
          parsedUrl.searchParams.set(step_timeout_url_key, String(stepTimeoutMs));
          return parsedUrl.toString();
        } catch {
          const separator = url.includes("?") ? "&" : "?";
          return `${url}${separator}${automatic_url_key}=true&${step_timeout_url_key}=${stepTimeoutMs}`;
        }
      }
      resolvePerStepTimeoutMs(timeoutMs) {
        if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
          return 1e4;
        }
        return Math.min(timeoutMs, 1e4);
      }
      mapRuntimeError(error, timeoutContext) {
        const message = this.formatError(error);
        if (this.isTimeoutError(error)) {
          return {
            status: "timeout",
            message,
            timeoutContext
          };
        }
        return {
          status: "runtime_error",
          message
        };
      }
      isTimeoutError(error) {
        if (!(error instanceof Error)) {
          return false;
        }
        return error.name === "TimeoutError" || /timeout/i.test(error.message);
      }
      async launchChromiumWithRecovery(browserType, headed) {
        try {
          return await browserType.launch({ headless: !headed });
        } catch (error) {
          if (!this.isMissingPlaywrightExecutableError(error)) {
            throw error;
          }
          try {
            await this.installChromium();
          } catch (installError) {
            return {
              status: "runtime_error",
              message: this.buildChromiumInstallFailureMessage(installError)
            };
          }
          try {
            return await browserType.launch({ headless: !headed });
          } catch (retryError) {
            if (this.isMissingPlaywrightExecutableError(retryError)) {
              return {
                status: "runtime_error",
                message: this.buildChromiumInstallFailureMessage(retryError)
              };
            }
            throw retryError;
          }
        }
      }
      isMissingPlaywrightExecutableError(error) {
        const message = this.formatError(error).toLowerCase();
        return message.includes("executable doesn't exist") || message.includes("browser executable") || message.includes("please run the following command") || message.includes("playwright was just installed or updated");
      }
      async installChromiumWithPlaywrightCli() {
        const cliPath = this.resolvePlaywrightCliPath();
        const output = await new Promise((resolve, reject) => {
          const child = childProcess.spawn(process.execPath, [cliPath, "install", "chromium"], { stdio: ["ignore", "pipe", "pipe"] });
          let collected = "";
          child.stdout.on("data", (chunk) => {
            collected += String(chunk);
          });
          child.stderr.on("data", (chunk) => {
            collected += String(chunk);
          });
          child.on("error", reject);
          child.on("close", (code) => {
            if (code === 0) {
              resolve(collected);
              return;
            }
            const detail = this.truncateStack(collected.trim());
            reject(new Error(detail.length > 0 ? detail : `Playwright install exited with code ${code ?? "unknown"}.`));
          });
        });
        if (output.trim().length === 0) {
          return;
        }
      }
      resolvePlaywrightCliPath() {
        const packageJsonPath = require.resolve("playwright/package.json");
        const packageDir = path.dirname(packageJsonPath);
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
        const cliRelativePath = typeof packageJson.bin === "string" ? packageJson.bin : packageJson.bin?.playwright;
        if (typeof cliRelativePath !== "string" || cliRelativePath.trim().length === 0) {
          throw new Error("Installed Playwright package does not declare a usable CLI entry.");
        }
        const cliPath = path.resolve(packageDir, cliRelativePath);
        if (!fs.existsSync(cliPath)) {
          throw new Error(`Resolved Playwright CLI path does not exist: ${cliPath}`);
        }
        return cliPath;
      }
      buildChromiumInstallFailureMessage(error) {
        const detail = this.formatError(error);
        const message = [
          "Playwright Chromium was missing.",
          "EvidyTS attempted to install it automatically but Chromium is still unavailable.",
          "If this keeps happening, the project environment is blocking the Playwright installer and needs maintainer attention."
        ].join(" ");
        if (detail.length === 0) {
          return message;
        }
        return `${message}
${detail}`;
      }
      formatError(error) {
        if (error instanceof Error) {
          return this.truncateStack(error.stack ?? error.message ?? String(error));
        }
        if (typeof error === "string") {
          return this.truncateStack(error);
        }
        return this.truncateStack(util.inspect(error, { depth: 4, colors: false }));
      }
      truncateStack(text) {
        const lines = String(text).split(/\r?\n/).map((line) => line.trimEnd()).filter((line) => line.length > 0);
        if (lines.length <= 3) {
          return lines.join("\n");
        }
        return `${lines.slice(0, 3).join("\n")}
showing 3 of ${lines.length} total`;
      }
      async safeClose(target) {
        if (!target || typeof target.close !== "function") {
          return;
        }
        try {
          await target.close();
        } catch {
        }
      }
      async withTimeout(promise, timeoutMs, timeoutMessage) {
        let timeoutHandle = null;
        try {
          return await Promise.race([
            promise,
            new Promise((_resolve, reject) => {
              timeoutHandle = setTimeout(() => {
                reject(new Error(timeoutMessage));
              }, timeoutMs);
            })
          ]);
        } finally {
          if (timeoutHandle !== null) {
            clearTimeout(timeoutHandle);
          }
        }
      }
    };
    exports2.ClientTunnelRunner = ClientTunnelRunner;
    __decorate2([
      (0, lll_lll_12.Spec)("Launches browser, waits for the fixed report variable, and returns parsed behavioral status."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "run", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Receives browser-side test progress from the overlay before a stuck page can block evaluate calls."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Function]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "exposeProgressBinding", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reads overlay progress so timeout messages can identify the active test or scenario."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object, Object]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "readTimeoutContext", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Normalizes overlay progress into the timeout context shape used by compiler diagnostics."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "normalizeTimeoutContext", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when timeout context identifies at least one concrete execution target."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "hasTimeoutTarget", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns trimmed strings for optional progress fields."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "nonEmptyString", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Attaches browser listeners that capture runtime errors with phase metadata."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object, Function]),
      __metadata2("design:returntype", void 0)
    ], ClientTunnelRunner.prototype, "attachConsoleErrorListeners", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Normalizes Playwright console messages and ignores non-error output."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "normalizeConsoleMessageError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Ignores known third-party dev-server noise that should not fail behavioral runs."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "shouldIgnoreConsoleErrorText", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Recognizes Vite dev-client websocket reconnect noise on localhost."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isViteLocalhostWebsocketConsoleError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Recognizes transient Vite dev-client asset fetch 502 noise on localhost."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isViteLocalhostBadGatewayConsoleError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Limits dev-server noise suppression to errors emitted from Vite-owned browser assets."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isViteLocation", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Treats Vite assets and the automatic overlay page as the same localhost dev-server surface."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isViteOwnedLocalhostLocation", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Recognizes the automatic tunnel page URL used by the overlay runner."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isAutomaticTunnelLocation", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Applies a short delay so browser-side runtime errors can arrive before inspection."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "waitForConsoleStabilization", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns unique console errors for the requested execution phase."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "filterConsoleErrorsByPhase", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Collapses duplicate browser errors so compiler output stays readable."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "deduplicateConsoleErrors", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when the final report line indicates a failed run."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "reportIndicatesFailure", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Appends the browser auto-run query flag while preserving the rest of the tunnel URL."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Number]),
      __metadata2("design:returntype", String)
    ], ClientTunnelRunner.prototype, "buildAutomaticTunnelUrl", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Caps each browser-side test or scenario step so one hung item cannot consume the full tunnel timeout budget."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number]),
      __metadata2("design:returntype", Number)
    ], ClientTunnelRunner.prototype, "resolvePerStepTimeoutMs", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Maps browser/runtime errors into deterministic tunnel statuses."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object]),
      __metadata2("design:returntype", Object)
    ], ClientTunnelRunner.prototype, "mapRuntimeError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Returns true when an error originates from a timeout boundary."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isTimeoutError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Launches Chromium and repairs a missing Playwright browser installation one time before failing."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Boolean]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "launchChromiumWithRecovery", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Identifies Playwright errors that mean the browser executable is absent from the local cache."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Boolean)
    ], ClientTunnelRunner.prototype, "isMissingPlaywrightExecutableError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Installs the Playwright Chromium browser through the package-local CLI."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "installChromiumWithPlaywrightCli", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves the Playwright CLI file using the package bin declaration instead of internal export paths."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", String)
    ], ClientTunnelRunner.prototype, "resolvePlaywrightCliPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a stable remediation message when Chromium could not be restored automatically."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", String)
    ], ClientTunnelRunner.prototype, "buildChromiumInstallFailureMessage", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Converts unknown errors into readable text."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", String)
    ], ClientTunnelRunner.prototype, "formatError", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Shortens long stacks to the first three lines plus a total-line footer."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], ClientTunnelRunner.prototype, "truncateStack", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Safely closes playwright resources without masking primary failures."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "safeClose", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Bounds an auxiliary promise so diagnostic collection cannot hang after the main timeout fires."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Promise, Number, String]),
      __metadata2("design:returntype", Promise)
    ], ClientTunnelRunner.prototype, "withTimeout", null);
    exports2.ClientTunnelRunner = ClientTunnelRunner = ClientTunnelRunner_1 = __decorate2([
      (0, lll_lll_12.Spec)("Runs behavioral scenarios through the overlay UI using a Playwright browser tunnel."),
      __metadata2("design:paramtypes", [Function, Function])
    ], ClientTunnelRunner);
  }
});

// dist-many/server/LlltsServer.lll.js
var require_LlltsServer_lll = __commonJS({
  "dist-many/server/LlltsServer.lll.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __decorate2 = exports2 && exports2.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __metadata2 = exports2 && exports2.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var LlltsServer_1;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LlltsServer = void 0;
    var express_1 = __importDefault2(require("express"));
    var fs = __importStar(require("fs"));
    var path = __importStar(require("path"));
    var ts_morph_1 = require("ts-morph");
    var package_json_12 = __importDefault2(require_package());
    var FileVariantSupport_lll_1 = require_FileVariantSupport_lll();
    var lll_lll_12 = require_lll_lll();
    var LlltsServer = class LlltsServer {
      static {
        LlltsServer_1 = this;
      }
      static testPanelOpenByDefault = true;
      static overlayAssetsBasePath = "/__lllts-overlay";
      static overlayIndexAssetPath = "index.html";
      static overlayScriptAssetPath = "js/script.js";
      static overlayStyleAssetPath = "css/style.css";
      static noStoreCacheControlValue = "no-store, no-cache, must-revalidate, proxy-revalidate";
      static projectClientRetryIntervalMs = 2e3;
      async start(port, config) {
        const app = this.createApp(config);
        return new Promise((resolve, reject) => {
          const server = app.listen(port, () => resolve(port));
          server.on("error", reject);
        });
      }
      createApp(config) {
        const app = (0, express_1.default)();
        this.registerOverlayAssetRoutes(app);
        app.use(async (req, res) => {
          await this.handleProxyRequest(req, res, config);
        });
        return app;
      }
      registerOverlayAssetRoutes(app) {
        app.get(`${LlltsServer_1.overlayAssetsBasePath}/${LlltsServer_1.overlayIndexAssetPath}`, (_req, res) => {
          this.serveOverlayAsset(res, LlltsServer_1.overlayIndexAssetPath, "text/html; charset=utf-8");
        });
        app.get(`${LlltsServer_1.overlayAssetsBasePath}/${LlltsServer_1.overlayScriptAssetPath}`, (_req, res) => {
          this.serveOverlayAsset(res, LlltsServer_1.overlayScriptAssetPath, "application/javascript; charset=utf-8");
        });
        app.get(`${LlltsServer_1.overlayAssetsBasePath}/${LlltsServer_1.overlayStyleAssetPath}`, (_req, res) => {
          this.serveOverlayAsset(res, LlltsServer_1.overlayStyleAssetPath, "text/css; charset=utf-8");
        });
        app.get(`${LlltsServer_1.overlayAssetsBasePath}/*`, (_req, res) => {
          this.applyNoStoreResponseHeaders(res);
          res.status(404).type("text/plain").send("Overlay asset not found.");
        });
      }
      serveOverlayAsset(res, relativeAssetPath, contentType) {
        const overlayRoot = this.resolveOverlayAssetsRootPath();
        if (!overlayRoot) {
          this.applyNoStoreResponseHeaders(res);
          res.status(500).type("text/plain").send("Overlay assets directory is unavailable.");
          return;
        }
        const absoluteAssetPath = path.join(overlayRoot, relativeAssetPath);
        try {
          const body = fs.readFileSync(absoluteAssetPath);
          this.applyNoStoreResponseHeaders(res);
          res.status(200).type(contentType).send(body);
        } catch {
          this.applyNoStoreResponseHeaders(res);
          res.status(404).type("text/plain").send("Overlay asset not found.");
        }
      }
      resolveOverlayAssetsRootPath() {
        const candidatePaths = [
          path.resolve(__dirname, "cdn"),
          path.resolve(__dirname, "../src/server/cdn"),
          path.resolve(__dirname, "../../src/server/cdn")
        ];
        for (const candidatePath of candidatePaths) {
          if (!fs.existsSync(candidatePath)) {
            continue;
          }
          if (!fs.statSync(candidatePath).isDirectory()) {
            continue;
          }
          return candidatePath;
        }
        return null;
      }
      async handleProxyRequest(req, res, config) {
        const report = this.inspectProjectPath(config.projectPath);
        if (!report.exists) {
          this.applyNoStoreResponseHeaders(res);
          res.status(404).type("text/plain").send(this.buildProjectPathStateResponse(report, config.projectClientLink, "Project path does not exist."));
          return;
        }
        if (!report.isDirectory) {
          this.applyNoStoreResponseHeaders(res);
          res.status(400).type("text/plain").send(this.buildProjectPathStateResponse(report, config.projectClientLink, "Project path exists but is not a directory."));
          return;
        }
        const upstreamBaseUrl = this.resolveProjectClientLink(config.projectClientLink);
        if (!upstreamBaseUrl) {
          this.applyNoStoreResponseHeaders(res);
          res.status(502).type("text/html; charset=utf-8").send(this.buildProjectClientLinkUnavailableResponse(report, config.projectClientLink, "Invalid projectClientLink format.", req.originalUrl || req.url));
          return;
        }
        const upstreamUrl = new URL(req.originalUrl || req.url, upstreamBaseUrl);
        const requestHeaders = this.buildProxyRequestHeaders(req);
        const method = req.method.toUpperCase();
        const shouldSendBody = method !== "GET" && method !== "HEAD";
        const requestBody = shouldSendBody ? await this.readRequestBody(req) : void 0;
        let upstreamResponse;
        try {
          upstreamResponse = await fetch(upstreamUrl.toString(), {
            method,
            headers: requestHeaders,
            body: requestBody !== void 0 ? new Uint8Array(requestBody) : void 0
          });
        } catch (error) {
          const reason = error instanceof Error ? error.message : String(error);
          this.applyNoStoreResponseHeaders(res);
          res.status(502).type("text/html; charset=utf-8").send(this.buildProjectClientLinkUnavailableResponse(report, config.projectClientLink, `Upstream request failed: ${reason}`, req.originalUrl || req.url));
          return;
        }
        await this.forwardUpstreamResponse(res, upstreamResponse, report);
      }
      inspectProjectPath(projectPathInput) {
        const resolvedPath = path.resolve(process.cwd(), projectPathInput);
        const exists = fs.existsSync(resolvedPath);
        const isDirectory = exists && fs.statSync(resolvedPath).isDirectory();
        const projectName = path.basename(resolvedPath);
        const tests = isDirectory ? this.findTestsWithScenarios(resolvedPath) : [];
        const testFiles = tests.map((test) => test.path);
        const testScenarios = this.mapScenariosByTest(tests);
        return {
          projectName,
          projectPath: resolvedPath,
          exists,
          isDirectory,
          testFiles,
          testScenarios
        };
      }
      buildProjectPathStateResponse(report, projectClientLink, reason) {
        const lines = [
          reason,
          `Project Name: ${report.projectName}`,
          `Project Path: ${report.projectPath}`,
          `Project Exists: ${String(report.exists)}`,
          `Project Is Directory: ${String(report.isDirectory)}`,
          `Project Client Link: ${projectClientLink.trim()}`
        ];
        return lines.join("\n");
      }
      buildProjectClientLinkUnavailableResponse(report, projectClientLink, reason, retryPath) {
        const diagnosticsMarkup = this.buildUnavailableDiagnosticsMarkup(report, projectClientLink, reason, retryPath);
        const testsMarkup = this.buildUnavailableTestsMarkup(report);
        return this.buildUnavailableHtmlDocument(reason, retryPath, diagnosticsMarkup, testsMarkup);
      }
      buildUnavailableDiagnosticsMarkup(report, projectClientLink, reason, retryPath) {
        const diagnostics = [
          ["Reason", reason],
          ["Project Name", report.projectName],
          ["Project Path", report.projectPath],
          ["Project Exists", String(report.exists)],
          ["Project Is Directory", String(report.isDirectory)],
          ["Project Client Link", projectClientLink.trim()],
          ["Retry Path", retryPath]
        ];
        return diagnostics.map(([label, value]) => `<li><strong>${this.escapeHtmlText(label)}:</strong> ${this.escapeHtmlText(value)}</li>`).join("");
      }
      buildUnavailableTestsMarkup(report) {
        if (report.testFiles.length === 0) {
          return "<li>(none found)</li>";
        }
        return report.testFiles.map((testFile) => `<li>${this.escapeHtmlText(testFile)}</li>`).join("");
      }
      buildUnavailableHtmlDocument(reason, retryPath, diagnosticsMarkup, testsMarkup) {
        const escapedRetryPath = this.escapeHtmlAttribute(retryPath);
        const escapedReason = this.escapeHtmlText(reason);
        const bodyMarkup = this.buildUnavailableHtmlBody(escapedReason, escapedRetryPath, diagnosticsMarkup, testsMarkup);
        return (
          /*html*/
          `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="${LlltsServer_1.projectClientRetryIntervalMs / 1e3};url=${escapedRetryPath}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Project client link is unavailable</title>
  <style>
${this.buildUnavailableHtmlStyles()}
  </style>
</head>
<body>
${bodyMarkup}
  <script>
    ${this.buildUnavailableRetryScript(retryPath)}
  </script>
</body>
</html>`
        );
      }
      buildUnavailableHtmlStyles() {
        return `    :root {
      color-scheme: dark;
      font-family: Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      background: #111827;
      color: #e5e7eb;
    }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background:
        radial-gradient(circle at top, rgba(59, 130, 246, 0.22), transparent 38%),
        linear-gradient(180deg, #0f172a 0%, #111827 100%);
    }
    main {
      width: min(880px, 100%);
      padding: 24px;
      border: 1px solid rgba(148, 163, 184, 0.28);
      border-radius: 16px;
      background: rgba(15, 23, 42, 0.86);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
    }
    h1 {
      margin: 0 0 12px;
      font-size: 24px;
    }
    p {
      margin: 0 0 14px;
      line-height: 1.5;
    }
    .status {
      display: inline-block;
      margin-bottom: 16px;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(59, 130, 246, 0.14);
      color: #93c5fd;
      font-weight: 700;
    }
    .reason {
      color: #fca5a5;
    }
    .actions {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    a, button {
      color: #0f172a;
      background: #93c5fd;
      border: 0;
      border-radius: 10px;
      padding: 10px 14px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
    }
    .secondary {
      background: rgba(148, 163, 184, 0.14);
      color: #e5e7eb;
    }
    section + section {
      margin-top: 18px;
    }
    h2 {
      margin: 0 0 8px;
      font-size: 15px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    ul {
      margin: 0;
      padding-left: 18px;
      line-height: 1.6;
      word-break: break-word;
    }
    code {
      color: #bfdbfe;
    }`;
      }
      buildUnavailableHtmlBody(escapedReason, escapedRetryPath, diagnosticsMarkup, testsMarkup) {
        return `  <main>
    <div class="status">Retrying in <span id="lllts-retry-seconds">2.0</span>s</div>
    <h1>Project client link is unavailable.</h1>
    <p class="reason">${escapedReason}</p>
    <p>The tests page will retry automatically every 2 seconds. This page keeps polling the same preview URL until the client responds.</p>
    <div class="actions">
      <button type="button" id="lllts-retry-now">Retry now</button>
      <a class="secondary" href="${escapedRetryPath}">Reload current tests URL</a>
    </div>
    <section>
      <h2>Diagnostics</h2>
      <ul>${diagnosticsMarkup}</ul>
    </section>
    <section>
      <h2>Tests</h2>
      <ul>${testsMarkup}</ul>
    </section>
  </main>`;
      }
      buildUnavailableRetryScript(retryPath) {
        return `(function () {
      var retryDelayMs = ${LlltsServer_1.projectClientRetryIntervalMs};
      var retryAt = Date.now() + retryDelayMs;
      var retryPath = ${JSON.stringify(retryPath)};
      var secondsElement = document.getElementById("lllts-retry-seconds");
      var retryNowButton = document.getElementById("lllts-retry-now");
      function reload() {
        window.location.assign(retryPath);
      }
      function renderCountdown() {
        if (!secondsElement) {
          return;
        }
        var remainingSeconds = Math.max(0, retryAt - Date.now()) / 1000;
        secondsElement.textContent = remainingSeconds.toFixed(1);
      }
      if (retryNowButton) {
        retryNowButton.addEventListener("click", reload);
      }
      renderCountdown();
      var intervalId = window.setInterval(renderCountdown, 100);
      window.setTimeout(function () {
        window.clearInterval(intervalId);
        reload();
      }, retryDelayMs);
    })();`;
      }
      escapeHtmlText(value) {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
      }
      escapeHtmlAttribute(value) {
        return this.escapeHtmlText(value);
      }
      resolveProjectClientLink(projectClientLinkInput) {
        const trimmed = projectClientLinkInput.trim();
        if (trimmed.length === 0) {
          return null;
        }
        const direct = this.tryParseUrl(trimmed);
        if (direct !== null) {
          return direct;
        }
        if (this.hasExplicitUrlScheme(trimmed)) {
          return null;
        }
        return this.tryParseUrl(`http://${trimmed}`);
      }
      tryParseUrl(urlInput) {
        try {
          return new URL(urlInput);
        } catch {
          return null;
        }
      }
      hasExplicitUrlScheme(urlInput) {
        return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(urlInput);
      }
      buildProxyRequestHeaders(req) {
        const headers = {};
        for (const [name, value] of Object.entries(req.headers)) {
          if (value === void 0) {
            continue;
          }
          const normalizedName = name.toLowerCase();
          if (normalizedName === "host" || normalizedName === "connection" || normalizedName === "content-length") {
            continue;
          }
          headers[normalizedName] = Array.isArray(value) ? value.join(", ") : value;
        }
        headers["accept-encoding"] = "identity";
        return headers;
      }
      async readRequestBody(req) {
        return await new Promise((resolve, reject) => {
          const chunks = [];
          req.on("data", (chunk) => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          });
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", reject);
        });
      }
      async forwardUpstreamResponse(res, upstreamResponse, report) {
        const contentType = upstreamResponse.headers.get("content-type") ?? "";
        const bodyBuffer = Buffer.from(await upstreamResponse.arrayBuffer());
        const isHtml = contentType.toLowerCase().includes("text/html");
        if (isHtml) {
          const upstreamHtml = bodyBuffer.toString("utf8");
          const htmlWithOverlay = this.injectOverlayIntoHtml(upstreamHtml, report);
          this.copyUpstreamResponseHeaders(res, upstreamResponse, true);
          this.applyNoStoreResponseHeaders(res);
          res.status(upstreamResponse.status);
          res.send(htmlWithOverlay);
          return;
        }
        this.copyUpstreamResponseHeaders(res, upstreamResponse, false);
        this.applyNoStoreResponseHeaders(res);
        res.status(upstreamResponse.status);
        res.send(bodyBuffer);
      }
      applyNoStoreResponseHeaders(res) {
        res.setHeader("cache-control", LlltsServer_1.noStoreCacheControlValue);
        res.setHeader("pragma", "no-cache");
        res.setHeader("expires", "0");
        res.setHeader("surrogate-control", "no-store");
      }
      copyUpstreamResponseHeaders(res, upstreamResponse, omitContentLength) {
        for (const [name, value] of upstreamResponse.headers.entries()) {
          const normalizedName = name.toLowerCase();
          if (normalizedName === "set-cookie") {
            continue;
          }
          if (omitContentLength && normalizedName === "content-length") {
            continue;
          }
          res.setHeader(name, value);
        }
        const headersWithCookies = upstreamResponse.headers;
        if (typeof headersWithCookies.getSetCookie === "function") {
          const cookies = headersWithCookies.getSetCookie();
          if (cookies.length > 0) {
            res.setHeader("set-cookie", cookies);
          }
        }
      }
      injectOverlayIntoHtml(html, report) {
        const overlayMarkup = this.buildTestOverlayMarkup(report.testFiles, report.testScenarios);
        if (/<\/body>/i.test(html)) {
          return html.replace(/<\/body>/i, `${overlayMarkup}</body>`);
        }
        return `${html}${overlayMarkup}`;
      }
      buildTestOverlayMarkup(testFiles, testScenarios) {
        const serializedConfig = JSON.stringify({
          tests: testFiles,
          testScenarios,
          openByDefault: LlltsServer_1.testPanelOpenByDefault,
          assetsBasePath: LlltsServer_1.overlayAssetsBasePath,
          version: package_json_12.default.version
        }).replace(/</g, "\\u003c");
        return (
          /*html*/
          `
<!-- LLLTS_TEST_OVERLAY -->
<script id="lllts-overlay-config" type="application/json">${serializedConfig}</script>
<script id="lllts-overlay-loader">
(function(){
  var assetsBasePath="${LlltsServer_1.overlayAssetsBasePath}";
  if(!document.getElementById("lllts-overlay-runtime-style")){
    var style=document.createElement("link");
    style.id="lllts-overlay-runtime-style";
    style.rel="stylesheet";
    style.href=assetsBasePath+"/${LlltsServer_1.overlayStyleAssetPath}";
    document.head.appendChild(style);
  }
  function loadRuntimeScript(){
    if(document.getElementById("lllts-overlay-runtime-script")){return;}
    var runtimeScript=document.createElement("script");
    runtimeScript.id="lllts-overlay-runtime-script";
    runtimeScript.src=assetsBasePath+"/${LlltsServer_1.overlayScriptAssetPath}";
    runtimeScript.async=false;
    document.body.appendChild(runtimeScript);
  }
  loadRuntimeScript();
})();
</script>`
        );
      }
      findTestsWithScenarios(projectPath) {
        const relativeToAbsolute = /* @__PURE__ */ new Map();
        const stack = [projectPath];
        while (stack.length > 0) {
          const currentPath = stack.pop();
          if (!currentPath) {
            continue;
          }
          const entries = fs.readdirSync(currentPath, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
              stack.push(fullPath);
              continue;
            }
            if (!entry.isFile() || !FileVariantSupport_lll_1.FileVariantSupport.isTestFilePath(fullPath)) {
              continue;
            }
            const relativePath = this.toPosixPath(path.relative(projectPath, fullPath));
            relativeToAbsolute.set(relativePath, fullPath);
          }
        }
        const sortedPaths = Array.from(relativeToAbsolute.keys()).sort((a, b) => a.localeCompare(b));
        const project = new ts_morph_1.Project({ skipAddingFilesFromTsConfig: true });
        return sortedPaths.map((testPath) => ({
          path: testPath,
          scenarios: this.findScenariosInTestFile(project, relativeToAbsolute.get(testPath) ?? "")
        }));
      }
      mapScenariosByTest(tests) {
        const map = {};
        for (const test of tests) {
          map[test.path] = test.scenarios.map((scenario) => ({
            methodName: scenario.methodName,
            title: scenario.title
          }));
        }
        return map;
      }
      findScenariosInTestFile(project, absoluteTestFilePath) {
        if (absoluteTestFilePath.trim().length === 0) {
          return [];
        }
        try {
          const sourceFile = project.addSourceFileAtPathIfExists(absoluteTestFilePath);
          if (!sourceFile) {
            return [];
          }
          const classes = sourceFile.getClasses();
          if (classes.length === 0) {
            return [];
          }
          const exportedClasses = classes.filter((classDecl) => classDecl.isExported());
          const preferredClass = exportedClasses.find((classDecl) => {
            const className = String(classDecl.getName() ?? "");
            return className.endsWith("Test") || className.endsWith("Test2");
          });
          const testClass = preferredClass ?? exportedClasses[0] ?? classes[0];
          if (!testClass) {
            return [];
          }
          const scenarios = [];
          for (const method of testClass.getMethods()) {
            if (!method.isStatic()) {
              continue;
            }
            if (!method.getDecorators().some((decorator) => decorator.getName() === "Scenario")) {
              continue;
            }
            scenarios.push({
              methodName: method.getName(),
              title: this.getScenarioTitle(method)
            });
          }
          return scenarios;
        } catch {
          return [];
        }
      }
      getScenarioTitle(method) {
        const decorator = method.getDecorators().find((candidate) => candidate.getName() === "Scenario");
        if (!decorator) {
          return method.getName();
        }
        const title = this.normalizeDecoratorString(decorator.getArguments()[0]?.getText());
        return title.length > 0 ? title : method.getName();
      }
      normalizeDecoratorString(rawText) {
        if (!rawText) {
          return "";
        }
        const trimmed = rawText.trim();
        if (trimmed.length === 0) {
          return "";
        }
        const first = trimmed[0];
        const last = trimmed[trimmed.length - 1];
        if ((first === '"' || first === "'" || first === "`") && last === first) {
          return trimmed.slice(1, -1);
        }
        return trimmed;
      }
      toPosixPath(inputPath) {
        return inputPath.split(path.sep).join("/");
      }
    };
    exports2.LlltsServer = LlltsServer;
    __decorate2([
      (0, lll_lll_12.Spec)("Starts an express server that proxies a configured client and overlays discovered project tests."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Number, Object]),
      __metadata2("design:returntype", Promise)
    ], LlltsServer.prototype, "start", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Creates and configures the express application."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Function)
    ], LlltsServer.prototype, "createApp", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Registers static overlay asset routes served from local CDN files."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", void 0)
    ], LlltsServer.prototype, "registerOverlayAssetRoutes", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Serves one overlay asset file from the server-side CDN directory."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, String]),
      __metadata2("design:returntype", void 0)
    ], LlltsServer.prototype, "serveOverlayAsset", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves CDN root for overlay assets in both ts-source and built-dist executions."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "resolveOverlayAssetsRootPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Handles one incoming request by validating project path and proxying to the configured client."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Object, Object]),
      __metadata2("design:returntype", Promise)
    ], LlltsServer.prototype, "handleProxyRequest", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves a project path and captures file-system facts plus discovered tests."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "inspectProjectPath", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds deterministic plain-text output when project path preconditions are not satisfied."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildProjectPathStateResponse", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds an HTML retry page when configured client link cannot be reached."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, String, String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildProjectClientLinkUnavailableResponse", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the diagnostics list markup for the unavailable client page."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, String, String, String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableDiagnosticsMarkup", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the discovered tests list markup for the unavailable client page."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableTestsMarkup", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the full unavailable client HTML document."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableHtmlDocument", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the stylesheet for the unavailable client page."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", []),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableHtmlStyles", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the HTML body markup for the unavailable client page."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, String, String, String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableHtmlBody", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds the retry countdown script for the unavailable client page."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildUnavailableRetryScript", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Escapes HTML text content."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "escapeHtmlText", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Escapes HTML attribute content."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "escapeHtmlAttribute", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Resolves loose project client link input into a URL; defaults to http:// when scheme is omitted."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "resolveProjectClientLink", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Parses a URL and returns null instead of throwing."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "tryParseUrl", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Checks whether an input string starts with a URL scheme."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Boolean)
    ], LlltsServer.prototype, "hasExplicitUrlScheme", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds request headers for upstream fetch while removing hop-by-hop values."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "buildProxyRequestHeaders", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reads the full incoming request body into a buffer."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", Promise)
    ], LlltsServer.prototype, "readRequestBody", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Forwards upstream response and injects test overlay into HTML payloads."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Function, Object]),
      __metadata2("design:returntype", Promise)
    ], LlltsServer.prototype, "forwardUpstreamResponse", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Forces the browser to revalidate every tunnel response during local development."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object]),
      __metadata2("design:returntype", void 0)
    ], LlltsServer.prototype, "applyNoStoreResponseHeaders", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Copies response headers from upstream to express response, handling content-length/set-cookie correctly."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Object, Function, Boolean]),
      __metadata2("design:returntype", void 0)
    ], LlltsServer.prototype, "copyUpstreamResponseHeaders", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Injects overlay UI into HTML by inserting before closing body tag when present."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String, Object]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "injectOverlayIntoHtml", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds minimal inline overlay config plus loader that pulls CDN-hosted UI assets."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array, Object]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "buildTestOverlayMarkup", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Recursively scans for supported companion test files and extracts static @Scenario metadata."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", Array)
    ], LlltsServer.prototype, "findTestsWithScenarios", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Builds a path-keyed map of scenario metadata for overlay config delivery."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Array]),
      __metadata2("design:returntype", Object)
    ], LlltsServer.prototype, "mapScenariosByTest", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Parses one test source file and returns static methods decorated with @Scenario."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [ts_morph_1.Project, String]),
      __metadata2("design:returntype", Array)
    ], LlltsServer.prototype, "findScenariosInTestFile", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Reads display title from @Scenario decorator or falls back to method name."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [Function]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "getScenarioTitle", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Converts decorator argument text into an end-user string."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "normalizeDecoratorString", null);
    __decorate2([
      (0, lll_lll_12.Spec)("Normalizes path separators for stable plain-text output across platforms."),
      __metadata2("design:type", Function),
      __metadata2("design:paramtypes", [String]),
      __metadata2("design:returntype", String)
    ], LlltsServer.prototype, "toPosixPath", null);
    exports2.LlltsServer = LlltsServer = LlltsServer_1 = __decorate2([
      (0, lll_lll_12.Spec)("Hosts the foreground HTTP server mode for lllts.")
    ], LlltsServer);
  }
});

// dist-many/LLLTS.lll.js
var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = exports && exports.__metadata || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLLTS = void 0;
var package_json_1 = __importDefault(require_package());
var BaseRule_lll_1 = require_BaseRule_lll();
var ProjectInitiator_lll_1 = require_ProjectInitiator_lll();
var ResultReporter_lll_1 = require_ResultReporter_lll();
var RulesEngine_lll_1 = require_RulesEngine_lll();
var TestRunner_lll_1 = require_TestRunner_lll();
var ClientTunnelRunner_lll_1 = require_ClientTunnelRunner_lll();
var lll_lll_1 = require_lll_lll();
var LlltsServer_lll_1 = require_LlltsServer_lll();
var LLLTS = class LLLTS2 {
  static async main(args) {
    const serverModeResult = await this.tryRunServerMode(args);
    if (serverModeResult !== null) {
      return serverModeResult;
    }
    const projectPath = this.getArg(args, "--project");
    const entryFile = this.getArg(args, "--entry");
    const loadStrategy = this.getOptionalArg(args, "--load-strategy", "from_imports");
    const verbose = this.hasFlag(args, "--verbose");
    const noTests = this.hasFlag(args, "--noTests");
    const failSafeMode = this.hasFlag(args, "--fail-safe");
    const clientTunnelConfigResult = this.parseClientTunnelConfig(args);
    if (!clientTunnelConfigResult.valid) {
      console.error(`
\u274C ${clientTunnelConfigResult.error}`);
      return { mode: "compile", exitCode: 1 };
    }
    const clientTunnelConfig = clientTunnelConfigResult.config;
    console.log(`EvidyTS Compiler ${package_json_1.default.version}`);
    console.log(`Entry: ${entryFile}`);
    let loader;
    try {
      loader = new ProjectInitiator_lll_1.ProjectInitiator(projectPath, loadStrategy, entryFile);
    } catch (error) {
      console.error(`
\u274C ${error instanceof Error ? error.message : String(error)}`);
      return { mode: "compile", exitCode: 1 };
    }
    const ruleEngine = new RulesEngine_lll_1.RulesEngine(loader);
    const results = ruleEngine.runAll({
      skipTestRules: noTests,
      skipTestCoverageDebt: noTests,
      failSafeMode
    });
    let inventory = {
      hasBehavioralTests: false,
      behavioralTests: []
    };
    let scenarioDiagnostics = [];
    let reports = [];
    const skipNodeTestExecution = clientTunnelConfig.url !== null;
    if (!noTests) {
      const testRunner = new TestRunner_lll_1.TestRunner(loader, projectPath);
      inventory = testRunner.summarizeInventory();
      if (!skipNodeTestExecution) {
        const testRunResult = await testRunner.runAll();
        scenarioDiagnostics = testRunResult.diagnostics;
        reports = testRunResult.reports;
      }
    }
    const allDiagnostics = [...results, ...scenarioDiagnostics];
    if (!noTests && inventory.hasBehavioralTests && clientTunnelConfig.url === null) {
      allDiagnostics.push(this.createMissingClientTunnelDiagnostic(inventory));
    }
    let clientTunnelResult = null;
    const diagnosticsFailedBeforeClientTunnel = allDiagnostics.some((r) => r.severity === "error");
    if (!noTests && !diagnosticsFailedBeforeClientTunnel && inventory.hasBehavioralTests && clientTunnelConfig.url !== null) {
      const runner = new ClientTunnelRunner_lll_1.ClientTunnelRunner();
      clientTunnelResult = await runner.run({
        url: clientTunnelConfig.url,
        headed: clientTunnelConfig.headed,
        timeoutMs: clientTunnelConfig.timeoutMs
      });
      allDiagnostics.push(...this.mapClientTunnelResultToDiagnostics(clientTunnelResult, inventory));
      this.printClientTunnelOutput(clientTunnelResult, verbose);
    }
    const reporter = new ResultReporter_lll_1.ResultReporter(projectPath);
    const tunnelFailed = clientTunnelResult?.status === "failed";
    if (verbose && !noTests) {
      this.printTestSummary(reports, inventory.hasBehavioralTests, skipNodeTestExecution);
    }
    reporter.print(allDiagnostics, { suppressSuccessMessage: tunnelFailed });
    if (tunnelFailed) {
      console.error("\n\u274C Behavioral tests failed.");
    }
    const diagnosticsFailed = allDiagnostics.some((r) => r.severity === "error");
    return { mode: "compile", exitCode: diagnosticsFailed || tunnelFailed ? 1 : 0 };
  }
  static async tryRunServerMode(args) {
    const serverFlagIndex = args.indexOf("--server");
    if (serverFlagIndex < 0) {
      return null;
    }
    const action = args[serverFlagIndex + 1];
    if (action !== "start") {
      console.error(`
\u274C Unsupported server action: ${action ?? "(missing)"}. Use '--server start'.`);
      return { mode: "compile", exitCode: 1 };
    }
    const portResult = this.parseServerPort(args);
    if (!portResult.valid) {
      console.error(`
\u274C ${portResult.error}`);
      return { mode: "compile", exitCode: 1 };
    }
    const configResult = this.parseServerConfig(args);
    if (!configResult.valid) {
      console.error(`
\u274C ${configResult.error}`);
      return { mode: "compile", exitCode: 1 };
    }
    const server = new LlltsServer_lll_1.LlltsServer();
    const port = await server.start(portResult.port, configResult.config);
    console.log(`EvidyTS server listening on http://localhost:${port}`);
    return { mode: "server", port };
  }
  static parseServerPort(args) {
    const defaultPort = 54300;
    const i = args.indexOf("--port");
    if (i < 0) {
      return { valid: true, port: defaultPort };
    }
    if (i + 1 >= args.length) {
      return { valid: false, error: "Missing value for --port." };
    }
    const rawPort = args[i + 1].trim();
    if (!/^\d+$/.test(rawPort)) {
      return { valid: false, error: `Invalid --port value '${rawPort}'. Expected integer 1..65535.` };
    }
    const port = Number(rawPort);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      return { valid: false, error: `Invalid --port value '${rawPort}'. Expected integer 1..65535.` };
    }
    return { valid: true, port };
  }
  static parseServerConfig(args) {
    const projectPathResult = this.parseRequiredServerArg(args, "--projectPath");
    if (!projectPathResult.valid) {
      return projectPathResult;
    }
    const projectClientLinkResult = this.parseRequiredServerArg(args, "--projectClientLink");
    if (!projectClientLinkResult.valid) {
      return projectClientLinkResult;
    }
    return {
      valid: true,
      config: {
        projectPath: projectPathResult.value,
        projectClientLink: projectClientLinkResult.value
      }
    };
  }
  static parseRequiredServerArg(args, flag) {
    const i = args.indexOf(flag);
    if (i < 0) {
      return { valid: false, error: `Missing required server argument: ${flag}.` };
    }
    if (i + 1 >= args.length) {
      return { valid: false, error: `Missing value for ${flag}.` };
    }
    const value = args[i + 1].trim();
    if (value.length === 0) {
      return { valid: false, error: `Missing value for ${flag}.` };
    }
    return { valid: true, value };
  }
  static parseClientTunnelConfig(args) {
    const urlResult = this.parseOptionalArgValue(args, "--clientTunnel");
    if (!urlResult.valid) {
      return urlResult;
    }
    const timeoutResult = this.parseOptionalPositiveIntegerArg(args, "--clientTunnelTimeoutMs", 6e4);
    if (!timeoutResult.valid) {
      return timeoutResult;
    }
    return {
      valid: true,
      config: {
        url: urlResult.value,
        headed: this.hasFlag(args, "--clientTunnelHeaded"),
        timeoutMs: timeoutResult.value
      }
    };
  }
  static parseOptionalArgValue(args, flag) {
    const i = args.indexOf(flag);
    if (i < 0) {
      return { valid: true, value: null };
    }
    if (i + 1 >= args.length || args[i + 1].startsWith("--")) {
      return { valid: false, error: `Missing value for ${flag}.` };
    }
    const value = args[i + 1].trim();
    if (value.length === 0) {
      return { valid: false, error: `Missing value for ${flag}.` };
    }
    return { valid: true, value };
  }
  static parseOptionalPositiveIntegerArg(args, flag, defaultValue) {
    const i = args.indexOf(flag);
    if (i < 0) {
      return { valid: true, value: defaultValue };
    }
    if (i + 1 >= args.length || args[i + 1].startsWith("--")) {
      return { valid: false, error: `Missing value for ${flag}.` };
    }
    const rawValue = args[i + 1].trim();
    if (!/^\d+$/.test(rawValue)) {
      return { valid: false, error: `Invalid ${flag} value '${rawValue}'. Expected positive integer.` };
    }
    const parsed = Number(rawValue);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      return { valid: false, error: `Invalid ${flag} value '${rawValue}'. Expected positive integer.` };
    }
    return { valid: true, value: parsed };
  }
  static createMissingClientTunnelDiagnostic(inventory) {
    const first = inventory.behavioralTests[0];
    if (!first) {
      return BaseRule_lll_1.BaseRule.createError("(behavioral-tests)", "Behavioral tests were discovered, but '--clientTunnel <url>' was not provided.", "test-failure");
    }
    const details = inventory.behavioralTests.map((test) => `- ${test.filePath}:${test.line} (${test.className})`).join("\n");
    const messageLines = [
      "Behavioral tests were discovered, but '--clientTunnel <url>' was not provided.",
      "Provide a reachable overlay page URL and rerun compile mode.",
      "Detected behavioral tests:",
      details
    ];
    return BaseRule_lll_1.BaseRule.createError(first.filePath, messageLines.join("\n"), "test-failure", first.line);
  }
  static mapClientTunnelResultToDiagnostics(result, inventory) {
    if (result.status === "passed") {
      return [];
    }
    if (result.status === "failed") {
      return [];
    }
    const anchor = inventory.behavioralTests[0];
    const file = anchor?.filePath ?? "(behavioral-tests)";
    const line = anchor?.line;
    if (result.status === "console_error") {
      return [
        BaseRule_lll_1.BaseRule.createError(file, this.formatClientTunnelConsoleErrorDiagnostic(result.consoleErrors ?? []), "test-failure", line)
      ];
    }
    if (result.status === "timeout") {
      return [
        BaseRule_lll_1.BaseRule.createError(file, this.formatClientTunnelTimeoutMessage(result), "test-failure", line)
      ];
    }
    return [
      BaseRule_lll_1.BaseRule.createError(file, `Client tunnel runtime error. ${result.message ?? ""}`.trim(), "test-failure", line)
    ];
  }
  static formatClientTunnelConsoleErrorDiagnostic(consoleErrors) {
    const scenarioPhaseDetected = consoleErrors.some((error) => error.phase === "scenario");
    const header = scenarioPhaseDetected ? "Behavioral client runtime errors occurred while scenarios were running." : "Behavioral client runtime errors prevented test execution.";
    if (consoleErrors.length === 0) {
      return `${header}
- No browser runtime error details were captured.`;
    }
    const details = consoleErrors.map((error) => this.formatClientTunnelConsoleErrorLine(error)).join("\n");
    return `${header}
${details}`;
  }
  static formatClientTunnelConsoleErrorLine(error) {
    const location = error.location;
    const segments = [`- [${error.source}] ${error.text}`];
    if (typeof location?.url === "string" && location.url.length > 0) {
      let suffix = location.url;
      if (typeof location.lineNumber === "number") {
        suffix += `:${location.lineNumber}`;
        if (typeof location.columnNumber === "number") {
          suffix += `:${location.columnNumber}`;
        }
      }
      segments.push(`(${suffix})`);
    }
    return segments.join(" ");
  }
  static formatClientTunnelTimeoutMessage(result) {
    const details = [
      "Testing took too long, so EvidyTS stopped waiting for the browser run.",
      "A scenario, render cycle, import, or app event handler may be stuck in an infinite loop."
    ];
    const timeoutContext = result.timeoutContext;
    if (timeoutContext?.phase === "navigation") {
      details.push("Timeout happened before any scenario started, while navigating to the automatic tunnel page.");
    } else if (timeoutContext?.phase === "scenario") {
      const targetParts = [];
      if (typeof timeoutContext.testPath === "string" && timeoutContext.testPath.length > 0) {
        targetParts.push(`test ${timeoutContext.testPath}`);
      }
      if (typeof timeoutContext.scenarioName === "string" && timeoutContext.scenarioName.length > 0) {
        targetParts.push(`scenario ${JSON.stringify(timeoutContext.scenarioName)}`);
      } else if (typeof timeoutContext.scenarioMethodName === "string" && timeoutContext.scenarioMethodName.length > 0) {
        targetParts.push(`scenario method ${timeoutContext.scenarioMethodName}`);
      }
      if (targetParts.length > 0) {
        details.push(`Last active target: ${targetParts.join(", ")}.`);
      } else {
        details.push("Timeout happened after the tunnel entered scenario execution.");
      }
    }
    if (typeof result.message === "string" && result.message.trim().length > 0) {
      details.push(result.message.trim());
    }
    return details.join(" ");
  }
  static getArg(args, flag) {
    const i = args.indexOf(flag);
    if (i >= 0 && i + 1 < args.length)
      return args[i + 1];
    throw new Error(`Missing argument: ${flag}`);
  }
  static getOptionalArg(args, flag, defaultValue) {
    const i = args.indexOf(flag);
    if (i >= 0 && i + 1 < args.length)
      return args[i + 1];
    return defaultValue;
  }
  static hasFlag(args, flag) {
    return args.includes(flag);
  }
  static printTestSummary(reports, hasBehavioralTests, skippedForClientTunnel) {
    if (reports.length === 0) {
      if (hasBehavioralTests || skippedForClientTunnel) {
        return;
      }
      console.log("\n\u{1F9EA} Test Execution Details");
      console.log("  (no tests were executed)");
      return;
    }
    console.log("\n\u{1F9EA} Test Execution Details");
    for (const report of reports) {
      const label = report.className;
      console.log(`
\u{1F4D8} Test ${label}`);
      console.log(`   ${report.filePath}:${report.line}`);
      if (report.scenarios.length === 0) {
        console.log("   (no scenarios defined)");
        continue;
      }
      for (const scenario of report.scenarios) {
        const icon = scenario.status === "passed" ? "\u2705" : "\u274C";
        console.log(`   ${icon} ${scenario.name}`);
      }
    }
  }
  static sanitizeClientTunnelReport(reportText) {
    const lines = reportText.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
    const summaryLine = nonEmptyLines.length === 0 ? "" : nonEmptyLines[nonEmptyLines.length - 1];
    const sanitizedSections = [];
    let currentHeader = "";
    let currentBody = [];
    const flushSection = () => {
      if (currentHeader.length === 0) {
        return;
      }
      const failedLines = currentBody.filter((line) => {
        const trimmed = line.trim();
        if (trimmed.length === 0) {
          return false;
        }
        if (trimmed === "(no scenarios)") {
          return false;
        }
        if (trimmed.includes(": passed")) {
          return false;
        }
        if (trimmed.startsWith("- ")) {
          return false;
        }
        return true;
      });
      if (failedLines.length > 0) {
        sanitizedSections.push(currentHeader, ...failedLines, "");
      }
      currentHeader = "";
      currentBody = [];
    };
    for (const line of lines) {
      if (line.startsWith("## ")) {
        flushSection();
        currentHeader = line;
        continue;
      }
      if (currentHeader.length > 0) {
        currentBody.push(line);
      }
    }
    flushSection();
    if (summaryLine.length > 0) {
      sanitizedSections.push("", summaryLine);
    }
    return sanitizedSections.join("\n").trim();
  }
  static printClientTunnelOutput(result, verbose) {
    const sanitizedReport = typeof result.reportText === "string" && result.reportText.length > 0 ? this.sanitizeClientTunnelReport(result.reportText) : null;
    if (result.status === "passed") {
      console.log("\n\u{1F310} Client tunnel behavioral tests passed.");
      if (verbose && typeof sanitizedReport === "string" && sanitizedReport.length > 0) {
        console.log("\n\u{1F4CB} Client tunnel report");
        console.log(sanitizedReport);
      }
      return;
    }
    if (result.status === "failed") {
      console.log("\n\u{1F310} Client tunnel behavioral tests failed.");
      if (typeof sanitizedReport === "string" && sanitizedReport.length > 0) {
        console.log("\n\u{1F4CB} Client tunnel report");
        console.log(sanitizedReport);
      }
      return;
    }
    if (result.status === "console_error") {
      if (typeof sanitizedReport === "string" && sanitizedReport.length > 0) {
        console.log("\n\u{1F4CB} Client tunnel report");
        console.log(sanitizedReport);
      }
      return;
    }
    if (result.status === "timeout") {
      return;
    }
    return;
  }
};
exports.LLLTS = LLLTS;
__decorate([
  (0, lll_lll_1.Spec)("Reads CLI args and runs EvidyTS checks on the target project."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array]),
  __metadata("design:returntype", Promise)
], LLLTS, "main", null);
__decorate([
  (0, lll_lll_1.Spec)("Runs server mode when '--server' is present; returns null for compile mode."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array]),
  __metadata("design:returntype", Promise)
], LLLTS, "tryRunServerMode", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses and validates '--port' for server mode."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array]),
  __metadata("design:returntype", Object)
], LLLTS, "parseServerPort", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses required server runtime config flags."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array]),
  __metadata("design:returntype", Object)
], LLLTS, "parseServerConfig", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses one required server argument and validates that it has a non-empty value."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String]),
  __metadata("design:returntype", Object)
], LLLTS, "parseRequiredServerArg", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses optional client tunnel flags used for behavioral browser execution."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array]),
  __metadata("design:returntype", Object)
], LLLTS, "parseClientTunnelConfig", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses an optional flag value and validates non-empty argument text."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String]),
  __metadata("design:returntype", Object)
], LLLTS, "parseOptionalArgValue", null);
__decorate([
  (0, lll_lll_1.Spec)("Parses an optional positive integer flag with fallback default."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String, Number]),
  __metadata("design:returntype", Object)
], LLLTS, "parseOptionalPositiveIntegerArg", null);
__decorate([
  (0, lll_lll_1.Spec)("Builds compile diagnostics when behavioral tests require a client tunnel URL."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", Object)
], LLLTS, "createMissingClientTunnelDiagnostic", null);
__decorate([
  (0, lll_lll_1.Spec)("Maps client tunnel results to compile diagnostics."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object, Object]),
  __metadata("design:returntype", Array)
], LLLTS, "mapClientTunnelResultToDiagnostics", null);
__decorate([
  (0, lll_lll_1.Spec)("Formats browser-side runtime errors captured during tunnel execution."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", String)
], LLLTS, "formatClientTunnelConsoleErrorDiagnostic", null);
__decorate([
  (0, lll_lll_1.Spec)("Formats one browser runtime error entry for compiler diagnostics."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", String)
], LLLTS, "formatClientTunnelConsoleErrorLine", null);
__decorate([
  (0, lll_lll_1.Spec)("Formats timeout diagnostics with explicit execution phase and active target when known."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", String)
], LLLTS, "formatClientTunnelTimeoutMessage", null);
__decorate([
  (0, lll_lll_1.Spec)("Retrieves a required CLI argument by flag or throws error."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String]),
  __metadata("design:returntype", String)
], LLLTS, "getArg", null);
__decorate([
  (0, lll_lll_1.Spec)("Retrieves an optional CLI argument by flag or returns default value."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String, String]),
  __metadata("design:returntype", String)
], LLLTS, "getOptionalArg", null);
__decorate([
  (0, lll_lll_1.Spec)("Checks if the CLI args include the flag (no value expected)."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, String]),
  __metadata("design:returntype", Boolean)
], LLLTS, "hasFlag", null);
__decorate([
  (0, lll_lll_1.Spec)("Logs test and scenario details when --verbose is provided."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Array, Boolean, Boolean]),
  __metadata("design:returntype", void 0)
], LLLTS, "printTestSummary", null);
__decorate([
  (0, lll_lll_1.Spec)("Reduces tunnel terminal output to failed sections plus the final summary line."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [String]),
  __metadata("design:returntype", String)
], LLLTS, "sanitizeClientTunnelReport", null);
__decorate([
  (0, lll_lll_1.Spec)("Prints tunnel summary plus full report based on status and verbosity."),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object, Boolean]),
  __metadata("design:returntype", void 0)
], LLLTS, "printClientTunnelOutput", null);
exports.LLLTS = LLLTS = __decorate([
  (0, lll_lll_1.Spec)("CLI entry that loads an EvidyTS project, applies rules, and reports diagnostics.")
], LLLTS);
if (require.main === module) {
  LLLTS.main(process.argv.slice(2)).then((result) => {
    if (result.mode === "compile") {
      process.exit(result.exitCode);
    }
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    process.exit(1);
  });
}
