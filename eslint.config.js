import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import hooksPlugin from "eslint-plugin-react-hooks"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ignore these files:
  {
    ignores: ["**/*.cjs", "**/vite.config.ts", "**/dist/**", "**/build/**", "**/.react-router/types"],
  },
  // React rules
  {
    files: ["**/*.tsx", "**/*.jsx"],
    settings: {
      react: {
        version: "detect", // You can add this if you get a warning about the React version when you lint
      },
    },
    plugins: {
      // react: reactPlugin,
    },
  },
  // Allow plain string in JSX in stories
  {
    files: ["**/*.stories.tsx", "**/emails/*.tsx"],
    rules: {
      "react/jsx-no-literals": "off",
    },
  },
  // Rules of react
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    ignores: ["server/**"],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "(useNoInitialEffect)",
        },
      ],
    },
  },
  // global rules
  {
    rules: {
      "no-unused-vars": ["off"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message:
            "Don't declare non-const enums, use string unions:\n\nexport type Pet = typeof Pets[number]\nexport const Pets = ['CAT', 'DOG', 'PARROT', 'TURTLE'] as const\nexport const isPet = (value: unknown): value is Pet => Pets.includes(value as Pet)\n\nSee the reasoning:\n- https://www.reddit.com/r/typescript/comments/j3vp9d/should_i_use_enums_or_strings/\n- https://github.com/typescript-eslint/typescript-eslint/issues/561",
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": true,
          minimumDescriptionLength: 25,
        },
      ],
      "array-callback-return": ["error"],
      "no-await-in-loop": "error",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "off",
      "no-promise-executor-return": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "require-atomic-updates": "error",
      "consistent-this": "error",
      eqeqeq: "error",
      "func-name-matching": "error",
      "func-names": "error",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
)
