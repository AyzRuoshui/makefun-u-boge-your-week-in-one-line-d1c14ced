import fs from 'node:fs';
import path from 'node:path';

/**
 * 构建本周一句话总结（终稿）。
 * 将周二的高光胜利与余下一周的现实混乱凝练为单句，并以具体事件与人物收束反转。
 * @returns 严格符合门禁约束的纯单行 UTF-8 文本。
 */
function buildWeeklyOneLiner(): string {
  return "Won Tuesday's chili cook-off; spent the rest of the week negotiating with my plumber.";
}

/**
 * 在写入前校验输出文本是否严格满足比赛门禁要求：
 * 1. 长度为 1 至 100 个 Unicode 字符；
 * 2. 不包含换行符，确保为严格意义上的单行文本；
 * 3. 非纯空白字符且无首尾冗余空格。
 * @param text 待校验的候选文本。
 */
function assertValidEntry(text: string): void {
  if (/[\r\n]/.test(text)) {
    throw new Error('输出文本必须为单行，不得包含换行符');
  }
  if (text.trim().length === 0) {
    throw new Error('输出文本不得为空或纯空白字符');
  }
  if (text !== text.trim()) {
    throw new Error('输出文本不得包含首尾空白字符');
  }
  const charCount = Array.from(text).length;
  if (charCount < 1 || charCount > 100) {
    throw new Error(`输出字符数越界: ${charCount}，要求在 1..100 之间`);
  }
}

function main(): void {
  const outputDir = process.env.TEST_OUTPUT_DIR || '/output';
  const outFile = path.join(outputDir, 'entry.txt');
  const line = buildWeeklyOneLiner();

  assertValidEntry(line);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outFile, line, { encoding: 'utf8', mode: 0o644 });
  fs.chmodSync(outFile, 0o644);
}

main();
