// src/core/player/strategies/LyricParser.tsx

export interface LyricLine {
  time: number;
  text: string;
}

// 1. GIAO DIỆN STRATEGY
export interface LyricParserStrategy {
  parse(rawLyrics: string): LyricLine[];
}

// 2. CHIẾN LƯỢC A: Phân tích định dạng LRC (Có thời gian chuẩn)
export class LrcParserStrategy implements LyricParserStrategy {
  parse(rawLyrics: string): LyricLine[] {
    const lines = rawLyrics.split("\n");
    const parsedLines: LyricLine[] = [];
    
    // Bắt chuỗi [mm:ss.xx]
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

    lines.forEach(line => {
      const match = timeRegex.exec(line);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = parseInt(match[3], 10);
        
        const timeInSeconds = minutes * 60 + seconds + milliseconds / (match[3].length === 3 ? 1000 : 100);
        const text = line.replace(timeRegex, "").trim();
        
        if (text) {
          parsedLines.push({ time: timeInSeconds, text });
        }
      }
    });

    return parsedLines;
  }
}

// 3. CHIẾN LƯỢC B: Phân tích Text thường (Không có thời gian)
export class PlainTextParserStrategy implements LyricParserStrategy {
  parse(rawLyrics: string): LyricLine[] {
    return rawLyrics.split("\n")
      .map(line => ({ time: 0, text: line.trim() }))
      .filter(l => l.text);
  }
}

// 4. LỚP NGỮ CẢNH ĐỂ SỬ DỤNG
export class LyricProcessor {
  private strategy: LyricParserStrategy;

  constructor() {
    this.strategy = new PlainTextParserStrategy();
  }

  public process(rawLyrics: string): LyricLine[] {
    if (!rawLyrics) return [];
    
    // Tự động phát hiện xem lời bài hát có gắn thời gian [00:15] không
    if (rawLyrics.includes("[00:") || rawLyrics.includes("[01:")) {
      this.strategy = new LrcParserStrategy();
    } else {
      this.strategy = new PlainTextParserStrategy();
    }
    
    return this.strategy.parse(rawLyrics);
  }
}

export const lyricProcessor = new LyricProcessor();