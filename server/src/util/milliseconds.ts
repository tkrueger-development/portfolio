class ms {
  static second  = 1000;
  static minute  = ms.second * 60;
  static hour    = ms.minute * 60;
  static day     = ms.hour   * 24;
  static week    = ms.day    *  7;
}

export { ms };