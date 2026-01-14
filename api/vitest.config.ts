import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // テストファイルのパターン
    include: ["**/*.{test,spec}.ts"],
    exclude: ["node_modules", "dist", ".vitest"],
    
    // カバレッジ設定
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/generated/**",
        "**/test/**",
      ],
    },
    
    // グローバルなテスト設定
    globals: true,
    
    // 環境設定（Node.js環境）
    environment: "node",
  },
  
  // CommonJSモジュールサポート
  esbuild: {
    target: "ES2022",
  },
  
  // モジュール解決設定
  resolve: {
    alias: {
      // 必要に応じてエイリアスを追加
    },
  },
});
