type parseMap = Record<string, () => string>;

class Parser {
  private template: string;
  private parseMap: parseMap;

  constructor({ template, parseMap }: { template: string, parseMap: parseMap }) {
    this.template = template;
    this.parseMap = { ...parseMap };
  }

  parse({ injectData }: { injectData?: parseMap } = {}) {
    let output = this.template;

    const parseMapUpdated = {
      ...this.parseMap,
      ...injectData
    };

    for (const placeholder in parseMapUpdated) {
      const getDataForPlaceholder = parseMapUpdated[placeholder];
      
      output = output.replace(placeholder, getDataForPlaceholder());
    }
  
    return output;
  }
}

export { Parser };