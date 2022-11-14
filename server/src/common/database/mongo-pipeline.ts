class MongoPipeline {
  private attributesToRemap: Array<string>;
  private remapPrefix: string | null = null;

  private matchStageContent: Record<string, object> = {};

  constructor({ attributesToRemap, remapPrefix }: { attributesToRemap?: Array<string>, remapPrefix?: string } = {}) {

    if (attributesToRemap && !remapPrefix) throw new Error('Please provide a prefix to remap given fields.');
    if (!attributesToRemap && remapPrefix) throw new Error('Please provide a list of fields you want to remap.');

    this.attributesToRemap = [...attributesToRemap || []];
    this.remapPrefix       = remapPrefix || null;
  }

  private prefix({ candidate }: { candidate: string }): string {
    if (!this.remapPrefix)                           return candidate;
    if (!this.attributesToRemap.includes(candidate)) return candidate;

    return this.remapPrefix + candidate;
  }

  public match({ field, values, method = 'or' }: { field: string, values: Array<string> | [number] | [number, number] | number, method?: 'and' | 'or' }): void {
    if (!Array.isArray(values)) values = [values];
    const remappedField = this.prefix({ candidate: field });

    if (!this.matchStageContent[remappedField]) this.matchStageContent[remappedField] = [];

    if (values.length === 1 && typeof values[0] === 'number') {
      this.matchStageContent[remappedField] = { [remappedField]: { $gte: values[0] } };
      return;
   }

    if (values.length === 2 && typeof values[0] === 'number' && typeof values[1] === 'number') {
      this.matchStageContent[remappedField] = { [remappedField]: { $gte: values[0], $lte: values[1] } };
      return;
    }

    const content = values.map((value) => ({ [remappedField]: value }));

    if (content.length > 1) {
      const mode = method === 'and' ? '$and' : '$or';
      this.matchStageContent[remappedField] = { [mode]: content };
      return;
    }
    
    this.matchStageContent[remappedField] = content[0];
  }
  
  public createMatchStage() {
    const matchStageKeys = Object.keys(this.matchStageContent);

    if (matchStageKeys.length === 1) return { $match: this.matchStageContent[matchStageKeys[0]] };

    return  { $match: { $and: matchStageKeys.map((key) => this.matchStageContent[key]) } };
  }
}

export { MongoPipeline };