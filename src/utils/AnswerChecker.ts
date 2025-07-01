import similarity from "string-similarity";

export interface AnswerCheckerOptions {
  minCoverage?: number;
  baseFuzzyScore?: number;
  stopwords?: string[];
  stemLength?: number;
}

export class AnswerChecker {
  private minCoverage: number;
  private baseFuzzyScore: number;
  private stopwords: Set<string>;
  private stemLength: number;

  constructor(options: AnswerCheckerOptions = {}) {
    this.minCoverage = options.minCoverage ?? 0.5;
    this.baseFuzzyScore = options.baseFuzzyScore ?? 0.75;
    this.stopwords = new Set(
      options.stopwords ?? [
        "a",
        "an",
        "the",
        "and",
        "or",
        "but",
        "if",
        "in",
        "on",
        "with",
        "von",
        "der",
        "die",
        "das",
        "у",
        "в",
        "на",
        "до",
        "з",
        "із",
        "і",
        "та",
        "або",
        "чи",
        "що",
        "як",
        "по",
        "при",
        "за",
      ]
    );
    this.stemLength = options.stemLength ?? 4;
  }

  private getStem(word: string): string {
    return [...word].slice(0, this.stemLength).join("");
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  private tokenize(text: string): string[] {
    console.log("tokenize - ", text);
    return this.normalize(text)
      .split(" ")
      .filter((word) => !this.stopwords.has(word))
      .map((word) => this.getStem(word));
  }

  public isSimilar(userAnswer: string, expectedAnswer: string): boolean {
    const normUser = this.normalize(userAnswer);
    const normExpected = this.normalize(expectedAnswer);

    const userTokens = this.tokenize(normUser);
    const expectedTokens = this.tokenize(normExpected);

    const common = userTokens.filter((token) => expectedTokens.includes(token));
    const coverage =
      expectedTokens.length > 0 ? common.length / expectedTokens.length : 0;

    const fuzzy = similarity.compareTwoStrings(normUser, normExpected);

    const dynamicFuzzyThreshold = Math.max(
      this.baseFuzzyScore,
      0.1 * Math.min(normUser.length, normExpected.length)
    );

    // console.log("user:", normUser);
    // console.log("expected:", normExpected);
    // console.log("tokens:", userTokens, expectedTokens);
    // console.log("coverage:", coverage);
    // console.log("fuzzy:", fuzzy);
    // console.log("threshold:", dynamicFuzzyThreshold);

    return coverage >= this.minCoverage || fuzzy >= dynamicFuzzyThreshold;
  }
}
