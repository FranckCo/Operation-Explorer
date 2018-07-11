import D from 'i18n'

export const getRangeLabel = (range, codeListCS) => {
    if (codeListCS) return D.codeList
    switch (range) {
      case 'http://www.w3.org/ns/sdmx-mm#ReportedAttribute':
        return D.richeTextType
      case 'http://www.w3.org/2001/XMLSchema#string':
        return D.textType
      case 'http://www.w3.org/2001/XMLSchema#date':
        return D.dateType
      default:
        return D.codeList
    }
}
